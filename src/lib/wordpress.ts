// Tipos para WordPress API
export interface WordPressPost {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: any[];
  categories: number[];
  tags: number[];
  _links: any;
}

export interface WordPressCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
  meta: any[];
  _links: any;
}

// Configuración de la API
const WP_API_BASE = import.meta.env.PUBLIC_WP_API_URL;

if (!WP_API_BASE) {
  throw new Error('PUBLIC_WP_API_URL environment variable is not defined');
}

// Función para hacer peticiones a la API de WordPress
async function wpFetch(endpoint: string, options: RequestInit = {}) {
  const url = `${WP_API_BASE}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching from WordPress API (${url}):`, error);
    throw error;
  }
}

// Obtener todos los posts
export async function getAllPosts(params: {
  per_page?: number;
  page?: number;
  orderby?: string;
  order?: 'asc' | 'desc';
  categories?: string;
  search?: string;
} = {}): Promise<WordPressPost[]> {
  const searchParams = new URLSearchParams();
  
  // Parámetros por defecto
  searchParams.set('per_page', (params.per_page || 10).toString());
  searchParams.set('page', (params.page || 1).toString());
  searchParams.set('orderby', params.orderby || 'date');
  searchParams.set('order', params.order || 'desc');
  
  // Parámetros opcionales
  if (params.categories) searchParams.set('categories', params.categories);
  if (params.search) searchParams.set('search', params.search);
  
  const endpoint = `/posts?${searchParams.toString()}`;
  return await wpFetch(endpoint);
}

// Obtener un post por slug
export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  try {
    const posts = await wpFetch(`/posts?slug=${slug}`);
    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error(`Error fetching post with slug "${slug}":`, error);
    return null;
  }
}

// Obtener categorías
export async function getCategories(): Promise<WordPressCategory[]> {
  return await wpFetch('/categories?per_page=100');
}

// Obtener posts por categoría
export async function getPostsByCategory(categoryId: number, limit: number = 10): Promise<WordPressPost[]> {
  return await wpFetch(`/posts?categories=${categoryId}&per_page=${limit}`);
}

// Función de utilidad para formatear fechas
export function formatDate(dateString: string, locale: string = 'es-ES'): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Función para extraer el excerpt sin HTML
export function getPlainExcerpt(post: WordPressPost, maxLength: number = 150): string {
  const excerpt = post.excerpt.rendered.replace(/<[^>]*>/g, '').trim();
  return excerpt.length > maxLength ? excerpt.substring(0, maxLength) + '...' : excerpt;
}