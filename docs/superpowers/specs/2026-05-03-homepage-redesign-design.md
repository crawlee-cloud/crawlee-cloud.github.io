# Homepage Redesign — Design Spec

**Date:** 2026-05-03
**Surface:** `src/index.md` (and supporting CSS in `.vitepress/theme/custom.css`)
**Scope:** Homepage only. `/docs/`, `/compare/`, `/run/`, `/solutions/` are out of scope for this redesign.

---

## 1. Context

The current homepage is a default VitePress home layout dressed up with brand CSS: a hero with a tagline, six generic feature cards, a "BUILT BY DEVELOPERS, FOR DEVELOPERS ✨" strip with no logos, and a `100% / Zero / Full` benefits grid. It loads fine but does too little — a visitor learns the project exists and is open source, but not what makes it specifically worth their five minutes.

The site is a VitePress 1.x project. Brand identity (logo, gradient, typography) is solid and stays. Information architecture (top-level surfaces) stays. Only the homepage content and structure change.

## 2. Audience and primary action

**Audience:** A developer who already writes Apify SDK actors and wants self-hosted control — for cost predictability, data residency, compliance, sovereignty, or simple infrastructure preference. Framing is positive throughout: we stand for control and openness, not against any vendor. The page never names Apify as a competitor or suggests the visitor should "leave" anywhere.

**Primary action:** Self-host it in five minutes. The hero brand button leads to `/docs/deployment`. The visitor's mental model after one screen of scrolling should be: "I run `docker compose up`, I push my actor, I run it, I watch it in a dashboard."

**Secondary action:** View the GitHub repo. Single alt button in hero and final CTA.

## 3. Page structure

Five sections, top to bottom:

1. **Hero** — split layout: copy on the left, asciinema cast on the right.
2. **Drop-in compatible** — env-var diff plus an "untouched" code block.
3. **Dashboard** — full-width screenshot inside a browser frame, with caption.
4. **Why self-host** — three cards: Sovereignty & compliance, Costs you can predict, Open source no lock-in.
5. **Final CTA** — repeated hero buttons inside a glow card.

Removed from current page: the "BUILT BY DEVELOPERS, FOR DEVELOPERS ✨" strip, the Product Hunt badge, and the `100% / Zero / Full` benefits grid. These are replaced by sections 2–5 above. (See §11 for the rationale on each removal.)

## 4. Section: Hero

### 4.1 Copy

| Element | Content |
| --- | --- |
| Name (gradient) | `Crawlee Cloud` |
| Text (white, bold, two lines) | `The same SDK.` `Your own cloud.` |
| Tagline (muted) | `A self-hosted, open-source platform for Crawlee and Apify Actors. Keep your code. Choose your infrastructure.` |
| Brand button → `/docs/deployment` | `Deploy in 5 minutes →` |
| Alt button → GitHub repo | `View on GitHub` |

### 4.2 Layout

- Two columns at >= 960px viewport. Single column stacked on mobile (copy on top, cast below).
- Left column: name, text, tagline, buttons. Vertical center-aligned to the right column's cast.
- Right column: terminal cast (see §4.3) in a styled window frame.
- Hero gradient backdrop (existing) stays. Floating-logo animation is removed — the cast is the focal point now.

### 4.3 Asciinema cast (right column)

Real recording, embedded via the official `asciinema-player` web component (loaded only on the homepage to avoid weighing down docs). Cast contents:

```
# 1. Boot the platform on your own box.
$ docker compose up -d
  Creating crawlee-api      ... done
  Creating crawlee-runner   ... done
  Creating crawlee-postgres ... done

# 2. Push your existing Apify Actor — no rewrite.
$ crawlee-cloud push my-actor
  Building image my-actor:0.1.0 ...
  ✓ Build #42 ready

# 3. Run it.
$ crawlee-cloud run my-actor
  Run abc123 started
  Run abc123 SUCCEEDED — 1,243 items in dataset
$
```

Window chrome: macOS-style traffic-light dots (red/yellow/green), title `~/my-actor`, a small `▶ LIVE` tag in the bar.

The cast autoplays muted on first viewport entry, loops with a 2-second pause between cycles, and pauses when the user scrolls past it. A static fallback image (`hero-cast-poster.png`) loads first to avoid layout shift.

## 5. Section: Drop-in compatible

### 5.1 Copy

