# Getting Started

## Requirements

- Node.js >= 20
- pnpm or npm
- Embedding and rerank API configuration

## Installation

```bash
npm install -g @chiway/contextweaver
```

You can also install it with pnpm:

```bash
pnpm add -g @chiway/contextweaver
```

## Initialize configuration

```bash
contextweaver init
```

Short alias:

```bash
cw init
```

The command creates `~/.contextweaver/.env`. Edit it and configure your embedding and rerank providers:

```bash
EMBEDDINGS_API_KEY=your-api-key-here
EMBEDDINGS_BASE_URL=https://api.siliconflow.cn/v1/embeddings
EMBEDDINGS_MODEL=BAAI/bge-m3
EMBEDDINGS_DIMENSIONS=1024

RERANK_API_KEY=your-api-key-here
RERANK_BASE_URL=https://api.siliconflow.cn/v1/rerank
RERANK_MODEL=BAAI/bge-reranker-v2-m3
```

## Index a codebase

Run this from the target repository root:

```bash
contextweaver index
```

Index a specific path:

```bash
contextweaver index /path/to/your/project
```

Force a full re-index:

```bash
contextweaver index --force
```

## Search code

```bash
cw search --information-request "How is user authentication implemented?"
```

Use exact technical terms when needed:

```bash
cw search \
  --information-request "Database connection logic" \
  --technical-terms "DatabasePool,Connection"
```
