# 搜索流水线

搜索流水线把自然语言查询转换为可交给 LLM 的上下文包。

```text
Query → Cache → Vector + FTS Recall → RRF → Rerank → Smart TopK → Graph Expand → Context Pack
```

## 1. 查询入口

主入口是 `src/search/SearchService.ts` 的 `buildContextPack(query)`。

它返回 `ContextPack`，包含：

- `query`：原始查询
- `seeds`：Rerank + Smart TopK 后的核心命中
- `expanded`：上下文扩展得到的补充 chunks
- `files`：按文件组织后的最终上下文
- `debug`：权重和各阶段耗时

## 2. QueryCache

缓存键由以下部分组成：

- 归一化 query
- projectId
- index version
- search config fingerprint

因此索引更新或搜索配置变化会自动使缓存失效。

## 3. 混合召回

ContextWeaver 同时使用两类召回：

| 召回 | 数据源 | 适合场景 |
|------|--------|----------|
| Vector Retrieval | LanceDB | 自然语言意图、语义相似代码 |
| Lexical/FTS Retrieval | SQLite FTS5 | 函数名、类名、路径、技术术语 |

FTS 既有文件级索引，也有 chunk 级索引。搜索实现位于 `src/search/fts.ts`。

## 4. RRF 融合

RRF 公式：

```text
score = Σ weight_i / (k + rank_i)
```

相关配置：

- `wVec`：向量权重
- `wLex`：词法权重
- `rrfK0`：平滑常数
- `fusedTopM`：融合后送入 rerank 的数量

## 5. Rerank

Rerank 使用外部 Reranker API。相关代码在：

- `src/api/reranker.ts`
- `SearchService.rerank()`

Rerank 文本会做长度控制，避免把过长 chunk 直接送入 reranker。

## 6. Smart TopK

Smart TopK 用于避免固定 TopK 在极端分数分布下返回太多噪声。

它结合：

- Top1 分数比例阈值
- 绝对分数下限
- Top1 相对降幅保护
- Safe Harbor 最小数量
- 最大 hard limit

## 7. GraphExpander

扩展分三阶段：

| 阶段 | 作用 |
|------|------|
| E1 Neighbor | 同文件前后相邻 chunks |
| E2 Breadcrumb | 同一类/函数/模块层级下的相关 chunks |
| E3 Import | 根据 import 关系扩展跨文件依赖 |

E3 使用 `src/search/resolvers/` 下的多语言 ImportResolver。

## 8. ContextPacker

`src/search/ContextPacker.ts` 负责：

- 按文件组织 chunks
- 合并相邻片段
- 限制每文件非连续段数量
- 控制总字符预算
- 输出适合 LLM 阅读的上下文包

## 调参入口

搜索参数定义在：

- `src/search/config.ts`
- `src/search/loadConfig.ts`
- `src/search/types.ts`

环境变量入口见 [配置项](/reference/configuration)。
