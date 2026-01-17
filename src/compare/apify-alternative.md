---
title: Running Crawlee - Apify Cloud vs Self-Hosted
description: Compare running Crawlee on Apify Cloud vs self-hosting with Crawlee Cloud. Same SDK, your infrastructure, full control.
head:
  - - meta
    - name: keywords
      content: apify alternative, self-hosted apify, crawlee self-hosted, apify sdk self-hosted
---

# Running Crawlee: Apify Cloud vs Self-Hosted

Apify is a powerful cloud platform for running web scrapers. **Crawlee Cloud** gives you the same actor-based architecture — on your own infrastructure.

## Quick Comparison

| Feature | Apify Cloud | Crawlee Cloud |
|---------|-------------|---------------|
| **Hosting** | Apify servers | Your infrastructure |
| **Data Location** | Their servers | Your servers |
| **API Compatibility** | Apify SDK | Apify SDK Compatible |
| **Source Code** | Closed | Open Source (MIT) |
| **Pricing** | $5/GB or subscription | Cost of your VPS |

## When to Choose Apify Cloud

Apify Cloud is excellent when you need:

- **Managed infrastructure** — No DevOps required
- **Apify Store** — Access to pre-built actors
- **Integrated proxies** — Residential proxy network
- **Enterprise support** — SLA and dedicated support

## When to Choose Crawlee Cloud

Crawlee Cloud is ideal when you need:

- **Data sovereignty** — Scraped data never leaves your servers
- **Cost control** — Fixed monthly VPS cost (~$5-20/mo)
- **Full customization** — Modify the platform as needed
- **No vendor lock-in** — Open source, MIT licensed

## Migration is Easy

If you're already using Crawlee or Apify SDK, migrating is simple:

```typescript
// Your existing Crawlee code works as-is
import { PlaywrightCrawler } from 'crawlee';

const crawler = new PlaywrightCrawler({
  async requestHandler({ page, request }) {
    const title = await page.title();
    console.log(`${request.url}: ${title}`);
  },
});

await crawler.run(['https://example.com']);
```

Just push your actor to Crawlee Cloud:

```bash
crc push my-scraper
crc call my-scraper
```

## Feature Comparison

### Storage

| Feature | Apify | Crawlee Cloud |
|---------|-------|---------------|
| Datasets | ✅ | ✅ |
| Key-Value Store | ✅ | ✅ |
| Request Queue | ✅ | ✅ |
| Storage Backend | Apify Cloud | S3/MinIO |

### Execution

| Feature | Apify | Crawlee Cloud |
|---------|-------|---------------|
| Docker-based Actors | ✅ | ✅ |
| Auto-scaling | ✅ | Manual (for now) |
| Webhooks | ✅ | ✅ |
| Scheduling | ✅ | Coming soon |

---

<div class="cta-box">

## Try Crawlee Cloud

Self-host your scrapers in minutes.

[Get Started →](/docs/) · [View on GitHub](https://github.com/crawlee-cloud/crawlee-cloud)

</div>
