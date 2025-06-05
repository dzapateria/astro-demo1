// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://streamflix.example.com',
  base: '/',
  trailingSlash: 'ignore',
  
  // Build configuration
  build: {
    assets: 'assets',
    inlineStylesheets: 'auto',
  },
  
  // Server configuration for development
  server: {
    port: 4321,
    host: true,
  },
  
  // Vite configuration
  vite: {
    css: {
      devSourcemap: true,
    },
    define: {
      'process.env.CONTEXT7_DEBUG': JSON.stringify(true),
    },
    optimizeDeps: {
      exclude: [],
    },
  },
  
  // Experimental features
  experimental: {
    // Add experimental features as they become available
  },
  
  // Image optimization
  image: {
    domains: ['images.unsplash.com', 'developer.apple.com', 'play.google.com', 'get.microsoft.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  
  // Prefetch configuration
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  
  // Markdown configuration
  markdown: {
    shikiConfig: {
      theme: 'dark-plus',
      wrap: true,
    },
  },
  
  // Redirects
  redirects: {
    '/home': '/',
    '/movies': '/#peliculas',
    '/series': '/#series',
    '/docs': '/#documentales',
  },
});
