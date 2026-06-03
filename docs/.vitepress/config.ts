import { defineConfig } from 'vitepress'

const socialLinks = [
  { icon: 'github', link: 'https://github.com/wchiway/contextweaver-mcp' }
] as const

export default defineConfig({
  cleanUrls: true,
  metaChunk: true,
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]],
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'ContextWeaver',
      description: '为 AI Agent 设计的语义代码检索引擎。',
      themeConfig: {
        siteTitle: 'ContextWeaver',
        logo: { src: '/logo.svg', alt: 'ContextWeaver' },
        nav: [
          { text: '指南', link: '/guide/project-overview' },
          { text: '架构', link: '/architecture/overview' },
          { text: '开发', link: '/development/setup' },
          { text: '参考', link: '/reference/cli' }
        ],
        sidebar: [
          {
            text: '指南',
            items: [
              { text: '项目总览', link: '/guide/project-overview' },
              { text: '快速开始', link: '/guide/getting-started' },
              { text: 'MCP 集成', link: '/guide/mcp' }
            ]
          },
          {
            text: '架构',
            items: [
              { text: '架构总览', link: '/architecture/overview' },
              { text: '索引流水线', link: '/architecture/indexing-pipeline' },
              { text: '搜索流水线', link: '/architecture/search-pipeline' },
              { text: '数据存储模型', link: '/architecture/storage' },
              { text: 'AST 语义分片', link: '/architecture/chunking' },
              { text: '混合检索', link: '/concepts/hybrid-search' },
              { text: '上下文编织', link: '/concepts/context-weaving' }
            ]
          },
          {
            text: '开发',
            items: [
              { text: '开发环境', link: '/development/setup' },
              { text: '项目结构', link: '/development/project-structure' },
              { text: '测试指南', link: '/development/testing' },
              { text: '新增语言支持', link: '/development/adding-language' },
              { text: '扩展 MCP 工具', link: '/development/extending-mcp' },
              { text: '故障排查', link: '/development/troubleshooting' }
            ]
          },
          {
            text: '参考',
            items: [
              { text: 'CLI 命令', link: '/reference/cli' },
              { text: 'MCP 工具', link: '/reference/mcp-tools' },
              { text: '配置项', link: '/reference/configuration' }
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
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: 'ContextWeaver',
      description: 'Semantic code retrieval engine for AI coding agents.',
      themeConfig: {
        siteTitle: 'ContextWeaver',
        logo: { src: '/logo.svg', alt: 'ContextWeaver' },
        nav: [
          { text: 'Guide', link: '/en/guide/project-overview' },
          { text: 'Architecture', link: '/en/architecture/overview' },
          { text: 'Development', link: '/en/development/setup' },
          { text: 'Reference', link: '/en/reference/cli' }
        ],
        sidebar: [
          {
            text: 'Guide',
            items: [
              { text: 'Project Overview', link: '/en/guide/project-overview' },
              { text: 'Getting Started', link: '/en/guide/getting-started' },
              { text: 'MCP Integration', link: '/en/guide/mcp' }
            ]
          },
          {
            text: 'Architecture',
            items: [
              { text: 'Architecture Overview', link: '/en/architecture/overview' },
              { text: 'Indexing Pipeline', link: '/en/architecture/indexing-pipeline' },
              { text: 'Search Pipeline', link: '/en/architecture/search-pipeline' },
              { text: 'Storage Model', link: '/en/architecture/storage' },
              { text: 'AST Semantic Chunking', link: '/en/architecture/chunking' },
              { text: 'Hybrid Search', link: '/en/concepts/hybrid-search' },
              { text: 'Context Weaving', link: '/en/concepts/context-weaving' }
            ]
          },
          {
            text: 'Development',
            items: [
              { text: 'Development Setup', link: '/en/development/setup' },
              { text: 'Project Structure', link: '/en/development/project-structure' },
              { text: 'Testing Guide', link: '/en/development/testing' },
              { text: 'Adding Language Support', link: '/en/development/adding-language' },
              { text: 'Extending MCP Tools', link: '/en/development/extending-mcp' },
              { text: 'Troubleshooting', link: '/en/development/troubleshooting' }
            ]
          },
          {
            text: 'Reference',
            items: [
              { text: 'CLI Commands', link: '/en/reference/cli' },
              { text: 'MCP Tools', link: '/en/reference/mcp-tools' },
              { text: 'Configuration', link: '/en/reference/configuration' }
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
    }
  }
})
