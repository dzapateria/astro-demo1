// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',  // ← IMPORTANTE: Faltaba esta línea
  site: 'https://streamflix.example.com',
  base: '/',
  trailingSlash: 'ignore',
  
  // Build configuration optimizada para producción
  build: {
    assets: 'assets',
    inlineStylesheets: 'always',  // ← CAMBIAR: de 'auto' a 'always'
  },
  
  // Eliminar configuraciones de desarrollo
  // server: { ... },  ← Comentar o eliminar
  
  // Vite configuration simplificada
  vite: {
    build: {
      cssCodeSplit: false,  // ← AÑADIR: Evita problemas de CSS splitting
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