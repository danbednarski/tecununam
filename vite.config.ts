import { defineConfig } from 'vite';

export default defineConfig({
  // GitHub Pages deployment: repository is served at /tecununam/
  base: process.env.NODE_ENV === 'production' ? '/tecununam/' : '/',

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

