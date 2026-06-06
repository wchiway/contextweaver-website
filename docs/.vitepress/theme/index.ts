import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h('script', {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'ContextWeaver',
          description: 'Semantic code retrieval engine designed for AI coding agents',
          url: 'https://contextweaver.dev',
          applicationCategory: 'DeveloperApplication',
          operatingSystem: 'Cross-platform',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
          },
          author: {
            '@type': 'Person',
            name: 'Chiway'
          },
          sameAs: [
            'https://github.com/wchiway/contextweaver-mcp'
          ]
        })
      })
    })
  }
}
