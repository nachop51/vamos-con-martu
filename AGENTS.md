# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Uses **bun** as the package manager (`bun.lock`).

- `bun install` — install dependencies
- `astro dev --background` — start dev server (localhost:4321). Always use background mode; manage with `astro dev stop`, `astro dev status`, `astro dev logs`
- `bun run build` — production build to `./dist/`
- `bun run preview` — build + run in the real Workers runtime via `wrangler dev`
- `bun run deploy` — build + deploy to Cloudflare Workers
- `bun run cf-typegen` — regenerate `worker-configuration.d.ts` after changing bindings in `wrangler.jsonc`
- `bunx astro check` — typecheck `.astro` files

No test framework or linter is configured.

## Architecture

Astro 7 app deployed to **Cloudflare Workers** via `@astrojs/cloudflare` (SSR adapter).

- Routes are file-based: `src/pages/*.astro` (see [routing guide](https://docs.astro.build/en/guides/routing/))
- **Cloudflare runtime access**: `src/env.d.ts` extends `App.Locals` with the adapter's `Runtime<Env>`, so Cloudflare bindings/env are available as `Astro.locals.runtime` in pages and `context.locals.runtime` in endpoints/middleware. The `Env` type comes from `worker-configuration.d.ts` (generated — never edit by hand; run `bun run cf-typegen` instead)
- **Bindings** (KV, D1, R2, vars, etc.) are declared in `wrangler.jsonc`. `platformProxy` is enabled in `astro.config.mjs`, so wrangler bindings also work in local `astro dev`
- Image service is Cloudflare's (`imageService: "cloudflare"` in `astro.config.mjs`)

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
