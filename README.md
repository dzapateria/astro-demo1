# Astro Landing Page - Estilo Netflix/Steam

Un proyecto de Astro con una landing page moderna de estilo oscuro inspirada en Netflix y Steam, utilizando las mejores prácticas de Astro 5.9.0 y Context7.

## 🚀 Características

- **Diseño Oscuro Moderno**: Inspirado en Netflix y Steam
- **Astro 5.9.0**: Última versión con mejoras de rendimiento
- **Context7 Integration**: Gestión avanzada de contexto y estado
- **Responsive Design**: Optimizado para todos los dispositivos
- **Componentes Reutilizables**: Arquitectura modular
- **Animaciones Suaves**: Transiciones y efectos visuales

## 📁 Estructura del Proyecto

```text
/
├── public/
│   ├── favicon.svg
│   └── images/           # Imágenes de la landing
├── src/
│   ├── components/       # Componentes reutilizables
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── MovieCard.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── Layout.astro  # Layout principal
│   ├── pages/
│   │   └── index.astro   # Página principal
│   └── styles/
│       └── global.css    # Estilos globales
└── package.json
```

## 🎨 Diseño y Estilo

### Paleta de Colores
- **Fondo Principal**: `#0a0a0a` (Negro profundo)
- **Fondo Secundario**: `#1a1a1a` (Gris oscuro)
- **Acentos**: `#e50914` (Rojo Netflix) / `#1b2838` (Azul Steam)
- **Texto**: `#ffffff` (Blanco) / `#b3b3b3` (Gris claro)

### Tipografía
- **Principal**: Inter, system-ui, sans-serif
- **Títulos**: Poppins, sans-serif

## 🧞 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto:

| Comando                   | Acción                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Instala las dependencias                         |
| `npm run dev`             | Inicia el servidor de desarrollo en `localhost:4321` |
| `npm run build`           | Construye el sitio para producción en `./dist/` |
| `npm run preview`         | Previsualiza la build localmente                 |
| `npm run astro ...`       | Ejecuta comandos CLI como `astro add`, `astro check` |
| `npm run astro -- --help` | Obtiene ayuda usando el CLI de Astro            |

## 🔧 Context7 Integration

Context7 es un sistema de gestión de contexto avanzado que permite:

### Características Principales
- **Estado Global**: Gestión centralizada del estado de la aplicación
- **Contexto Reactivo**: Actualizaciones automáticas de componentes
- **Persistencia**: Almacenamiento local del estado
- **TypeScript Support**: Tipado completo para mejor DX

### Uso Básico

```astro
---
// En cualquier componente Astro
import { useContext7 } from '../utils/context7';

const { state, setState } = useContext7();
---

<div>
  <h1>{state.title}</h1>
  <button onclick={() => setState({ title: 'Nuevo Título' })}>
    Cambiar Título
  </button>
</div>
```

### Configuración

```javascript
// astro.config.mjs
export default defineConfig({
  integrations: [
    // Context7 se integra automáticamente
  ],
  vite: {
    define: {
      'process.env.CONTEXT7_DEBUG': JSON.stringify(true)
    }
  }
});
```

## 🎬 Componentes de la Landing

### Hero Section
- Video de fondo o imagen hero
- Título principal con animación
- Botones de CTA con efectos hover

### Carrusel de Contenido
- Cards deslizables estilo Netflix
- Hover effects con información adicional
- Lazy loading para optimización

### Footer
- Links de navegación
- Información de contacto
- Redes sociales

## 🚀 Optimizaciones

- **Lazy Loading**: Carga diferida de imágenes
- **Code Splitting**: División automática del código
- **CSS Purging**: Eliminación de CSS no utilizado
- **Image Optimization**: Compresión automática de imágenes
- **Preloading**: Precarga de recursos críticos

## 📱 Responsive Design

- **Mobile First**: Diseño optimizado para móviles
- **Breakpoints**: 
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

## 🔍 SEO y Accesibilidad

- Meta tags optimizados
- Estructura semántica HTML5
- Alt text en todas las imágenes
- Contraste de colores accesible
- Navegación por teclado

## 🛠️ Desarrollo

### Instalación
```bash
npm install
```

### Desarrollo
```bash
npm run dev
```

### Build
```bash
npm run build
```

## 📚 Recursos

- [Documentación de Astro](https://docs.astro.build)
- [Context7 Documentation](https://context7.dev)
- [Discord de Astro](https://astro.build/chat)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
