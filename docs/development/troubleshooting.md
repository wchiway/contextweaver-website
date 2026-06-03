# 故障排查

本页收集开发和使用 ContextWeaver 时常见问题。

## Embedding 或 Rerank API 报错

检查 `~/.contextweaver/.env`：

```bash
EMBEDDINGS_API_KEY=...
EMBEDDINGS_BASE_URL=...
EMBEDDINGS_MODEL=...
RERANK_API_KEY=...
RERANK_BASE_URL=...
RERANK_MODEL=...
```

开启 debug 日志：

```bash
LOG_LEVEL=debug contextweaver search --information-request "..."
```

日志位置：

```text
~/.contextweaver/logs/app.YYYY-MM-DD.log
```

## 迁移状态 aborted

现象：Indexer 拒绝写入，stats 或日志提示 LanceDB migration aborted。

处理：

```bash
contextweaver migrate --reset
contextweaver index /path/to/project
```

含义：清空 LanceDB 并让下次索引重建向量表。

## pending_marks 积压

`pending_marks` 表示 FTS 已写入，但 SQLite mark 阶段失败。正常情况下 bootstrap 会自动 replay。

检查：

```bash
contextweaver stats --path /path/to/project
```

如果持续积压，优先查看日志中 SQLite 写入错误。

## 搜索结果缺少上下文

可能原因：

- `CW_SEARCH_IMPORT_FILES_PER_SEED=0` 关闭了跨文件扩展
- `CW_SEARCH_MAX_TOTAL_CHARS` 太低
- import resolver 不支持当前语言或路径风格
- 文件未成功索引

可尝试：

```bash
contextweaver stats --path /path/to/project
contextweaver list-files /path/to/project --glob "src/**/*.ts"
contextweaver index /path/to/project --force
```

## 搜索太慢

检查：

- 是否第一次查询，首次可能触发索引
- Embedding/Rerank API 延迟
- `CW_SEARCH_VECTOR_TOP_K` 是否过高
- `CW_SEARCH_RERANK_TOP_N` 是否过高
- 查询缓存是否命中

查看 stats 中各阶段耗时：

```bash
contextweaver stats
```

## 多字节字符切片错位

如果展示代码出现中文或 emoji 附近错位，重点检查：

- `SourceAdapter.toCharOffset`
- `SemanticSplitter` 写入 offset 的路径
- `ChunkContentLoader` 是否仍使用 `start_index/end_index`

相关测试：

```bash
pnpm test tests/chunking/SourceAdapter.test.ts
pnpm test tests/search/ChunkContentLoader.test.ts
```

## MCP 客户端没有工具

检查 MCP 配置：

```json
{
  "mcpServers": {
    "contextweaver": {
      "command": "contextweaver",
      "args": ["mcp"]
    }
  }
}
```

如果本地没有全局命令，可以先构建并使用绝对路径或 `node dist/index.js mcp`。

## VitePress 文档站构建 warning

当前文档站使用 Vite 8 + VitePress 2 alpha。构建可能出现 `@vueuse/core` 的 `INVALID_ANNOTATION` warning，但只要最终输出 `build complete`，站点生成成功。
