# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current default-VitePress homepage with a hero-and-five-section page tuned for Apify SDK developers who want self-hosted control, anchored by a real asciinema cast and a real dashboard screenshot.

**Architecture:** VitePress 1.x with the built-in `home` layout, customised by overriding the `home-hero-image` slot to render a Vue component (`HomeCast.vue`) that wraps the asciinema-player web component. Sections 2–5 of the page live as inline HTML inside `src/index.md` and are styled via additions to `.vitepress/theme/custom.css`. Real assets (cast file, dashboard screenshot) drop into `src/public/` once produced; placeholder stubs let the rest of the work proceed in parallel.

**Tech Stack:** VitePress 1.x, Vue 3, asciinema-player (npm), TypeScript, Markdown.

**Spec:** `docs/superpowers/specs/2026-05-03-homepage-redesign-design.md`

---

## File map

| File | Disposition | Responsibility |
| --- | --- | --- |
| `src/index.md` | Modify (replace body) | Page assembly: hero frontmatter + inline HTML for sections 2–5 |
| `.vitepress/theme/components/HomeCast.vue` | Create | Window-framed asciinema cast with poster, reduced-motion handling, viewport-triggered autoplay |
| `.vitepress/theme/index.ts` | Modify | Register `HomeCast` globally and override the `home-hero-image` slot |
| `.vitepress/theme/custom.css` | Modify | Add styles for sections 2–5; remove obsolete styles (`.trusted-by-strip`, `.benefits`, `.benefit`, `.producthunt-badge`, floating-logo animation) |
| `package.json` | Modify | Add `asciinema-player` dependency |
| `src/public/casts/hero-deploy.cast` | Create (placeholder, then real) | Asciinema cast file |
| `src/public/hero-cast-poster.png` | Create (placeholder, then real) | First-frame still for the cast |
| `src/public/dashboard-runs.png` | Create (placeholder, then real) | Dashboard screenshot, light theme, 1× |
| `src/public/dashboard-runs@2x.png` | Create (placeholder, then real) | Same, retina |
| `src/public/dashboard-runs-dark.png` | Create (placeholder, then real) | Dark theme, 1× |
| `src/public/dashboard-runs-dark@2x.png` | Create (placeholder, then real) | Same, retina |

---

### Task 1: Branch, baseline, and commit the spec

**Files:**
- Create: branch `feat/homepage-redesign` from `main`
- Modify: nothing yet

- [ ] **Step 1: Create the feature branch**

```bash
cd /Users/me/Workspace/personel/crawlee-cloud/crawlee-cloud.github.io
git status   # confirm clean
git checkout -b feat/homepage-redesign
```

Expected: `Switched to a new branch 'feat/homepage-redesign'`

- [ ] **Step 2: Verify baseline build and dev server**

```bash
npm install
npm run build
```

Expected: build succeeds, `dist/` produced, no errors.

```bash
npm run dev
```

Open http://localhost:5173/ in a browser. Verify the current homepage renders. Stop the server with `Ctrl+C`.

- [ ] **Step 3: Stage the existing spec and plan and commit**

The spec and this plan already live on disk under `docs/superpowers/`. They're not yet tracked.

```bash
git add docs/superpowers/specs/2026-05-03-homepage-redesign-design.md
git add docs/superpowers/plans/2026-05-03-homepage-redesign.md
git status
```

Expected: only those two files staged.

```bash
git commit -m "docs: add homepage redesign spec and plan"
```

---

### Task 2: Add the asciinema-player dependency

**Files:**
- Modify: `package.json`, `package-lock.json`

- [ ] **Step 1: Install the dependency**

```bash
npm install asciinema-player@^3.8.0
```

Expected: package added under `dependencies` in `package.json`. Lockfile updated.

