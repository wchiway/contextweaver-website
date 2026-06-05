# AST 语义分片

语义分片决定了 ContextWeaver 能否把代码切成适合检索和展示的上下文单位。

核心代码位于：

- `src/chunking/SemanticSplitter.ts`
- `src/chunking/LanguageSpec.ts`
- `src/chunking/ParserPool.ts`
- `src/chunking/SourceAdapter.ts`
- `src/chunking/types.ts`

## 分片目标

ContextWeaver 希望 chunk 尽量对应真实语义边界：

- 函数
- 方法
- 类
- 接口
- 结构体
- 模块级声明
- 重要的相邻代码片段

这样做有两个好处：

1. 向量文本更像“一个完整概念”，召回更稳定。
2. 展示文本不会把函数或类型定义切断，LLM 更容易理解。

## Tree-sitter 路径

支持 AST 的语言会走 Tree-sitter：

```text
LanguageSpec → ParserPool → Tree-sitter AST → SemanticSplitter → Chunk metadata
```

`LanguageSpec.ts` 定义语言扩展名、AST 节点类型、import 相关信息等语言规范。

`ParserPool.ts` 复用 Tree-sitter parser，避免重复创建解析器。

## Fallback 行分片

如果语言没有 AST 支持，或者解析失败，会退回行分片。Fallback 分片仍然可以被索引和搜索，只是语义边界不如 AST 分片准确。

## Dual-Text 策略

分片过程中会区分两类文本：

| 文本 | 用途 |
|------|------|
| `displayCode` | 展示给用户/LLM 的代码片段 |
| `vectorText` | 送入 Embedding 的文本，可能包含 breadcrumb |

v1.4.0 起，`displayCode/vectorText` 不再存入 LanceDB。正文回查统一通过 SQLite `files.content` 完成。

## Breadcrumb 注入

Breadcrumb 是 chunk 的层级路径，例如：

```text
SearchService > buildContextPack
```

它会进入向量文本，帮助检索模型理解 chunk 所处结构。

## Gap-Aware 合并

当相邻语义节点之间存在少量 gap，例如注释、装饰器或类型声明，分片器会尽量保留上下文完整性。

这也是为什么展示切片必须使用 `start_index/end_index`，而不要直接使用 `raw_start/raw_end`。

## UTF-16 偏移归一

JavaScript 字符串以 UTF-16 code units 切片。Tree-sitter 可能提供 byte offset，因此写入 metadata 前必须通过 `SourceAdapter.toCharOffset` 归一。

相关测试：

- `tests/chunking/SourceAdapter.test.ts`
- `tests/search/ChunkContentLoader.test.ts`

## 新增语言支持的入口

如果要新增语言，通常需要：

1. 添加 Tree-sitter grammar 依赖
2. 更新 `LanguageSpec.ts`
3. 确认 `SemanticSplitter.ts` 能识别关键 AST 节点
4. 如需跨文件扩展，添加 `search/resolvers/<Language>Resolver.ts`
5. 增加 chunking 与 resolver 测试

详细步骤见 [新增语言支持](/zh/development/adding-language)。
