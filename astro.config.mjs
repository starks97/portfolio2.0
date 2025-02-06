// @ts-check
<<<<<<< HEAD
import { defineConfig, envField } from 'astro/config';

import vercel from '@astrojs/vercel';

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
      SPOTIFY_REFRESH_TOKEN: envField.string({
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
=======
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({});
>>>>>>> 6f20ec47f1cd8bd722e078acecacbbbe376f3c46
