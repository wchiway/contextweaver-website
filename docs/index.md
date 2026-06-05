---
layout: home

hero:
  name: ContextWeaver
  text: Weave codebase context for AI agents
  tagline: Semantic code retrieval engine designed for AI coding agents — delivering precise, context-rich code snippets through hybrid search, graph expansion, and intelligent packing
  actions:
    - theme: brand
      text: Get Started →
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/wchiway/contextweaver-mcp

features:
  - icon: 🔍
    title: Hybrid Search
    details: Combine vector similarity and full-text search with RRF fusion algorithm, delivering more accurate and stable code retrieval results.
  - icon: 🌳
    title: AST-Aware Chunking
    details: Leverage Tree-sitter to parse code structure, maintaining semantic integrity by chunking at function, class, and module boundaries.
  - icon: 🕸️
    title: Graph Expansion
    details: Automatically expand context from matched chunks to neighboring code, breadcrumbs, and import dependencies for complete understanding.
  - icon: 📦
    title: Token-Aware Packing
    details: Intelligently merge, rank, and trim code snippets within your token budget, ensuring LLMs receive optimal context without overflow.
  - icon: 🚀
    title: MCP Integration
    details: Built-in Model Context Protocol server provides seamless integration with Claude and other MCP-compatible AI agents.
  - icon: ⚡
    title: Lightning Fast
    details: Powered by SQLite FTS5 and LanceDB vector store, delivering sub-second search performance even on large codebases.
---

## Why ContextWeaver?

ContextWeaver is a semantic retrieval engine built for AI coding agents. It indexes codebases into searchable semantic chunks, expands context around matches, and packs the final result within a token budget so models receive more complete and relevant code evidence.

## Use cases

- Provide codebase retrieval tools to MCP clients
- Locate functions, classes, references, and related files in large projects
- Build local RAG and code context engines
- Give AI agents on-demand, explainable, and controllable code context
