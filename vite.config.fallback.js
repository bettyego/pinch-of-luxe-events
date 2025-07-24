import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Fallback configuration with HMR disabled for WebSocket issues
export default defineConfig({
   base: '/',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'cache-buster',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // Add cache-busting headers to all requests
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, proxy-revalidate, max-age=0');
          res.setHeader('Pragma', 'no-cache');
          res.setHeader('Expires', '0');
          res.setHeader('Surrogate-Control', 'no-store');
          res.setHeader('Last-Modified', new Date().toUTCString());
          res.setHeader('ETag', Date.now().toString());
          next();
        });
      }
    }
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  server: {
    port: 5174,
    host: 'localhost',
    open: true,
    strictPort: true,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Surrogate-Control': 'no-store',
      'Last-Modified': new Date().toUTCString()
    },
    // Disable HMR to avoid WebSocket issues
    hmr: false,
    watch: {
      usePolling: true,
      interval: 1000
    },
    force: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      },
      '/health': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    // Increase chunk size warning limit to 1000KB (1MB)
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Add hash to filenames for cache busting in production
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
        // Manual chunks for better code splitting
        manualChunks: {
          // Vendor libraries
          vendor: ['react', 'react-dom'],
          // Router and navigation
          router: ['react-router-dom'],
          // UI and animation libraries
          ui: ['framer-motion', 'react-icons', 'sweetalert2'],
          // Form and utility libraries
          utils: ['react-select', 'react-swipeable', '@emailjs/browser'],
          // Swiper library (large)
          swiper: ['swiper'],
          // Internationalization
          i18n: ['i18next', 'react-i18next', 'i18next-browser-languagedetector']
        }
      }
    }
  }
})
