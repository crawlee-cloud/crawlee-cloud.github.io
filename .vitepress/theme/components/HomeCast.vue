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