- **Eyebrow:** `DROP-IN COMPATIBLE`
- **Headline:** `Change one line. Keep everything else.` (last two words use the brand gradient)
- **Sub:** `Your existing Apify Actor — the one you already wrote, tested, and shipped — runs on Crawlee Cloud without a single line of application code changing. Point it at your own API and you're done.`

### 5.2 Layout

Centered single column, max-width 720px. Two stacked code blocks below the copy.

### 5.3 Code blocks

**Block 1 — `.env` diff:**

```diff
- APIFY_API_BASE_URL=https://api.apify.com
+ APIFY_API_BASE_URL=https://crawlee.your-company.com
```

Removed line uses muted red (`#f85149`). Added line uses muted green (`#56d364`). Both lines have full-width tinted backgrounds. The file label `.env` sits above in muted text.

**Block 2 — `main.ts · untouched`:**

The file label has a green check badge and the word "untouched". The block contains real, abbreviated TypeScript using the standard Apify SDK plus Crawlee's `PlaywrightCrawler`:

```ts
import { Actor } from 'apify';
import { PlaywrightCrawler } from 'crawlee';

await Actor.init();
const crawler = new PlaywrightCrawler({ /* ... */ });
await crawler.run(['https://example.com']);
await Actor.exit();
```

Syntax highlighting via VitePress's built-in shiki (the existing config). Border tinted green at low opacity so the visual match between "untouched" label and the block itself is unmissable.

## 6. Section: Dashboard

### 6.1 Copy

- **Eyebrow:** `OBSERVE EVERYTHING`
- **Headline:** `Runs, logs, datasets — in one place.` (last three words gradient)
- **Sub:** `Watch live runs, tail logs, browse datasets, replay failed runs. The same dashboard you'd expect from a hosted platform — except this one runs on your infrastructure.`

### 6.2 Layout

Centered, copy on top, screenshot below. Screenshot lives inside a browser-window mockup with the URL `crawlee.your-company.com/runs` shown in the URL bar. No annotated callouts (they age badly when the UI changes).

### 6.3 Asset

