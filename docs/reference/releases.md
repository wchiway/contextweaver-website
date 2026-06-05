# Releases

This page summarizes ContextWeaver changelogs from the `v1.0.0` baseline onward. `v1.0.0` maps to commit `da79f2931157aa06b08aab99aaa4d43bcfa43f66`; no matching Git tag or GitHub Release was found in the repository. `v1.4.0` has a Git tag, but no GitHub Release was found. Prerelease versions create GitHub pre-releases and local testing tarballs only; they are not published to npm.

## Version index

| Version | Type | Published | Link | Changes |
| --- | --- | --- | --- | --- |
| `v1.5.3-beta.0` | Beta prerelease | 2026-06-05 | [GitHub Release](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.3-beta.0) | [v1.5.3-alpha.0...v1.5.3-beta.0](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.3-alpha.0...v1.5.3-beta.0) |
| `v1.5.3-alpha.0` | Alpha prerelease | 2026-06-05 | [GitHub Release](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.3-alpha.0) | [v1.5.2...v1.5.3-alpha.0](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.2...v1.5.3-alpha.0) |
| `v1.5.2` | Stable | 2026-06-03 | [GitHub Release](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.2) | [v1.5.1...v1.5.2](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.1...v1.5.2) |
| `v1.5.1` | Stable | 2026-06-03 | [GitHub Release](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.1) | [v1.5.0...v1.5.1](https://github.com/wchiway/contextweaver-mcp/compare/v1.5.0...v1.5.1) |
| `v1.5.0` | Stable | 2026-06-02 | [GitHub Release](https://github.com/wchiway/contextweaver-mcp/releases/tag/v1.5.0) | [v1.4.0...v1.5.0](https://github.com/wchiway/contextweaver-mcp/compare/v1.4.0...v1.5.0) |
| `v1.4.0` | Stable tag | 2026-05-19 | [Git tag](https://github.com/wchiway/contextweaver-mcp/tree/v1.4.0) | [v1.0.0 commit...v1.4.0](https://github.com/wchiway/contextweaver-mcp/compare/da79f2931157aa06b08aab99aaa4d43bcfa43f66...v1.4.0) |
| `v1.0.0` | Baseline commit | 2026-03-13 | [Commit](https://github.com/wchiway/contextweaver-mcp/commit/da79f2931157aa06b08aab99aaa4d43bcfa43f66) | [v0.0.7...v1.0.0 commit](https://github.com/wchiway/contextweaver-mcp/compare/v0.0.7...da79f2931157aa06b08aab99aaa4d43bcfa43f66) |

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
