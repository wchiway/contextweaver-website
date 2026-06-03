# MCP Integration

ContextWeaver can run as a Model Context Protocol server, allowing MCP-compatible AI clients to retrieve context from the current codebase.

## Start the MCP server

```bash
contextweaver mcp
```

## Recommended workflow

1. Run `contextweaver init` in the target codebase.
2. Configure `~/.contextweaver/.env`.
3. Run `contextweaver index` to build the initial index.
4. Configure the ContextWeaver server in your MCP client.
5. Use semantic retrieval, file listing, symbol definition, and reference tools to fetch code context.

## MCP tool capabilities

- Semantic code retrieval
- Indexed file listing
- Symbol definition lookup
- Symbol reference lookup
- Index and health statistics

On the first query, ContextWeaver can automatically trigger indexing. Later queries reuse local SQLite and LanceDB indexes.
