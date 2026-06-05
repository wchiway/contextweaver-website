# Releases

This page summarizes ContextWeaver changelogs from the `v1.0.0` baseline onward. `v1.0.0` maps to commit `da79f2931157aa06b08aab99aaa4d43bcfa43f66`; no matching Git tag or GitHub Release was found in the repository. `v1.4.0` has a Git tag, but no GitHub Release was found. Prerelease versions create GitHub pre-releases and local testing tarballs only; they are not published to npm.

## Version index

| Version | Type | Published | Link | Changes |
| --- | --- | --- | --- | --- |
| `v1.5.3-beta.1` | Beta prerelease | 2026-06-06 | [GitHub Release](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.3-beta.1) | [v1.5.3-beta.0...v1.5.3-beta.1](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.3-beta.0...v1.5.3-beta.1) |
| `v1.5.3-beta.0` | Beta prerelease | 2026-06-05 | [GitHub Release](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.3-beta.0) | [v1.5.3-alpha.0...v1.5.3-beta.0](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.3-alpha.0...v1.5.3-beta.0) |
| `v1.5.3-alpha.0` | Alpha prerelease | 2026-06-05 | [GitHub Release](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.3-alpha.0) | [v1.5.2...v1.5.3-alpha.0](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.2...v1.5.3-alpha.0) |
| `v1.5.2` | Stable | 2026-06-03 | [GitHub Release](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.2) | [v1.5.1...v1.5.2](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.1...v1.5.2) |
| `v1.5.1` | Stable | 2026-06-03 | [GitHub Release](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.1) | [v1.5.0...v1.5.1](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.0...v1.5.1) |
| `v1.5.0` | Stable | 2026-06-02 | [GitHub Release](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.0) | [v1.4.0...v1.5.0](https://github.com/wchiway/contextweaver-mcp/compare/v1.4.0...v1.5.0) |
| `v1.4.0` | Stable tag | 2026-05-19 | [Git tag](https://github.com/wchiway/contextweaver-mcp/tree/v1.4.0) | [v1.0.0 commit...v1.4.0](https://github.com/wchiway/contextweaver-mcp/compare/da79f2931157aa06b08aab99aaa4d43bcfa43f66...v1.4.0) |
| `v1.0.0` | Baseline commit | 2026-03-13 | [Commit](https://github.com/wchiway/contextweaver-mcp/commit/da79f2931157aa06b08aab99aaa4d43bcfa43f66) | [v0.0.7...v1.0.0 commit](https://github.com/wchiway/contextweaver-mcp/compare/v0.0.7...da79f2931157aa06b08aab99aaa4d43bcfa43f66) |

## v1.5.3-beta.1

[Release page](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.3-beta.1) · [Full changes](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.3-beta.0...v1.5.3-beta.1)

### Highlights

#### Call Graph Export (Semantic Edges)

- **Tree-sitter call extractor**: Extracts function call nodes from AST without external dependencies
- **Local call graph builder**: Resolves function calls within the same file and populates the `semantic_edges` table with `kind='call'`
- **Multi-language support**: TypeScript, JavaScript, Python, Go, Rust, Java, C, C++, C#, Ruby, PHP (11 languages)
- **Bidirectional queries**: Find callers and callees using indexed queries on `semantic_edges`

**Verification (ContextWeaver project):**
- 385 call edges covering 96 files
- Provider: `tree-sitter` (lightweight implementation)
- Local call coverage: ~60-70% (as expected for same-file resolution)

#### list-symbols MCP Tool

- **New MCP tool** for querying symbol outlines across the codebase
- **Multi-dimensional filtering**:
  - Path filter (prefix or glob pattern, e.g., `src/**/*.ts`)
  - Symbol kind filter (`function,class,interface`)
  - Language filter (`typescript,python,go`)
  - Source filter (`tree-sitter` / `ctags`)
- **Markdown output**: Grouped by file with line ranges and container information
- **Efficient SQL queries**: Path filtering handled at SQL layer (LIKE queries) to avoid post-filter LIMIT traps

#### Tree-sitter Tags Symbol Extraction

- Uses grammar-native `tags.scm` query files to extract symbols from AST
- Adds patches for TypeScript/JavaScript (class/function/enum definitions)
- Optimizes `get-symbol-definition` tool: prioritizes `semantic_symbols` table lookup with directory-aware ranking

### Schema Updates

- Extended `SemanticEdge.provider` type: `'lsp' | 'tree-sitter'`
- Updated database CHECK constraint to allow `tree-sitter` as a provider

### Performance

- **Zero new dependencies**: Fully reuses existing tree-sitter and ParserPool infrastructure
- **Indexing impact**: < 5% increase (call graph building has negligible overhead)
- **Query performance**: Dual-index support for bidirectional call graph traversal

### Implementation Details

**New files:**
- `src/semantic/treeSitterCalls.ts` (184 lines) — Call site extractor
- `src/semantic/callGraphBuilder.ts` (183 lines) — Call graph builder with local resolution
- `src/mcp/tools/listSymbols.ts` (149 lines) — Symbol listing MCP tool

**Modified files:**
- `src/semantic/types.ts` — Extended `SemanticEdge.provider`
- `src/db/index.ts` — Updated CHECK constraint
- `src/scanner/processor.ts` — Added `callSites` field and integrated call extraction
- `src/scanner/index.ts` — Invokes `buildAndStoreCallGraph`
- `src/mcp/server.ts` — Registered `list-symbols` tool

### Future Enhancements (Not Implemented)

- **Cross-file call resolution** (Phase 2): Use resolver + symbol disambiguation for inter-file calls
- **Call graph query MCP tools**: Direct call relationship queries (e.g., `find-callers`, `find-callees`)
- **QueryPlanner integration**: Recognize symbol query intent and route to symbol table for exact matches
- **Incremental symbol indexing**: Hook into watcher for file-change-triggered updates

### Testing and installation

This version is not published to npm. Download the `.tgz` asset from the Release page and install it locally:

```bash
npm install -g ./chiway-contextweaver-1.5.3-beta.1.tgz
```

## v1.5.3-beta.0

[Release page](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.3-beta.0) · [Full changes](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.3-alpha.0...v1.5.3-beta.0)

### Highlights

- Added parser enrichment layers: Tree-sitter remains the primary parser, with optional `ctags` fallback symbol extraction and a disabled-by-default LSP enrichment framework.
- Added SQLite `semantic_symbols` and `semantic_edges` metadata tables for fallback symbols and future LSP semantic edges.
- Added DeepSeek-powered English changelog generation to the stable release workflow, with raw commit fallback when unavailable.
- Updated the prerelease workflow to build a local npm tarball and attach it to the GitHub pre-release.

### Testing and installation

This version is not published to npm. Download the `.tgz` asset from the Release page and install it locally:

```bash
npm install -g ./chiway-contextweaver-1.5.3-beta.0.tgz
```

## v1.5.3-alpha.0

[Release page](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.3-alpha.0) · [Full changes](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.2...v1.5.3-alpha.0)

### Highlights

- Added the `contextweaver update` command.
- Added a vector manifest consistency guard: SQLite becomes the authoritative readiness state and LanceDB is treated as the derived vector materialization layer.
- Search and graph expansion now trust only files that are `ready` and hash-matched in SQLite, reducing SQLite/LanceDB dual-write inconsistency risk.

### Testing and installation

This version is not published to npm. Download the `.tgz` asset from the Release page and install it locally:

```bash
npm install -g ./chiway-contextweaver-1.5.3-alpha.0.tgz
```

## v1.5.2

[Release page](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.2) · [Full changes](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.1...v1.5.2)

### Highlights

- Added retrieval controls to the codebase retrieval MCP tool.
- Separated semantic and lexical retrieval queries.
- Added structured codebase retrieval output.
- Added deterministic deep query decomposition.
- Extended graph expansion with reverse imports and call-sites.
- Exposed low-confidence retrieval handling.
- Preserved retrieval provenance in context segments.
- Reused search services across MCP calls to reduce repeated initialization overhead.

### Installation

```bash
npm install -g @chiway/contextweaver@1.5.2
# or
pnpm add -g @chiway/contextweaver@1.5.2
```

## v1.5.1

[Release page](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.1) · [Full changes](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.0...v1.5.1)

### Highlights

- Updated README with v1.4.0 data architecture and migration details.
- Corrected package and repository metadata to `@chiway/contextweaver` and `wchiway/contextweaver-mcp`.
- Added CI gates for lint, typecheck, test, and build.
- Fixed a stale MCP build entry reference.
- Made the MCP server version read dynamically from `package.json`.
- Removed unused fields and promoted lint to a hard gate.
- Fixed old package names in the release workflow that affected duplicate-publish protection and installation instructions.

### Installation

```bash
npm install -g @chiway/contextweaver@1.5.1
# or
pnpm add -g @chiway/contextweaver@1.5.1
```

## v1.5.0

[Release page](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.0) · [Full changes](https://github.com/wchiway/contextweaver-mcp/compare/v1.4.0...v1.5.0)

### Highlights

- Added watch mode and configurable search caching.
- Added stats for indexing, search, and health metrics.
- Added four granular MCP tools and matching CLI mirrors.
- Added AST semantic chunking support for Ruby, PHP, Kotlin, Swift, Lua, and Shell.
- Documented `CW_SEARCH_*` environment variable configuration.
- Fixed typecheck, lint, and CI issues discovered by the new gates.
- Rewrote README for v1.5.0 features and split English/Chinese documentation.

### Installation

```bash
npm install -g @chiway/contextweaver@1.5.0
# or
pnpm add -g @chiway/contextweaver@1.5.0
```

## v1.4.0

[Git tag](https://github.com/wchiway/contextweaver-mcp/tree/v1.4.0) · [Full changes](https://github.com/wchiway/contextweaver-mcp/compare/da79f2931157aa06b08aab99aaa4d43bcfa43f66...v1.4.0)

### Highlights

- Major data architecture and cross-store consistency fixes.
- Removed `display_code` / `vector_text` from the LanceDB `chunks` table; source text is looked up from `files.content` instead.
- Normalized `SemanticSplitter` metadata offsets to the UTF-16 character domain before writes, fixing UTF-8 byte offset drift.
- Schema version `2 → 3`: added the `pending_marks` outbox table for replaying vector index marks after mark-stage failures.
- Added a `pending` / `done` / `aborted` LanceDB migration state machine and a cross-process advisory lock.
- Added `contextweaver migrate` and `contextweaver migrate --reset`.
- Added `src/db/bootstrap.ts` to decouple VectorStore and SQLite initialization coordination.
- Fixed `ChunkContentLoader` slicing basis, crash-safe LanceDB migration, aborted-state write blocking, duplicate `chunk_id` handling, migration locks, and import target loader reuse.
- Expanded tests from 38 to 109 and added real LanceDB end-to-end migration tests.

### Installation

```bash
npm install -g @chiway/contextweaver@1.4.0
# or
pnpm add -g @chiway/contextweaver@1.4.0
```

## v1.0.0

[Baseline commit](https://github.com/wchiway/contextweaver-mcp/commit/da79f2931157aa06b08aab99aaa4d43bcfa43f66) · [Full changes](https://github.com/wchiway/contextweaver-mcp/compare/v0.0.7...da79f2931157aa06b08aab99aaa4d43bcfa43f66)

### Highlights

- Bumped the project to `1.0.0`, establishing the baseline for subsequent `v1.x` changelogs.
- Hardened rerank handling by tolerating empty or non-JSON responses.
- Falls back to unreranked candidates when rerank is misconfigured or unavailable, preventing search crashes.
- Removed the Zen Config abstraction before `1.0.0` and merged defaults into the global configuration.
- Hardened the lock mechanism and prevented an infinite healing loop.

### Link note

No matching `v1.0.0` Git tag or GitHub Release was found in the repository; this entry uses commit `da79f2931157aa06b08aab99aaa4d43bcfa43f66` as the `v1.0.0` baseline.
