import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Crawlee Cloud',
  description:
    'Self-hosted, open-source platform for running Crawlee and Apify Actors on your own infrastructure. Deploy web scrapers with Playwright, Puppeteer, or Cheerio.',
  cleanUrls: true,
  lang: 'en-US',
  lastUpdated: true,

  // Sitemap generation
  sitemap: {
    hostname: 'https://crawlee.cloud',
    lastmodDateOnly: false,
  },

  head: [
    // Primary Meta Tags
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    [
      'meta',
      {
        name: 'keywords',
        content:
          'crawlee, apify, web scraping, self-hosted, open source, playwright, puppeteer, cheerio, web crawler, data extraction, scraping platform, actor platform',
      },
    ],
    ['meta', { name: 'author', content: 'Crawlee Cloud' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['link', { rel: 'canonical', href: 'https://crawlee.cloud' }],

    // Open Graph / Facebook
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://crawlee.cloud' }],
    ['meta', { property: 'og:title', content: 'Crawlee Cloud - Your Scrapers, Your Cloud' }],
    [
      'meta',
      {
        property: 'og:description',
        content:
          'Self-hosted, open-source platform for running Crawlee and Apify Actors on your own infrastructure.',
      },
    ],
    ['meta', { property: 'og:image', content: 'https://crawlee.cloud/og-image.png' }],
    ['meta', { property: 'og:site_name', content: 'Crawlee Cloud' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],

    // Twitter / X
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:url', content: 'https://crawlee.cloud' }],
    ['meta', { name: 'twitter:title', content: 'Crawlee Cloud - Your Scrapers, Your Cloud' }],
    [
      'meta',
      {
        name: 'twitter:description',
        content:
          'Self-hosted, open-source platform for running Crawlee and Apify Actors on your own infrastructure.',
      },
    ],
    ['meta', { name: 'twitter:image', content: 'https://crawlee.cloud/og-image.png' }],

    // Favicons (if you add them later)
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],

    // Google Analytics
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

    // JSON-LD Structured Data
    [
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Crawlee Cloud',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Linux, macOS, Windows',
        description:
          'Self-hosted, open-source platform for running Crawlee and Apify Actors on your own infrastructure.',
        url: 'https://crawlee.cloud',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        author: {
          '@type': 'Organization',
          name: 'Crawlee Cloud',
          url: 'https://crawlee.cloud',
        },
        license: 'https://opensource.org/licenses/MIT',
        codeRepository: 'https://github.com/crawlee-cloud/crawlee-cloud',
        programmingLanguage: ['TypeScript', 'JavaScript'],
        keywords:
          'web scraping, crawlee, apify, self-hosted, open source, playwright, puppeteer, cheerio',
      }),
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
