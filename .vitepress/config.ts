import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Crawlee Cloud',
  description: 'Open-source self-hosted platform for Crawlee scrapers',
  cleanUrls: true,
  head: [
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-FYMRJ2GG39' },
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-FYMRJ2GG39');`,
    ],
  ],
  srcDir: 'src',
  outDir: './dist',
  themeConfig: {
    siteTitle: false,
    logo: {
      light: '/logo-light.svg',
      dark: '/logo-dark.svg',
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/docs/' },
      { text: 'GitHub', link: 'https://github.com/crawlee-cloud/crawlee-cloud' },
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Overview', link: '/docs/' },
          { text: 'Apify SDK Environment', link: '/docs/apify-sdk-environment' },
        ],
      },
      {
        text: 'Components',
        items: [
          { text: 'CLI', link: '/docs/cli' },
          { text: 'Dashboard', link: '/docs/dashboard' },
          { text: 'Runner', link: '/docs/runner' },
          { text: 'Deployment', link: '/docs/deployment' },
          { text: 'API Reference', link: '/docs/api' },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/crawlee-cloud/crawlee-cloud' }],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 Crawlee Cloud',
    },

    search: {
      provider: 'local',
    },
  },
});
