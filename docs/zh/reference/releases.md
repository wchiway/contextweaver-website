# 发布记录

本页汇总 ContextWeaver 从 `v1.0.0` 基线开始的更新日志与 GitHub 链接。`v1.0.0` 对应提交 `da79f2931157aa06b08aab99aaa4d43bcfa43f66`，仓库中未发现同名 Git tag 或 GitHub Release；`v1.4.0` 有 Git tag，但未发现 GitHub Release。预发布版本只创建 GitHub pre-release 和本地测试 tarball，不发布到 npm。

## 版本索引

| 版本 | 类型 | 发布时间 | 链接 | 变更范围 |
| --- | --- | --- | --- | --- |
| `v1.5.3-beta.0` | Beta 预发布 | 2026-06-05 | [GitHub Release](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.3-beta.0) | [v1.5.3-alpha.0...v1.5.3-beta.0](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.3-alpha.0...v1.5.3-beta.0) |
| `v1.5.3-alpha.0` | Alpha 预发布 | 2026-06-05 | [GitHub Release](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.3-alpha.0) | [v1.5.2...v1.5.3-alpha.0](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.2...v1.5.3-alpha.0) |
| `v1.5.2` | 稳定版 | 2026-06-03 | [GitHub Release](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.2) | [v1.5.1...v1.5.2](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.1...v1.5.2) |
| `v1.5.1` | 稳定版 | 2026-06-03 | [GitHub Release](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.1) | [v1.5.0...v1.5.1](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.0...v1.5.1) |
| `v1.5.0` | 稳定版 | 2026-06-02 | [GitHub Release](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.0) | [v1.4.0...v1.5.0](https://github.com/wchiway/contextweaver-mcp/compare/v1.4.0...v1.5.0) |
| `v1.4.0` | 稳定版 tag | 2026-05-19 | [Git tag](https://github.com/wchiway/contextweaver-mcp/tree/v1.4.0) | [v1.0.0 commit...v1.4.0](https://github.com/wchiway/contextweaver-mcp/compare/da79f2931157aa06b08aab99aaa4d43bcfa43f66...v1.4.0) |
| `v1.0.0` | 基线提交 | 2026-03-13 | [Commit](https://github.com/wchiway/contextweaver-mcp/commit/da79f2931157aa06b08aab99aaa4d43bcfa43f66) | [v0.0.7...v1.0.0 commit](https://github.com/wchiway/contextweaver-mcp/compare/v0.0.7...da79f2931157aa06b08aab99aaa4d43bcfa43f66) |

## v1.5.3-beta.0

[Release 页面](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.3-beta.0) · [完整变更](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.3-alpha.0...v1.5.3-beta.0)

### 主要更新

- 新增解析增强层：保留 Tree-sitter 作为主解析路径，同时加入 `ctags` fallback 符号抽取和默认关闭的 LSP enrichment 框架。
- 新增 SQLite `semantic_symbols` 与 `semantic_edges` 元数据表，用于保存 fallback symbols 和未来 LSP 语义边。
- 正式 release workflow 接入 DeepSeek 英文 changelog 生成，失败时回退到原始提交列表。
- prerelease workflow 构建本地 npm tarball，并把 tarball 附加到 GitHub pre-release。

### 测试与安装

该版本不会发布到 npm。请从 Release 页面下载 `.tgz` 附件后本地安装：

```bash
npm install -g ./chiway-contextweaver-1.5.3-beta.0.tgz
```

## v1.5.3-alpha.0

[Release 页面](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.3-alpha.0) · [完整变更](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.2...v1.5.3-alpha.0)

### 主要更新

- 新增 `contextweaver update` 命令。
- 新增 vector manifest 一致性保护：SQLite 作为向量 readiness 的权威状态，LanceDB 作为派生向量索引。
- 搜索与图扩展只信任 SQLite 中 `ready` 且 hash 匹配的向量文件，降低 SQLite/LanceDB 双写不一致风险。

### 测试与安装

该版本不会发布到 npm。请从 Release 页面下载 `.tgz` 附件后本地安装：

```bash
npm install -g ./chiway-contextweaver-1.5.3-alpha.0.tgz
```

## v1.5.2

[Release 页面](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.2) · [完整变更](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.1...v1.5.2)

### 主要更新

- 新增 codebase retrieval 的检索控制参数。
- 分离语义检索查询和词法检索查询。
- 新增结构化 codebase retrieval 输出。
- 新增确定性的 deep query decomposition。
- 扩展图扩展能力：支持 reverse imports 与 call-sites。
- 暴露低置信度检索处理策略。
- 在上下文片段中保留 retrieval provenance。
- 复用搜索服务，减少 MCP 调用之间的重复初始化成本。

### 安装

```bash
npm install -g @chiway/contextweaver@1.5.2
# 或
pnpm add -g @chiway/contextweaver@1.5.2
```

## v1.5.1

[Release 页面](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.1) · [完整变更](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.0...v1.5.1)

### 主要更新

- 更新 README，补充 v1.4.0 后的数据架构与迁移说明。
- 修正包名与项目元数据为 `@chiway/contextweaver` / `wchiway/contextweaver-mcp`。
- 新增 CI 门禁：lint、typecheck、test、build。
- 修复构建脚本中不存在的 MCP 入口引用。
- MCP server 版本改为从 `package.json` 动态读取。
- 清理未使用字段，将 lint 升级为硬门禁。
- 修正 release workflow 中旧包名导致的重复发布保护和安装命令问题。

### 安装

```bash
npm install -g @chiway/contextweaver@1.5.1
# 或
pnpm add -g @chiway/contextweaver@1.5.1
```

## v1.5.0

[Release 页面](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.0) · [完整变更](https://github.com/wchiway/contextweaver-mcp/compare/v1.4.0...v1.5.0)

### 主要更新

- 新增 watch 模式与可配置搜索缓存。
- 新增 stats 统计功能，支持索引、搜索、健康状态三类指标。
- 新增 4 个粒度化 MCP 工具及对应 CLI 镜像。
- 新增 Ruby、PHP、Kotlin、Swift、Lua、Shell 的 AST 语义分片支持。
- 新增 `CW_SEARCH_*` 环境变量配置说明。
- 修正 typecheck、lint 与 CI 中暴露的问题，保证测试稳定通过。
- 重写 README，补充 v1.5.0 功能并拆分中英文文档。

### 安装

```bash
npm install -g @chiway/contextweaver@1.5.0
# 或
pnpm add -g @chiway/contextweaver@1.5.0
```

## v1.4.0

[Git tag](https://github.com/wchiway/contextweaver-mcp/tree/v1.4.0) · [完整变更](https://github.com/wchiway/contextweaver-mcp/compare/da79f2931157aa06b08aab99aaa4d43bcfa43f66...v1.4.0)

### 主要更新

- 数据架构与跨库一致性重大修复。
- LanceDB `chunks` 表移除 `display_code` / `vector_text`，正文统一回查 `files.content`。
- `SemanticSplitter` 写入 metadata 前统一到 UTF-16 字符域，修复 UTF-8 文件偏移错位。
- schema version `2 → 3`：新增 `pending_marks` outbox 表，用于向量索引标记阶段失败后的重放。
- LanceDB 迁移加入 `pending` / `done` / `aborted` 状态机和跨进程 advisory lock。
- 新增 `contextweaver migrate` 与 `contextweaver migrate --reset`。
- 新增 `src/db/bootstrap.ts`，解耦 VectorStore 与 SQLite 初始化协调。
- 修复 `ChunkContentLoader` 切片基准、LanceDB crash-safe 迁移、aborted 状态写入防护、chunk_id 重复、迁移锁与 import target loader 复用等问题。
- 测试规模从 38 增至 109，并加入真实 LanceDB 端到端迁移测试。

### 安装

```bash
npm install -g @chiway/contextweaver@1.4.0
# 或
pnpm add -g @chiway/contextweaver@1.4.0
```

## v1.0.0

[基线提交](https://github.com/wchiway/contextweaver-mcp/commit/da79f2931157aa06b08aab99aaa4d43bcfa43f66) · [完整变更](https://github.com/wchiway/contextweaver-mcp/compare/v0.0.7...da79f2931157aa06b08aab99aaa4d43bcfa43f66)

### 主要更新

- 将版本提升到 `1.0.0`，作为后续 `v1.x` changelog 的基线。
- 加固 rerank 处理：容忍空响应或非 JSON 响应。
- 当 rerank 配置错误或服务不可用时，回退到未 rerank 的候选结果，避免搜索流程崩溃。
- 在进入 `1.0.0` 前移除 Zen Config 抽象，将默认配置合并到全局配置。
- 加固 lock 机制，避免无限 healing loop。

### 链接说明

仓库中未发现 `v1.0.0` 同名 Git tag 或 GitHub Release；本条以提交 `da79f2931157aa06b08aab99aaa4d43bcfa43f66` 作为 `v1.0.0` 基线。
