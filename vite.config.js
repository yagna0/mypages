import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
    base: "/mypages/",
    plugins: [react()],
     build: {
        outDir: "docs",
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                about: resolve(__dirname, "about/index.html"),
                about2: resolve(__dirname, "about2/index.html"),
            },
        },
    },
});