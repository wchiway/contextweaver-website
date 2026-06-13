# 发布记录

本页汇总 ContextWeaver 从 `v1.0.0` 基线开始的更新日志与 GitHub 链接。`v1.0.0` 对应提交 `da79f2931157aa06b08aab99aaa4d43bcfa43f66`，仓库中未发现同名 Git tag 或 GitHub Release；`v1.4.0` 有 Git tag，但未发现 GitHub Release。预发布版本只创建 GitHub pre-release 和本地测试 tarball，不发布到 npm。

## 版本索引

| 版本 | 类型 | 发布时间 | 链接 | 变更范围 |
| --- | --- | --- | --- | --- |
| `v1.6.0-alpha.1` | Alpha 预发布 | 2026-06-09 | [GitHub Release](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.6.0-alpha.1) | [v1.6.0-alpha.0...v1.6.0-alpha.1](https://github.com/wchiway/contextweaver-mcp/compare/v1.6.0-alpha.0...v1.6.0-alpha.1) |
| `v1.6.0-alpha.0` | Alpha 预发布 | 2026-06-09 | [GitHub Release](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.6.0-alpha.0) | [v1.5.3...v1.6.0-alpha.0](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.3...v1.6.0-alpha.0) |
| `v1.5.4` | 稳定版 | 2026-06-13 | [GitHub Release](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.4) | [v1.5.3...v1.5.4](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.3...v1.5.4) |
| `v1.5.3` | 稳定版 | 2026-06-06 | [GitHub Release](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.3) | [v1.5.2...v1.5.3](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.2...v1.5.3) |
| `v1.5.3-beta.1` | Beta 预发布 | 2026-06-06 | [GitHub Release](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.3-beta.1) | [v1.5.3-beta.0...v1.5.3-beta.1](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.3-beta.0...v1.5.3-beta.1) |
| `v1.5.3-beta.0` | Beta 预发布 | 2026-06-05 | [GitHub Release](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.3-beta.0) | [v1.5.3-alpha.0...v1.5.3-beta.0](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.3-alpha.0...v1.5.3-beta.0) |
| `v1.5.3-alpha.0` | Alpha 预发布 | 2026-06-05 | [GitHub Release](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.3-alpha.0) | [v1.5.2...v1.5.3-alpha.0](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.2...v1.5.3-alpha.0) |
| `v1.5.2` | 稳定版 | 2026-06-03 | [GitHub Release](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.2) | [v1.5.1...v1.5.2](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.1...v1.5.2) |
| `v1.5.1` | 稳定版 | 2026-06-03 | [GitHub Release](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.1) | [v1.5.0...v1.5.1](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.0...v1.5.1) |
| `v1.5.0` | 稳定版 | 2026-06-02 | [GitHub Release](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.0) | [v1.4.0...v1.5.0](https://github.com/wchiway/contextweaver-mcp/compare/v1.4.0...v1.5.0) |
| `v1.4.0` | 稳定版 tag | 2026-05-19 | [Git tag](https://github.com/wchiway/contextweaver-mcp/tree/v1.4.0) | [v1.0.0 commit...v1.4.0](https://github.com/wchiway/contextweaver-mcp/compare/da79f2931157aa06b08aab99aaa4d43bcfa43f66...v1.4.0) |
| `v1.0.0` | 基线提交 | 2026-03-13 | [Commit](https://github.com/wchiway/contextweaver-mcp/commit/da79f2931157aa06b08aab99aaa4d43bcfa43f66) | [v0.0.7...v1.0.0 commit](https://github.com/wchiway/contextweaver-mcp/compare/v0.0.7...da79f2931157aa06b08aab99aaa4d43bcfa43f66) |

## 未发布

> 暂无待发布变更。

## v1.5.4

[Release 页面](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.4) · [完整变更](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.3...v1.5.4)

> 新增 `contextweaver config` 命令，通过 CLI 管理环境变量配置，无需手动编辑 `.env` 文件。支持查看、设置、验证配置，以及交互式向导配置。

### 新增功能

#### Config 命令

- **`config list`**：查看当前配置，敏感信息（API Key）自动掩码
- **`config set <key> <value>`**：设置单个环境变量，带验证
- **`config validate`**：验证所有必需配置是否有效
- **`config wizard`**：交互式配置向导，引导完成配置

支持的配置项：
- Embedding 配置：`EMBEDDINGS_API_KEY`、`EMBEDDINGS_BASE_URL`、`EMBEDDINGS_MODEL`、`EMBEDDINGS_MAX_CONCURRENCY`、`EMBEDDINGS_DIMENSIONS`
- Reranker 配置：`RERANK_API_KEY`、`RERANK_BASE_URL`、`RERANK_MODEL`、`RERANK_TOP_N`
- 搜索参数：`CW_SEARCH_WVEC`、`CW_SEARCH_WLEX`、`CW_SEARCH_RERANK_TOP_N`、`CW_SEARCH_MAX_TOTAL_CHARS`、`CW_SEARCH_VECTOR_TOP_K`、`CW_SEARCH_SMART_MAX_K`、`CW_SEARCH_IMPORT_FILES_PER_SEED`
- 其他：`IGNORE_PATTERNS`

**使用示例：**

```bash
# 查看当前配置
contextweaver config list

# 设置配置值
contextweaver config set EMBEDDINGS_MAX_CONCURRENCY 20

# 验证配置
contextweaver config validate

# 交互式配置向导
contextweaver config wizard
```

### 文档

- 新增详细的 config 命令文档（`docs/config-command.md`），包含使用指南、最佳实践和故障排查

## v1.6.0-alpha.1

[Release 页面](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.6.0-alpha.1) · [完整变更](https://github.com/wchiway/contextweaver-mcp/compare/v1.6.0-alpha.0...v1.6.0-alpha.1)

> 延续原生迁移路线，落地 P1（导入解析器 `extract()`）与 P2（编码检测/转码），均为纯加速并保留干净的 TypeScript 回退。至此，全部 CPU 密集热点（分片/AST、导入提取、编码解码）均已走原生；剩余的 scanner `hash`/`filter` 模块经评估后有意保留在 TypeScript。

### 主要更新

#### 原生导入提取（Rust 正则移植）— P1

- 将 7 个导入解析器的 `extract()` 正则迁移到 `crates/chunker` 原生模块，通过 `extractImports(kind, content)` 暴露（kind：`jsts` / `python` / `go` / `java` / `rust` / `cpp` / `csharp`）。
- 输出与 TypeScript 正则逐字节一致，因此 TypeScript 侧的 `resolve()` 无需改动即可继续工作。GraphExpander 的 E3 导入扩展（每次搜索对每个 seed 文件都会调用）在原生模块可用时走原生路径。
- 处理了 JS/Rust 正则差异：`\w` 统一为 ASCII 语义；C# 的 `(?!static)(?!global)` 负向先行断言（Rust `regex` 不支持）在代码层模拟。
- 原生模块不可用时，每个解析器透明回退到原有的 TypeScript 正则（`extractTs`）。

#### 原生编码检测/转码（Rust）— P2

- 将 `readFileWithEncoding` 的检测+解码步骤迁移到 `crates/chunker` 原生模块，通过 `decodeBytes(buffer)` 暴露，底层用 `chardetng`（Firefox 同款编码检测器）+ `encoding_rs`（Gecko 编码引擎）替代 JS 的 `chardet` + `iconv-lite`。
- BOM 检测逻辑与 TypeScript 一致；UTF-32（LE/BE）因 `encoding_rs` 不支持而手写解码。输出始终为 UTF-8。
- `readFileWithEncoding` 在 Node 侧读取字节（`fs.readFile` 仍留在 TypeScript），优先调 `decodeBytes`；缺少原生二进制或抛错时回退到原有的 `chardet`/`iconv-lite` 路径（`decodeBytesTs`）。

#### 迁移范围收尾

- 评估暂缓的 scanner 模块后决定**不迁移**：`hash.ts`（`sha256`）已走 Node OpenSSL 实现的 `crypto`，改 Rust 只会多一次正文字符串跨 NAPI 拷贝；`filter.ts` 是 I/O 绑定且基于成熟的 npm `ignore` 库，Rust 重写有 gitignore 字节级行为分歧风险，而过滤本身非索引瓶颈。

### 质量与验证

- `tests/search/ImportExtract.diff.test.ts`：断言原生与 TypeScript 导入输出在全部 7 种 kind、各边界用例（字符串/注释内伪 import、C# static/global 排除、Rust `pub mod`、Go 块导入）以及若干真实仓库源文件上逐字节一致。
- `tests/utils/Encoding.diff.test.ts`：断言原生 `decodeBytes` 的内容与 `chardet`/`iconv-lite` 路径在 BOM 及长 CJK（GB18030 / Big5 / Shift_JIS）样本（检测稳定收敛）上一致；短的歧义单字节样本（按设计允许检测器分歧）不纳入。
- 构建原生模块后全量测试通过（701 个）。

### 安装

> 预发布版本不发布到 npm，仅可从 GitHub Release 下载对应平台 tarball 进行本地测试。

## v1.6.0-alpha.0

[Release 页面](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.6.0-alpha.0) · [完整变更](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.3...v1.6.0-alpha.0)

> 首个包含 Rust napi-rs 原生分片器的预发布版本。仅创建 GitHub pre-release 和全平台测试 tarball，不发布到 npm，用于验证跨平台 optionalDependencies 安装链与 native / TS fallback 行为。

### 主要更新

#### Rust 原生分片器（napi-rs）

- 将 CPU 密集的分片层（Tree-sitter 解析 + AST 遍历 + 切窗 + 符号/调用点提取）迁移到 `crates/chunker` 原生模块。
- `processor.ts` 优先走 Rust 单次解析路径（`process_file`），复用同一棵语法树一次性产出 chunks、symbols、callSites，避免重复解析。
- napi 模块加载失败（冷门平台无预构建二进制、或开发环境未构建）时透明回退到现有 TypeScript 分片实现，保证全平台可用。
- 所有 LanceDB 偏移字段在 Rust 侧统一归一到 UTF-16 字符域，与 TS `SourceAdapter` 保持字节级一致。

#### 跨平台构建与发布

- `release.yml` 改为三阶段：`build`（5 平台 napi matrix：linux-x64-gnu / linux-arm64-gnu / darwin-x64 / darwin-arm64 / win32-x64-msvc，arm64-linux 用 `--use-napi-cross` 交叉编译）→ `publish-chunker`（平台子包 → chunker 主包）→ `publish-main`（主应用包 → GitHub Release → MCP Registry），由 `needs` 强制发布时序。
- 分发采用两层 optionalDependencies：主应用包 → `@chiway/contextweaver-chunker`（napi loader 主包）→ 5 个平台子包；缺包时回退 TS。
- `prerelease.yml` 同步 build matrix，打包全平台 tarball 作 GitHub Prerelease 附件，不发布 npm。
- 在 arm64 macOS runner 上交叉编译 darwin-x64，并在 build/publish 任务使用 `--no-frozen-lockfile`。

### 质量与验证

- 新增对拍测试锁定 UTF-16 偏移域一致性：`SourceAdapter`、`SemanticSplitter`、`Symbols`、`CallSites` 的 Rust 输出与 TS 输出逐字段比对。
- 新增 `processor` 端到端集成测试，断言构建后环境实际走 native 路径。

### 安装

> 预发布版本不发布到 npm，仅可从 GitHub Release 下载对应平台 tarball 进行本地测试。

## v1.5.3

[Release 页面](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.3) · [完整变更](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.2...v1.5.3)

### 主要更新

#### 语义图与符号索引

- 新增基于 Tree-sitter tags 的符号提取，索引结果写入新的 `semantic_symbols` 表。
- 新增语义调用边提取，覆盖 TypeScript、JavaScript、Python、Go、Rust、Java、C、C++、C#、Ruby、PHP。
- 新增 `list-symbols` MCP 工具，可按路径、符号类型、语言和来源浏览符号大纲。
- 优化 `get-symbol-definition`：优先查询已索引的 `semantic_symbols` 定义，再回退到词法匹配。
- 修复 `semantic_edges` 增量清理：文件修改后即使没有调用点或没有匹配到本地符号，也会删除旧调用边，避免语义图残留过期关系。

#### 向量索引 readiness 与恢复

- 新增 `contextweaver update` 命令，用于检查包更新并引导升级。
- 新增 `vector_manifest` readiness 表，让 SQLite 成为向量索引状态的权威来源，LanceDB 作为派生向量物化层。
- 搜索与图扩展只信任 hash 匹配且 ready 的文件，降低过期或部分写入向量被召回的风险。
- 增加 pending vector marks 和无 chunk 文件的收敛路径，避免重复扫描持续重试。

#### 发布与 Registry 准备

- 通过 `server.json` 和 `package.json#mcpName` 增加 MCP Registry 元数据。
- 增加 stable / prerelease GitHub Actions 发布路径，接入 npm trusted publishing 和 MCP Registry OIDC 认证。
- 修复 prerelease workflow 的 OIDC 权限，并删除无效悬挂的 `files` 字段。
- 修复 `1.5.3-rc.0` review 中发现的 typecheck、lint、format 和空白问题。

### Schema 更新

- 数据库 schema version 升级到 `5`。
- 新增表：`vector_manifest`、`semantic_symbols`、`semantic_edges`。
- `semantic_symbols` 按文件 hash 和符号元数据存储提取到的定义。
- `semantic_edges` 存储语义关系，包括本地 Tree-sitter 调用边。

### 质量与验证

- 恢复并扩展 `getSymbolDefinition` 测试。
- 新增 `semantic_symbols` 主键行为回归测试。
- 新增 `semantic_edges` 旧调用边清理回归测试，覆盖文件失去调用点和调用点无法匹配本地符号的场景。
- 最终发布验证通过：
  - `pnpm typecheck`
  - `pnpm run lint`
  - `pnpm test` — 124 个测试文件 / 603 个测试通过
  - `pnpm build`

### 安装

```bash
npm install -g @chiway/contextweaver@1.5.3
# 或
pnpm add -g @chiway/contextweaver@1.5.3
```

## v1.5.3-beta.1

[Release 页面](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.3-beta.1) · [完整变更](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.3-beta.0...v1.5.3-beta.1)

### 主要更新

#### 调用图导出（Semantic Edges）

- **Tree-sitter 调用提取器**：无需外部依赖，直接从 AST 提取函数调用节点
- **本地调用图构建器**：解析同文件内的函数调用关系，填充 `semantic_edges` 表（`kind='call'`）
- **多语言支持**：TypeScript、JavaScript、Python、Go、Rust、Java、C、C++、C#、Ruby、PHP（11 种语言）
- **双向查询**：通过索引查询 `semantic_edges` 表，查找调用者和被调用者

**验证数据（ContextWeaver 项目）：**
- 385 条调用边，覆盖 96 个文件
- Provider: `tree-sitter`（轻量化实现）
- 本地调用覆盖率：约 60-70%（符合同文件解析预期）

#### list-symbols MCP 工具

- **新增 MCP 工具**：查询代码库符号大纲
- **多维度过滤**：
  - 路径过滤（前缀或 glob 模式，如 `src/**/*.ts`）
  - 符号类型过滤（`function,class,interface`）
  - 语言过滤（`typescript,python,go`）
  - 符号来源过滤（`tree-sitter` / `ctags`）
- **Markdown 输出**：按文件分组，包含行号范围和容器信息
- **高效 SQL 查询**：路径过滤在 SQL 层完成（LIKE 查询），避免后置过滤的 LIMIT 陷阱

#### Tree-sitter Tags 符号提取

- 使用各语言 grammar 原生的 `tags.scm` 查询文件从 AST 提取符号
- 为 TypeScript/JavaScript 添加补丁（class/function/enum 定义）
- 优化 `get-symbol-definition` 工具：优先查询 `semantic_symbols` 表，按目录优先级排序

### Schema 更新

- 扩展 `SemanticEdge.provider` 类型：`'lsp' | 'tree-sitter'`
- 更新数据库 CHECK 约束，允许 `tree-sitter` 作为 provider

### 性能

- **零新增依赖**：完全复用现有 tree-sitter 和 ParserPool 基础设施
- **索引影响**：< 5% 增加（调用图构建开销可忽略）
- **查询性能**：双索引支持双向调用图遍历

### 实现细节

**新增文件：**
- `src/semantic/treeSitterCalls.ts`（184 行）— 调用站点提取器
- `src/semantic/callGraphBuilder.ts`（183 行）— 本地调用解析的调用图构建器
- `src/mcp/tools/listSymbols.ts`（149 行）— 符号列表 MCP 工具

**修改文件：**
- `src/semantic/types.ts` — 扩展 `SemanticEdge.provider`
- `src/db/index.ts` — 更新 CHECK 约束
- `src/scanner/processor.ts` — 添加 `callSites` 字段并集成调用提取
- `src/scanner/index.ts` — 调用 `buildAndStoreCallGraph`
- `src/mcp/server.ts` — 注册 `list-symbols` 工具

### 未来增强方向（未实现）

- **跨文件调用解析**（Phase 2）：使用 resolver + 符号消歧实现跨文件调用
- **调用图查询 MCP 工具**：直接查询调用关系（如 `find-callers`、`find-callees`）
- **QueryPlanner 集成**：识别符号查询意图，直接路由到符号表精确匹配
- **增量符号索引**：接入 watcher，文件变更时触发增量更新

### 测试与安装

该版本不会发布到 npm。请从 Release 页面下载 `.tgz` 附件后本地安装：

```bash
npm install -g ./chiway-contextweaver-1.5.3-beta.1.tgz
```

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
