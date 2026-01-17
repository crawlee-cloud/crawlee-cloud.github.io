---
title: The Best Way to Host Puppeteer Scrapers
description: Deploy Puppeteer scrapers with headless Chrome on your own infrastructure with Crawlee Cloud.
head:
  - - meta
    - name: keywords
      content: puppeteer hosting, puppeteer cloud, headless chrome hosting, puppeteer scraper
---

# The Best Way to Host Puppeteer Scrapers

Deploy **Puppeteer** scrapers with headless Chrome on your own infrastructure.

## Why Puppeteer?

| Feature | Benefit |
|---------|---------|
| **Native Chrome** | Direct DevTools Protocol access |
| **Fast** | Optimized for Chromium automation |
| **Screenshots** | PDF and image generation |
| **Network** | Full request interception |

## Quick Start

```typescript
import { PuppeteerCrawler, Dataset } from 'crawlee';

const crawler = new PuppeteerCrawler({
  async requestHandler({ page, request }) {
    const title = await page.title();
    await Dataset.pushData({ url: request.url, title });
  },
});

await crawler.run(['https://example.com']);
```

```bash
crc push my-puppeteer-scraper
crc call my-puppeteer-scraper
```

---

<div class="cta-box">

## Deploy Your Puppeteer Scraper

[Get Started →](/docs/)

</div>
