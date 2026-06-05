---
layout: home

hero:
  name: ContextWeaver
  text: 为 AI Agent 编织代码库上下文
  tagline: Semantic Code Retrieval for AI Agents — Hybrid Search · Graph Expansion · Token-Aware Packing
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/guide/getting-started
    - theme: alt
      text: 查看 CLI
      link: /zh/reference/cli

features:
  - title: 混合检索
    details: 结合向量召回与全文检索，通过 RRF 融合获得更稳定的代码搜索结果。
  - title: AST 语义分片
    details: 基于 Tree-sitter 理解代码结构，让函数、类和模块边界成为上下文组织单位。
  - title: 图式上下文扩展
    details: 从命中片段扩展到相邻代码、面包屑结构与 import 依赖，减少孤立片段。
  - title: Token 感知打包
    details: 在预算内合并、排序和裁剪片段，向 LLM 提供更可用的上下文。
---

## 为什么使用 ContextWeaver？

ContextWeaver 是面向 AI 代码助手的语义检索引擎。它把代码库索引为可搜索的语义片段，并在查询时自动扩展上下文、控制 token 预算，帮助模型拿到更完整、更相关的代码证据。

## 适用场景

- 为 MCP 客户端提供代码库检索工具
- 在大型项目中定位函数、类、引用和相关文件
- 构建本地 RAG / 代码上下文引擎
- 为 AI Agent 提供按需、可解释、可控的上下文
