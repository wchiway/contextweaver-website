# 扩展 MCP 工具

ContextWeaver 的 MCP 工具位于：

```text
src/mcp/tools/
```

MCP server 注册逻辑位于：

```text
src/mcp/server.ts
src/mcp/tools/index.ts
```

## 设计原则

新增工具前先判断它属于哪一类：

| 类型 | 例子 | 是否需要 Embedding |
|------|------|-------------------|
| 语义检索 | `codebase-retrieval` | 通常需要 |
| 结构浏览 | `list-files`、符号定义、引用 | 不需要 |
| 诊断统计 | `stats` | 不需要 |

能不调用外部 API 就不要调用。结构类工具应优先使用 SQLite 元数据和 FTS。

## 推荐文件结构

新增工具建议创建独立文件：

```text
src/mcp/tools/myTool.ts
```

典型结构：

```ts
export interface MyToolInput {
  repo_path: string
}

export async function handleMyTool(input: MyToolInput) {
  // validate input
  // initialize db or search service
  // return MCP-compatible response
}
```

## 注册工具

通常需要修改：

```text
src/mcp/tools/index.ts
src/mcp/server.ts
```

确保：

- 工具名称稳定
- description 明确说明使用场景
- inputSchema 足够严格
- 错误返回对 Agent 可理解

## 复用 shared 逻辑

共享路径、数据库初始化、响应格式等逻辑位于：

```text
src/mcp/tools/shared.ts
```

新增工具应尽量复用，避免每个工具重复处理 repo path、project id 和数据库初始化。

## 添加 CLI 镜像

如果工具对人类开发者也有价值，可以在：

```text
src/cli/mirrorCommands.ts
```

添加 CLI 镜像。

已有例子：

- `list-files [path]`
- `definition <symbol>`
- `references <symbol>`

CLI 镜像应调用同一个 handler，避免 MCP 和 CLI 行为分叉。

## 测试

建议新增：

```text
tests/mcp/myTool.test.ts
tests/mcp/toolRegistry.test.ts
tests/cli/mirrorCommands.test.ts
```

测试重点：

- input schema 与 handler 参数一致
- 错误输入返回可理解错误
- handler 不依赖真实 MCP server 即可测试
- CLI 镜像正确解析参数

## 工具描述写法

MCP 工具描述会直接影响 Agent 是否正确使用。建议包括：

- 什么时候使用
- 什么时候不要使用
- 成本说明
- 与其他工具的区别

例如结构浏览工具应明确写出“zero embedding API cost”。