- [ ] **Step 2: Verify build still passes**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore(website): add asciinema-player dependency"
```

---

### Task 3: Create placeholder asset stubs

These are placeholders so the page can be built and reviewed end-to-end before the real cast and screenshots are produced. They get swapped in Task 9.

**Files:**
- Create: `src/public/casts/hero-deploy.cast`
- Create: `src/public/hero-cast-poster.png`
- Create: `src/public/dashboard-runs.png`
- Create: `src/public/dashboard-runs@2x.png`
- Create: `src/public/dashboard-runs-dark.png`
- Create: `src/public/dashboard-runs-dark@2x.png`

- [ ] **Step 1: Create the cast directory and a placeholder cast file**

```bash
mkdir -p src/public/casts
```

Write the file `src/public/casts/hero-deploy.cast` with the following exact content (asciinema v2 format — newline-separated JSON):

```
{"version": 2, "width": 80, "height": 20, "title": "Crawlee Cloud — deploy", "env": {"SHELL": "/bin/zsh", "TERM": "xterm-256color"}}
[0.0, "o", "[33m# 1. Boot the platform on your own box.[0m\r\n"]
[0.4, "o", "[33m$[0m docker compose up -d\r\n"]
[1.2, "o", "[32m  Creating crawlee-api      ... done[0m\r\n"]
[1.6, "o", "[32m  Creating crawlee-runner   ... done[0m\r\n"]
[2.0, "o", "[32m  Creating crawlee-postgres ... done[0m\r\n"]
[2.6, "o", "\r\n[33m# 2. Push your existing Apify Actor — no rewrite.[0m\r\n"]
[3.0, "o", "[33m$[0m crawlee-cloud push my-actor\r\n"]
[3.8, "o", "  Building image my-actor:0.1.0 ...\r\n"]
[5.2, "o", "[32m  ✓ Build #42 ready[0m\r\n"]
[5.8, "o", "\r\n[33m# 3. Run it.[0m\r\n"]
[6.0, "o", "[33m$[0m crawlee-cloud run my-actor\r\n"]
[6.6, "o", "  Run abc123 started\r\n"]
[8.0, "o", "[32m  Run abc123 SUCCEEDED — 1,243 items in dataset[0m\r\n"]
[8.4, "o", "[33m$[0m "]
```

Verify the file is valid JSON-Lines:

```bash
head -1 src/public/casts/hero-deploy.cast | python3 -c "import json,sys;json.loads(sys.stdin.read())"
```

Expected: no error (the header line parses).

- [ ] **Step 2: Create placeholder PNG files**

We need 5 PNG placeholders. Use ImageMagick if available, otherwise any 1×1 PNG works — these are stubs that get swapped in Task 9. The exact pixel content doesn't matter for the placeholder.

```bash
# Check for ImageMagick
command -v magick || command -v convert
```

If ImageMagick is available:

```bash
magick -size 1280x800 canvas:'#0d1117' -fill '#f98618' -gravity center \
  -pointsize 36 -annotate 0 'PLACEHOLDER\ndashboard-runs.png' \
  src/public/dashboard-runs.png

magick -size 2560x1600 canvas:'#0d1117' -fill '#f98618' -gravity center \
  -pointsize 72 -annotate 0 'PLACEHOLDER\ndashboard-runs@2x.png' \
  src/public/dashboard-runs@2x.png

magick -size 1280x800 canvas:'#ffffff' -fill '#eb284b' -gravity center \
  -pointsize 36 -annotate 0 'PLACEHOLDER\ndashboard-runs-dark.png\n(swap dark/light if needed)' \
  src/public/dashboard-runs-dark.png

magick -size 2560x1600 canvas:'#ffffff' -fill '#eb284b' -gravity center \
  -pointsize 72 -annotate 0 'PLACEHOLDER\ndashboard-runs-dark@2x.png' \
  src/public/dashboard-runs-dark@2x.png

magick -size 1280x400 canvas:'#0d1117' -fill '#f98618' -gravity center \
  -pointsize 32 -annotate 0 'PLACEHOLDER\nhero-cast-poster.png' \
  src/public/hero-cast-poster.png
