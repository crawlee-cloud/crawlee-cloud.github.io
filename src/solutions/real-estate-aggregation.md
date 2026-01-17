---
title: Real Estate Data Aggregation Pipeline
description: Aggregate property listings from multiple sources for analysis with Crawlee Cloud.
head:
  - - meta
    - name: keywords
      content: real estate scraping, property aggregation, proptech data, listing scraper
---

# Real Estate Data Aggregation Pipeline

Aggregate property listings from multiple sources for market analysis.

## Use Cases

- Combine listings from multiple portals
- Track price changes over time
- Geographic market analysis
- Investment opportunity detection

## Example Scraper

```typescript
import { PlaywrightCrawler, Dataset } from 'crawlee';

const crawler = new PlaywrightCrawler({
  async requestHandler({ page, request }) {
    const address = await page.$eval('.address', el => el.textContent);
    const price = await page.$eval('.price', el => el.textContent);
    const bedrooms = await page.$eval('.beds', el => el.textContent);
    
    await Dataset.pushData({
      address,
      price,
      bedrooms,
      source: request.url,
      scrapedAt: new Date().toISOString(),
    });
  },
});

await crawler.run(['https://realestate.example.com']);
```

---

<div class="cta-box">

## Build Your Property Pipeline

[Get Started →](/docs/)

</div>
