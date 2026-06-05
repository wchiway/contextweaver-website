# 测试指南

ContextWeaver 使用 vitest。测试覆盖单元测试、跨模块测试和真实 LanceDB 集成测试。

## 运行全部测试

```bash
pnpm test
```

## 类型检查与 lint

```bash
pnpm typecheck
pnpm lint
```

格式化：

```bash
pnpm fmt
```

## 测试目录结构

| 目录 | 覆盖内容 |
|------|----------|
| `tests/chunking/` | SourceAdapter、AST 分片、新语言支持 |
| `tests/cli/` | CLI mirror commands |
| `tests/db/` | schema migration、pending marks、advisory lock、index version |
| `tests/indexer/` | 跨库事务补偿、GC、aborted guard |
| `tests/integration/` | 真实 LanceDB 端到端场景 |
| `tests/mcp/` | MCP 工具 handler 与注册 |
| `tests/scanner/` | scanner、watcher、index version |
| `tests/search/` | FTS、SearchService、QueryCache、ContextPacker、配置加载 |
| `tests/stats/` | 统计聚合与诊断 |
| `tests/vectorStore/` | chunk_id 去重、抽样校验 |

## 写测试的建议

### 搜索逻辑

修改 `SearchService` 时，应覆盖：

- cache hit / miss
- vector 与 lexical 融合
- rerank 输入截断
- Smart TopK 边界
- stats 记录

### 索引一致性

修改 `Indexer`、`Database` 或 `VectorStore` 时，应覆盖失败补偿：

| 场景 | 应验证 |
|------|--------|
| LanceDB 写入失败 | SQLite mark 不应错误更新 |
| FTS 写入失败 | LanceDB 新 chunks 应回滚 |
| mark 失败 | `pending_marks` 应保留并可 replay |
| migration aborted | Indexer 应拒绝写入 |

### AST 与 offset

修改 `SemanticSplitter` 或 `SourceAdapter` 时，必须测试多字节字符：

- 中文
- emoji
- 混合换行
- byte offset 与 UTF-16 char offset 转换

### MCP 工具

新增 MCP 工具时，建议把核心逻辑做成 handler 函数，并单测 handler。CLI 镜像只负责参数解析和输出。

## 集成测试注意事项

真实 LanceDB 测试可能涉及本地文件系统状态。测试应该使用临时目录，避免污染用户真实 `~/.contextweaver` 数据。

## 完成任务前建议执行

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

如果只改文档站，应在 `contextweaver-website` 中执行：

```bash
pnpm build
```
