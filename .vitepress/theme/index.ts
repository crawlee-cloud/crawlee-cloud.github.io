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
