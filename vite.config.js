import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      mode === "analyze" &&
        visualizer({
          open: true,
          filename: "stats.html",
          gzipSize: true,
          brotliSize: true,
        }),
    ].filter(Boolean),
    server: {
      host: "0.0.0.0",
    },
    base: "/music-player/",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