```

If ImageMagick is **not** available, use this Node one-liner to write a minimal 1×1 PNG to each path:

```bash
node -e '
const fs = require("fs");
const png = Buffer.from("89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000d49444154789c63f8cfc0000000030001011a3a8c530000000049454e44ae426082", "hex");
const paths = [
  "src/public/dashboard-runs.png",
  "src/public/dashboard-runs@2x.png",
  "src/public/dashboard-runs-dark.png",
  "src/public/dashboard-runs-dark@2x.png",
  "src/public/hero-cast-poster.png"
];
paths.forEach(p => fs.writeFileSync(p, png));
console.log("Wrote " + paths.length + " placeholder PNGs");
'
```

Expected: `Wrote 5 placeholder PNGs`.

- [ ] **Step 3: Verify build still passes**

```bash
npm run build
```

Expected: build succeeds (VitePress copies `src/public/*` to `dist/`).

- [ ] **Step 4: Commit**

```bash
git add src/public/casts src/public/dashboard-runs*.png src/public/hero-cast-poster.png
git commit -m "feat(website): add placeholder homepage assets (cast + dashboard screenshots)"
```

---

### Task 4: Create the HomeCast Vue component

**Files:**
- Create: `.vitepress/theme/components/HomeCast.vue`

- [ ] **Step 1: Make the components directory**

```bash
mkdir -p .vitepress/theme/components
```

- [ ] **Step 2: Write `.vitepress/theme/components/HomeCast.vue`**

```vue
<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue';

const props = defineProps<{
  src?: string;
  poster?: string;
}>();

const castSrc = props.src ?? '/casts/hero-deploy.cast';
const posterSrc = props.poster ?? '/hero-cast-poster.png';

const containerRef = ref<HTMLElement | null>(null);
const playerRef = ref<HTMLElement | null>(null);
const started = ref(false);
const reduceMotion = ref(false);

let player: { play?: () => void; pause?: () => void; dispose?: () => void } | null = null;
let observer: IntersectionObserver | null = null;

async function startPlayer() {
  if (!playerRef.value || started.value) return;
  started.value = true;

  const mod = await import('asciinema-player');
  // CSS lives in dist alongside the player module.
  await import('asciinema-player/dist/bundle/asciinema-player.css');

  player = mod.create(castSrc, playerRef.value, {
    autoPlay: !reduceMotion.value,
    loop: !reduceMotion.value,
    idleTimeLimit: 2,
    theme: 'asciinema',
    poster: 'npt:0:00',
    fit: 'width',
    controls: false,
  });
}

onMounted(() => {
  reduceMotion.value =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!containerRef.value) return;

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          startPlayer();
          observer?.disconnect();
          observer = null;
        }
      }
    },
    { threshold: 0.25 },
  );
  observer.observe(containerRef.value);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  player?.dispose?.();
  player = null;
});
</script>

<template>
  <div ref="containerRef" class="home-cast">
    <div class="home-cast-frame">
      <div class="home-cast-bar">
        <span class="home-cast-dot home-cast-dot-red" />
        <span class="home-cast-dot home-cast-dot-yellow" />
        <span class="home-cast-dot home-cast-dot-green" />
        <span class="home-cast-title">~/my-actor</span>
        <span class="home-cast-live">▶ LIVE</span>
      </div>
      <div ref="playerRef" class="home-cast-body">
        <img v-if="!started" :src="posterSrc" alt="" class="home-cast-poster" />
      </div>
      <noscript>
        <pre class="home-cast-fallback">
# 1. Boot the platform on your own box.
$ docker compose up -d
  Creating crawlee-api      ... done
  Creating crawlee-runner   ... done
  Creating crawlee-postgres ... done

# 2. Push your existing Apify Actor — no rewrite.
$ crawlee-cloud push my-actor
  ✓ Build #42 ready

# 3. Run it.
$ crawlee-cloud run my-actor
  Run abc123 SUCCEEDED — 1,243 items in dataset
        </pre>
      </noscript>
    </div>
  </div>
</template>

<style scoped>
.home-cast {
  width: 100%;
  max-width: 560px;
}
.home-cast-frame {
  background: #0d1117;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
}
.home-cast-bar {
  background: #161b22;
  padding: 8px 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.home-cast-dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  display: inline-block;
}
.home-cast-dot-red { background: #ff5f56; }
.home-cast-dot-yellow { background: #ffbd2e; }
.home-cast-dot-green { background: #27c93f; }
.home-cast-title {
  color: #8b949e;
  font-size: 12px;
  margin-left: 8px;
  font-family: ui-sans-serif, system-ui, sans-serif;
}
.home-cast-live {
  margin-left: auto;
  font-size: 10px;
  color: #f98618;
  background: rgba(249, 134, 24, 0.1);
  padding: 2px 8px;
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
}
.home-cast-body {
  min-height: 240px;
  position: relative;
  background: #0d1117;
}
.home-cast-poster {
  width: 100%;
  height: auto;
  display: block;
}
.home-cast-fallback {
  padding: 16px 18px;
  color: #c9d1d9;
  font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
  font-size: 13px;
  line-height: 1.65;
  margin: 0;
}
</style>
```

- [ ] **Step 3: Verify build still passes**

```bash
npm run build
```

Expected: build succeeds. The component is not yet referenced anywhere, so this is just a Vue/TS validation.

- [ ] **Step 4: Commit**

```bash
git add .vitepress/theme/components/HomeCast.vue
git commit -m "feat(website): add HomeCast component for asciinema hero"
```

---

### Task 5: Register HomeCast globally and override the hero image slot

**Files:**
- Modify: `.vitepress/theme/index.ts`

- [ ] **Step 1: Replace `.vitepress/theme/index.ts` with the following**

```ts
// Custom VitePress Theme
import { h } from 'vue';
import DefaultTheme from 'vitepress/theme';
import HomeCast from './components/HomeCast.vue';
import './custom.css';

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-hero-image': () => h(HomeCast),
    });
  },
  enhanceApp({ app }) {
    app.component('HomeCast', HomeCast);
  },
};
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Visually verify in dev mode**

```bash
npm run dev
```

Open http://localhost:5173/. The hero's right column (where the logo used to be) now shows the HomeCast frame with the placeholder poster and the asciinema cast playing the placeholder content. Stop the server with `Ctrl+C`.

If the cast does not play: check the browser console for errors. The most common issue is the cast file path — confirm `/casts/hero-deploy.cast` resolves (network tab should show 200).

- [ ] **Step 4: Commit**

```bash
git add .vitepress/theme/index.ts
git commit -m "feat(website): wire HomeCast into the VitePress hero slot"
```

---

### Task 6: Update homepage hero copy and remove obsolete frontmatter

**Files:**
- Modify: `src/index.md` (just the frontmatter and the lines immediately following the hero — sections 2–5 land in Task 7)

- [ ] **Step 1: Replace the top of `src/index.md`**

Replace the entire frontmatter block (lines 1–51) and the body up to but not including the existing `<style>` block with the following. The `<style>` block at the bottom of the file gets removed in Task 7 along with the obsolete sections.

```markdown
---
layout: home

hero:
  name: 'Crawlee Cloud'
  text: 'The same SDK. Your own cloud.'
  tagline: "A self-hosted, open-source platform for Crawlee and Apify Actors. Keep your code. Choose your infrastructure."
  actions:
    - theme: brand
      text: Deploy in 5 minutes →
      link: /docs/deployment
    - theme: alt
      text: View on GitHub
      link: https://github.com/crawlee-cloud/crawlee-cloud
---

```

Concretely: remove the `image:` block (the slot is now filled by `HomeCast`), remove the entire `features:` array, remove the `<div class="trusted-by-strip">` and `<div class="producthunt-badge">` and `<div class="custom-section">` blocks, and update the `text` / `tagline` / first action label and link.

Leave the inline `<style>` block at the bottom of the file in place for now — Task 7 replaces the whole body together with section markup.

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Visually verify in dev mode**

```bash
npm run dev
```

Open http://localhost:5173/. The hero shows: gradient "Crawlee Cloud" name, "The same SDK. Your own cloud." text, the new tagline, two buttons (`Deploy in 5 minutes →` to `/docs/deployment`, `View on GitHub` to the repo). The HomeCast still renders to the right. The features grid below the hero is gone (only the now-orphaned old sections remain — they get removed in Task 7). Stop the server.

- [ ] **Step 4: Commit**

```bash
git add src/index.md
git commit -m "feat(website): rewrite homepage hero copy and remove features grid"
```

---

### Task 7: Replace homepage body with sections 2–5

**Files:**
- Modify: `src/index.md` (everything from end of frontmatter through end of file)

- [ ] **Step 1: Replace the body of `src/index.md`**

After the closing `---` of the frontmatter, the file body should be **exactly** the following. This removes the inline `<style>` block (those rules move into `custom.css` in Task 8), removes the trusted-by/PH/benefits sections, and adds the four new sections.

```markdown
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
        <span class="home-browser-url">crawlee.your-company.com/runs</span>
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
    <h2 class="home-final-cta-headline">Ready when you are. <span class="home-grad">Even on your laptop.</span></h2>
    <p class="home-final-cta-sub">Spin it up on your laptop in five minutes. Move it to staging when you trust it. Run it in production when you're ready.</p>
    <div class="home-final-cta-buttons">
      <a class="home-btn home-btn-brand" href="/docs/deployment">Deploy in 5 minutes →</a>
      <a class="home-btn home-btn-alt" href="https://github.com/crawlee-cloud/crawlee-cloud">View on GitHub</a>
    </div>
  </div>
</section>
```

The classes used here (`.home-section`, `.home-eyebrow`, `.home-headline`, `.home-grad`, `.home-sub`, `.home-code-block`, `.home-code-untouched`, `.home-browser-frame`, `.home-browser-*`, `.home-why-grid`, `.home-why-card`, `.home-why-icon`, `.home-final-cta`, `.home-final-cta-*`, `.home-btn`, `.home-btn-brand`, `.home-btn-alt`) all get defined in Task 8.

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: build succeeds. Markdown is valid; the new sections are unstyled but should not raise build errors.

- [ ] **Step 3: Visually verify in dev mode**

```bash
npm run dev
```

Open http://localhost:5173/. The four new sections appear below the hero, currently unstyled (raw text, default code blocks, no browser frame for the dashboard). The structure should be visible — eyebrow text, headlines, code blocks, three cards stacked, final CTA. Stop the server.

- [ ] **Step 4: Commit**

```bash
git add src/index.md
git commit -m "feat(website): add drop-in compat, dashboard, why-cards, final CTA sections"
```

---

### Task 8: Add section styles to `custom.css` and remove obsolete styles

**Files:**
- Modify: `.vitepress/theme/custom.css`

- [ ] **Step 1: Remove obsolete styles from `.vitepress/theme/custom.css`**

Delete the following blocks (search the file for these selectors):

- `.trusted-by-strip` and `.trusted-by-strip p`
- `.custom-section` and `.custom-section h2`
- `.benefits` and `.benefit`, `.benefit:hover`, `.benefit::before`, `.benefit .number`, `.benefit .label`
- `@keyframes float` and `.VPHomeHero .image-src` (the floating-logo rule)
- `.logo` (the `width: auto; height: 80% !important;` rule that no longer applies)
- The `@media (max-width: 768px)` adjustments to `.benefits` and `.benefit .number` (remove only those two rules; keep the hero text-size adjustments inside the same media query).

Keep everything else (CSS variables, Hero/VPFeatures rules, animations except `float`, navigation/sidebar/code-block/footer rules, scrollbar rules).

- [ ] **Step 2: Append the new section styles to `.vitepress/theme/custom.css`**

Append the following at the end of the file (after the existing scrollbar rules):

```css
/* ========================================
   Home — shared section primitives
   ======================================== */
