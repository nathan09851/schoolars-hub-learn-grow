import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Target modern browsers — removes legacy polyfills (~20KB savings)
    target: "es2020",

    // Use terser for better dead-code elimination than the default esbuild
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        // Remove pure annotations for smaller output
        pure_funcs: ["console.log", "console.info"],
      },
    },

    // Raise chunk warning threshold — we're splitting deliberately
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        // ── Manual chunk splitting ──────────────────────────────────────────
        // Each vendor group loads only when a page that needs it is visited.
        // React + Router are always needed, so they stay in "vendor-react".
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // Core React runtime — loaded on every page
            if (
              id.includes("react-dom") ||
              id.includes("react/") ||
              id.includes("react-router-dom") ||
              id.includes("scheduler")
            ) {
              return "vendor-react";
            }

            // Radix UI primitives — large, but only needed for interactive UI
            if (id.includes("@radix-ui")) {
              return "vendor-radix";
            }

            // TanStack React Query
            if (id.includes("@tanstack")) {
              return "vendor-query";
            }

            // Recharts + D3 — only used on pages with charts
            if (id.includes("recharts") || id.includes("d3-") || id.includes("victory")) {
              return "vendor-charts";
            }

            // ElevenLabs voice widget — large, load last
            if (id.includes("@elevenlabs") || id.includes("elevenlabs")) {
              return "vendor-elevenlabs";
            }

            // Supabase client
            if (id.includes("@supabase")) {
              return "vendor-supabase";
            }

            // Everything else (clsx, date-fns, lucide-react, etc.)
            return "vendor";
          }
        },

        // Stable asset file naming with content hash
        assetFileNames: "assets/[name]-[hash][extname]",
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
      },
    },

    // Generate sourcemaps for production error monitoring (set to false if not needed)
    sourcemap: false,
  },
}));
