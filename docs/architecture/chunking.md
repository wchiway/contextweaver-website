# AST Semantic Chunking

Semantic chunking determines whether ContextWeaver can split code into useful retrieval and display units.

Core files:

- `src/chunking/SemanticSplitter.ts`
- `src/chunking/LanguageSpec.ts`
- `src/chunking/ParserPool.ts`
- `src/chunking/SourceAdapter.ts`
- `src/chunking/types.ts`

## Chunking goals

ContextWeaver tries to align chunks with real semantic boundaries:

- functions
- methods
- classes
- interfaces
- structs
- module-level declarations
- important adjacent code snippets

This has two benefits:

1. Vector text represents a complete concept, improving recall stability.
2. Display text does not cut functions or type definitions in half, making it easier for LLMs to understand.

## Tree-sitter path

Languages with AST support go through Tree-sitter:

```text
LanguageSpec → ParserPool → Tree-sitter AST → SemanticSplitter → Chunk metadata
```

`LanguageSpec.ts` defines language extensions, AST node types, import metadata, and language-specific rules.

`ParserPool.ts` reuses Tree-sitter parsers to avoid repeatedly constructing them.

## Fallback line chunking

If a language has no AST support or parsing fails, ContextWeaver falls back to line-based chunking. Fallback chunks can still be indexed and searched, but semantic boundaries are less precise.

## Dual-text strategy

Chunking distinguishes two text forms:

| Text | Purpose |
|------|---------|
| `displayCode` | Code shown to users and LLMs |
| `vectorText` | Text sent to embeddings, often with breadcrumbs |

Since v1.4.0, `displayCode/vectorText` are no longer stored in LanceDB. Source text is loaded from SQLite `files.content`.

## Breadcrumb injection

A breadcrumb is the structural path of a chunk, for example:

```text
SearchService > buildContextPack
```

It is included in vector text so the embedding model understands where the chunk lives.

## Gap-aware merging

When nearby semantic nodes have small gaps, such as comments, decorators, or type declarations, the splitter tries to preserve context completeness.

This is why display slicing must use `start_index/end_index`, not `raw_start/raw_end`.

## UTF-16 offset normalization

JavaScript strings are sliced by UTF-16 code units. Tree-sitter may provide byte offsets, so metadata offsets must be normalized through `SourceAdapter.toCharOffset` before writing.

Related tests:

- `tests/chunking/SourceAdapter.test.ts`
- `tests/search/ChunkContentLoader.test.ts`

## Adding language support

To add a language, usually:

1. Add the Tree-sitter grammar dependency
2. Update `LanguageSpec.ts`
3. Ensure `SemanticSplitter.ts` recognizes key AST nodes
4. Add `search/resolvers/<Language>Resolver.ts` if cross-file import expansion is needed
5. Add chunking and resolver tests

See [Adding Language Support](/development/adding-language) for detailed steps.