.home-section {
  padding: 64px 24px;
  max-width: 1152px;
  margin: 0 auto;
}
.home-section-inner {
  max-width: 720px;
  margin: 0 auto;
}
.home-section-center {
  text-align: center;
}
.home-eyebrow {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #f98618;
  font-weight: 700;
  margin-bottom: 12px;
}
.home-headline {
  font-size: 28px;
  font-weight: 700;
  color: var(--cc-text-primary);
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin: 0 0 12px;
  border: 0;
  padding: 0;
}
.home-headline .home-grad,
.home-final-cta-headline .home-grad {
  background: linear-gradient(135deg, var(--cc-orange-start), var(--cc-red-end));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.home-sub {
  font-size: 15px;
  color: var(--cc-text-secondary);
  line-height: 1.5;
  margin: 0 auto 24px;
  max-width: 620px;
}

/* ========================================
   Home — drop-in compatible (env diff)
   ======================================== */
.home-diff .home-code-block {
  margin-top: 20px;
}
.home-code-file {
  font-size: 11px;
  color: var(--cc-text-secondary);
  margin-bottom: 8px;
  font-family: ui-sans-serif, system-ui, sans-serif;
  display: flex;
  align-items: center;
  gap: 8px;
}
.home-code-untouched .home-code-file {
  color: #56d364;
}
.home-code-untouched .home-code-file::before {
  content: "✓";
  background: rgba(86, 211, 100, 0.15);
  color: #56d364;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
}
.home-code-untouched div[class*="language-"] {
  border-color: rgba(86, 211, 100, 0.25) !important;
}

/* ========================================
   Home — dashboard browser frame
   ======================================== */
.home-browser-frame {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--cc-border);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.3);
  margin-top: 28px;
}
.home-browser-bar {
  background: var(--vp-c-bg-alt);
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid var(--cc-border);
}
.home-browser-dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  display: inline-block;
}
.home-browser-dot-red { background: #ff5f56; }
.home-browser-dot-yellow { background: #ffbd2e; }
.home-browser-dot-green { background: #27c93f; }
.home-browser-url {
  flex: 1;
  background: var(--vp-c-bg);
  color: var(--cc-text-secondary);
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 6px;
  margin-left: 12px;
  text-align: center;
  font-family: ui-monospace, monospace;
}
.home-browser-img {
  width: 100%;
  height: auto;
  display: block;
}

/* ========================================
   Home — why self-host cards
   ======================================== */
.home-why .home-section-inner { max-width: 1152px; }
.home-why-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 28px;
}
.home-why-card {
  background: var(--cc-bg-card);
  border: 1px solid var(--cc-border);
  border-radius: 12px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}
.home-why-card:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 178, 0, 0.4);
  box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.25);
}
.home-why-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(255, 178, 0, 0.15), rgba(235, 40, 75, 0.15));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--cc-orange-mid);
}
.home-why-icon svg { width: 22px; height: 22px; }
.home-why-card h3 {
  font-size: 17px;
  font-weight: 700;
  color: var(--cc-text-primary);
  margin: 0;
  border: 0;
  padding: 0;
  background: none;
  -webkit-text-fill-color: initial;
}
.home-why-card p {
  font-size: 14px;
  color: var(--cc-text-secondary);
  line-height: 1.55;
  margin: 0;
}

