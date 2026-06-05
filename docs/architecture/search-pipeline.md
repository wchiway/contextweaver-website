# Search Pipeline

The search pipeline turns a natural language query into a context package that can be passed to an LLM.

```text
Query → Cache → Vector + FTS Recall → RRF → Rerank → Smart TopK → Graph Expand → Context Pack
```

## 1. Query entrypoint

The main entrypoint is `buildContextPack(query)` in `src/search/SearchService.ts`.

It returns a `ContextPack` containing:

- `query`: original query
- `seeds`: core hits after rerank and Smart TopK
- `expanded`: additional chunks from context expansion
- `files`: final context grouped by file
- `debug`: weights and per-stage timings

## 2. QueryCache

The cache key includes:

- normalized query
- projectId
- index version
- search config fingerprint

This means an index update or search configuration change automatically invalidates cached results.

## 3. Hybrid recall

ContextWeaver uses two recall channels:

| Recall | Data source | Best for |
|--------|-------------|----------|
| Vector Retrieval | LanceDB | Natural language intent and semantically related code |
| Lexical/FTS Retrieval | SQLite FTS5 | Function names, class names, paths, and technical terms |

FTS includes both file-level and chunk-level indexes. The implementation lives in `src/search/fts.ts`.

## 4. RRF fusion

RRF formula:

```text
score = Σ weight_i / (k + rank_i)
```

Relevant config:

- `wVec`: vector weight
- `wLex`: lexical weight
- `rrfK0`: smoothing constant
- `fusedTopM`: number of fused candidates sent to rerank

## 5. Rerank

Rerank uses an external Reranker API. Related code:

- `src/api/reranker.ts`
- `SearchService.rerank()`

Rerank input text is length-limited so oversized chunks are not sent directly to the reranker.

## 6. Smart TopK

Smart TopK avoids returning too much noise when a fixed TopK does not match the score distribution.

It combines:

- score ratio relative to Top1
- absolute score floor
- maximum absolute drop from Top1
- Safe Harbor minimum count
- hard maximum count

## 7. GraphExpander

Expansion has three stages:

| Stage | Purpose |
|-------|---------|
| E1 Neighbor | Adjacent chunks in the same file |
| E2 Breadcrumb | Related chunks under the same class/function/module hierarchy |
| E3 Import | Cross-file dependencies through import relationships |

E3 uses multi-language `ImportResolver`s under `src/search/resolvers/`.

## 8. ContextPacker

`src/search/ContextPacker.ts` handles:

- grouping chunks by file
- merging adjacent snippets
- limiting non-contiguous segments per file
- enforcing total character budget
- producing a final LLM-readable context package

## Tuning entrypoints

Search parameters are defined in:

- `src/search/config.ts`
- `src/search/loadConfig.ts`
- `src/search/types.ts`

Environment variables are documented in [Configuration](/reference/configuration).
