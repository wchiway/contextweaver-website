# Releases

This page summarizes ContextWeaver changelogs from the `v1.0.0` baseline onward. `v1.0.0` maps to commit `da79f2931157aa06b08aab99aaa4d43bcfa43f66`; no matching Git tag or GitHub Release was found in the repository. `v1.4.0` has a Git tag, but no GitHub Release was found. Prerelease versions create GitHub pre-releases and local testing tarballs only; they are not published to npm.

## Version index

| Version | Type | Published | Link | Changes |
| --- | --- | --- | --- | --- |
| `v1.6.0-alpha.1` | Alpha prerelease | 2026-06-09 | [GitHub Release](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.6.0-alpha.1) | [v1.6.0-alpha.0...v1.6.0-alpha.1](https://github.com/wchiway/contextweaver-mcp/compare/v1.6.0-alpha.0...v1.6.0-alpha.1) |
| `v1.6.0-alpha.0` | Alpha prerelease | 2026-06-09 | [GitHub Release](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.6.0-alpha.0) | [v1.5.3...v1.6.0-alpha.0](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.3...v1.6.0-alpha.0) |
| `v1.5.3` | Stable | 2026-06-06 | [GitHub Release](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.3) | [v1.5.2...v1.5.3](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.2...v1.5.3) |
| `v1.5.3-beta.1` | Beta prerelease | 2026-06-06 | [GitHub Release](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.3-beta.1) | [v1.5.3-beta.0...v1.5.3-beta.1](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.3-beta.0...v1.5.3-beta.1) |
| `v1.5.3-beta.0` | Beta prerelease | 2026-06-05 | [GitHub Release](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.3-beta.0) | [v1.5.3-alpha.0...v1.5.3-beta.0](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.3-alpha.0...v1.5.3-beta.0) |
| `v1.5.3-alpha.0` | Alpha prerelease | 2026-06-05 | [GitHub Release](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.3-alpha.0) | [v1.5.2...v1.5.3-alpha.0](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.2...v1.5.3-alpha.0) |
| `v1.5.2` | Stable | 2026-06-03 | [GitHub Release](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.2) | [v1.5.1...v1.5.2](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.1...v1.5.2) |
| `v1.5.1` | Stable | 2026-06-03 | [GitHub Release](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.1) | [v1.5.0...v1.5.1](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.0...v1.5.1) |
| `v1.5.0` | Stable | 2026-06-02 | [GitHub Release](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.0) | [v1.4.0...v1.5.0](https://github.com/wchiway/contextweaver-mcp/compare/v1.4.0...v1.5.0) |
| `v1.4.0` | Stable tag | 2026-05-19 | [Git tag](https://github.com/wchiway/contextweaver-mcp/tree/v1.4.0) | [v1.0.0 commit...v1.4.0](https://github.com/wchiway/contextweaver-mcp/compare/da79f2931157aa06b08aab99aaa4d43bcfa43f66...v1.4.0) |
| `v1.0.0` | Baseline commit | 2026-03-13 | [Commit](https://github.com/wchiway/contextweaver-mcp/commit/da79f2931157aa06b08aab99aaa4d43bcfa43f66) | [v0.0.7...v1.0.0 commit](https://github.com/wchiway/contextweaver-mcp/compare/v0.0.7...da79f2931157aa06b08aab99aaa4d43bcfa43f66) |

## Unreleased

> No pending changes.

## v1.6.0-alpha.1

[Release page](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.6.0-alpha.1) · [Full changes](https://github.com/wchiway/contextweaver-mcp/compare/v1.6.0-alpha.0...v1.6.0-alpha.1)

> Continues the native migration roadmap with P1 (import resolver `extract()`) and P2 (encoding detect/decode) ported to Rust. Both are pure speedups with clean TypeScript fallbacks. With these, all CPU-bound hotspots (chunking/AST, import extraction, encoding decode) now run natively; the remaining scanner `hash`/`filter` modules were evaluated and intentionally kept in TypeScript.

### Highlights

#### Native import extraction (Rust regex port) — P1

- Ported the 7 import resolvers' `extract()` regex to the `crates/chunker` native module via `extractImports(kind, content)` (kinds: `jsts` / `python` / `go` / `java` / `rust` / `cpp` / `csharp`).
- Output is byte-for-byte identical to the TypeScript regex, so the TypeScript-side `resolve()` keeps working unchanged. GraphExpander's E3 import expansion — called on every search for each seed file — now runs through the native path when available.
- Handled JS/Rust regex divergence: ASCII `\w` semantics, and the C# `(?!static)(?!global)` negative lookahead (unsupported by Rust `regex`) emulated in code.
- When the native module is unavailable, each resolver transparently falls back to its original TypeScript regex (`extractTs`).

#### Native encoding detect/decode (Rust) — P2

- Ported the detect+decode step of `readFileWithEncoding` to the `crates/chunker` native module via `decodeBytes(buffer)`, backed by `chardetng` (Firefox's encoding detector) + `encoding_rs` (Gecko engine), replacing the JS `chardet` + `iconv-lite`.
- BOM sniffing mirrors the TypeScript logic; UTF-32 (LE/BE) is decoded manually since `encoding_rs` does not support it. Output is always UTF-8.
- `readFileWithEncoding` reads bytes in Node (`fs.readFile` stays in TypeScript), then prefers `decodeBytes`; on missing native binary or error it falls back to the original `chardet`/`iconv-lite` path (`decodeBytesTs`).

#### Migration scope concluded

- Evaluated the deferred scanner modules and decided **not** to migrate them: `hash.ts` (`sha256`) already runs on Node's OpenSSL-backed `crypto`, so a Rust port would only add a string copy across the NAPI boundary; `filter.ts` is I/O-bound and built on the mature npm `ignore` library, where a Rust rewrite risks byte-level gitignore divergence for no bottleneck gain.

### Quality and verification

- `tests/search/ImportExtract.diff.test.ts`: asserts native and TypeScript import output match byte-for-byte across all 7 kinds, edge cases (in-string / comment imports, C# static/global exclusion, Rust `pub mod`, Go block imports), and a sample of real repository source files.
- `tests/utils/Encoding.diff.test.ts`: asserts native `decodeBytes` content matches the `chardet`/`iconv-lite` path on BOM and long CJK (GB18030 / Big5 / Shift_JIS) samples where detection converges; short ambiguous single-byte cases (where detector divergence is acceptable per design) are excluded.
- Full suite green (701 tests) with the native module built.

### Installation

> Prerelease versions are not published to npm; download the platform tarball from the GitHub Release for local testing only.

## v1.6.0-alpha.0

[Release page](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.6.0-alpha.0) · [Full changes](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.3...v1.6.0-alpha.0)

> First prerelease shipping the Rust napi-rs native chunker. It creates a GitHub pre-release and all-platform testing tarballs only; it is not published to npm. Used to validate the cross-platform optionalDependencies install chain and native / TS fallback behavior.

### Highlights

#### Native Rust chunker (napi-rs)

- Migrated the CPU-intensive chunking layer (Tree-sitter parsing + AST traversal + windowing + symbol/call-site extraction) to the `crates/chunker` native module.
- `processor.ts` now prefers the Rust single-parse path (`process_file`), reusing one syntax tree to produce chunks, symbols, and call sites in a single pass.
- When the napi module fails to load (no prebuilt binary on uncommon platforms, or an unbuilt dev environment), it transparently falls back to the existing TypeScript chunker, keeping the package usable everywhere.
- All LanceDB offset fields are normalized to the UTF-16 character domain on the Rust side, kept byte-for-byte consistent with the TS `SourceAdapter`.

#### Cross-platform build and release

- `release.yml` becomes three-staged: `build` (5-platform napi matrix: linux-x64-gnu / linux-arm64-gnu / darwin-x64 / darwin-arm64 / win32-x64-msvc, with `--use-napi-cross` for arm64-linux) → `publish-chunker` (platform subpackages → chunker main package) → `publish-main` (main app package → GitHub Release → MCP Registry), with `needs` enforcing publish ordering.
- Distribution uses two layers of optionalDependencies: main app package → `@chiway/contextweaver-chunker` (napi loader main package) → 5 platform subpackages; falls back to TS when a package is missing.
- `prerelease.yml` mirrors the build matrix and packages all-platform tarballs as GitHub Prerelease assets without publishing to npm.
- Cross-compile darwin-x64 on an arm64 macOS runner, and use `--no-frozen-lockfile` in build/publish jobs.

### Quality and verification

- Added differential tests pinning UTF-16 offset-domain consistency: `SourceAdapter`, `SemanticSplitter`, `Symbols`, and `CallSites` Rust output compared field-by-field against TS output.
- Added a `processor` end-to-end integration test asserting that the built environment actually takes the native path.

### Installation

> Prereleases are not published to npm. Download the matching platform tarball from the GitHub Release for local testing.

## v1.5.3

[Release page](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.3) · [Full changes](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.2...v1.5.3)

### Highlights

#### Semantic graph and symbol indexing

- Added Tree-sitter tags based symbol extraction for indexed source files, stored in the new `semantic_symbols` table.
- Added semantic call edge extraction for TypeScript, JavaScript, Python, Go, Rust, Java, C, C++, C#, Ruby, and PHP.
- Added the `list-symbols` MCP tool for browsing symbols by path, kind, language, and source.
- Improved `get-symbol-definition` by preferring indexed `semantic_symbols` definitions before falling back to lexical matches.
- Added incremental cleanup for `semantic_edges`, so changed files remove stale call edges even when the new version has no call sites or no matched local symbols.

#### Vector index readiness and recovery

- Added the `contextweaver update` command for package update checks and guided upgrades.
- Added the `vector_manifest` readiness table, making SQLite the authoritative source of vector index state while LanceDB remains the derived materialization layer.
- Search and graph expansion now trust only files whose vector readiness is hash-matched, reducing stale or partially written vector recall.
- Added recovery paths for pending vector marks and no-chunk files so repeated scans converge instead of retrying indefinitely.

#### Release and registry readiness

- Added MCP Registry metadata via `server.json` and `package.json#mcpName`.
- Added stable and prerelease GitHub Actions publishing paths with npm trusted publishing and MCP Registry OIDC authentication.
- Fixed prerelease workflow OIDC permissions and removed an invalid dangling `files` key.
- Fixed release-blocking typecheck, lint, formatting, and whitespace issues found during the `1.5.3-rc.0` review.

### Schema updates

- Database schema version advances to `5`.
- New tables: `vector_manifest`, `semantic_symbols`, and `semantic_edges`.
- `semantic_symbols` stores extracted definitions by file hash and symbol metadata.
- `semantic_edges` stores semantic relationships, including local Tree-sitter call edges.

### Quality and verification

- Restored and expanded `getSymbolDefinition` tests.
- Added regression coverage for `semantic_symbols` primary-key behavior.
- Added regression coverage for stale `semantic_edges` cleanup when files lose call sites or no longer match local symbols.
- Final release validation passed:
  - `pnpm typecheck`
  - `pnpm run lint`
  - `pnpm test` — 124 test files / 603 tests passed
  - `pnpm build`

### Installation

```bash
npm install -g @chiway/contextweaver@1.5.3
# or
pnpm add -g @chiway/contextweaver@1.5.3
```

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
