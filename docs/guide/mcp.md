# MCP 集成

ContextWeaver 可以作为 Model Context Protocol 服务端运行，让支持 MCP 的 AI 客户端直接检索当前代码库。

## 启动 MCP Server

```bash
contextweaver mcp
```

## 推荐流程

1. 在目标代码库中完成 `contextweaver init`。
2. 配置 `~/.contextweaver/.env`。
3. 运行 `contextweaver index` 建立初始索引。
4. 在 MCP 客户端中配置 ContextWeaver 服务端。
5. 通过语义检索、文件浏览、符号定义和引用工具获取代码上下文。

## 在客户端中配置

ContextWeaver 通过 stdio 启动，命令为 `contextweaver mcp`。下面给出两个主流客户端的接入方式。

### Codex

Codex 将 MCP 配置存放在 `config.toml` 中（默认 `~/.codex/config.toml`，也可在受信任项目中使用 `.codex/config.toml`）。

使用 CLI 添加：

```bash
codex mcp add contextweaver -- contextweaver mcp
```

或直接编辑 `config.toml`：

```toml
[mcp_servers.contextweaver]
command = "contextweaver"
args = ["mcp"]
```

添加后可在 Codex TUI 中执行 `/mcp` 查看已连接的服务端。

### Claude Code

Claude Code 通过 `claude mcp add` 命令添加 stdio 服务端，所有选项必须位于服务端名称之前，`--` 之后是启动命令：

```bash
claude mcp add contextweaver -- contextweaver mcp
```

`--scope` 可选 `local`（默认，仅当前项目私有）、`project`（写入项目根的 `.mcp.json`，可随版本控制共享）或 `user`（对所有项目可用）。项目级共享示例：

```bash
claude mcp add --scope project contextweaver -- contextweaver mcp
```

项目级配置写入 `.mcp.json`：

```json
{
  "mcpServers": {
    "contextweaver": {
      "command": "contextweaver",
      "args": ["mcp"]
    }
  }
}
```

在 Claude Code 中执行 `/mcp` 即可查看连接状态。

> 若 `contextweaver` 不在 `PATH` 中，请将 `command` 替换为可执行文件的完整路径（可用 `which contextweaver` 获取）。

## MCP 工具能力

- 语义代码检索
- 已索引文件列表
- 符号定义查询
- 符号引用查询
- 索引与健康统计

首次查询时，ContextWeaver 可以自动触发索引；后续查询会复用本地 SQLite 与 LanceDB 索引。
