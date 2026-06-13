# CLI Commands

## Initialize

```bash
contextweaver init
cw init
```

Create or update the `~/.contextweaver/.env` configuration file.

## Config

```bash
contextweaver config list
contextweaver config set <key> <value>
contextweaver config validate
contextweaver config wizard
```

Manage environment variable configuration:

- **`config list`** (alias: `ls`) - View current configuration with masked sensitive values
- **`config set`** - Set a single environment variable with validation
- **`config validate`** - Verify all required configuration is valid
- **`config wizard`** - Interactive setup wizard for guided configuration

**Examples:**

```bash
# View current configuration
contextweaver config list

# Set embedding concurrency
contextweaver config set EMBEDDINGS_MAX_CONCURRENCY 20

# Set vector dimensions
contextweaver config set EMBEDDINGS_DIMENSIONS 2048

# Set search parameters
contextweaver config set CW_SEARCH_WVEC 0.6

# Validate configuration
contextweaver config validate

# Interactive wizard
contextweaver config wizard
```

**Available configuration keys:**

- **Embedding**: `EMBEDDINGS_API_KEY`, `EMBEDDINGS_BASE_URL`, `EMBEDDINGS_MODEL`, `EMBEDDINGS_MAX_CONCURRENCY`, `EMBEDDINGS_DIMENSIONS`
- **Reranker**: `RERANK_API_KEY`, `RERANK_BASE_URL`, `RERANK_MODEL`, `RERANK_TOP_N`
- **Search**: `CW_SEARCH_WVEC`, `CW_SEARCH_WLEX`, `CW_SEARCH_RERANK_TOP_N`, `CW_SEARCH_MAX_TOTAL_CHARS`, `CW_SEARCH_VECTOR_TOP_K`, `CW_SEARCH_SMART_MAX_K`, `CW_SEARCH_IMPORT_FILES_PER_SEED`
- **Other**: `IGNORE_PATTERNS`

## Index

```bash
contextweaver index [path]
contextweaver index --force
```

Index a codebase and generate SQLite metadata, FTS indexes, and LanceDB vector indexes.

## Search

```bash
contextweaver search --information-request "your question"
cw search --information-request "your question" --technical-terms "TermA,TermB"
```

Run semantic search and return results after context expansion and token-aware packing.

## Watch

```bash
contextweaver watch
contextweaver watch /path/to/project --debounce 800
```

Watch file changes and automatically run incremental indexing.

## MCP Server

```bash
contextweaver mcp
```

Start the MCP server.

## Structure and symbol lookup

```bash
contextweaver list-files --glob "src/**/*.ts" --language typescript --max-results 100
contextweaver definition SearchService --hint-path src/search
contextweaver references handleStats --exclude-definition
```

These commands mirror MCP tools and do not require embedding API calls.

## Stats

```bash
contextweaver stats
contextweaver stats --json
```

Inspect index status, search metrics, and consistency diagnostics.

## Migration

```bash
contextweaver migrate
contextweaver migrate --reset
```

Inspect or reset LanceDB migration state.
