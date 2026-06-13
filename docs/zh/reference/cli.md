# CLI 命令

## 初始化

```bash
contextweaver init
cw init
```

创建或更新 `~/.contextweaver/.env` 配置文件。

## 配置管理

```bash
contextweaver config list
contextweaver config set <key> <value>
contextweaver config validate
contextweaver config wizard
```

管理环境变量配置：

- **`config list`**（别名：`ls`）- 查看当前配置，敏感值自动掩码
- **`config set`** - 设置单个环境变量，带验证
- **`config validate`** - 验证所有必需配置是否有效
- **`config wizard`** - 交互式配置向导

**示例：**

```bash
# 查看当前配置
contextweaver config list

# 设置 Embedding 并发数
contextweaver config set EMBEDDINGS_MAX_CONCURRENCY 20

# 设置向量维度
contextweaver config set EMBEDDINGS_DIMENSIONS 2048

# 设置搜索参数
contextweaver config set CW_SEARCH_WVEC 0.6

# 验证配置
contextweaver config validate

# 交互式向导
contextweaver config wizard
```

**可用的配置键：**

- **Embedding**：`EMBEDDINGS_API_KEY`、`EMBEDDINGS_BASE_URL`、`EMBEDDINGS_MODEL`、`EMBEDDINGS_MAX_CONCURRENCY`、`EMBEDDINGS_DIMENSIONS`
- **Reranker**：`RERANK_API_KEY`、`RERANK_BASE_URL`、`RERANK_MODEL`、`RERANK_TOP_N`
- **搜索参数**：`CW_SEARCH_WVEC`、`CW_SEARCH_WLEX`、`CW_SEARCH_RERANK_TOP_N`、`CW_SEARCH_MAX_TOTAL_CHARS`、`CW_SEARCH_VECTOR_TOP_K`、`CW_SEARCH_SMART_MAX_K`、`CW_SEARCH_IMPORT_FILES_PER_SEED`
- **其他**：`IGNORE_PATTERNS`

## 索引

```bash
contextweaver index [path]
contextweaver index --force
```

索引代码库，生成 SQLite 元数据、FTS 索引与 LanceDB 向量索引.

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
