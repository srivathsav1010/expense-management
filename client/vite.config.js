import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@":            path.resolve(__dirname, "./src"),
      "@constants":   path.resolve(__dirname, "./src/constants"),
      "@context":     path.resolve(__dirname, "./src/context"),
      "@hooks":       path.resolve(__dirname, "./src/hooks"),
      "@utils":       path.resolve(__dirname, "./src/utils"),
      "@components":  path.resolve(__dirname, "./src/components"),
      "@pages":       path.resolve(__dirname, "./src/pages"),
      "@services":    path.resolve(__dirname, "./src/services"),
    },
  },
  server: {
    port: 3000,
    open: true,
    // Proxy API calls to Express during development
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
