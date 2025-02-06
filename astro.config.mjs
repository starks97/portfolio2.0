// @ts-check

import { defineConfig, envField } from 'astro/config';

//import vercel from '@astrojs/vercel';

import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  adapter: node({
    mode: 'standalone',
  }),

  env: {
    schema: {
      SPOTIFY_CLIENT_ID: envField.string({
        context: 'server',
        access: 'secret',
        default: '',
      }),
      SPOTIFY_CLIENT_SECRET: envField.string({
        context: 'server',
        access: 'secret',
        default: '',
      }),
      SPOTIFY_REDIRECT_URI: envField.string({
        context: 'server',
        access: 'secret',
        default: '',
      }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
