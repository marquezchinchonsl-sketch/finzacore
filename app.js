const API = '/api';
let quill; // For admin editor

const fetchAPI = async (path, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API}${path}`, { ...options, headers });
  if (!res.ok) throw await res.json();
  return res.json();
};

const formatDate = (iso) => new Date(iso).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });

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
          <img src="${b.coverImage || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80'}" alt="${b.title}" loading="lazy">
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

// --- Frontend Logic ---
if (location.pathname.includes('index.html') || location.pathname === '/' || location.pathname.endsWith('/')) {
  fetchAPI('/blogs').then(({ blogs }) => renderCards(blogs.slice(0, 6), 'blog-grid')).catch(console.error);
}

if (location.pathname.includes('blogs.html') || location.pathname === '/blogs') {
  fetchAPI('/blogs').then(({ blogs }) => renderCards(blogs, 'full-blog-grid')).catch(console.error);
}

const injectSEO = (blog) => {
  document.title = blog.title + ' - FinzaCore';
  
  // Meta description
  let metaDesc = document.createElement('meta');
  metaDesc.name = "description";
  metaDesc.content = blog.metaDescription || blog.summary;
  document.head.appendChild(metaDesc);

  // Open Graph
  const ogTags = {
    'og:title': blog.title,
    'og:description': blog.metaDescription || blog.summary,
    'og:image': blog.coverImage,
    'og:type': 'article',
    'og:url': window.location.href
  };
  for (const [property, content] of Object.entries(ogTags)) {
    if(!content) continue;
    let meta = document.createElement('meta');
    meta.setAttribute('property', property);
    meta.content = content;
    document.head.appendChild(meta);
  }

  // JSON-LD
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "image": [blog.coverImage],
    "datePublished": blog.createdAt,
    "author": [{
      "@type": "Organization",
      "name": "FinzaCore Editorial"
    }]
  });
  document.head.appendChild(script);
};

const injectAdSense = (htmlContent) => {
  // Inject AdSense placeholders to maximize CTR (e.g. after 2nd and 5th paragraphs)
  const adHTML = `<div class="adsense-placeholder" style="margin: 2.5rem 0; min-height: 250px; background: #f9fafb; border: 1px dashed #cbd5e1; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #94a3b8; font-size: 0.9rem;">[Espacio Anuncio In-article AdSense]</div>`;
  
  // Simple heuristic: split by </p>
  let parts = htmlContent.split('</p>');
  if (parts.length > 2) {
    parts[1] += '</p>' + adHTML;
  } else if (parts.length > 1) {
    parts[0] += '</p>' + adHTML;
  }
  if (parts.length > 5) {
    parts[4] += '</p>' + adHTML;
  }
  
  return parts.join('</p>');
};

if (location.pathname.includes('article.html') || location.pathname === '/article') {
  const slug = new URLSearchParams(location.search).get('slug');
  fetchAPI(`/blogs/${slug}`).then(blog => {
    injectSEO(blog);
    
    const container = document.querySelector('main');
    const contentWithAds = blog.content ? injectAdSense(blog.content) : '<p>Contenido no disponible.</p>';

    container.innerHTML = `
      <div class="container" style="max-width: 800px; padding: 4rem 0;">
        <header style="margin-bottom: 3rem;">
          <span class="blog-card__category" style="margin-bottom: 1.5rem; display: inline-block; background: var(--primary-light); color: var(--primary); padding: 0.25rem 0.75rem; border-radius: 99px; font-size: 0.85rem; font-weight: 600;">${blog.category}</span>
          <h1 style="font-family: var(--font-display); font-size: clamp(2.5rem, 5vw, 4rem); line-height: 1.1; margin-bottom: 1.5rem;">${blog.title}</h1>
          <p style="color: var(--text-muted); font-size: 1rem;">${formatDate(blog.createdAt)} • Por FinzaCore Editorial</p>
        </header>
        ${blog.coverImage ? `<img src="${blog.coverImage}" alt="${blog.title}" style="width: 100%; border-radius: 24px; margin-bottom: 3rem; object-fit: cover;" loading="lazy">` : ''}
        <article class="article-content" style="font-size: 1.15rem; line-height: 1.8; color: #334155;">
          ${contentWithAds}
        </article>
      </div>
    `;
  }).catch((err) => {
    console.error(err);
    document.querySelector('main').innerHTML = '<div class="container" style="padding: 4rem 0; text-align: center;"><h1>Artículo no encontrado</h1><a href="index.html" class="btn btn--primary">Volver al inicio</a></div>';
  });
}

// --- Admin Logic ---
let currentEditId = null;

const checkAuth = () => {
  const token = localStorage.getItem('token');
  if (token) {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('admin-dashboard').style.display = 'block';
    loadAdminBlogs();
    initQuill();
  }
};

const initQuill = () => {
  if (window.Quill && !quill) {
    quill = new Quill('#editor-container', {
      theme: 'snow',
      placeholder: 'Escribe tu artículo aquí...',
      modules: {
        toolbar: [
          [{ 'header': [2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['link', 'image', 'video'],
          ['clean']
        ]
      }
    });
  }
};

const showToast = (message, type = 'success') => {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${type === 'success' ? '✅' : '❌'}</span>
    <span class="toast-msg">${message}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};

const loadAdminBlogs = async () => {
  try {
    const blogs = await fetchAPI('/admin/blogs');
    
    // Stats calculation
    const total = blogs.length;
    const published = blogs.filter(b => b.published).length;
    const drafts = total - published;
    
    const statsContainer = document.getElementById('admin-stats');
    if (statsContainer) {
      statsContainer.innerHTML = `
        <div class="admin-stat-card">
          <div class="admin-stat-icon">📝</div>
          <div class="admin-stat-info">
            <h4>Total Artículos</h4>
            <span>${total}</span>
          </div>
        </div>
        <div class="admin-stat-card">
          <div class="admin-stat-icon" style="color: #10b981; background: #ecfdf5;">🚀</div>
          <div class="admin-stat-info">
            <h4>Publicados</h4>
            <span>${published}</span>
          </div>
        </div>
        <div class="admin-stat-card">
          <div class="admin-stat-icon" style="color: #f59e0b; background: #fff7ed;">✍️</div>
          <div class="admin-stat-info">
            <h4>Borradores</h4>
            <span>${drafts}</span>
          </div>
        </div>
      `;
    }

    const tbody = document.getElementById('admin-body');
    tbody.innerHTML = blogs.map(b => `
      <tr class="admin-table-row">
        <td style="padding: 1.25rem; border-bottom: 1px solid var(--border);">
          <div class="admin-table-title-group">
            <img src="${b.coverImage || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=100&q=80'}" class="admin-table-img" loading="lazy">
            <div>
              <div style="font-weight: 600; margin-bottom: 0.25rem; color: var(--text-primary);">${b.title}</div>
              <div style="font-size: 0.85rem; color: var(--text-muted);">${formatDate(b.createdAt)}</div>
            </div>
          </div>
        </td>
        <td style="padding: 1.25rem; border-bottom: 1px solid var(--border);">
          <span style="background: ${b.published ? '#ecfdf5' : '#fff7ed'}; color: ${b.published ? '#10b981' : '#f59e0b'}; padding: 0.35rem 0.8rem; border-radius: 999px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">
            ${b.published ? 'Publicado' : 'Borrador'}
          </span>
        </td>
        <td style="padding: 1.25rem; text-align: right; border-bottom: 1px solid var(--border);">
          <button onclick="editBlog('${b.id}')" class="action-btn action-btn--edit" title="Editar">✏️</button>
          <button onclick="deleteBlog('${b.id}')" class="action-btn action-btn--delete" title="Eliminar">🗑️</button>
        </td>
      </tr>
    `).join('');
  } catch (e) {
    console.error(e);
    showToast('Error cargando artículos. ¿Sesión expirada?', 'error');
    setTimeout(() => {
      localStorage.removeItem('token');
      location.reload();
    }, 2000);
  }
};

window.openModal = () => {
  currentEditId = null;
  document.getElementById('editor-form').reset();
  if (quill) quill.root.innerHTML = '';
  document.getElementById('modal-title').innerText = 'Nuevo Artículo';
  document.getElementById('editor-modal').classList.add('active');
};

window.closeModal = () => {
  document.getElementById('editor-modal').classList.remove('active');
};

window.editBlog = async (id) => {
  try {
    const blogs = await fetchAPI('/admin/blogs');
    const blog = blogs.find(b => b.id === id);
    if (!blog) return;
    
    currentEditId = blog.id;
    document.getElementById('modal-title').innerText = 'Editar Artículo';
    document.getElementById('post-title').value = blog.title;
    document.getElementById('post-category').value = blog.category;
    document.getElementById('post-cover').value = blog.coverImage || '';
    document.getElementById('post-summary').value = blog.summary;
    document.getElementById('post-meta').value = blog.metaDescription || '';
    document.getElementById('post-slug').value = blog.slug || '';
    document.getElementById('post-published').checked = blog.published;
    if (quill) quill.root.innerHTML = blog.content || '';
    
    document.getElementById('editor-modal').classList.add('active');
  } catch(e) { console.error(e); }
};

window.deleteBlog = async (id) => {
  if (!confirm('¿Seguro que deseas eliminar este artículo?')) return;
  try {
    await fetchAPI(`/admin/blogs/${id}`, { method: 'DELETE' });
    showToast('Artículo eliminado correctamente');
    loadAdminBlogs();
  } catch(e) { console.error(e); showToast('Error al eliminar', 'error'); }
};

if (location.pathname.includes('admin.html') || location.pathname === '/admin') {
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const password = document.getElementById('login-pwd').value;
      try {
        const { token } = await fetchAPI('/auth/login', { method: 'POST', body: JSON.stringify({ password }) });
        localStorage.setItem('token', token);
        showToast('Acceso correcto');
        checkAuth();
      } catch (err) {
        showToast('Contraseña incorrecta', 'error');
      }
    });
  }
  
  const editorForm = document.getElementById('editor-form');
  if (editorForm) {
    editorForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!quill) return;
      const title = document.getElementById('post-title').value;
      const category = document.getElementById('post-category').value;
      const coverImage = document.getElementById('post-cover').value;
      const summary = document.getElementById('post-summary').value;
      const metaDescription = document.getElementById('post-meta').value;
      let slug = document.getElementById('post-slug').value.trim();
      const published = document.getElementById('post-published').checked;
      const content = quill.root.innerHTML;
      
      const payload = { title, category, coverImage, summary, metaDescription, slug, published, content };
      
      try {
        if (currentEditId) {
          await fetchAPI(`/admin/blogs/${currentEditId}`, { method: 'PUT', body: JSON.stringify(payload) });
        } else {
          await fetchAPI('/admin/blogs', { method: 'POST', body: JSON.stringify(payload) });
        }
        closeModal();
        showToast('Artículo guardado correctamente');
        loadAdminBlogs();
      } catch (err) {
        showToast('Error al guardar. Revisa los campos.', 'error');
      }
    });
  }

  // Comprobar estado de login al iniciar
  checkAuth();
}
