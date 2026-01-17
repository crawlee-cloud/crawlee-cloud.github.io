---
title: Self-Hosted Price Monitoring Engine
description: Track competitor prices and inventory across thousands of products with Crawlee Cloud.
head:
  - - meta
    - name: keywords
      content: price monitoring, competitor pricing, ecommerce scraping, price tracking
---

# Self-Hosted Price Monitoring Engine

Track competitor prices and inventory across thousands of products — on your own infrastructure.

## Use Cases

- Monitor competitor pricing in real-time
- Track inventory and stock levels
- Historical price trend analysis
- Automated pricing alerts

## Example Scraper

```typescript
import { PlaywrightCrawler, Dataset } from 'crawlee';

const crawler = new PlaywrightCrawler({
  async requestHandler({ page, request }) {
    const price = await page.$eval('.price', el => el.textContent);
    const stock = await page.$eval('.stock', el => el.textContent);
    
    await Dataset.pushData({
      url: request.url,
      price,
      stock,
      scrapedAt: new Date().toISOString(),
    });
  },
});

await crawler.run(['https://competitor.com/product']);
```

---

<div class="cta-box">

## Build Your Price Monitor

[Get Started →](/docs/)

</div>
