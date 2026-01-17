---
title: Automated Lead Generation Scraping
description: Build targeted prospect lists from public business directories with Crawlee Cloud.
head:
  - - meta
    - name: keywords
      content: lead generation, b2b scraping, prospect list, business directory scraping
---

# Automated Lead Generation Scraping

Build targeted prospect lists from public business directories and websites.

## Use Cases

- Extract contact information at scale
- Filter by industry, location, size
- Enrich CRM data automatically
- Comply with data regulations

## Example Scraper

```typescript
import { PlaywrightCrawler, Dataset } from 'crawlee';

const crawler = new PlaywrightCrawler({
  async requestHandler({ page, request }) {
    const company = await page.$eval('.company-name', el => el.textContent);
    const email = await page.$eval('.email', el => el.textContent);
    const phone = await page.$eval('.phone', el => el.textContent);
    
    await Dataset.pushData({
      company,
      email,
      phone,
      source: request.url,
    });
  },
});

await crawler.run(['https://directory.example.com']);
```

---

<div class="cta-box">

## Build Your Lead Pipeline

[Get Started →](/docs/)

</div>
