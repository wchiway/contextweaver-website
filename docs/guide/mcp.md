# MCP 集成

ContextWeaver 可以作为 Model Context Protocol 服务端运行，让支持 MCP 的 AI 客户端直接检索当前代码库。

## 启动 MCP Server

```bash
contextweaver mcp
```

## 推荐流程

1. 在目标代码库中完成 `contextweaver init`。
2. 配置 `~/.contextweaver/.env`。
3. 运行 `contextweaver index` 建立初始索引。
4. 在 MCP 客户端中配置 ContextWeaver 服务端。
5. 通过语义检索、文件浏览、符号定义和引用工具获取代码上下文。

## MCP 工具能力

- 语义代码检索
- 已索引文件列表
- 符号定义查询
- 符号引用查询
- 索引与健康统计

首次查询时，ContextWeaver 可以自动触发索引；后续查询会复用本地 SQLite 与 LanceDB 索引。
