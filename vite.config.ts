import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    drop: ["console"],
  },
  plugins: [vue()],
  envPrefix: "APP_",
  server: {
    host: "0.0.0.0",
    port: 5173,
    open: true,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
