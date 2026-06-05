---
layout: home

hero:
  name: ContextWeaver
  text: Weave codebase context for AI agents
  tagline: Semantic Code Retrieval for AI Agents — Hybrid Search · Graph Expansion · Token-Aware Packing
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: CLI Reference
      link: /reference/cli

features:
  - title: Hybrid Search
    details: Combine vector retrieval and full-text search with RRF fusion for more stable code search results.
  - title: AST-Aware Chunking
    details: Use Tree-sitter to understand code structure and keep functions, classes, and modules as meaningful context units.
  - title: Graph Expansion
    details: Expand from matched chunks to neighboring code, breadcrumbs, and import dependencies to avoid isolated snippets.
  - title: Token-Aware Packing
    details: Merge, rank, and trim snippets within a token budget so LLMs receive usable context.
---

## Why ContextWeaver?

ContextWeaver is a semantic retrieval engine built for AI coding agents. It indexes codebases into searchable semantic chunks, expands context around matches, and packs the final result within a token budget so models receive more complete and relevant code evidence.

## Use cases

- Provide codebase retrieval tools to MCP clients
- Locate functions, classes, references, and related files in large projects
- Build local RAG and code context engines
- Give AI agents on-demand, explainable, and controllable code context
