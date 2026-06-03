# Development Setup

This page explains how to develop the ContextWeaver source project locally.

## Requirements

- Node.js >= 20
- pnpm
- Available Embedding and Rerank APIs

The source project uses TypeScript ESM, tsup for bundling, and vitest for tests.

## Install dependencies

```bash
cd ~/mcp/ContextWeaver
pnpm install
```

## Build

```bash
pnpm build
```

The build entrypoint is `src/index.ts`, and output goes to `dist/`.

## Watch development

```bash
pnpm dev
```

This runs tsup in watch mode and is useful when iterating on CLI behavior.

## Run the CLI locally

After building, run:

```bash
node dist/index.js --help
node dist/index.js init
node dist/index.js index /path/to/project
node dist/index.js search --information-request "..."
```

You can also use the globally installed package commands:

```bash
contextweaver --help
cw --help
```

## Configuration file

Run:

```bash
contextweaver init
```

It creates:

```text
~/.contextweaver/.env
```

Configuration loading is implemented in `src/config.ts`. MCP mode keeps stderr noise low so protocol output is not polluted.

## Logs

Log files are stored at:

```text
~/.contextweaver/logs/app.YYYY-MM-DD.log
```

Enable debug logging:

```bash
LOG_LEVEL=debug contextweaver search --information-request "..."
```

## Common commands

| Command | Purpose |
|---------|---------|
| `pnpm build` | Compile TypeScript |
| `pnpm dev` | Watch-mode build |
| `pnpm lint` | Run Biome checks |
| `pnpm fmt` | Apply Biome fixes |
| `pnpm typecheck` | TypeScript type check |
| `pnpm test` | Run vitest |

## Development guidance

- Run `pnpm test` first to confirm the baseline is stable
- For search changes, add tests under `tests/search/*`
- For index consistency changes, add tests under `tests/indexer/*` or `tests/db/*`
- For real LanceDB behavior, add tests under `tests/integration/*` or `tests/vectorStore/*`
