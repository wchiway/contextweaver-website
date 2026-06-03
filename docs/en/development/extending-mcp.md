# Extending MCP Tools

ContextWeaver MCP tools live under:

```text
src/mcp/tools/
```

MCP server registration lives in:

```text
src/mcp/server.ts
src/mcp/tools/index.ts
```

## Design principles

Before adding a tool, classify it:

| Type | Examples | Needs Embedding? |
|------|----------|------------------|
| Semantic retrieval | `codebase-retrieval` | Usually yes |
| Structure browsing | `list-files`, definitions, references | No |
| Diagnostics/statistics | `stats` | No |

Avoid external API calls when possible. Structure tools should prefer SQLite metadata and FTS.

## Recommended file structure

Create a dedicated file:

```text
src/mcp/tools/myTool.ts
```

Typical shape:

```ts
export interface MyToolInput {
  repo_path: string
}

export async function handleMyTool(input: MyToolInput) {
  // validate input
  // initialize db or search service
  // return MCP-compatible response
}
```

## Register the tool

Usually modify:

```text
src/mcp/tools/index.ts
src/mcp/server.ts
```

Ensure:

- tool name is stable
- description clearly explains when to use it
- inputSchema is strict enough
- errors are understandable to agents

## Reuse shared logic

Shared path, database initialization, and response formatting helpers live in:

```text
src/mcp/tools/shared.ts
```

New tools should reuse this logic instead of duplicating repo path, project id, and database initialization code.

## Add a CLI mirror

If the tool is useful for human developers, add a CLI mirror in:

```text
src/cli/mirrorCommands.ts
```

Existing examples:

- `list-files [path]`
- `definition <symbol>`
- `references <symbol>`

The CLI mirror should call the same handler so MCP and CLI behavior do not diverge.

## Tests

Recommended tests:

```text
tests/mcp/myTool.test.ts
tests/mcp/toolRegistry.test.ts
tests/cli/mirrorCommands.test.ts
```

Test focus:

- input schema matches handler parameters
- invalid input returns understandable errors
- handler can be tested without running a real MCP server
- CLI mirror parses parameters correctly

## Writing tool descriptions

MCP tool descriptions strongly influence whether agents choose the right tool. Include:

- when to use it
- when not to use it
- cost information
- how it differs from related tools

For structure browsing tools, explicitly mention zero embedding API cost.
