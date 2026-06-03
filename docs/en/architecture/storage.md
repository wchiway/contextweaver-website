# Storage Model

ContextWeaver uses a dual-store architecture: SQLite + LanceDB.

```text
~/.contextweaver/<projectId>/
├── index.db
└── vectors.lance/
```

## SQLite

SQLite is the center for metadata, source content, and full-text search.

| Table | Purpose |
|-------|---------|
| `files` | File metadata and full content; `content` is the single source of truth |
| `files_fts` | File-level FTS5 index |
| `chunks_fts` | Chunk-level FTS5 index |
| `metadata` | Schema version, embedding dimensions, migration state, lock, and related metadata |
| `pending_marks` | Outbox for replaying failed mark stages |
| `stats` | Accumulated index, search, and health metrics |

## LanceDB

The LanceDB `chunks` table stores only:

- vector
- file path
- chunk index
- hash
- start/end offsets
- breadcrumb
- language and locating metadata

Since v1.4.0, LanceDB no longer stores `display_code` or `vector_text`. This reduces index size and avoids duplicated source content.

## Single source of truth

Critical invariant:

```text
source content = SQLite files.content
```

When displaying search results, `ChunkContentLoader` slices `files.content` using `(path, start_index, end_index)`.

Do not use `raw_start/raw_end` for display slicing because those offsets may include leading gaps from gap-aware merging.

## Offset domain

All LanceDB offset fields use the UTF-16 character domain.

JavaScript string slicing works on UTF-16 code units. If UTF-8 byte offsets are written into metadata, multi-byte characters will cause incorrect slicing.

Related modules:

- `src/chunking/SourceAdapter.ts`
- `src/chunking/SemanticSplitter.ts`
- `tests/chunking/SourceAdapter.test.ts`
- `tests/search/ChunkContentLoader.test.ts`

## Migration state machine

The LanceDB display-code removal migration has three states:

| State | Meaning |
|-------|---------|
| `pending` | Migration is needed or incomplete |
| `done` | Migration completed |
| `aborted` | Sample validation or migration failed; Indexer refuses writes |

To recover from `aborted`:

```bash
contextweaver migrate --reset
```

## Cross-store consistency

Write order:

```text
LanceDB → FTS + outbox → SQLite mark + clear outbox
```

This lets the system recover after crashes or partial failures:

- FTS failure can delete newly written LanceDB chunks
- mark failure can be replayed through `pending_marks`
- hash mismatches trigger re-indexing on the next scan

## Development guidance

- Decide whether a new field belongs to content, locating metadata, statistics, or migration state
- Put source-content fields in SQLite, not LanceDB
- Update migration tests when schema changes
- Design failure compensation for any cross-store write change
