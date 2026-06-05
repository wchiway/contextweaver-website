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

## Configure in your client

ContextWeaver runs over stdio with the command `contextweaver mcp`. Here is how to connect two common clients.

### Codex

Codex stores MCP configuration in `config.toml` (default `~/.codex/config.toml`, or `.codex/config.toml` in a trusted project).

Add it via the CLI:

```bash
codex mcp add contextweaver -- contextweaver mcp
```

Or edit `config.toml` directly:

```toml
[mcp_servers.contextweaver]
command = "contextweaver"
args = ["mcp"]
```

Run `/mcp` in the Codex TUI to see connected servers.

### Claude Code

Claude Code adds stdio servers with `claude mcp add`. All options must come before the server name, and the command to launch follows `--`:

```bash
claude mcp add contextweaver -- contextweaver mcp
```

Use `--scope` to choose where the config lives: `local` (default, private to you in the current project), `project` (written to `.mcp.json` at the project root and shared via version control), or `user` (available across all your projects). Project-scoped example:

```bash
claude mcp add --scope project contextweaver -- contextweaver mcp
```

A project-scoped server is written to `.mcp.json`:

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

Run `/mcp` inside Claude Code to check the connection status.

> If `contextweaver` is not on your `PATH`, replace `command` with the full path to the executable (find it with `which contextweaver`).

## MCP tool capabilities

- Semantic code retrieval
- Indexed file listing
- Symbol definition lookup
- Symbol reference lookup
- Index and health statistics

On the first query, ContextWeaver can automatically trigger indexing. Later queries reuse local SQLite and LanceDB indexes.
