import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/mypages/", // Ensure the base URL is correct
  build: {
    outDir: "docs", // Directory for GitHub Pages (or your hosting directory)
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about/index.html"),
        about2: resolve(__dirname, "about2/index.html"),
        reactABC123: resolve(__dirname, "react-app/index.html"),
        reactABC12: resolve(__dirname, "react-app/index.jsx"),
        reactcomp: resolve(__dirname, "react-components/itemList.jsx"),

      },
    },
  },
  server: {
    historyApiFallback: true, // Ensures React Router handles the routing in production
  },
});
