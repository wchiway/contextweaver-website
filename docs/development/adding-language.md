# Adding Language Support

ContextWeaver language support has two layers:

1. AST semantic chunking
2. Import resolution for cross-file expansion

For search-only support, the first layer is enough. To make E3 import expansion work across files, add the second layer.

## Step 1: Add Tree-sitter dependency

Add the grammar package to `package.json`, for example:

```bash
pnpm add tree-sitter-xxx
```

or use an `@tree-sitter-grammars/*` package.

## Step 2: Update LanguageSpec

Modify:

```text
src/chunking/LanguageSpec.ts
```

Define:

- file extensions
- language id
- parser loading path
- important AST node types
- nodes that can become chunk boundaries
- import-related nodes, if applicable

## Step 3: Validate SemanticSplitter

Check:

```text
src/chunking/SemanticSplitter.ts
```

Make sure key nodes in the new language are recognized as reasonable chunks.

Recommended examples:

- top-level function
- class/method
- interface/struct
- import/export
- comments or decorators
- multi-byte characters

## Step 4: Add ImportResolver

If you want cross-file E3 expansion, create:

```text
src/search/resolvers/<Language>Resolver.ts
```

Implement:

```ts
export interface ImportResolver {
  supports(filePath: string): boolean
  extract(content: string): string[]
  resolve(importStr: string, currentFile: string, allFiles: Set<string>): string | null
}
```

Then register it in:

```text
src/search/resolvers/index.ts
```

## Step 5: Add tests

Recommended test locations:

```text
tests/chunking/newLanguages.test.ts
tests/search/resolvers/<language>.test.ts
```

At minimum, cover:

- extension detection
- AST chunk boundaries
- import string extraction
- import path resolution
- fallback behavior

## Step 6: Update docs

Update:

- `README.md`
- `README.zh-CN.md`
- website language support or this page

## Common issues

### Parser initialization fails

Grammar packages do not all export the same way. Inspect the package's ESM/CJS export shape and adjust loading in `LanguageSpec.ts`.

### Chunks are too small

Reduce AST node types that become boundaries, or adjust merging logic in `SemanticSplitter`.

### Chunks are too large

Recognize more key nodes, or reduce fallback chunk size.

### Import resolution matches too much

In `resolve()`, prefer current directory, relative paths, and language-specific extensions before broad matching.
