import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

const socialLinks = [
  { icon: 'github', link: 'https://github.com/wchiway/contextweaver-mcp' }
] as const

// SEO metadata
const siteName = 'ContextWeaver'
const siteUrl = 'https://contextweaver.work'
const siteImage = `${siteUrl}/og-image.svg`

export default withMermaid(defineConfig({
  cleanUrls: true,
  metaChunk: true,
  sitemap: {
    hostname: siteUrl
  },
  mermaid: {},
  mermaidPlugin: {
    class: 'mermaid'
  },
  head: [
    // Favicon
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],

    // Site verification
    ['meta', { name: 'msvalidate.01', content: '28E0969A71102B3FC709E88F1EE1D920' }],

    // SEO
    ['meta', { name: 'author', content: 'Chiway' }],
    ['meta', { name: 'keywords', content: 'contextweaver, semantic search, code retrieval, AI agent, MCP, vector search, hybrid search, RAG, code context, tree-sitter, AST, LanceDB' }],

    // Open Graph
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: siteName }],
    ['meta', { property: 'og:image', content: siteImage }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],

    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: siteImage }],
    ['meta', { name: 'twitter:site', content: '@wchiway' }],
    ['meta', { name: 'twitter:creator', content: '@wchiway' }],

    // Additional SEO
    ['meta', { name: 'theme-color', content: '#7c3aed' }],
    ['link', { rel: 'canonical', href: siteUrl }]
  ],
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      title: 'ContextWeaver',
      description: 'Semantic code retrieval engine for AI coding agents.',
      head: [
        ['meta', { property: 'og:locale', content: 'en_US' }],
        ['meta', { property: 'og:url', content: siteUrl }],
        ['meta', { property: 'og:title', content: 'ContextWeaver - Semantic Code Retrieval for AI Agents' }],
        ['meta', { property: 'og:description', content: 'Semantic code retrieval engine designed for AI coding agents — delivering precise, context-rich code snippets through hybrid search, graph expansion, and intelligent packing.' }],
        ['meta', { name: 'twitter:title', content: 'ContextWeaver - Semantic Code Retrieval for AI Agents' }],
        ['meta', { name: 'twitter:description', content: 'Semantic code retrieval engine designed for AI coding agents — delivering precise, context-rich code snippets through hybrid search, graph expansion, and intelligent packing.' }]
      ],
      themeConfig: {
        siteTitle: 'ContextWeaver',
        logo: { src: '/logo.svg', alt: 'ContextWeaver' },
        nav: [
          { text: 'Guide', link: '/guide/project-overview' },
          { text: 'Architecture', link: '/architecture/overview' },
          { text: 'Development', link: '/development/setup' },
          { text: 'Reference', link: '/reference/cli' }
        ],
        sidebar: [
          {
            text: 'Guide',
            items: [
              { text: 'Project Overview', link: '/guide/project-overview' },
              { text: 'Getting Started', link: '/guide/getting-started' },
              { text: 'MCP Integration', link: '/guide/mcp' }
            ]
          },
          {
            text: 'Architecture',
            items: [
              { text: 'Architecture Overview', link: '/architecture/overview' },
              { text: 'Indexing Pipeline', link: '/architecture/indexing-pipeline' },
              { text: 'Search Pipeline', link: '/architecture/search-pipeline' },
              { text: 'Storage Model', link: '/architecture/storage' },
              { text: 'AST Semantic Chunking', link: '/architecture/chunking' },
              { text: 'Hybrid Search', link: '/concepts/hybrid-search' },
              { text: 'Context Weaving', link: '/concepts/context-weaving' }
            ]
          },
          {
            text: 'Development',
            items: [
              { text: 'Development Setup', link: '/development/setup' },
              { text: 'Project Structure', link: '/development/project-structure' },
              { text: 'Testing Guide', link: '/development/testing' },
              { text: 'Adding Language Support', link: '/development/adding-language' },
              { text: 'Extending MCP Tools', link: '/development/extending-mcp' },
              { text: 'Troubleshooting', link: '/development/troubleshooting' }
            ]
          },
          {
            text: 'Reference',
            items: [
              { text: 'CLI Commands', link: '/reference/cli' },
              { text: 'MCP Tools', link: '/reference/mcp-tools' },
              { text: 'Configuration', link: '/reference/configuration' },
              { text: 'Releases', link: '/reference/releases' }
            ]
          }
        ],
        socialLinks,
        search: {
          provider: 'local'
        },
        footer: {
          message: 'Released under the MIT License.',
          copyright: 'Copyright © 2026 Chiway'
        }
      }
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      title: 'ContextWeaver',
      description: '为 AI Agent 设计的语义代码检索引擎。',
      head: [
        ['meta', { property: 'og:locale', content: 'zh_CN' }],
        ['meta', { property: 'og:url', content: `${siteUrl}/zh/` }],
        ['meta', { property: 'og:title', content: 'ContextWeaver - 为 AI Agent 设计的语义代码检索引擎' }],
        ['meta', { property: 'og:description', content: '专为 AI 编码代理设计的语义检索引擎 — 通过混合检索、图式扩展与智能打包，提供精准且富含上下文的代码片段。' }],
        ['meta', { name: 'twitter:title', content: 'ContextWeaver - 为 AI Agent 设计的语义代码检索引擎' }],
        ['meta', { name: 'twitter:description', content: '专为 AI 编码代理设计的语义检索引擎 — 通过混合检索、图式扩展与智能打包，提供精准且富含上下文的代码片段。' }]
      ],
      themeConfig: {
        siteTitle: 'ContextWeaver',
        logo: { src: '/logo.svg', alt: 'ContextWeaver' },
        nav: [
          { text: '指南', link: '/zh/guide/project-overview' },
          { text: '架构', link: '/zh/architecture/overview' },
          { text: '开发', link: '/zh/development/setup' },
          { text: '参考', link: '/zh/reference/cli' }
        ],
        sidebar: [
          {
            text: '指南',
            items: [
              { text: '项目总览', link: '/zh/guide/project-overview' },
              { text: '快速开始', link: '/zh/guide/getting-started' },
              { text: 'MCP 集成', link: '/zh/guide/mcp' }
            ]
          },
          {
            text: '架构',
            items: [
              { text: '架构总览', link: '/zh/architecture/overview' },
              { text: '索引流水线', link: '/zh/architecture/indexing-pipeline' },
              { text: '搜索流水线', link: '/zh/architecture/search-pipeline' },
              { text: '数据存储模型', link: '/zh/architecture/storage' },
              { text: 'AST 语义分片', link: '/zh/architecture/chunking' },
              { text: '混合检索', link: '/zh/concepts/hybrid-search' },
              { text: '上下文编织', link: '/zh/concepts/context-weaving' }
            ]
          },
          {
            text: '开发',
            items: [
              { text: '开发环境', link: '/zh/development/setup' },
              { text: '项目结构', link: '/zh/development/project-structure' },
              { text: '测试指南', link: '/zh/development/testing' },
              { text: '新增语言支持', link: '/zh/development/adding-language' },
              { text: '扩展 MCP 工具', link: '/zh/development/extending-mcp' },
              { text: '故障排查', link: '/zh/development/troubleshooting' }
            ]
          },
          {
            text: '参考',
            items: [
              { text: 'CLI 命令', link: '/zh/reference/cli' },
              { text: 'MCP 工具', link: '/zh/reference/mcp-tools' },
              { text: '配置项', link: '/zh/reference/configuration' },
              { text: '发布记录', link: '/zh/reference/releases' }
            ]
          }
        ],
        socialLinks,
        search: {
          provider: 'local',
          options: {
            translations: {
              button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
              modal: {
                displayDetails: '显示详情',
                resetButtonTitle: '清除查询',
                backButtonTitle: '返回',
                noResultsText: '没有找到结果',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        },
        footer: {
          message: '基于 MIT License 发布。',
          copyright: 'Copyright © 2026 Chiway'
        }
      }
    }
  }
}))
