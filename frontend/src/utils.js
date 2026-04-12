const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('finzacore_token');
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error en la petición');
  return data;
}

export const api = {
  // Public
  getBlogs: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return apiFetch(`/api/blogs${q ? '?' + q : ''}`);
  },
  getBlog: (slug) => apiFetch(`/api/blogs/${slug}`),
  getCategories: () => apiFetch('/api/categories'),

  // Auth
  login: (password) => apiFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ password })
  }),
  verify: () => apiFetch('/api/auth/verify'),

  // Admin
  adminGetBlogs: () => apiFetch('/api/admin/blogs'),
  adminCreate: (data) => apiFetch('/api/admin/blogs', { method: 'POST', body: JSON.stringify(data) }),
  adminUpdate: (id, data) => apiFetch(`/api/admin/blogs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  adminDelete: (id) => apiFetch(`/api/admin/blogs/${id}`, { method: 'DELETE' }),
};

export function getCategoryClass(cat) {
  const map = {
    'Finanzas': 'finanzas',
    'Tecnología': 'tecnologia',
    'Inversión': 'inversion',
    'Economía': 'economia',
    'Cripto': 'cripto',
    'General': 'general',
  };
  return `category-badge category-badge--${map[cat] || 'default'}`;
}

export function getCategoryIcon(cat) {
  const icons = {
    'Finanzas': '💰',
    'Tecnología': '⚡',
    'Inversión': '📈',
    'Economía': '🌐',
    'Cripto': '₿',
    'General': '✦',
  };
  return icons[cat] || '📝';
}

export function getCategoryColor(cat) {
  const colors = {
    'Finanzas':   { bg: 'rgba(108,99,255,0.15)', color: '#9c92ff' },
    'Tecnología': { bg: 'rgba(0,212,255,0.15)',   color: '#00d4ff' },
    'Inversión':  { bg: 'rgba(0,255,170,0.12)',   color: '#00ffaa' },
    'Economía':   { bg: 'rgba(255,200,0,0.12)',   color: '#ffc800' },
    'Cripto':     { bg: 'rgba(255,107,53,0.15)',  color: '#ff6b35' },
    'General':    { bg: 'rgba(255,107,157,0.12)', color: '#ff6b9d' },
  };
  return colors[cat] || { bg: 'rgba(255,255,255,0.08)', color: '#9ba3b8' };
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export function formatDateShort(dateStr) {
  return new Date(dateStr).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

export function readTime(content = '') {
  const words = content.split(/\s+/).length;
  const mins = Math.max(1, Math.ceil(words / 200));
  return `${mins} min`;
}

export const CATEGORIES = ['Finanzas', 'Tecnología', 'Inversión', 'Economía', 'Cripto', 'General'];
