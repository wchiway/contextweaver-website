# 数据存储模型

ContextWeaver 使用 SQLite + LanceDB 的双存储架构。

```text
~/.contextweaver/<projectId>/
├── index.db
└── vectors.lance/
```

## SQLite

SQLite 是元数据、正文和全文索引的中心。

| 表 | 作用 |
|----|------|
| `files` | 文件元数据与完整正文，`content` 是正文唯一来源 |
| `files_fts` | 文件级 FTS5 索引 |
| `chunks_fts` | chunk 级 FTS5 索引 |
| `metadata` | schema version、embedding dimensions、迁移状态、lock 等 |
| `pending_marks` | outbox，用于 mark 阶段失败后的启动重放 |
| `stats` | 索引、搜索、健康统计累计值 |

## LanceDB

LanceDB 的 `chunks` 表只保存：

- 向量
- 文件路径
- chunk index
- hash
- start/end offset
- breadcrumb
- language 等定位元数据

v1.4.0 起，LanceDB 不再保存 `display_code` 或 `vector_text`。这样可以降低索引体积，并避免正文在多处出现不一致。

## 正文唯一源

关键不变量：

```text
正文唯一来源 = SQLite files.content
```

搜索结果展示时，`ChunkContentLoader` 使用 `(path, start_index, end_index)` 从 `files.content` 切片。

不要使用 `raw_start/raw_end` 做展示切片，因为它可能包含 gap-aware 合并时的前置间隙。

## 偏移域

所有 LanceDB offset 字段都使用 UTF-16 字符域。

原因：JavaScript 字符串切片按 UTF-16 code units 工作。如果把 UTF-8 byte offset 写入元数据，多字节字符会导致切片错位。

相关模块：

- `src/chunking/SourceAdapter.ts`
- `src/chunking/SemanticSplitter.ts`
- `tests/chunking/SourceAdapter.test.ts`
- `tests/search/ChunkContentLoader.test.ts`

## 迁移状态机

LanceDB display_code 移除迁移使用三态：

| 状态 | 含义 |
|------|------|
| `pending` | 需要迁移或迁移未完成 |
| `done` | 迁移完成 |
| `aborted` | 抽样校验失败或迁移异常，Indexer 拒绝写入 |

解除 `aborted`：

```bash
contextweaver migrate --reset
```

## 跨库一致性

写入顺序：

```text
LanceDB → FTS + outbox → SQLite mark + clear outbox
```

这个顺序让系统在崩溃或部分失败后可以恢复：

- FTS 失败时可删除新写入的 LanceDB chunks
- mark 失败时可通过 `pending_marks` 重放
- hash 不匹配时下次扫描会重新索引

## 二开建议

- 增加字段时先判断它属于正文、定位元数据、统计还是迁移状态
- 正文类字段优先放 SQLite，不要放 LanceDB
- 修改 schema 时同步更新迁移测试
- 涉及跨库写入时必须设计失败补偿路径
