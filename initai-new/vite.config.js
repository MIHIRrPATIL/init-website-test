import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { plugin as markdown } from "vite-plugin-markdown"; // Updated import

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(), 
    markdown({
      mode: ['html', 'react'] // Add this configuration
    })
  ],
  assetsInclude: ['**/*.md'],
  base: '/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    historyApiFallback: true,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    }
  },
});