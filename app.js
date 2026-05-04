const API = '/api';

const fetchAPI = async (path, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API}${path}`, { ...options, headers });
  if (!res.ok) throw await res.json();
  return res.json();
};

const formatDate = (iso) => new Date(iso).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });

const parseMarkdown = (text) => {
  return text
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    .replace(/\n\n/gim, '<br><br>')
    .replace(/\n/gim, '<br>');
};

const renderCards = (blogs, containerId) => {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  if (blogs.length === 0) {
    grid.innerHTML = '<p style="color: var(--text-muted); padding: 2rem; grid-column: 1/-1; text-align: center;">No hay artículos todavía.</p>';
    return;
  }
  grid.innerHTML = blogs.map(b => `
    <article class="blog-card">
      <a href="article.html?slug=${b.slug}" class="blog-card__link">
        <div class="blog-card__image">
          <img src="${b.coverImage || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80'}" alt="${b.title}">
        </div>
        <div class="blog-card__content">
          <div class="blog-card__meta">
            <span class="blog-card__category">${b.category}</span>
            <span class="blog-card__date">${formatDate(b.createdAt)}</span>
          </div>
          <h3 class="blog-card__title">${b.title}</h3>
          <p class="blog-card__summary">${b.summary}</p>
        </div>
      </a>
    </article>
  `).join('');
};

if (location.pathname.includes('index.html') || location.pathname === '/' || location.pathname.endsWith('/')) {
  fetchAPI('/blogs').then(({ blogs }) => renderCards(blogs.slice(0, 6), 'blog-grid'));
}

if (location.pathname.includes('blogs.html') || location.pathname === '/blogs') {
  fetchAPI('/blogs').then(({ blogs }) => renderCards(blogs, 'full-blog-grid'));
}

if (location.pathname.includes('article.html') || location.pathname === '/article') {
  const slug = new URLSearchParams(location.search).get('slug');
  fetchAPI(`/blogs/${slug}`).then(blog => {
    document.title = blog.title + ' - FinzaCore';
    const container = document.querySelector('main');
    container.innerHTML = `
      <div class="container" style="max-width: 800px; padding: 4rem 0;">
        <header style="margin-bottom: 3rem;">
          <span class="blog-card__category" style="margin-bottom: 1.5rem; display: inline-block;">${blog.category}</span>
          <h1 style="font-family: var(--font-display); font-size: 3.5rem; line-height: 1.1; margin-bottom: 1.5rem;">${blog.title}</h1>
          <p style="color: var(--text-muted); font-size: 0.9rem;">${formatDate(blog.createdAt)} • Por FinzaCore Editorial</p>
        </header>
        <img src="${blog.coverImage}" style="width: 100%; border-radius: 24px; margin-bottom: 3rem;">
        <article class="article-content" style="font-size: 1.15rem; line-height: 1.8;">
          ${parseMarkdown(blog.content)}
        </article>
      </div>
    `;
  });
}