/* ========================================
   Home — final CTA
   ======================================== */
.home-final-cta-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--cc-border);
  border-radius: 16px;
  padding: 56px 32px;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.home-final-cta-card::before {
  content: "";
  position: absolute;
  inset: -50%;
  background:
    radial-gradient(circle at 30% 50%, rgba(255, 178, 0, 0.12), transparent 35%),
    radial-gradient(circle at 70% 50%, rgba(235, 40, 75, 0.12), transparent 35%);
  pointer-events: none;
}
.home-final-cta-headline {
  font-size: 36px;
  font-weight: 800;
  color: var(--cc-text-primary);
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin: 0 0 12px;
  border: 0;
  padding: 0;
  position: relative;
  z-index: 1;
}
.home-final-cta-sub {
  font-size: 16px;
  color: var(--cc-text-secondary);
  line-height: 1.5;
  max-width: 560px;
  margin: 0 auto 28px;
  position: relative;
  z-index: 1;
}
.home-final-cta-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
  position: relative;
  z-index: 1;
  flex-wrap: wrap;
}
.home-btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.home-btn-brand {
  background: linear-gradient(135deg, var(--cc-orange-start), var(--cc-red-end));
  color: #fff;
  box-shadow: 0 8px 24px -8px rgba(255, 178, 0, 0.5);
}
.home-btn-brand:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px -8px rgba(255, 178, 0, 0.6);
  color: #fff;
}
.home-btn-alt {
  background: transparent;
  color: var(--cc-text-primary);
  border: 1px solid var(--cc-border);
}
.home-btn-alt:hover {
  border-color: var(--cc-orange-start);
  color: var(--cc-text-primary);
}

