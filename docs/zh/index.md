---
layout: home

hero:
  name: ContextWeaver
  text: 为 AI Agent 编织代码库上下文
  tagline: 专为 AI 编码代理设计的语义检索引擎 — 通过混合检索、图式扩展与智能打包，提供精准且富含上下文的代码片段
  actions:
    - theme: brand
      text: 快速开始 →
      link: /zh/guide/getting-started
    - theme: alt
      text: GitHub 仓库
      link: https://github.com/wchiway/contextweaver-mcp

features:
  - icon: 🔍
    title: 混合检索
    details: 结合向量相似度与全文检索，通过 RRF 融合算法提供更准确、更稳定的代码搜索结果。
  - icon: 🌳
    title: AST 语义分片
    details: 基于 Tree-sitter 解析代码结构，在函数、类和模块边界进行语义完整的代码分片。
  - icon: 🕸️
    title: 图式上下文扩展
    details: 自动从命中片段扩展到相邻代码、面包屑结构与 import 依赖，提供完整的代码理解。
  - icon: 📦
    title: Token 感知打包
    details: 智能合并、排序和裁剪代码片段，在 token 预算内为 LLM 提供最优上下文，避免溢出。
  - icon: 🚀
    title: MCP 集成
    details: 内置模型上下文协议服务器，可与 Claude 和其他兼容 MCP 的 AI Agent 无缝集成。
  - icon: ⚡
    title: 极速性能
    details: 基于 SQLite FTS5 和 LanceDB 向量存储，即使在大型代码库上也能实现亚秒级搜索性能。
---

## 为什么使用 ContextWeaver？

ContextWeaver 是面向 AI 代码助手的语义检索引擎。它把代码库索引为可搜索的语义片段，并在查询时自动扩展上下文、控制 token 预算，帮助模型拿到更完整、更相关的代码证据。

## 适用场景

- 为 MCP 客户端提供代码库检索工具
- 在大型项目中定位函数、类、引用和相关文件
- 构建本地 RAG / 代码上下文引擎
- 为 AI Agent 提供按需、可解释、可控的上下文
