// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

// Builds and the dev server share node_modules/.vite by default; a build
// wipes the optimize-deps cache and 500s any dev server that's running.
// Give builds their own cache dir so both can coexist.
const isBuild = process.argv.includes('build');

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    ...(isBuild && { cacheDir: 'node_modules/.vite-build' })
  },

  adapter: cloudflare({
    imageService: "cloudflare"
  })
});