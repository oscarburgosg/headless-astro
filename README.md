# Whole Wavelength - Blog Headless con Astro y WordPress

Un blog moderno y rápido construido con Astro que consume contenido de WordPress como CMS headless.

## ✨ Características

- 🚀 **Astro** - Framework web moderno y rápido
- 📝 **WordPress Headless** - Usa WordPress como CMS sin su frontend
- 🎨 **Tailwind CSS** - Estilos modernos y responsivos
- 📱 **Responsive Design** - Optimizado para todos los dispositivos
- ⚡ **Generación Estática** - Páginas pre-renderizadas para máximo rendimiento
- 🔍 **SEO Optimizado** - Meta tags y estructura semántica
- 🛠️ **TypeScript** - Tipado estático para mejor desarrollo

## 🚀 Estructura del Proyecto

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── MainLayout.astro     # Layout principal
│   ├── lib/
│   │   └── wordpress.ts         # Utilidades para WordPress API
│   ├── pages/
│   │   ├── blog/
│   │   │   └── [slug].astro     # Páginas dinámicas de posts
│   │   └── index.astro          # Página principal
│   └── styles/
│       └── global.css           # Estilos globales de Tailwind
├── .env.example                 # Variables de entorno de ejemplo
├── astro.config.mjs            # Configuración de Astro
└── package.json
```

## ⚙️ Configuración

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Copia el archivo `.env.example` a `.env.local` y configura tu URL de WordPress:

```bash
cp .env.example .env.local
```

Edita `.env.local` y configura:

```env
PUBLIC_WP_API_URL=https://tu-sitio-wordpress.com/wp-json/wp/v2
```

### 3. Configurar WordPress

Asegúrate de que tu WordPress tenga:
- REST API habilitada (viene por defecto)
- CORS configurado si está en un dominio diferente
- Posts publicados para mostrar contenido

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

Visita `http://localhost:4321` para ver tu blog.

## 🧞 Comandos Disponibles

| Comando                   | Acción                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Instala las dependencias                        |
| `npm run dev`             | Inicia el servidor de desarrollo                |
| `npm run build`           | Construye el sitio para producción              |
| `npm run preview`         | Previsualiza la build localmente                |
| `npm run astro ...`       | Ejecuta comandos CLI de Astro                   |

## 🌐 Despliegue en Vercel

1. Conecta tu repositorio a Vercel
2. Configura la variable de entorno `PUBLIC_WP_API_URL` en el dashboard de Vercel
3. Despliega automáticamente

### Variables de entorno en Vercel:

```
PUBLIC_WP_API_URL = https://tu-sitio-wordpress.com/wp-json/wp/v2
```

## 📝 Uso de la API de WordPress

La aplicación utiliza la REST API de WordPress para obtener:

- **Posts**: `/wp-json/wp/v2/posts`
- **Categorías**: `/wp-json/wp/v2/categories`
- **Páginas**: `/wp-json/wp/v2/pages`

### Funciones disponibles en `src/lib/wordpress.ts`:

- `getAllPosts()` - Obtiene todos los posts
- `getPostBySlug()` - Obtiene un post por su slug
- `getCategories()` - Obtiene todas las categorías
- `formatDate()` - Formatea fechas
- `getPlainExcerpt()` - Extrae excerpt sin HTML

## 🔧 Personalización

### Estilos

Los estilos están construidos con Tailwind CSS. Puedes personalizar:

- Colores en `src/layouts/MainLayout.astro`
- Componentes en las páginas individuales
- Estilos globales en `src/styles/global.css`

### Funcionalidades adicionales

Puedes extender la aplicación agregando:

- Paginación
- Búsqueda
- Filtros por categoría
- Comentarios
- Imágenes destacadas

## 🐛 Solución de Problemas

### Error: "PUBLIC_WP_API_URL environment variable is not defined"

- Verifica que hayas configurado la variable de entorno
- Asegúrate de que el archivo `.env.local` esté en la raíz del proyecto
- Reinicia el servidor de desarrollo después de cambiar variables de entorno

### No se muestran posts

- Verifica que la URL de WordPress sea correcta
- Asegúrate de que WordPress tenga posts publicados
- Revisa la consola del navegador para errores de CORS

## 📚 Recursos

- [Documentación de Astro](https://docs.astro.build)
- [WordPress REST API](https://developer.wordpress.org/rest-api/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vercel Deployment](https://vercel.com/docs)
