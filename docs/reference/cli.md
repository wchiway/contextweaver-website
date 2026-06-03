# CLI 命令

## 初始化

```bash
contextweaver init
cw init
```

创建或更新 `~/.contextweaver/.env` 配置文件。

## 索引

```bash
contextweaver index [path]
contextweaver index --force
```

索引代码库，生成 SQLite 元数据、FTS 索引与 LanceDB 向量索引。

## 搜索

```bash
contextweaver search --information-request "你的问题"
cw search --information-request "你的问题" --technical-terms "TermA,TermB"
```

执行语义搜索，并返回经过上下文扩展与 token 打包后的结果。

## 监听

```bash
contextweaver watch
contextweaver watch /path/to/project --debounce 800
```

监听文件变化并自动执行增量索引。

## MCP Server

```bash
contextweaver mcp
```

启动 MCP 服务端。

## 结构与符号查询

```bash
contextweaver list-files --glob "src/**/*.ts" --language typescript --max-results 100
contextweaver definition SearchService --hint-path src/search
contextweaver references handleStats --exclude-definition
```

这些命令是 MCP 工具的 CLI 镜像，不需要 Embedding API 调用。

## 统计

```bash
contextweaver stats
contextweaver stats --json
```

查看索引状态、搜索指标与一致性诊断。

## 迁移

```bash
contextweaver migrate
contextweaver migrate --reset
```

查看或重置 LanceDB 迁移状态。
