# Project Overview

ContextWeaver is a codebase context engine built for AI coding agents. It is not a generic search UI; it is designed to provide LLMs and agents with code context that can be retrieved, expanded, and packed within a budget.

## Problems it solves

Agents often struggle with three issues in large codebases:

1. **grep does not understand intent**: natural language questions do not reliably map to relevant implementations.
2. **vector search is not precise enough by itself**: function names, class names, config keys, and technical terms need exact matching.
3. **matched chunks are often isolated**: a single chunk may miss neighboring code, structural breadcrumbs, or cross-file dependencies.

ContextWeaver's core strategy is:

```text
Hybrid Recall → RRF Fusion → Rerank → Graph Expansion → Token-Aware Packing
```

## Intended users

- AI agents using MCP clients
- Developers adding semantic code retrieval to a project
- Engineering teams building local code RAG systems
- Contributors extending indexing, search, MCP tools, or multi-language chunking

## Core capabilities

| Capability | Description |
|------------|-------------|
| Semantic retrieval | Uses embeddings for vector recall and natural language intent |
| Lexical retrieval | Uses SQLite FTS5 to match symbols, paths, and technical terms |
| AST chunking | Uses Tree-sitter to split by functions, classes, and module boundaries |
| Context expansion | Adds neighbors, breadcrumbs, and import-related files |
| Token packing | Merges, ranks, and trims results within a budget |
| MCP tools | Exposes retrieval and structure tools to MCP clients |
| CLI mirrors | Provides local CLI commands for selected MCP tools |

## Runtime boundary

ContextWeaver writes index data to:

```text
~/.contextweaver/<projectId>/
├── index.db
└── vectors.lance/
```

The source repository does not store index results. Embedding and rerank API keys are configured through `~/.contextweaver/.env`.

## Recommended source reading order

If you are developing ContextWeaver, read the source in this order:

1. `src/index.ts`: CLI entrypoint and command registration
2. `src/scanner/index.ts`: scanning and incremental indexing entrypoint
3. `src/chunking/SemanticSplitter.ts`: semantic chunking
4. `src/indexer/index.ts`: cross-store writes and compensation
5. `src/search/SearchService.ts`: main search pipeline
6. `src/search/GraphExpander.ts`: context expansion
7. `src/search/ContextPacker.ts`: context packing
8. `src/mcp/server.ts` and `src/mcp/tools/*`: MCP tool layer
