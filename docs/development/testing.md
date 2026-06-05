# Testing Guide

ContextWeaver uses vitest. Tests cover unit logic, cross-module behavior, and real LanceDB integration scenarios.

## Run all tests

```bash
pnpm test
```

## Type checking and linting

```bash
pnpm typecheck
pnpm lint
```

Formatting:

```bash
pnpm fmt
```

## Test directory structure

| Directory | Coverage |
|-----------|----------|
| `tests/chunking/` | SourceAdapter, AST chunking, new language support |
| `tests/cli/` | CLI mirror commands |
| `tests/db/` | schema migration, pending marks, advisory lock, index version |
| `tests/indexer/` | cross-store compensation, GC, aborted guard |
| `tests/integration/` | real LanceDB end-to-end scenarios |
| `tests/mcp/` | MCP tool handlers and registration |
| `tests/scanner/` | scanner, watcher, index version |
| `tests/search/` | FTS, SearchService, QueryCache, ContextPacker, config loading |
| `tests/stats/` | stats aggregation and diagnostics |
| `tests/vectorStore/` | chunk_id deduplication and sample checks |

## Test writing guidance

### Search logic

When changing `SearchService`, cover:

- cache hit / miss
- vector and lexical fusion
- rerank input truncation
- Smart TopK boundaries
- stats recording

### Index consistency

When changing `Indexer`, `Database`, or `VectorStore`, cover failure compensation:

| Scenario | Verify |
|----------|--------|
| LanceDB write failure | SQLite mark must not be incorrectly updated |
| FTS write failure | new LanceDB chunks should be rolled back |
| mark failure | `pending_marks` should remain and be replayable |
| migration aborted | Indexer should refuse writes |

### AST and offsets

When changing `SemanticSplitter` or `SourceAdapter`, test multi-byte characters:

- Chinese text
- emoji
- mixed newlines
- byte offset to UTF-16 char offset conversion

### MCP tools

For new MCP tools, implement core logic as a handler function and unit test the handler. CLI mirrors should only parse parameters and print output.

## Integration test notes

Real LanceDB tests may touch local filesystem state. Tests should use temporary directories and avoid polluting the user's real `~/.contextweaver` data.

## Recommended completion checks

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

If you only changed the documentation site, run this inside `contextweaver-website`:

```bash
pnpm build
```
