import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/mypages/', 
  root: 'src', 
  build: {
    outDir: '../docs', 
    emptyOutDir: true, 
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        about: resolve(__dirname, 'src/about/index.html'),
        about2: resolve(__dirname, 'src/about2/index.html'),
        reactapp: resolve(__dirname, 'src/react-app/index.html'),
        todo: resolve(__dirname, 'src/to-do/index.html'),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/sitewide.scss";`, 
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
}
});
