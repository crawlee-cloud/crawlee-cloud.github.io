---
title: Run Web Scrapers on Crawlee Cloud
description: Deploy Playwright, Puppeteer, and Cheerio scrapers on your own infrastructure. Self-hosted, open-source scraping platform.
---

# Run Your Scrapers Anywhere

Crawlee Cloud supports all major scraping technologies. Deploy your code and run it at scale.

## Supported Technologies

<div class="tech-grid">

### [Playwright Scrapers](/run/playwright-scrapers)
Cross-browser automation with Chromium, Firefox, and WebKit.

### [Puppeteer Scrapers](/run/puppeteer-scrapers)
Native Chrome DevTools Protocol for fast Chromium automation.

### [Cheerio Scrapers](/run/cheerio-scrapers)
Lightweight HTML parsing without browser overhead.

</div>

## How It Works

```bash
# 1. Create your scraper
npx crawlee create my-scraper

# 2. Push to Crawlee Cloud
crc push my-scraper

# 3. Run it
crc call my-scraper
```

## Why Self-Host?

| Benefit | Description |
|---------|-------------|
| **No Per-Request Fees** | Fixed VPS cost, unlimited runs |
| **Full Control** | Your code, your data, your rules |
| **Any Proxy** | Use any proxy provider you want |
| **Open Source** | MIT licensed, fully customizable |

---

<div class="cta-box">

## Deploy Your First Scraper

Get started in under 5 minutes.

[Read the Docs →](/docs/)

</div>
