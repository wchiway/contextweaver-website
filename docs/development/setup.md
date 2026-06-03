# 开发环境

本页说明如何在本地开发 ContextWeaver 源项目。

## 环境要求

- Node.js >= 20
- pnpm
- 可用的 Embedding API 与 Rerank API

源项目使用 TypeScript ESM、tsup 打包、vitest 测试。

## 安装依赖

```bash
cd ~/mcp/ContextWeaver
pnpm install
```

## 构建

```bash
pnpm build
```

构建入口是 `src/index.ts`，输出到 `dist/`。

## Watch 开发

```bash
pnpm dev
```

这会以 watch 模式运行 tsup，适合边改边验证 CLI。

## 本地运行 CLI

构建后可以直接运行：

```bash
node dist/index.js --help
node dist/index.js init
node dist/index.js index /path/to/project
node dist/index.js search --information-request "..."
```

也可以通过 package bin 使用全局安装后的命令：

```bash
contextweaver --help
cw --help
```

## 配置文件

运行：

```bash
contextweaver init
```

会创建：

```text
~/.contextweaver/.env
```

开发环境中，配置加载逻辑在 `src/config.ts`。MCP 模式会减少 stderr 噪声，避免污染协议输出。

## 日志

日志文件位置：

```text
~/.contextweaver/logs/app.YYYY-MM-DD.log
```

调试时可设置：

```bash
LOG_LEVEL=debug contextweaver search --information-request "..."
```

## 常用命令

| 命令 | 作用 |
|------|------|
| `pnpm build` | 编译 TypeScript |
| `pnpm dev` | watch 模式构建 |
| `pnpm lint` | Biome 检查 |
| `pnpm fmt` | Biome 自动修复 |
| `pnpm typecheck` | TypeScript 类型检查 |
| `pnpm test` | 运行 vitest |

## 二开建议

- 先用 `pnpm test` 确认基线稳定
- 修改搜索流程时优先加 `tests/search/*`
- 修改索引一致性时优先加 `tests/indexer/*` 或 `tests/db/*`
- 修改真实 LanceDB 行为时加 `tests/integration/*` 或 `tests/vectorStore/*`
