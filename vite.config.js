import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    base: "/music-player/",
    define: {
      "process.env": {
        AUTH_BASE_URL: process.env.AUTH_BASE_URL,
        API_BASE_URL: process.env.API_BASE_URL,
        CLIENT_ID: process.env.CLIENT_ID,
        CLIENT_SECRET: process.env.CLIENT_SECRET,
        SITE_DOMAIN:
          mode === "development"
            ? process.env.SITE_DOMAIN_DEV
            : process.env.SITE_DOMAIN_PROD,
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});