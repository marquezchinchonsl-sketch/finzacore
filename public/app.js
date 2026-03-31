// Utils
const API_URL = '/api';

function showToast(message, isError = false) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${isError ? 'error' : ''}`;
  toast.innerText = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// Fetch helper
async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('nexo_token');
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  
  try {
    const res = await fetch(`${API_URL}${path}`, { ...options, headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error del servidor');
    return data;
  } catch (err) {
    showToast(err.message, true);
    throw err;
  }
}

// Formateo de fecha
function formatDate(isoString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(isoString).toLocaleDateString('es-ES', options);
}

// Renderizado de tarjetas de blog
function renderBlogCard(blog) {
  const catClasses = {
    'Finanzas': 'finanzas',
    'Tecnología': 'tecnologia'
  };
  const catClass = catClasses[blog.category] || 'finanzas';
  
  const coverUrl = blog.coverImage || 'https://images.unsplash.com/photo-1611974789855-9c2a0a22368c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
  
  return `
    <a href="/article.html?slug=${blog.slug}" class="card">
      <img src="${coverUrl}" alt="${blog.title}" class="card-img" onerror="this.src='https://images.unsplash.com/photo-1611974789855-9c2a0a22368c?w=800&q=80'">
      <span class="badge ${catClass}">${blog.category}</span>
      <h3>${blog.title}</h3>
      <p>${blog.summary}</p>
      <div class="card-footer">
        <span>${formatDate(blog.createdAt)}</span>
        <span>👁 ${blog.views || 0}</span>
      </div>
    </a>
  `;
}

// Inicialización de la pantalla de inicio (index.html)
if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
  document.addEventListener('DOMContentLoaded', async () => {
    const grid = document.getElementById('blog-grid');
    if (!grid) return;
    
    try {
      grid.innerHTML = '<p>Cargando artículos...</p>';
      const res = await apiFetch('/blogs');
      const blogs = res.blogs;
      
      if (blogs.length === 0) {
        grid.innerHTML = '<p>No hay artículos publicados aún.</p>';
        return;
      }
      grid.innerHTML = blogs.map(renderBlogCard).join('');
    } catch (e) {
      grid.innerHTML = '<p>Error al cargar el blog.</p>';
    }
  });
}

// Inicialización de un artículo individual (article.html)
if (window.location.pathname.startsWith('/article.html')) {
  document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    if (!slug) return window.location.href = '/';
    
    try {
      const blog = await apiFetch(`/blogs/${slug}`);
      document.title = `${blog.title} - FinzaCore`;
      document.getElementById('article-title').innerText = blog.title;
      document.getElementById('article-date').innerText = formatDate(blog.createdAt);
      document.getElementById('article-category').innerText = blog.category;
      
      if (blog.coverImage) {
        document.getElementById('article-cover').src = blog.coverImage;
      } else {
        document.getElementById('article-cover').style.display = 'none';
      }
      
      // Conversión simple a HTML en formato Vanilla sin librerías de Markdown complejas
      let htmlContent = blog.content
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/\n\n/gim, '<br><br>');
      
      document.getElementById('article-content').innerHTML = htmlContent;
    } catch (e) {
      document.getElementById('article-content').innerHTML = '<p>Artículo no encontrado.</p>';
    }
  });
}

// Lógica de Admin (admin.html)
if (window.location.pathname.startsWith('/admin.html')) {
  const token = localStorage.getItem('nexo_token');
  
  // LOGIN LOGIC
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    if (token) {
      document.getElementById('login-screen').style.display = 'none';
      document.getElementById('admin-dashboard').style.display = 'flex';
      loadAdminDashboard();
    }
    
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const pwd = document.getElementById('login-pwd').value;
      try {
        const res = await apiFetch('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ password: pwd })
        });
        localStorage.setItem('nexo_token', res.token);
        window.location.reload();
      } catch (err) {
        // Error ya manejado por apiFetch
      }
    });
  }
}

// Carga del listado para administradores
async function loadAdminDashboard() {
  const tbody = document.getElementById('admin-table-body');
  try {
    const blogs = await apiFetch('/admin/blogs');
    tbody.innerHTML = blogs.map(b => `
      <tr>
        <td><strong>${b.title}</strong><br><small>${b.slug}</small></td>
        <td><span class="badge ${b.published ? 'finanzas' : ''}">${b.published ? 'Publicado' : 'Borrador'}</span></td>
        <td>${b.category}</td>
        <td>${b.views || 0}</td>
        <td>${formatDate(b.createdAt)}</td>
        <td>
          <button class="btn btn-outline" onclick="editBlog('${b.id}')">✏️ Editar</button>
          <button class="btn btn-danger" onclick="deleteBlog('${b.id}')">🗑️</button>
        </td>
      </tr>
    `).join('');
  } catch (e) {
    tbody.innerHTML = '<tr><td colspan="6">Error al cargar listado. (Sesión caducada)</td></tr>';
    localStorage.removeItem('nexo_token');
  }
}

function logoutAdmin() {
  localStorage.removeItem('nexo_token');
  window.location.reload();
}

// Modal de Crear/Editar
let editingId = null;
function openModal(id = null) {
  editingId = id;
  document.getElementById('editor-modal').classList.add('visible');
  if (!id) {
    document.getElementById('editor-form').reset();
    document.getElementById('modal-title').innerText = 'Nuevo Artículo';
  }
}
function closeModal() {
  document.getElementById('editor-modal').classList.remove('visible');
}

async function editBlog(id) {
  try {
    const blogs = await apiFetch('/admin/blogs');
    const blog = blogs.find(b => b.id === id);
    if (!blog) return;
    
    document.getElementById('post-title').value = blog.title;
    document.getElementById('post-summary').value = blog.summary || '';
    document.getElementById('post-content').value = blog.content || '';
    document.getElementById('post-category').value = blog.category;
    document.getElementById('post-cover').value = blog.coverImage || '';
    document.getElementById('post-published').checked = blog.published;
    
    document.getElementById('modal-title').innerText = 'Editar Artículo';
    editingId = id;
    document.getElementById('editor-modal').classList.add('visible');
  } catch (e) { }
}

async function deleteBlog(id) {
  if (!confirm('¿Seguro que quieres borrar este artículo permanentemente?')) return;
  try {
    await apiFetch(`/admin/blogs/${id}`, { method: 'DELETE' });
    showToast('Artículo borrado');
    loadAdminDashboard();
  } catch(e) {}
}

document.getElementById('editor-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = {
    title: document.getElementById('post-title').value,
    summary: document.getElementById('post-summary').value,
    content: document.getElementById('post-content').value,
    category: document.getElementById('post-category').value,
    coverImage: document.getElementById('post-cover').value,
    published: document.getElementById('post-published').checked,
    author: 'Admin'
  };
  
  try {
    let method = editingId ? 'PUT' : 'POST';
    let url = editingId ? `/admin/blogs/${editingId}` : '/admin/blogs';
    
    await apiFetch(url, {
      method,
      body: JSON.stringify(payload)
    });
    
    showToast(editingId ? 'Actualizado correctamente' : 'Creado correctamente');
    closeModal();
    loadAdminDashboard();
  } catch(e) {}
});

// Registrar eventos globales para cerrar el modal
window.addEventListener('click', (e) => {
  if (e.target.id === 'editor-modal') closeModal();
});
