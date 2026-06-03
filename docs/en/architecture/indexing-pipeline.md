# Indexing Pipeline

The indexing pipeline converts a codebase into SQLite metadata/full-text indexes and LanceDB vector indexes.

```text
Bootstrap → Crawler → Processor → SemanticSplitter → Indexer → LanceDB/SQLite
```

## 0. Bootstrap

Bootstrap lives in `src/db/bootstrap.ts` and is called idempotently by `SearchService.init()` and `Indexer.indexFiles()`.

It handles:

- replaying `pending_marks`
- running LanceDB schema migration
- migrating away from `display_code/vector_text`
- using an advisory lock to avoid concurrent migrations

If migration enters the `aborted` state, the Indexer refuses writes. The user should run:

```bash
contextweaver migrate --reset
```

## 1. Crawler

`src/scanner/crawler.ts` traverses the filesystem. Filtering comes from:

- built-in ignore rules such as `node_modules`, `.git`, build outputs, and lock files
- user-provided `IGNORE_PATTERNS`

The goal is to reduce token and indexing cost from low-value files.

## 2. Processor

`src/scanner/processor.ts` is responsible for:

- reading file content
- detecting encoding
- identifying language
- computing content hash
- producing `ProcessResult`

Incremental indexing depends on hashes to decide whether a file changed.

## 3. SemanticSplitter

`src/chunking/SemanticSplitter.ts` splits files into chunks.

Preferred path:

```text
Language detection → Tree-sitter ParserPool → AST semantic nodes → chunk metadata
```

Languages that cannot be parsed with AST fall back to line-based chunking. All offsets written to LanceDB are normalized to the UTF-16 character domain through `SourceAdapter.toCharOffset`.

## 4. Batch embedding

`batchIndex()` in `src/indexer/index.ts` processes files in batches so it does not keep every chunk and embedding in memory at once.

Core steps:

- collect texts for the batch
- call the Embedding API
- write LanceDB rows
- write FTS rows
- update SQLite marks
- release intermediate data between batches

## 5. Cross-store pseudo-transaction

The write order is a critical invariant:

```text
LanceDB → FTS + outbox → SQLite mark + clear outbox
```

Failure compensation:

| Failed stage | Handling |
|--------------|----------|
| LanceDB write | Clear corresponding `vector_index_hash`; retry next scan |
| FTS write | Roll back new LanceDB chunks and keep old version |
| SQLite mark | Keep outbox; replay on next bootstrap |

## 6. Garbage collection

After indexing, ContextWeaver cleans orphan chunks from LanceDB. GC has a time budget so it does not block normal indexing for too long.

## Development notes

- Do not write source text back into LanceDB; `files.content` is the single source of truth
- Keep offsets in the UTF-16 character domain before writing metadata
- Any new write stage must include cross-store compensation
- If you change hash or mark logic, update `pending_marks` and index-version tests
