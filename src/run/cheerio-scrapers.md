---
title: High-Performance Cheerio Scraper Hosting
description: Run lightweight, fast HTML scrapers without browser overhead using Cheerio on Crawlee Cloud.
head:
  - - meta
    - name: keywords
      content: cheerio hosting, cheerio scraper, html parser hosting, fast web scraping
---

# High-Performance Cheerio Scraper Hosting

Run lightweight, fast HTML scrapers without browser overhead.

## Why Cheerio?

| Feature | Benefit |
|---------|---------|
| **10x Faster** | No browser overhead |
| **jQuery Syntax** | Familiar selectors |
| **Low Memory** | Minimal resource usage |
| **Static Pages** | Perfect for HTML-only sites |

## Quick Start

```typescript
import { CheerioCrawler, Dataset } from 'crawlee';

const crawler = new CheerioCrawler({
  async requestHandler({ $, request }) {
    const title = $('title').text();
    const items = $('li').map((_, el) => $(el).text()).get();
    await Dataset.pushData({ url: request.url, title, items });
  },
});

await crawler.run(['https://example.com']);
```

```bash
crc push my-cheerio-scraper
crc call my-cheerio-scraper
```

---

<div class="cta-box">

## Deploy Your Cheerio Scraper

[Get Started →](/docs/)

</div>
