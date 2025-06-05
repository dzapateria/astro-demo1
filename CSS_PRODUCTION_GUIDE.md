# Guía para Solucionar Problemas de CSS en Producción - Astro

## 🚨 Problemas Comunes Identificados

### 1. **Configuración `inlineStylesheets: 'always'`**
- **Problema**: Puede causar conflictos con CSS variables y fuentes externas
- **Solución**: Cambiar a `'auto'` o `'never'` según necesidades

### 2. **Referencias Incorrectas a Archivos CSS**
- **Problema**: Usar rutas como `/src/styles/global.css` en `<link>` tags
- **Solución**: Usar `@import` dentro de `<style is:global>` o mover CSS a `/public/`

### 3. **CSS Code Splitting**
- **Problema**: Astro puede dividir CSS en múltiples archivos causando problemas de carga
- **Solución**: Configurar `cssCodeSplit: false` en Vite

## ✅ Soluciones Implementadas

### 1. **Configuración Optimizada en `astro.config.mjs`**
```javascript
export default defineConfig({
  base: './',                   // CRÍTICO: Rutas relativas para deployment
  build: {
    inlineStylesheets: 'auto',  // Mejor compatibilidad
  },
  vite: {
    build: {
      cssCodeSplit: false,      // Evita división de CSS
      assetsInlineLimit: 0,     // Mejor debugging
    },
    css: {
      devSourcemap: true,       // Sourcemaps en desarrollo
    },
  },
});
```

### 2. **Importación Correcta de CSS Global**
```astro
<!-- En Layout.astro -->
<style is:global>
  @import '../styles/global.css';
</style>
```

### 3. **Configuración PostCSS**
```javascript
// postcss.config.cjs
module.exports = {
  plugins: {
    'postcss-nested': {},
    autoprefixer: {},
  }
};
```

## 🔧 Mejores Prácticas Adicionales

### 1. **Verificar CSS Variables**
- Asegúrate de que todas las CSS variables estén definidas en `:root`
- Evita referencias circulares en variables CSS

### 2. **Optimización de Fuentes**
```astro
<!-- Preload fuentes críticas -->
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

### 3. **Debugging en Producción**
```bash
# Construir y servir localmente para testing
npm run build
npm run preview
```

### 4. **Alternativas de Configuración**

#### Opción A: CSS Externo (Recomendado para sitios grandes)
```javascript
build: {
  inlineStylesheets: 'never'
}
```

#### Opción B: CSS Inline (Para sitios pequeños)
```javascript
build: {
  inlineStylesheets: 'always'
}
```

#### Opción C: Automático (Recomendado - Default)
```javascript
build: {
  inlineStylesheets: 'auto' // Inline si < 4KB, externo si > 4KB
}
```

## 🚀 Comandos de Testing

### Desarrollo
```bash
npm run dev
```

### Build y Preview Local
```bash
npm run build
npm run preview
```

### Debugging CSS
```bash
# Inspeccionar archivos generados
ls -la dist/
ls -la dist/_astro/
```

## 📋 Checklist de Verificación

- [ ] ✅ `inlineStylesheets` configurado apropiadamente
- [ ] ✅ CSS global importado correctamente
- [ ] ✅ `cssCodeSplit: false` configurado
- [ ] ✅ PostCSS configurado
- [ ] ✅ Fuentes preloaded
- [ ] ✅ CSS variables definidas en `:root`
- [ ] ✅ Build local funciona correctamente
- [ ] ✅ Preview local muestra estilos correctos

## 🔍 Problemas Específicos por Plataforma

### Vercel/Netlify
- Verificar que `output: 'static'` esté configurado
- Revisar headers de cache para archivos CSS

### GitHub Pages
- Configurar `base` correctamente si no está en root
- Verificar rutas relativas vs absolutas

### Servidores Propios
- Verificar configuración de MIME types para CSS
- Revisar headers de compresión (gzip/brotli)

## 📚 Recursos Adicionales

- [Documentación oficial de Astro - Styling](https://docs.astro.build/en/guides/styling/)
- [Configuración de Build - Astro](https://docs.astro.build/en/reference/configuration-reference/#build-options)
- [Troubleshooting CSS - GitHub Issues](https://github.com/withastro/astro/issues?q=css+production)