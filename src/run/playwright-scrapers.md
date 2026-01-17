---
title: Deploy Playwright Scrapers to the Cloud
description: Run Playwright scrapers on your own infrastructure with Crawlee Cloud. Cross-browser automation with Chromium, Firefox, and WebKit.
head:
  - - meta
    - name: keywords
      content: playwright hosting, playwright scraper, playwright cloud, playwright self-hosted, browser automation
---

# Deploy Playwright Scrapers to the Cloud

Run your **Playwright** scrapers on Crawlee Cloud with full browser automation support — Chromium, Firefox, and WebKit.

## Why Playwright?

| Feature | Benefit |
|---------|---------|
| **Cross-browser** | Test and scrape on Chromium, Firefox, WebKit |
| **Auto-waiting** | No manual sleep() calls needed |
| **Network Control** | Intercept and mock requests |
| **Mobile Emulation** | Scrape mobile-only sites |

## Quick Start

### 1. Create a Playwright Scraper

```typescript
import { PlaywrightCrawler, Dataset } from 'crawlee';

const crawler = new PlaywrightCrawler({
  async requestHandler({ page, request, enqueueLinks }) {
    // Extract data
    const title = await page.title();
    const price = await page.$eval('.price', el => el.textContent);
    
    // Save to dataset
    await Dataset.pushData({
      url: request.url,
      title,
      price,
    });
    
    // Follow links
    await enqueueLinks({
      selector: '.product-link',
    });
  },
});

await crawler.run(['https://example.com/products']);
```

### 2. Push to Crawlee Cloud

```bash
crc push my-playwright-scraper
```

### 3. Run At Scale

```bash
crc call my-playwright-scraper --input '{"startUrl": "https://example.com"}'
```

## Features

### Session Management
Crawlee automatically handles cookies, sessions, and browser fingerprints.

### Proxy Rotation
Use any proxy provider — residential, datacenter, or mobile.

### Auto-Retry
Failed requests are automatically retried with exponential backoff.

### Data Storage
Results are saved to S3-compatible storage (MinIO locally).

## Comparison

| Feature | Managed Platforms | Crawlee Cloud |
|---------|-------------------|---------------|
| Pricing | Per-request | Fixed VPS cost |
| Browser Choice | Limited | Any browser |
| Proxy Provider | Bundled | Any provider |
| Data Location | Their servers | Your servers |

---

<div class="cta-box">

## Start Scraping with Playwright

Deploy in minutes on your own infrastructure.

[Get Started →](/docs/)

</div>
