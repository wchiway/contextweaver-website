# 项目总览

ContextWeaver 是一个面向 AI 代码助手的代码库上下文引擎。它不是通用搜索 UI，而是为 LLM/Agent 提供“可检索、可扩展、可打包”的代码上下文。

## 解决的问题

大型代码库中，Agent 经常遇到三个问题：

1. **只靠 grep 不理解语义**：自然语言问题无法稳定映射到相关实现。
2. **只靠向量搜索不够精确**：函数名、类名、配置项等技术术语需要精确匹配。
3. **命中片段太孤立**：单个 chunk 缺少相邻代码、类结构和跨文件依赖。

ContextWeaver 的核心策略是：

```text
混合召回 → RRF 融合 → Rerank 精排 → 图式扩展 → Token 感知打包
```

## 面向的使用者

- 使用 MCP 客户端的 AI Agent
- 想为项目添加语义代码检索能力的开发者
- 需要在本地构建代码 RAG 的工程团队
- 想二次开发代码索引、搜索、MCP 工具或多语言分片能力的贡献者

## 核心能力

| 能力 | 说明 |
|------|------|
| 语义检索 | 使用 Embedding 做向量召回，理解自然语言意图 |
| 词法检索 | 使用 SQLite FTS5 精确匹配符号名、路径、术语 |
| AST 分片 | 使用 Tree-sitter 尽量按函数、类、模块边界切分 |
| 上下文扩展 | 基于邻居、面包屑和 import 关系补齐上下文 |
| Token 打包 | 在预算内合并、排序和裁剪结果 |
| MCP 工具 | 暴露给 Claude 等支持 MCP 的客户端 |
| CLI 镜像 | 为常用 MCP 工具提供本地 CLI 命令 |

## 运行时边界

ContextWeaver 会把索引数据写入：

```text
~/.contextweaver/<projectId>/
├── index.db
└── vectors.lance/
```

源码项目本身不保存索引结果。Embedding/Rerank API Key 通过 `~/.contextweaver/.env` 配置。

## 开发者需要优先理解的模块

建议按这个顺序阅读源码：

1. `src/index.ts`：CLI 入口与命令注册
2. `src/scanner/index.ts`：扫描与增量索引入口
3. `src/chunking/SemanticSplitter.ts`：语义分片
4. `src/indexer/index.ts`：跨库写入与事务补偿
5. `src/search/SearchService.ts`：搜索主流程
6. `src/search/GraphExpander.ts`：上下文扩展
7. `src/search/ContextPacker.ts`：上下文打包
8. `src/mcp/server.ts` 与 `src/mcp/tools/*`：MCP 工具层
