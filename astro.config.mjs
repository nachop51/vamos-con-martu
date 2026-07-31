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
  site: 'https://viajaconmartu.com',

  vite: {
    plugins: [tailwindcss()],
    ...(isBuild && { cacheDir: 'node_modules/.vite-build' })
  },

  adapter: cloudflare({
    // "compile": images are resized with sharp at build time and shipped as
    // static files. The "cloudflare" service emits /cdn-cgi/image/ URLs,
    // which 404 on workers.dev / zones without Image Transformations.
    imageService: "compile"
  })
});