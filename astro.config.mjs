// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',  // ← IMPORTANTE: Faltaba esta línea
  site: 'https://streamflix.example.com',
  base: './',
  trailingSlash: 'ignore',
  
  // Build configuration optimizada para producción
  build: {
    assets: 'assets',
    inlineStylesheets: 'auto',  // ← REVERTIR: de 'always' a 'auto' para mejor compatibilidad
  },
  
  // Eliminar configuraciones de desarrollo
  // server: { ... },  ← Comentar o eliminar
  
  // Vite configuration optimizada para CSS
  vite: {
    build: {
      cssCodeSplit: false,  // ← AÑADIR: Evita problemas de CSS splitting
      assetsInlineLimit: 0, // ← AÑADIR: Evita inline de assets para mejor debugging
    },
    css: {
      devSourcemap: true,   // ← AÑADIR: Mejora debugging en desarrollo
    },
  },
  
  // Resto de configuración mantener igual...
  image: {
    domains: ['images.unsplash.com', 'developer.apple.com', 'play.google.com', 'get.microsoft.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  
  redirects: {
    '/home': '/',
    '/movies': '/#peliculas',
    '/series': '/#series',
    '/docs': '/#documentales',
  },
});