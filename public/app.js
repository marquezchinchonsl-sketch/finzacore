// Lógica Principal - FinzaCore Vanilla Premium
const API_URL = '/api';

/* ── 1. TOASTS PREMIUM ───────────────────────────────────────────────────── */
function showToast(title, message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  const icon = type === 'success' ? '🚀' : '⚠️';
  toast.className = `nexo-toast ${type}`;
  toast.innerHTML = `
    <div class="toast-icon">${icon}</div>
    <div class="toast-body">
      <span class="toast-title">${title}</span>
      <span class="toast-msg">${message}</span>
    </div>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'slideInRight 0.4s ease reverse forwards';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

/* ── 2. FETCH HELPER ─────────────────────────────────────────────────────── */
async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('nexo_token');
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  try {
    const res = await fetch(`${API_URL}${path}`, { ...options, headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error de red');
    return data;
  } catch (err) {
    if (err.message !== 'No autorizado') { // Avoid spam on login check
      showToast('Error', err.message, 'error');
    }
    throw err;
  }
}

/* ── 3. FORMATEADORES ────────────────────────────────────────────────────── */
function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' });
}
function slugifyClass(cat) {
  const map = { 'Finanzas': 'finanzas', 'Tecnología': 'tecnologia', 'Inversión': 'inversion', 'Economía': 'economia', 'Cripto': 'cripto' };
  return map[cat] || 'general';
}

/* ── 4. LÓGICA DE PORTADA (INDEX) ────────────────────────────────────────── */
if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
  document.addEventListener('DOMContentLoaded', async () => {
    const grid = document.getElementById('blog-grid');
    if (!grid) return;
    try {
      const { blogs } = await apiFetch('/blogs');
      if (blogs.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1;text-align:center;padding:4rem;color:var(--text-muted)">Publica tu primer artículo desde el Panel de Admin.</div>';
        return;
      }
      grid.innerHTML = blogs.map(b => `
        <a href="/article.html?slug=${b.slug}" class="blog-card">
          <div class="blog-card-img-wrapper">
            <img src="${b.coverImage || 'https://images.unsplash.com/photo-1611974789855-9c2a0a22368c?ixlib=rb-4.0.3&w=600&q=80'}" class="blog-card-img" alt="${b.title}" onerror="this.src='https://images.unsplash.com/photo-1611974789855-9c2a0a22368c?ixlib=rb-4.0.3&w=600&q=80'">
          </div>
          <div class="blog-card-content">
            <div class="blog-card-meta">
              <span class="badge badge-${slugifyClass(b.category)}">${b.category}</span>
              <span class="blog-card-date">${formatDate(b.createdAt)}</span>
            </div>
            <h3 class="blog-card-title">${b.title}</h3>
            <p class="blog-card-summary">${b.summary}</p>
            <div class="blog-card-footer">
              <span class="blog-card-readmore">Leer artículo <span style="font-size:1.2rem">→</span></span>
              ${b.views > 0 ? `<span class="blog-card-views">👁 ${b.views}</span>` : ''}
            </div>
          </div>
        </a>
      `).join('');
    } catch (e) {
      grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:var(--danger)">No se ha podido contactar con el servidor.</div>';
    }
  });
}

/* ── 5. LÓGICA DE LECTOR DE ARTÍCULO (ARTICLE) ───────────────────────────── */
if (window.location.pathname.startsWith('/article.html')) {
  document.addEventListener('DOMContentLoaded', async () => {
    const slug = new URLSearchParams(window.location.search).get('slug');
    if (!slug) return window.location.href = '/';
    try {
      const blog = await apiFetch(`/blogs/${slug}`);
      document.title = `${blog.title} - FinzaCore Premium`;
      document.getElementById('article-title').innerHTML = blog.title;
      document.getElementById('article-date').innerHTML = formatDate(blog.createdAt);
      
      const badge = document.getElementById('article-category');
      badge.innerHTML = blog.category;
      badge.className = `badge badge-${slugifyClass(blog.category)}`;
      
      const views = document.getElementById('article-views');
      if (views) views.innerHTML = `👁 ${blog.views} lecturas`;

      // Read time simple calculation
      const wordCount = blog.content.split(' ').length;
      document.getElementById('article-reading-time').innerText = `${Math.ceil(wordCount / 200)} min de lectura`;

      const cover = document.getElementById('article-cover');
      if (blog.coverImage) cover.src = blog.coverImage;
      else cover.style.display = 'none';

      // Advanced Vanilla Markdown Parser (Headers, bold, lists, quotes)
      let htmlContent = blog.content
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        .replace(/\n\n/gim, '<br><br>');
      document.getElementById('article-content').innerHTML = htmlContent;
    } catch (e) {
      document.getElementById('article-content').innerHTML = '<h2 style="color:var(--danger)">No hemos encontrado este artículo.</h2>';
    }
  });
}

/* ── 6. LÓGICA DE ADMINISTRADOR PREMIUM (ADMIN) ──────────────────────────── */
if (window.location.pathname.startsWith('/admin.html')) {
  const token = localStorage.getItem('nexo_token');
  const loginForm = document.getElementById('login-form');
  
  // Gestión de Visibilidad
  if (loginForm) {
    if (token) {
      document.getElementById('login-screen').style.display = 'none';
      document.getElementById('admin-dashboard').style.display = 'flex';
      loadAdminDashboard();
    }
    
    // Login Submission
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const pwd = document.getElementById('login-pwd').value;
      const btn = loginForm.querySelector('button');
      btn.innerText = 'Autenticando...';
      try {
        const res = await apiFetch('/auth/login', { method: 'POST', body: JSON.stringify({ password: pwd }) });
        localStorage.setItem('nexo_token', res.token);
        window.location.reload();
      } catch (err) {
        btn.innerText = 'Entrar al Panel';
      }
    });
  }
}

// Cargar estado global del Admin
async function loadAdminDashboard() {
  const tbody = document.getElementById('admin-table-body');
  try {
    const blogs = await apiFetch('/admin/blogs');
    
    // Set Dashboard Stats
    const pub = blogs.filter(b=>b.published).length;
    document.getElementById('stat-total').innerText = blogs.length;
    document.getElementById('stat-published').innerText = pub;
    document.getElementById('stat-drafts').innerText = blogs.length - pub;
    document.getElementById('stat-views').innerText = blogs.reduce((a, b) => a + (b.views || 0), 0);
    
    // Render Table
    if (blogs.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:2rem;">Aún no hay publicaciones.</td></tr>';
      return;
    }
    
    tbody.innerHTML = blogs.map(b => `
      <tr>
        <td>
          <div class="td-title">${b.title}</div>
          <div class="td-slug">${b.slug}</div>
        </td>
        <td>
          <span class="badge badge-${b.published ? 'finanzas' : 'general'}">${b.published ? 'Público' : 'Oculto'}</span>
        </td>
        <td>
          <span style="display:flex;align-items:center;gap:0.4rem;color:var(--text-muted)">
             <span>👁</span> ${b.views || 0}
          </span>
        </td>
        <td style="color:var(--text-muted);font-size:0.9rem;">${formatDate(b.updatedAt || b.createdAt)}</td>
        <td style="text-align:right;">
          <div class="action-buttons" style="justify-content:flex-end;">
            <button class="btn btn-outline" style="padding:0.4rem 0.8rem;font-size:0.8rem;" onclick="openModal('${b.id}')">✏️ Editar</button>
            <button class="btn btn-danger" style="padding:0.4rem 0.6rem;font-size:0.8rem;" onclick="deleteBlog('${b.id}')">🗑</button>
          </div>
        </td>
      </tr>
    `).join('');
  } catch (e) {
    if (e.message.includes('Token')) {
      localStorage.removeItem('nexo_token');
      window.location.reload();
    }
  }
}

function logoutAdmin() {
  localStorage.removeItem('nexo_token');
  window.location.reload();
}

// Modal Hecho a Mano: Cierre / Apertura con Animación
let editingId = null;
const modalEl = document.getElementById('editor-modal');

function openModal(id = null) {
  editingId = id;
  if (modalEl) {
    modalEl.style.display = 'flex';
    // Timeout para permitir que el display surta efecto antes de la opacidad (transición CSS)
    setTimeout(() => modalEl.classList.add('active'), 10);
  }
  
  if (!id) {
    document.getElementById('editor-form').reset();
    document.getElementById('modal-title').innerText = 'Redactar Nuevo Artículo';
  } else {
    document.getElementById('modal-title').innerText = 'Modificar Artículo Existente';
    // Fill the data by fetching the full list again (simple approach for vanilla)
    apiFetch('/admin/blogs').then(blogs => {
      const blog = blogs.find(b => b.id === id);
      if(blog) {
        document.getElementById('post-title').value = blog.title;
        document.getElementById('post-summary').value = blog.summary || '';
        document.getElementById('post-content').value = blog.content || '';
        document.getElementById('post-category').value = blog.category;
        document.getElementById('post-cover').value = blog.coverImage || '';
        document.getElementById('post-published').checked = blog.published;
      }
    });
  }
}

function closeModal() {
  if (modalEl) {
    modalEl.classList.remove('active');
    setTimeout(() => {
      if(!modalEl.classList.contains('active')) modalEl.style.display = 'none';
    }, 300); // Wait for CSS transition
  }
}

async function deleteBlog(id) {
  if (!confirm('¿Seguro que quieres borrar este artículo permanentemente? \n\nNo se podrá recuperar.')) return;
  try {
    await apiFetch(`/admin/blogs/${id}`, { method: 'DELETE' });
    showToast('Operación exitosa', 'El artículo ha sido destruido en la base de datos.', 'success');
    loadAdminDashboard();
  } catch(e) {}
}

document.getElementById('editor-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.innerText = 'Subiendo...';
  btn.disabled = true;

  const payload = {
    title: document.getElementById('post-title').value,
    summary: document.getElementById('post-summary').value,
    content: document.getElementById('post-content').value,
    category: document.getElementById('post-category').value,
    coverImage: document.getElementById('post-cover').value,
    published: document.getElementById('post-published').checked,
    author: 'NEXO Editorial'
  };
  
  try {
    const isEditing = !!editingId;
    await apiFetch(isEditing ? `/admin/blogs/${editingId}` : '/admin/blogs', {
      method: isEditing ? 'PUT' : 'POST',
      body: JSON.stringify(payload)
    });
    
    showToast('¡Hecho!', isEditing ? 'El artículo se actualizó correctamente.' : 'Tu nuevo análisis se ha publicado.', 'success');
    closeModal();
    loadAdminDashboard();
  } catch(e) {
  } finally {
    btn.innerText = 'Guardar y Confirmar';
    btn.disabled = false;
  }
});