- File: `src/public/dashboard-runs.png` (and a 2x retina variant `dashboard-runs@2x.png`).
- Real screenshot from `packages/dashboard` showing the runs list view at a meaningful state (≥ 5 runs visible, mix of statuses, the gradient brand visible in the dashboard's own header).
- Width: image rendered at 1280px container width, screenshot exported at 2560px to be sharp on retina.
- Light-mode and dark-mode variants. VitePress `<picture>` pattern with `data-theme` switching, mirroring how the existing `logo-light.svg` / `logo-dark.svg` work.

## 7. Section: Why self-host

### 7.1 Copy

- **Eyebrow:** `WHY SELF-HOST`
- **Headline:** `Three reasons it belongs on your infrastructure.` (last four words gradient)

Three cards, equal-width grid (1 column mobile, 3 columns desktop):

| Title | Body |
| --- | --- |
| Sovereignty & compliance | Your scraped data — and the credentials that produced it — never leave the infrastructure you control. Pick your region, your encryption, your audit trail. GDPR, HIPAA, SOC 2 stay your decision, not a vendor's roadmap. |
| Costs you can predict | Pay for the compute you actually run, on the cloud you already pay for. No per-run pricing, no surprise bills when a backfill spikes traffic. Spin runners up and down with the same tools you use for the rest of your stack. |
| Open source, no lock-in | MIT licensed and forkable. Your scrapers use the standard Apify SDK, so they keep running anywhere that speaks the protocol — including Apify itself, if you ever change your mind. The platform is yours; the door is always open. |

### 7.2 Layout

Each card has:
- A 44×44 rounded icon container with a translucent gradient background and a brand-orange Feather-style stroke icon (shield, plus-cross, code-brackets respectively).
- A 17px bold title.
- A 14px body, ~3 lines.

Hover: 1px translucent-orange border, slight upward translation, no scale (the existing scale on feature cards is too playful for this context).

## 8. Section: Final CTA

### 8.1 Copy

- **Headline:** `Ready when you are. Even on your laptop.` (last three words gradient)
- **Sub:** `Spin it up on your laptop in five minutes. Move it to staging when you trust it. Run it in production when you're ready.`
- **Brand button:** `Deploy in 5 minutes →` → `/docs/deployment`
- **Alt button:** `View on GitHub` → repo

### 8.2 Layout

A single rounded card, padded heavily (56px vertical), with a soft brand-gradient radial glow as background. Centered content. Buttons reuse the exact styling of the hero buttons.

## 9. Assets required (checklist)

- [ ] **Asciinema cast** (`hero-deploy.cast`) — real recording matching §4.3 sequence. Located at `src/public/casts/hero-deploy.cast`.
- [ ] **Cast poster image** (`hero-cast-poster.png`) — first-frame still, loaded as fallback.
- [ ] **Dashboard screenshot** (`dashboard-runs.png` + `dashboard-runs@2x.png`, light + dark variants) — see §6.3.
- [ ] **Three icons** for the why-self-host cards — Feather-style strokes, brand-orange, 22×22 inside a 44×44 rounded gradient tile. (Can reuse SVG inline, no asset file needed.)

## 10. Files to modify

| File | Change |
| --- | --- |
| `src/index.md` | Replace entire body. New frontmatter (hero block can stay as VitePress structured block, but the `features:` array is removed). New custom HTML for sections 2–5. |
| `.vitepress/theme/custom.css` | Add styles for the new sections (env-diff, dashboard frame, why-cards, final CTA). Remove styles for `.trusted-by-strip`, `.benefits`, `.benefit`, `.producthunt-badge`, and the floating-logo animation (`@keyframes float` and `.VPHomeHero .image-src` rule). Keep brand color variables, button gradients, and global VitePress overrides. |
| `.vitepress/theme/index.ts` | Register the asciinema-player web component on the home route only (use VitePress's `Layout` slot or a small client-only enhancement). |
| `package.json` | Add `asciinema-player` dependency. |
| `src/public/casts/hero-deploy.cast` | New asset. |
| `src/public/dashboard-runs*.png` | New assets (4 files for light/dark × 1x/2x). |
| `src/public/hero-cast-poster.png` | New asset. |

## 11. Out of scope (explicit)

- **Other content surfaces** (`/docs/`, `/compare/`, `/run/`, `/solutions/`). Their internal pages and SEO copy stay as-is for now.
- **Top nav** — no changes to navigation items.
- **Footer** — no changes.
- **Sidebar / docs layout** — unchanged.
- **Brand identity** (logo, colors, gradient) — unchanged.
- **Product Hunt badge** — removed from the homepage. If it needs to stay live, drop it into the footer area in a later pass.
- **Trust strip with logos** — explicitly omitted. We don't have real logos to put there, so we leave the slot out entirely rather than fake it.
- **Customer testimonials / quotes** — same reason.

## 12. Accessibility and responsive

- Hero stacks to single column at < 960px; cast dimensions remain readable on mobile.
- All text contrast meets WCAG AA against the dark background (verify the `#8b949e` muted text against `#0d1117` — ratio ~5.0:1, passes).
- The asciinema cast must have a textual transcript available (visually-hidden but in the DOM) so screen readers and search engines see the commands. The `.cast` file's plain-text equivalent works.
- Buttons retain visible focus rings on keyboard navigation; do not remove the default.
- Reduced-motion: cast pauses on first frame instead of autoplaying when `prefers-reduced-motion: reduce` is set.

## 13. SEO and metadata

- Page `<title>` and `<meta description>` in `.vitepress/config.ts` already align with the new positioning. No change required.
- The new `<h1>` ("The same SDK. Your own cloud.") replaces the old hero text — keep the H1 single and only on the homepage.
- The `og-image.png` in `src/public/` is unchanged; it's the social card and the new hero copy doesn't break what it shows.

## 14. Risks and tradeoffs

- **Asciinema is third-party JavaScript on the homepage.** Mitigated by (a) loading only on `/`, (b) lazy-loading the player, (c) static poster fallback so the page renders instantly without it.
- **Dashboard screenshot rots when the dashboard UI changes.** Mitigated by including the screenshot capture in the release checklist for the dashboard package, and by avoiding annotated callouts that lock the screenshot to a specific UI state.
- **The `crawlee.your-company.com` placeholder may read as fake.** Considered alternatives: `localhost:3000` (too dev-only), `crawlee.internal` (corporate-y). The chosen value reads as a real production hostname pattern that any team would actually use.

## 15. Success criteria

After ship, the homepage should:
1. Communicate the wedge ("same SDK, your cloud") in under 5 seconds of viewing.
2. Show a real deploy-and-run sequence above the fold via the asciinema cast.
3. Demonstrate compatibility with a single-line diff that any Apify SDK user instantly recognises.
4. Lead a clicking visitor to `/docs/deployment` as the primary destination.
5. Avoid any negative comparison to other vendors, any unsourced trust signals (fake logos, fake testimonials), and any UI annotations that will rot when the dashboard changes.
