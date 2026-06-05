# CLI Commands

## Initialize

```bash
contextweaver init
cw init
```

Create or update the `~/.contextweaver/.env` configuration file.

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
