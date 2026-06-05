# 项目结构

ContextWeaver 源码位于 `src/`，测试位于 `tests/`。

```text
src/
├── index.ts
├── config.ts
├── defaultEnv.ts
├── api/
├── chunking/
├── cli/
├── db/
├── indexer/
├── mcp/
├── scanner/
├── search/
├── stats/
├── utils/
└── vectorStore/
```

## 顶层入口

| 文件 | 说明 |
|------|------|
| `src/index.ts` | CLI 入口，注册所有命令 |
| `src/config.ts` | 环境变量、API 配置、忽略规则 |
| `src/defaultEnv.ts` | `contextweaver init` 生成的默认 `.env` 模板 |

## api

```text
src/api/
├── embedding.ts
└── reranker.ts
```

负责外部模型 API 调用。这里处理请求格式、错误响应、重试和兼容不同服务商返回结构。

## scanner

```text
src/scanner/
├── crawler.ts
├── filter.ts
├── hash.ts
├── index.ts
├── language.ts
├── processor.ts
└── watcher.ts
```

负责从文件系统发现文件、过滤、读取、识别语言、计算 hash，以及 watch 模式增量扫描。

## chunking

```text
src/chunking/
├── LanguageSpec.ts
├── ParserPool.ts
├── SemanticSplitter.ts
├── SourceAdapter.ts
└── types.ts
```

负责 Tree-sitter AST 分片、语言规范、parser 复用和 offset 归一。

## indexer / db / vectorStore

```text
src/indexer/index.ts
src/db/index.ts
src/db/bootstrap.ts
src/vectorStore/index.ts
```

这是索引写入核心：

- `indexer` 编排 embedding 与跨库写入
- `db` 管理 SQLite schema、FTS、metadata、stats、pending marks
- `bootstrap` 处理迁移和 pending marks 重放
- `vectorStore` 封装 LanceDB 纯向量操作

## search

```text
src/search/
├── SearchService.ts
├── GraphExpander.ts
├── ContextPacker.ts
├── ChunkContentLoader.ts
├── QueryCache.ts
├── fts.ts
├── config.ts
├── loadConfig.ts
├── resolvers/
└── types.ts
```

搜索层包含混合召回、RRF、Rerank、Smart TopK、上下文扩展和 token 打包。

## mcp

```text
src/mcp/
├── server.ts
├── main.ts
└── tools/
```

MCP 工具在 `src/mcp/tools/` 中实现，每个工具通常有独立 handler，便于 CLI 镜像复用。

## tests

```text
tests/
├── chunking/
├── cli/
├── db/
├── indexer/
├── integration/
├── mcp/
├── scanner/
├── search/
├── stats/
└── vectorStore/
```

测试目录和源码模块基本对应。新增功能时建议把测试放到同名模块目录。
