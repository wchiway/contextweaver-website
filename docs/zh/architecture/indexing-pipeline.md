# 索引流水线

索引流水线把代码库转换为 SQLite 元数据/全文索引和 LanceDB 向量索引。

```text
Bootstrap → Crawler → Processor → SemanticSplitter → Indexer → LanceDB/SQLite
```

## 0. Bootstrap

入口在 `src/db/bootstrap.ts`，由 `SearchService.init()` 和 `Indexer.indexFiles()` 幂等调用。

Bootstrap 负责：

- 重放 `pending_marks`
- 执行 LanceDB schema 迁移
- 处理 `display_code/vector_text` 移除后的兼容迁移
- 使用 advisory lock 防止多进程同时迁移

如果迁移进入 `aborted` 状态，Indexer 会拒绝写入。用户需要执行：

```bash
contextweaver migrate --reset
```

## 1. Crawler

`src/scanner/crawler.ts` 遍历文件系统。过滤规则来自：

- 内置忽略列表：`node_modules`、`.git`、构建产物、lock 文件等
- 用户配置：`IGNORE_PATTERNS`

目标是减少低语义密度文件带来的 token 和索引成本。

## 2. Processor

`src/scanner/processor.ts` 负责：

- 读取文件内容
- 检测编码
- 识别语言
- 计算内容 hash
- 生成 `ProcessResult`

增量索引依赖 hash 判断文件是否变化。

## 3. SemanticSplitter

`src/chunking/SemanticSplitter.ts` 负责把文件切成 chunks。

优先路径：

```text
语言识别 → Tree-sitter ParserPool → AST 语义节点 → chunk metadata
```

无法 AST 解析的语言走 fallback 行分片。所有写入 LanceDB 的偏移会通过 `SourceAdapter.toCharOffset` 归一到 UTF-16 字符域。

## 4. 批量 Embedding

`src/indexer/index.ts` 的 `batchIndex()` 按批处理文件，避免一次性把所有 chunk 与 embedding 放入内存。

核心策略：

- 每批收集文本
- 调用 Embedding API
- 写入 LanceDB
- 写入 FTS
- 更新 SQLite mark
- 批次间释放中间对象

## 5. 跨库伪事务

写入顺序是关键不变量：

```text
LanceDB → FTS + outbox → SQLite mark + clear outbox
```

失败补偿策略：

| 失败阶段 | 处理方式 |
|----------|----------|
| LanceDB 写入失败 | 清理对应 `vector_index_hash`，下次重试 |
| FTS 写入失败 | 回滚 LanceDB 新 hash chunks，保留旧版本 |
| SQLite mark 失败 | 保留 outbox，下次启动 replay |

## 6. 垃圾清理

索引末尾会清理 LanceDB 孤儿 chunks。GC 有时间预算，避免长时间阻塞正常索引流程。

## 开发注意事项

- 不要把正文重新写回 LanceDB；正文唯一来源是 `files.content`
- 写入 offset 前必须保持 UTF-16 字符域
- 新增写入阶段时要考虑跨库失败补偿
- 修改 hash 或 mark 逻辑时要同步检查 `pending_marks` 与 index version 测试
