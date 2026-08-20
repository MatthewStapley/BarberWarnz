// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Final deployed URL — used for canonical links, OG tags, and sitemap-style
  // absolute URL generation. Served from the domain root (no `base`) since
  // this is a custom domain, not a project-pages subpath.
  site: 'https://barberwarnz.co.uk',

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  }
});