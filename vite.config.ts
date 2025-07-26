import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    cors: true,
    headers: {
      'Cross-Origin-Embedder-Policy': 'credentialless',
    },
  },
  preview: {
    port: 8080,
    host: "::",
    cors: true,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    // Ensure process.env is available for better error reporting
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || mode),
  },
  build: {
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries into separate chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-tabs',
            '@radix-ui/react-accordion',
            '@radix-ui/react-select',
            '@radix-ui/react-tooltip'
          ],
          'supabase-vendor': ['@supabase/supabase-js', '@tanstack/react-query'],
          'utils-vendor': ['clsx', 'class-variance-authority', 'tailwind-merge'],
          'animation-vendor': ['framer-motion', 'embla-carousel-react'],
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'i18n-vendor': ['i18next', 'react-i18next'],
          'icons-vendor': ['lucide-react']
        }
      }
    },
    // Optimize dependencies
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@supabase/supabase-js'
      ]
    }
  }
}));
