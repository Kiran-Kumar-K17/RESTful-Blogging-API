import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  // Use relative paths for all assets
  base: "./",

  server: {
    host: true,
    port: 5173,
    strictPort: false,
  },

  preview: {
    host: true,
    port: 4173,
  },

  build: {
    // Output directory
    outDir: "dist",

    // Generate sourcemaps for debugging (optional)
    sourcemap: false,

    // Ensure assets use relative paths
    assetsDir: "assets",

    rollupOptions: {
      output: {
        // Use relative paths for all assets
        assetFileNames: "assets/[name]-[hash][extname]",
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",

        // Manual chunks for better caching
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
        },
      },
    },

    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
});
