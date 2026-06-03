# Troubleshooting

This page covers common issues when developing or using ContextWeaver.

## Embedding or Rerank API errors

Check `~/.contextweaver/.env`:

```bash
EMBEDDINGS_API_KEY=...
EMBEDDINGS_BASE_URL=...
EMBEDDINGS_MODEL=...
RERANK_API_KEY=...
RERANK_BASE_URL=...
RERANK_MODEL=...
```

Enable debug logging:

```bash
LOG_LEVEL=debug contextweaver search --information-request "..."
```

Logs are stored at:

```text
~/.contextweaver/logs/app.YYYY-MM-DD.log
```

## Migration state is aborted

Symptom: Indexer refuses writes, or stats/logs mention LanceDB migration aborted.

Fix:

```bash
contextweaver migrate --reset
contextweaver index /path/to/project
```

This clears LanceDB and lets the next index rebuild the vector table.

## pending_marks backlog

`pending_marks` means FTS was written but the SQLite mark stage failed. Bootstrap normally replays these marks automatically.

Check:

```bash
contextweaver stats --path /path/to/project
```

If the backlog persists, inspect logs for SQLite write errors.

## Search results lack context

Possible causes:

- `CW_SEARCH_IMPORT_FILES_PER_SEED=0` disables cross-file expansion
- `CW_SEARCH_MAX_TOTAL_CHARS` is too low
- import resolver does not support the language or path style
- files were not indexed successfully

Try:

```bash
contextweaver stats --path /path/to/project
contextweaver list-files /path/to/project --glob "src/**/*.ts"
contextweaver index /path/to/project --force
```

## Search is slow

Check:

- whether this is the first query and indexing is running
- Embedding/Rerank API latency
- whether `CW_SEARCH_VECTOR_TOP_K` is too high
- whether `CW_SEARCH_RERANK_TOP_N` is too high
- query cache hit rate

Inspect per-stage timings:

```bash
contextweaver stats
```

## Multi-byte slicing is wrong

If displayed code is misaligned around Chinese text or emoji, inspect:

- `SourceAdapter.toCharOffset`
- offset writing in `SemanticSplitter`
- whether `ChunkContentLoader` still uses `start_index/end_index`

Related tests:

```bash
pnpm test tests/chunking/SourceAdapter.test.ts
pnpm test tests/search/ChunkContentLoader.test.ts
```

## MCP client has no tools

Check MCP config:

```json
{
  "mcpServers": {
    "contextweaver": {
      "command": "contextweaver",
      "args": ["mcp"]
    }
  }
}
```

If the global command is unavailable, build locally and use an absolute command or `node dist/index.js mcp`.

## VitePress website build warning

The documentation site currently uses Vite 8 + VitePress 2 alpha. Build may print `@vueuse/core` `INVALID_ANNOTATION` warnings. If the output ends with `build complete`, the site was generated successfully.