/* ========================================
   Home — responsive
   ======================================== */
@media (max-width: 768px) {
  .home-headline { font-size: 22px; }
  .home-final-cta-headline { font-size: 26px; }
  .home-why-grid { grid-template-columns: 1fr; }
  .home-section { padding: 48px 20px; }
}

/* ========================================
   Home — reduced motion
   ======================================== */
@media (prefers-reduced-motion: reduce) {
  .home-why-card { transition: none; }
  .home-btn-brand,
  .home-btn-brand:hover { transform: none; }
}
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Visually verify in dev mode — full page review**

```bash
npm run dev
```

Open http://localhost:5173/ and walk the page top-to-bottom. Check:

- Hero: gradient name, two-line text, tagline, two buttons. HomeCast plays on the right.
- Drop-in compatible: orange eyebrow, gradient last words on the headline, env diff with red/green lines, code block with green ✓ and "untouched" label.
- Dashboard: centered eyebrow + headline + caption, browser frame with traffic-light dots, the URL `crawlee.your-company.com/runs`, the placeholder image inside.
- Why self-host: three cards with brand-orange icons, hover lift effect.
- Final CTA: rounded card with soft glow, headline, sub, two buttons matching the hero.

Toggle the OS to dark mode (or use VitePress's theme toggle if visible) and confirm both themes render acceptably.

Resize the browser window to ~700px wide and confirm: hero stacks (cast goes below copy), why-cards become a single column.

Stop the server.

- [ ] **Step 4: Commit**

```bash
git add .vitepress/theme/custom.css
git commit -m "feat(website): style new homepage sections, drop obsolete styles"
```

---

### Task 9: Swap placeholder assets for real ones

This task is the **only** task that depends on assets being produced outside the editor. The branch can be opened as a PR before this step (with placeholder assets) and this task lands as the final commit before merge.

**Files:**
- Replace: `src/public/casts/hero-deploy.cast`
- Replace: `src/public/hero-cast-poster.png`
- Replace: `src/public/dashboard-runs.png` (and `@2x`, dark, dark@2x)

- [ ] **Step 1: Record the asciinema cast**

On a machine with the platform running locally:

```bash
asciinema rec src/public/casts/hero-deploy.cast \
  --title "Crawlee Cloud — deploy" \
  --idle-time-limit 2 \
  --rows 20 --cols 80
```

Inside the recording, run the three steps from §4.3 of the spec:

```bash
# 1. Boot the platform on your own box.
docker compose up -d

# 2. Push your existing Apify Actor — no rewrite.
crawlee-cloud push my-actor

# 3. Run it.
crawlee-cloud run my-actor
```

Press `Ctrl+D` to stop. Trim or re-record if the timing is loose (`asciinema rec` overwrites the file each time).

- [ ] **Step 2: Capture the cast poster**

Run `asciinema-player` locally on the cast (or use the dev server) and screenshot the first frame at the rendered width.

```bash
# Quick path: open the homepage in dev mode, take a screenshot of the cast frame
# at its first frame, save as src/public/hero-cast-poster.png
```

The poster should match the dimensions of the rendered cast (≈ 560 × 240 in the current layout) so it doesn't cause layout shift.

- [ ] **Step 3: Capture dashboard screenshots**

In a separate terminal, run the platform monorepo's dashboard at production-like content (≥ 5 runs, mixed statuses). Take four screenshots at viewport `1280 × 800`:

| File | Theme | DPR |
| --- | --- | --- |
| `src/public/dashboard-runs.png` | Light | 1× |
| `src/public/dashboard-runs@2x.png` | Light | 2× |
| `src/public/dashboard-runs-dark.png` | Dark | 1× |
| `src/public/dashboard-runs-dark@2x.png` | Dark | 2× |

The 2× variants should be 2560 × 1600. Compress with `pngquant --quality=80-95` if file size is a concern.

- [ ] **Step 4: Verify build and visual review**

```bash
npm run build
npm run dev
```

Open http://localhost:5173/, confirm:

- The hero cast plays the real `docker compose up → push → run` sequence
- The dashboard image shows real runs, not the placeholder
- Both light and dark modes render the appropriate dashboard variant

Stop the server.

- [ ] **Step 5: Commit**

```bash
git add src/public/casts/hero-deploy.cast src/public/hero-cast-poster.png src/public/dashboard-runs*.png
git commit -m "feat(website): land real homepage assets (cast + dashboard screenshots)"
```

---

### Task 10: Push branch and open PR

**Files:** none (Git operations only)

- [ ] **Step 1: Confirm `gh` CLI is on the right account**

```bash
gh auth status
```

If the active account is not `aminembarki`:

```bash
gh auth switch --user aminembarki
```

- [ ] **Step 2: Push the branch**

```bash
git push -u origin feat/homepage-redesign
```

- [ ] **Step 3: Open the PR**

```bash
gh pr create --title "feat(website): homepage redesign — hero cast, drop-in diff, dashboard" --body "$(cat <<'EOF'
## Summary
- Replaces the default-VitePress homepage with a hero anchored by a real asciinema cast and four sections targeted at Apify SDK developers who want self-hosted control.
- Adds `HomeCast.vue` wrapping the asciinema-player web component (lazy-loaded, viewport-triggered, reduced-motion aware).
- Drops the empty trust strip, the Product Hunt badge, and the `100% / Zero / Full` benefits grid.

## Test plan
- [ ] `npm run build` passes
- [ ] `npm run dev` — homepage renders end-to-end in both light and dark mode
- [ ] Hero cast autoplays and loops; static poster shows on first paint
- [ ] `prefers-reduced-motion: reduce` pauses the cast on the first frame
- [ ] All three primary CTAs (`Deploy in 5 minutes →`, `View on GitHub`, repeat in final CTA) link correctly
- [ ] Mobile (≤ 768px) layout: hero stacks, why-cards become single column
- [ ] No console errors in dev or production builds

## Related
- Spec: \`docs/superpowers/specs/2026-05-03-homepage-redesign-design.md\`
- Plan: \`docs/superpowers/plans/2026-05-03-homepage-redesign.md\`
EOF
)"
```

Expected: `gh` returns the PR URL. Open it in a browser to confirm.

---

## Self-review

**Spec coverage check (against `2026-05-03-homepage-redesign-design.md`):**

- §1 Context — informational, no task needed.
- §2 Audience and primary action — encoded in copy decisions throughout Tasks 6–7. ✓
- §3 Page structure — Tasks 6–8 implement all five sections in order. ✓
- §4 Hero copy and layout — Task 6 (copy) + Task 5 (cast slot wiring) + Task 4 (cast component). ✓
- §5 Drop-in compatible — Task 7 (markup) + Task 8 (styles). ✓
- §6 Dashboard — Task 7 (markup with `<picture>` for theme variants) + Task 8 (browser-frame styles) + Task 3/9 (assets). ✓
- §7 Why self-host — Task 7 (three articles) + Task 8 (grid + card styles). ✓
- §8 Final CTA — Task 7 (markup) + Task 8 (card + glow styles). ✓
- §9 Assets — Task 3 (placeholders) + Task 9 (real assets). ✓
- §10 Files to modify — every file in the spec table is touched in at least one task. ✓
- §11 Out of scope — respected: no `gh` PR templates touched outside the website repo, no docs/sidebar/footer changes, no logo trust strip added. ✓
- §12 Accessibility — Task 4 includes `prefers-reduced-motion`; Task 8 adds the corresponding CSS rule. The cast `<noscript>` fallback gives screen readers and search engines the literal command sequence. Buttons are real `<a>` tags inheriting VitePress focus rings. ✓
- §13 SEO — `<title>` / `<meta description>` not changed; `<h1>` count stays at 1 (the hero text from frontmatter). ✓
- §14 Risks — asciinema is lazy-loaded (Task 4); placeholder assets allow review-before-real (Task 3 → Task 9). ✓
- §15 Success criteria — verified at Task 8 Step 3 (full visual review) and Task 9 Step 4 (real-asset review).

**Placeholder scan:** No "TBD", "TODO", "fill in details", or "similar to Task N". Every code/CSS/markup block is the real content the engineer pastes.

**Type/name consistency:** Class names used in Task 7 markup match the selectors defined in Task 8 CSS. Component name `HomeCast` matches the Vue file name and the slot registration in Task 5. The cast file path (`/casts/hero-deploy.cast`) is identical in Task 3 (file location), Task 4 (component default prop), and Task 9 (replacement target).

**One known item the plan acknowledges but defers to future work:** the asciinema-player module's CSS import path (`asciinema-player/dist/bundle/asciinema-player.css`) is taken from the v3 docs as of writing — if the package version pinned in Task 2 ships a different path, Task 4 Step 2 needs the import line adjusted accordingly. This is a minor mechanical fix surfaced by the build error if it happens.
