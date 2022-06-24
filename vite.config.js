import { defineConfig } from "vite"
// import EnvironmentPlugin from "vite-plugin-environment";

import react from "@vitejs/plugin-react";

import path from "path";
import "dotenv/config";

export default ({ mode }) => {
  return defineConfig({
    plugins: [react()],
    base: "/music-player/",
    define: {
      "process.env": {
        "AUTH_BASE_URL": process.env.AUTH_BASE_URL,
        "API_BASE_URL": process.env.API_BASE_URL,
        "CLIENT_ID": process.env.CLIENT_ID,
        "CLIENT_SECRET": process.env.CLIENT_SECRET,
        "SITE_DOMAIN": mode === "development" ? process.env.SITE_DOMAIN_DEV : process.env.SITE_DOMAIN_PROD
      }
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src")
      }
    },
  })
}

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(), EnvironmentPlugin({
//     "AUTH_BASE_URL": process.env.AUTH_BASE_URL,
//     "API_BASE_URL": process.env.API_BASE_URL,
//     "CLIENT_ID": process.env.CLIENT_ID,
//     "CLIENT_SECRET": process.env.CLIENT_SECRET,
//     "SITE_DOMAIN": process.env.SITE_DOMAIN
//   })],
//   base: "/music-player/",
//   define: {
//     'process.env': {}
//   },
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src')
//     }
//   },
// })

// export default defineConfig(({ mode }) => {
//   const env = loadEnv(mode, process.cwd())

//   const processEnvValues = {
//     'process.env': Object.entries(env).reduce(
//       (prev, [key, val]) => {
//         return {
//           ...prev,
//           [key]: val,
//         }
//       },
//       {},
//     )
//   }
//   return {
//     plugins: [react()],
//     base: "/music-player/",
//     define: processEnvValues,
//     resolve: {
//       alias: {
//         '@': path.resolve(__dirname, './src')
//       }
//     },
//   }
// })