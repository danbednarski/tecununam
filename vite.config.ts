import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // GitHub Pages deployment: repository is served at /tecunuman/
  base: process.env.NODE_ENV === 'production' ? '/tecunuman/' : '/',

  // Keep it simple - serve from root, just like before
  root: '.',

  // Development server settings
  server: {
    port: 8080,
    open: false,
  },

  // Build output
  build: {
    outDir: 'dist',
    // Don't minify for now - easier debugging
    minify: false,
  },
});

