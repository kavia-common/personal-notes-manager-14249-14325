import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

export default defineConfig({
  adapter: node({
    mode: 'standalone'
  }),
  output: 'hybrid',
  integrations: [
    tailwind({
      applyBaseStyles: false
    })
  ],
  server: {
    host: '0.0.0.0',
    allowedHosts: ['.kavia.ai'],
    port: 3000,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  vite: {
    define: {
      // Value can be overridden at build time by environment, keep default empty.
      'import.meta.env.PUBLIC_API_BASE': JSON.stringify(''),
    },
  },
});
