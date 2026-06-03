# MCP 工具参考

ContextWeaver 暴露 5 个 MCP 工具，设计原则是“语义检索为主，结构浏览为辅”。

| 工具 | 用途 | Embedding 成本 |
|------|------|---------------|
| `codebase-retrieval` | 混合语义 + 精确匹配检索 | 有 |
| `list-files` | 列出已索引文件结构 | 无 |
| `find-references` | 启发式查找符号引用 | 无 |
| `get-symbol-definition` | 启发式查找符号定义 | 无 |
| `stats` | 输出索引、搜索、健康统计 | 无 |

## codebase-retrieval

主力检索工具。适合回答“某个功能如何实现”“某条链路在哪里”等问题。

参数：

| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `repo_path` | string | 是 | 代码库根目录绝对路径 |
| `information_request` | string | 是 | 自然语言语义目标 |
| `technical_terms` | string[] | 否 | 必须出现或需要强调的精确术语 |

推荐用法：

```json
{
  "repo_path": "/path/to/repo",
  "information_request": "Trace the login flow and error handling.",
  "technical_terms": ["LoginService", "AuthToken"]
}
```

## list-files

用于快速了解已索引文件结构，不调用 Embedding API。

参数：

| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `repo_path` | string | 是 | 代码库根目录绝对路径 |
| `glob` | string | 否 | 路径 glob 过滤 |
| `language` | string | 否 | 语言过滤 |
| `max_results` | number | 否 | 最大返回数量 |

CLI 镜像：

```bash
contextweaver list-files --glob "src/**/*.ts" --language typescript --max-results 100
```

## find-references

基于已索引 chunk 的启发式文本引用查找，不是编译器级精确导航。

参数：

| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `repo_path` | string | 是 | 代码库根目录绝对路径 |
| `symbol` | string | 是 | 精确符号名 |
| `exclude_definition` | boolean | 否 | 排除定义位置 |
| `max_results` | number | 否 | 最大返回数量，默认 50 |

CLI 镜像：

```bash
contextweaver references SearchService --exclude-definition
```

## get-symbol-definition

查找可能的符号定义块。适合快速定位类、函数、方法定义。

参数：

| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `repo_path` | string | 是 | 代码库根目录绝对路径 |
| `symbol` | string | 是 | 精确符号名 |
| `hint_path` | string | 否 | 用于同名定义消歧的路径提示 |
| `max_results` | number | 否 | 最大返回数量，默认 3 |

CLI 镜像：

```bash
contextweaver definition SearchService --hint-path src/search
```

## stats

输出统计与健康信息，包括：

- 索引过程统计
- 搜索行为与缓存命中率
- 健康与一致性诊断
- 迁移状态
- `pending_marks` 积压
- LanceDB 行数与 embedding 维度

CLI 镜像：

```bash
contextweaver stats
contextweaver stats --json
```

## 工具设计建议

二开新增 MCP 工具时，建议优先判断它属于：

1. **语义检索类**：可能需要 Embedding/Rerank
2. **结构浏览类**：应尽量零 API 成本
3. **诊断统计类**：应尽量可 JSON 输出，便于脚本消费

新增工具的实现步骤见 [扩展 MCP 工具](/development/extending-mcp)。
