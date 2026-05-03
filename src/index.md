---
layout: home

hero:
  name: 'Crawlee Cloud'
  text: |
    The same SDK.
    Your own cloud.
  tagline: "A self-hosted, open-source platform for Crawlee and Apify Actors. Keep your code. Choose your infrastructure."
  actions:
    - theme: brand
      text: Deploy in 5 minutes →
      link: /docs/deployment
    - theme: alt
      text: View on GitHub
      link: https://github.com/crawlee-cloud/crawlee-cloud
---

<section class="home-section home-diff">
<div class="home-section-inner">
<div class="home-eyebrow">Drop-in compatible</div>
<h2 class="home-headline">Change one line. <span class="home-grad">Keep everything else.</span></h2>
<p class="home-sub">Your existing Apify Actor — the one you already wrote, tested, and shipped — runs on Crawlee Cloud without a single line of application code changing. Point it at your own API and you're done.</p>

<div class="home-code-block">
<div class="home-code-file">.env</div>

```diff
- APIFY_API_BASE_URL=https://api.apify.com
+ APIFY_API_BASE_URL=https://crawlee.your-company.com
```

</div>

<div class="home-code-block home-code-untouched">
<div class="home-code-file">main.ts · untouched</div>

```ts
import { Actor } from 'apify';
import { PlaywrightCrawler } from 'crawlee';

await Actor.init();
const crawler = new PlaywrightCrawler({ /* ... */ });
await crawler.run(['https://example.com']);
await Actor.exit();
```

</div>

</div>
</section>

<section class="home-section home-dashboard">
<div class="home-section-inner home-section-center">
<div class="home-eyebrow">Observe everything</div>
<h2 class="home-headline">Runs, logs, datasets — <span class="home-grad">in one place.</span></h2>
<p class="home-sub">Watch live runs, tail logs, browse datasets, replay failed runs. The same dashboard you'd expect from a hosted platform — except this one runs on your infrastructure.</p>

<div class="home-browser-frame">
<div class="home-browser-bar">
<span class="home-browser-dot home-browser-dot-red"></span>
<span class="home-browser-dot home-browser-dot-yellow"></span>
<span class="home-browser-dot home-browser-dot-green"></span>
<span class="home-browser-url">crawlee.your-company.com/console</span>
</div>
<picture>
<source media="(prefers-color-scheme: dark)" srcset="/dashboard-runs-dark.png 1x, /dashboard-runs-dark@2x.png 2x">
<img src="/dashboard-runs.png" srcset="/dashboard-runs.png 1x, /dashboard-runs@2x.png 2x" alt="Crawlee Cloud dashboard showing the runs list" class="home-browser-img" loading="lazy">
</picture>
</div>

</div>
</section>

<section class="home-section home-why">
<div class="home-section-inner">
<div class="home-section-center">
<div class="home-eyebrow">Why self-host</div>
<h2 class="home-headline">Three reasons it <span class="home-grad">belongs on your infrastructure.</span></h2>
</div>

<div class="home-why-grid">
<article class="home-why-card">
<div class="home-why-icon" aria-hidden="true">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
</div>
<h3>Sovereignty &amp; compliance</h3>
<p>Your scraped data — and the credentials that produced it — never leave the infrastructure you control. Pick your region, your encryption, your audit trail. GDPR, HIPAA, SOC 2 stay your decision, not a vendor's roadmap.</p>
</article>

<article class="home-why-card">
<div class="home-why-icon" aria-hidden="true">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M2 12h20"/></svg>
</div>
<h3>Costs you can predict</h3>
<p>Pay for the compute you actually run, on the cloud you already pay for. No per-run pricing, no surprise bills when a backfill spikes traffic. Spin runners up and down with the same tools you use for the rest of your stack.</p>
</article>

<article class="home-why-card">
<div class="home-why-icon" aria-hidden="true">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
</div>
<h3>Open source, no lock-in</h3>
<p>MIT licensed and forkable. Your scrapers use the standard Apify SDK, so they keep running anywhere that speaks the protocol — including Apify itself, if you ever change your mind. The platform is yours; the door is always open.</p>
</article>
</div>

</div>
</section>

<section class="home-section home-final-cta">
<div class="home-final-cta-card">
<div class="home-eyebrow">Get started</div>
<h2 class="home-final-cta-headline">Ready when you are. <span class="home-grad">Even on your laptop.</span></h2>
<p class="home-final-cta-sub">Spin it up on your laptop in five minutes. Move it to staging when you trust it. Run it in production when you're ready.</p>
<div class="home-final-cta-buttons">
<a class="home-btn home-btn-brand" href="/docs/deployment">Deploy in 5 minutes →</a>
<a class="home-btn home-btn-alt" href="https://github.com/crawlee-cloud/crawlee-cloud">View on GitHub</a>
</div>
</div>
</section>
