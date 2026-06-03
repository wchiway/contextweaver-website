# MCP Tools Reference

ContextWeaver exposes 5 MCP tools. The design principle is: semantic retrieval first, structure browsing second.

| Tool | Purpose | Embedding cost |
|------|---------|----------------|
| `codebase-retrieval` | Hybrid semantic + exact-match retrieval | Yes |
| `list-files` | List indexed file structure | No |
| `find-references` | Heuristic symbol reference lookup | No |
| `get-symbol-definition` | Heuristic symbol definition lookup | No |
| `stats` | Index, search, and health statistics | No |

## codebase-retrieval

The primary retrieval tool. Use it for questions like "how is this feature implemented?" or "where is this flow handled?".

Parameters:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `repo_path` | string | Yes | Absolute path to the repository root |
| `information_request` | string | Yes | Natural-language semantic goal |
| `technical_terms` | string[] | No | Exact symbols or terms to emphasize |

Recommended usage:

```json
{
  "repo_path": "/path/to/repo",
  "information_request": "Trace the login flow and error handling.",
  "technical_terms": ["LoginService", "AuthToken"]
}
```

## list-files

Quickly inspect indexed file structure without calling the Embedding API.

Parameters:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `repo_path` | string | Yes | Absolute path to the repository root |
| `glob` | string | No | Path glob filter |
| `language` | string | No | Language filter |
| `max_results` | number | No | Maximum number of results |

CLI mirror:

```bash
contextweaver list-files --glob "src/**/*.ts" --language typescript --max-results 100
```

## find-references

Find heuristic text references to a symbol over indexed chunks. This is not compiler-accurate navigation.

Parameters:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `repo_path` | string | Yes | Absolute path to the repository root |
| `symbol` | string | Yes | Exact symbol name |
| `exclude_definition` | boolean | No | Exclude likely definition chunks |
| `max_results` | number | No | Maximum results, default 50 |

CLI mirror:

```bash
contextweaver references SearchService --exclude-definition
```

## get-symbol-definition

Find likely definition blocks for classes, functions, methods, and similar symbols.

Parameters:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `repo_path` | string | Yes | Absolute path to the repository root |
| `symbol` | string | Yes | Exact symbol name |
| `hint_path` | string | No | Preferred path to disambiguate same-name definitions |
| `max_results` | number | No | Maximum results, default 3 |

CLI mirror:

```bash
contextweaver definition SearchService --hint-path src/search
```

## stats

Returns index, search, and health statistics, including:

- indexing counters
- search behavior and cache hit rate
- health and consistency diagnostics
- migration state
- `pending_marks` backlog
- LanceDB row count and embedding dimensions

CLI mirror:

```bash
contextweaver stats
contextweaver stats --json
```

## Tool design guidance

When adding a new MCP tool, first classify it as:

1. **Semantic retrieval**: may require Embedding/Rerank
2. **Structure browsing**: should usually be zero API cost
3. **Diagnostics/statistics**: should support machine-readable output when useful

See [Extending MCP Tools](/en/development/extending-mcp) for implementation steps.
