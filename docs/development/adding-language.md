# 新增语言支持

ContextWeaver 的语言支持分两层：

1. AST 语义分片
2. Import 解析与跨文件扩展

只做搜索时，第一层就足够；如果要让 E3 import 扩展跨文件工作，需要第二层。

## 步骤 1：添加 Tree-sitter 依赖

在 `package.json` 中添加对应 grammar，例如：

```bash
pnpm add tree-sitter-xxx
```

或使用 `@tree-sitter-grammars/*` 包。

## 步骤 2：更新 LanguageSpec

修改：

```text
src/chunking/LanguageSpec.ts
```

需要定义：

- 文件扩展名
- language id
- parser 加载方式
- 关键 AST 节点类型
- 可以作为 chunk 边界的节点
- import 相关节点（如适用）

## 步骤 3：验证 SemanticSplitter

检查：

```text
src/chunking/SemanticSplitter.ts
```

确保新语言的关键节点会被识别为合理 chunk。

建议准备样例覆盖：

- 顶层函数
- 类/方法
- 接口/结构体
- import/export
- 注释或装饰器
- 多字节字符

## 步骤 4：添加 ImportResolver

如果希望跨文件 E3 扩展支持新语言，新增：

```text
src/search/resolvers/<Language>Resolver.ts
```

实现接口：

```ts
export interface ImportResolver {
  supports(filePath: string): boolean
  extract(content: string): string[]
  resolve(importStr: string, currentFile: string, allFiles: Set<string>): string | null
}
```

然后在：

```text
src/search/resolvers/index.ts
```

注册 resolver。

## 步骤 5：补测试

建议测试位置：

```text
tests/chunking/newLanguages.test.ts
tests/search/resolvers/<language>.test.ts
```

至少覆盖：

- 文件扩展名识别
- AST chunk 边界
- import 字符串提取
- import 到文件路径解析
- fallback 行为

## 步骤 6：更新文档

同步更新：

- `README.md`
- `README.zh-CN.md`
- 文档站语言支持页面或本页

## 常见问题

### Parser 初始化失败

通常是 grammar 包导出形式不一致。先查看该包的 ESM/CJS 导出，再调整 `LanguageSpec.ts` 中的加载方式。

### chunk 太碎

减少可作为边界的 AST 节点类型，或在 `SemanticSplitter` 中调整合并策略。

### chunk 太大

增加关键节点识别，或降低 fallback 分片大小。

### import 解析命中太多

在 resolver 的 `resolve()` 中优先当前目录、相对路径和语言约定扩展名，避免全局模糊匹配。
