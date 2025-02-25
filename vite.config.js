import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/mypages/', // Keep this for GitHub Pages
  root: resolve(__dirname, 'src'), // Ensure Vite picks files from "src"
  build: {
    outDir: '../docs', // Build files into "docs/" for GitHub Pages
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        about: resolve(__dirname, 'src/about/index.html'),
        about2: resolve(__dirname, 'src/about2/index.html'),
        reactApp: resolve(__dirname, 'src/react-app/index.html'),
        todo: resolve(__dirname, 'src/to-do/index.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
