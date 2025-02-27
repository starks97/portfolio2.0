// @ts-check

import { defineConfig, envField } from 'astro/config';

import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';

import solidJs from '@astrojs/solid-js';

import alpinejs from '@astrojs/alpinejs';

import vercel from '@astrojs/vercel';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [solidJs(), alpinejs()],
  adapter: vercel(),
});