# 快速开始

## 环境要求

- Node.js >= 20
- pnpm 或 npm
- Embedding 与 Rerank API 配置

## 安装

```bash
npm install -g @chiway/contextweaver
```

也可以使用 pnpm：

```bash
pnpm add -g @chiway/contextweaver
```

## 初始化配置

```bash
contextweaver init
```

简写命令：

```bash
cw init
```

命令会创建 `~/.contextweaver/.env`。编辑该文件并填入 Embedding 与 Rerank 配置：

```bash
EMBEDDINGS_API_KEY=your-api-key-here
EMBEDDINGS_BASE_URL=https://api.siliconflow.cn/v1/embeddings
EMBEDDINGS_MODEL=BAAI/bge-m3
EMBEDDINGS_DIMENSIONS=1024

RERANK_API_KEY=your-api-key-here
RERANK_BASE_URL=https://api.siliconflow.cn/v1/rerank
RERANK_MODEL=BAAI/bge-reranker-v2-m3
```

## 索引代码库

在代码库根目录执行：

```bash
contextweaver index
```

指定路径：

```bash
contextweaver index /path/to/your/project
```

强制重新索引：

```bash
contextweaver index --force
```

## 搜索代码

```bash
cw search --information-request "用户认证流程是如何实现的？"
```

携带精确术语：

```bash
cw search \
  --information-request "数据库连接逻辑" \
  --technical-terms "DatabasePool,Connection"
```
