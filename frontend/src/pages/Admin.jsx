import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { api, CATEGORIES, formatDateShort, readTime } from '../utils';
import { useToast } from '../ToastContext';

// ── SIDEBAR ─────────────────────────────────────────────────────────────────
function Sidebar({ onLogout }) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__header">
        <div className="admin-sidebar__logo">NEXO</div>
        <div className="admin-sidebar__tagline">Panel de administración</div>
      </div>

      <nav className="admin-sidebar__nav">
        <div className="admin-sidebar__section-label">Gestión</div>
        <Link to="/admin/dashboard" className={`admin-nav-link ${path === '/admin/dashboard' ? 'active' : ''}`}>
          <span className="admin-nav-link__icon">📊</span>
          <span>Dashboard</span>
        </Link>
        <Link to="/admin/new" className={`admin-nav-link ${path === '/admin/new' ? 'active' : ''}`}>
          <span className="admin-nav-link__icon">✏️</span>
          <span>Nuevo artículo</span>
        </Link>
        <Link to="/admin/posts" className={`admin-nav-link ${path === '/admin/posts' ? 'active' : ''}`}>
          <span className="admin-nav-link__icon">📄</span>
          <span>Mis artículos</span>
        </Link>
      </nav>

      <div className="admin-sidebar__footer">
        <a href="/" target="_blank" className="admin-nav-link">
          <span className="admin-nav-link__icon">🌐</span>
          <span>Ver el blog</span>
        </a>
        <button onClick={onLogout} className="admin-logout-btn">
          <span>↩</span>
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}

// ── TOP BAR ──────────────────────────────────────────────────────────────────
function TopBar({ title, subtitle, action }) {
  return (
    <div className="admin-topbar">
      <div className="admin-topbar__left">
        <h1 className="admin-topbar__title">{title}</h1>
        {subtitle && <p className="admin-topbar__subtitle">{subtitle}</p>}
      </div>
      {action && <div className="admin-topbar__action">{action}</div>}
    </div>
  );
}

// ── BLOG EDITOR ──────────────────────────────────────────────────────────────
function BlogEditor({ existing = null, onSave }) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const [form, setForm] = useState({
    title: '',
    summary: '',
    content: '',
    category: 'Finanzas',
    tags: '',
    coverImage: '',
    published: true,
    featured: false,
    author: 'NEXO Editorial',
    ...(existing ? {
      ...existing,
      tags: Array.isArray(existing.tags) ? existing.tags.join(', ') : '',
    } : {}),
  });

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const wordCount = form.content.split(/\s+/).filter(Boolean).length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return toast('El título es obligatorio', 'error');
    if (!form.content.trim()) return toast('El contenido es obligatorio', 'error');

    setLoading(true);
    try {
      const payload = {
        ...form,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      };
      if (existing) {
        await api.adminUpdate(existing.id, payload);
        toast('Artículo actualizado correctamente ✓');
      } else {
        await api.adminCreate(payload);
        toast('Artículo publicado correctamente ✓');
      }
      onSave?.();
    } catch (err) {
      toast(err.message || 'Error al guardar', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="editor-layout">
      {/* ── LEFT COLUMN: Main content ─────────────────────── */}
      <div className="editor-main">
        {/* Title */}
        <div className="editor-card">
          <label className="form-label">Título del artículo *</label>
          <input
            className="form-input editor-title-input"
            value={form.title}
            onChange={e => update('title', e.target.value)}
            placeholder="Escribe un título atractivo para tu artículo..."
            required
          />

          <label className="form-label" style={{ marginTop: '1.25rem' }}>
            Resumen <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>(aparece en las tarjetas)</span>
          </label>
          <textarea
            className="form-textarea"
            value={form.summary}
            onChange={e => update('summary', e.target.value)}
            placeholder="Describe brevemente de qué trata el artículo (2-3 frases)..."
            rows={3}
          />
        </div>

        {/* Content editor */}
        <div className="editor-card" style={{ flex: 1 }}>
          <div className="editor-content-header">
            <div>
              <label className="form-label">Contenido en Markdown *</label>
              {form.content && (
                <span className="editor-wordcount">
                  {wordCount} palabras · {readTime(form.content)} lectura
                </span>
              )}
            </div>
            <button
              type="button"
              className={`editor-tab ${!preview ? 'active' : ''}`}
              onClick={() => setPreview(false)}
            >
              ✏️ Editar
            </button>
            <button
              type="button"
              className={`editor-tab ${preview ? 'active' : ''}`}
              onClick={() => setPreview(true)}
            >
              👁 Preview
            </button>
          </div>

          {preview ? (
            <div className="editor-preview prose">
              {form.content
                ? <div dangerouslySetInnerHTML={{ __html: simpleMdToHtml(form.content) }} />
                : <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>El contenido aparecerá aquí...</p>
              }
            </div>
          ) : (
            <textarea
              className="form-textarea editor-textarea"
              value={form.content}
              onChange={e => update('content', e.target.value)}
              placeholder={`# Título del artículo\n\nEscribe aquí el contenido en Markdown...\n\n## Sección 1\n\nTexto de la primera sección.\n\n## Sección 2\n\nTexto de la segunda sección.\n\n> Cita importante\n\n- Punto clave 1\n- Punto clave 2`}
              required
            />
          )}

          <div className="editor-md-help">
            <span>Formato Markdown:</span>
            <code># Título</code>
            <code>## Subtítulo</code>
            <code>**negrita**</code>
            <code>*cursiva*</code>
            <code>- lista</code>
            <code>&gt; cita</code>
            <code>`código`</code>
          </div>
        </div>
      </div>

      {/* ── RIGHT COLUMN: Settings ────────────────────────── */}
      <div className="editor-sidebar">

        {/* Publish box */}
        <div className="editor-card editor-publish-box">
          <div className="editor-publish-title">Publicación</div>
          <div className="editor-toggles">
            <div className="toggle-row">
              <div>
                <div className="toggle-row__label">Estado</div>
                <div className="toggle-row__desc">{form.published ? 'Visible en el blog' : 'Guardado como borrador'}</div>
              </div>
              <label className="toggle">
                <input type="checkbox" checked={form.published} onChange={e => update('published', e.target.checked)} />
                <span className="toggle__slider"></span>
              </label>
            </div>
            <div className="toggle-row">
              <div>
                <div className="toggle-row__label">Destacado ⭐</div>
                <div className="toggle-row__desc">Aparece en la landing</div>
              </div>
              <label className="toggle">
                <input type="checkbox" checked={form.featured} onChange={e => update('featured', e.target.checked)} />
                <span className="toggle__slider"></span>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn--primary editor-submit-btn"
            disabled={loading}
          >
            {loading ? 'Guardando...' : existing ? '💾 Guardar cambios' : '🚀 Publicar artículo'}
          </button>
        </div>

        {/* Metadata */}
        <div className="editor-card">
          <div className="editor-section-title">Metadata</div>

          <div className="form-group">
            <label className="form-label">Categoría</label>
            <select
              className="form-select"
              value={form.category}
              onChange={e => update('category', e.target.value)}
            >
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Autor</label>
            <input
              className="form-input"
              value={form.author}
              onChange={e => update('author', e.target.value)}
              placeholder="NEXO Editorial"
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Tags <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>(separados por comas)</span></label>
            <input
              className="form-input"
              value={form.tags}
              onChange={e => update('tags', e.target.value)}
              placeholder="inversión, ETF, bolsa, bitcoin..."
            />
          </div>
        </div>

        {/* Cover image */}
        <div className="editor-card">
          <div className="editor-section-title">Imagen de portada</div>
          <div className="form-group" style={{ marginBottom: '0.75rem' }}>
            <label className="form-label">URL de la imagen</label>
            <input
              className="form-input"
              value={form.coverImage}
              onChange={e => update('coverImage', e.target.value)}
              placeholder="https://images.unsplash.com/..."
            />
          </div>
          {form.coverImage && (
            <img
              src={form.coverImage}
              alt="preview"
              style={{
                width: '100%',
                height: 160,
                objectFit: 'cover',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
              }}
              onError={e => { e.target.style.display = 'none'; }}
            />
          )}
          {!form.coverImage && (
            <div style={{
              width: '100%',
              height: 120,
              background: 'var(--bg-base)',
              borderRadius: 'var(--radius-md)',
              border: '2px dashed var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '0.5rem',
              color: 'var(--text-muted)',
              fontSize: '0.8rem',
            }}>
              <span style={{ fontSize: '2rem' }}>🖼️</span>
              <span>Pega la URL arriba</span>
            </div>
          )}
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            Recomendado: imágenes de <a href="https://unsplash.com" target="_blank" rel="noreferrer" style={{ color: 'var(--primary)' }}>Unsplash.com</a> (gratis)
          </p>
        </div>
      </div>
    </form>
  );
}

// Simple markdown to HTML preview
function simpleMdToHtml(md) {
  return md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\n\n/g, '</p><p>')
    .trim();
}

// ── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ navigate }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const data = await api.adminGetBlogs();
    setBlogs(data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const published = blogs.filter(b => b.published).length;
  const drafts    = blogs.filter(b => !b.published).length;
  const featured  = blogs.filter(b => b.featured).length;
  const totalViews = blogs.reduce((acc, b) => acc + (b.views || 0), 0);

  return (
    <>
      <TopBar
        title="Dashboard"
        subtitle="Resumen de tu blog NEXO"
        action={
          <button className="btn btn--primary" onClick={() => navigate('/admin/new')}>
            ✏️ Nuevo artículo
          </button>
        }
      />

      {/* Stats */}
      <div className="dashboard-stats">
        {[
          { label: 'Total artículos', value: loading ? '—' : blogs.length, icon: '📄', color: '#6c63ff', bg: 'rgba(108,99,255,0.08)' },
          { label: 'Publicados',      value: loading ? '—' : published,    icon: '✅', color: '#059669', bg: 'rgba(16,185,129,0.08)' },
          { label: 'Borradores',      value: loading ? '—' : drafts,       icon: '📝', color: '#d97706', bg: 'rgba(245,158,11,0.08)' },
          { label: 'Vistas totales',  value: loading ? '—' : totalViews,   icon: '👁', color: '#0085e0', bg: 'rgba(0,153,255,0.08)' },
        ].map(s => (
          <div key={s.label} className="stat-card" style={{ '--stat-color': s.color, '--stat-bg': s.bg }}>
            <div className="stat-card__icon" style={{ background: s.bg }}>{s.icon}</div>
            <div className="stat-card__value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-card__label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="dashboard-quick">
        <div className="editor-card" style={{ flex: 1 }}>
          <div className="editor-section-title" style={{ marginBottom: '1rem' }}>Acciones rápidas</div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button className="btn btn--primary" onClick={() => navigate('/admin/new')}>✏️ Escribir artículo</button>
            <button className="btn btn--outline" onClick={() => navigate('/admin/posts')}>📋 Gestionar artículos</button>
            <a href="/" target="_blank" className="btn btn--ghost">🌐 Ver el blog</a>
          </div>
        </div>
      </div>

      {/* Recent posts table */}
      <div className="editor-card" style={{ marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div className="editor-section-title" style={{ marginBottom: 0 }}>Artículos recientes</div>
          <button className="btn btn--ghost btn--sm" onClick={() => navigate('/admin/posts')}>Ver todos →</button>
        </div>

        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[...Array(3)].map((_, i) => <div key={i} className="skeleton" style={{ height: 52, borderRadius: 'var(--radius-md)' }}></div>)}
          </div>
        ) : blogs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>📭</div>
            <p>Todavía no hay artículos. ¡Crea el primero!</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Categoría</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Vistas</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {blogs.slice(0, 5).map(b => (
                <BlogRow key={b.id} blog={b} navigate={navigate} onDelete={load} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

// ── ALL POSTS ────────────────────────────────────────────────────────────────
function AllPosts({ navigate }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('Todos');

  const load = useCallback(async () => {
    const data = await api.adminGetBlogs();
    setBlogs(data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = blogs.filter(b => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === 'Todos' || b.category === filterCat;
    return matchSearch && matchCat;
  });

  return (
    <>
      <TopBar
        title="Todos los artículos"
        subtitle={`${blogs.length} artículos en total`}
        action={
          <button className="btn btn--primary" onClick={() => navigate('/admin/new')}>
            ✏️ Nuevo artículo
          </button>
        }
      />

      {/* Filters */}
      <div className="editor-card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="search-bar" style={{ flex: '1', minWidth: 260 }}>
            <span className="search-bar__icon">🔍</span>
            <input
              type="search"
              placeholder="Buscar por título..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="cat-filter" style={{ marginBottom: 0, flexWrap: 'wrap' }}>
            {['Todos', ...CATEGORIES].map(cat => (
              <button
                key={cat}
                className={`cat-filter__btn ${filterCat === cat ? 'active' : ''}`}
                onClick={() => setFilterCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="editor-card">
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[...Array(5)].map((_, i) => <div key={i} className="skeleton" style={{ height: 52, borderRadius: 'var(--radius-md)' }}></div>)}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>📭</div>
            <p>No se encontraron artículos.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '40%' }}>Título</th>
                <th>Categoría</th>
                <th>Estado</th>
                <th>⭐</th>
                <th>Fecha</th>
                <th>Vistas</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <BlogRow key={b.id} blog={b} navigate={navigate} onDelete={load} showFeatured />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

// ── BLOG ROW ─────────────────────────────────────────────────────────────────
function BlogRow({ blog, navigate, onDelete, showFeatured = false }) {
  const toast = useToast();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`¿Eliminar "${blog.title}"? Esta acción no se puede deshacer.`)) return;
    setDeleting(true);
    try {
      await api.adminDelete(blog.id);
      toast('Artículo eliminado');
      onDelete?.();
    } catch (err) {
      toast(err.message || 'Error al eliminar', 'error');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <tr>
      <td>
        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}
          title={blog.title}>
          {blog.title.length > 60 ? blog.title.slice(0, 60) + '…' : blog.title}
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>
          /{blog.slug}
        </div>
      </td>
      <td>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
          {blog.category}
        </span>
      </td>
      <td>
        <span className={`status-badge status-badge--${blog.published ? 'published' : 'draft'}`}>
          <span className="status-dot"></span>
          {blog.published ? 'Publicado' : 'Borrador'}
        </span>
      </td>
      {showFeatured && (
        <td style={{ textAlign: 'center' }}>
          {blog.featured ? '⭐' : <span style={{ color: 'var(--text-muted)' }}>—</span>}
        </td>
      )}
      <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
        {formatDateShort(blog.createdAt)}
      </td>
      <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        👁 {blog.views || 0}
      </td>
      <td>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button
            className="btn btn--ghost btn--sm"
            onClick={() => navigate(`/admin/edit/${blog.id}`)}
            title="Editar"
          >
            ✏️ Editar
          </button>
          <a
            href={`/blogs/${blog.slug}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn--ghost btn--sm"
            title="Ver en el blog"
          >
            🔗
          </a>
          <button
            className="btn btn--danger btn--sm"
            onClick={handleDelete}
            disabled={deleting}
            title="Eliminar"
          >
            🗑
          </button>
        </div>
      </td>
    </tr>
  );
}

// ── NEW POST ──────────────────────────────────────────────────────────────────
function NewPost({ navigate }) {
  return (
    <>
      <TopBar
        title="Nuevo artículo"
        subtitle="Escribe y publica un nuevo artículo en tu blog"
      />
      <BlogEditor onSave={() => navigate('/admin/posts')} />
    </>
  );
}

// ── EDIT POST ─────────────────────────────────────────────────────────────────
function EditPost({ navigate, id }) {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.adminGetBlogs().then(blogs => {
      setBlog(blogs.find(b => b.id === id) || null);
      setLoading(false);
    });
  }, [id]);

  if (loading) return (
    <div style={{ padding: '2rem' }}>
      <div className="skeleton" style={{ height: 40, width: 300, borderRadius: 8, marginBottom: '2rem' }}></div>
      <div className="skeleton" style={{ height: 400, borderRadius: 12 }}></div>
    </div>
  );
  if (!blog) return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <p>Artículo no encontrado.</p>
      <button className="btn btn--outline" style={{ marginTop: '1rem' }} onClick={() => navigate('/admin/posts')}>
        ← Volver
      </button>
    </div>
  );

  return (
    <>
      <TopBar
        title="Editar artículo"
        subtitle={blog.title}
      />
      <BlogEditor existing={blog} onSave={() => navigate('/admin/posts')} />
    </>
  );
}

// ── MAIN ADMIN ────────────────────────────────────────────────────────────────
export default function Admin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);

  const logout = () => {
    localStorage.removeItem('nexo_token');
    navigate('/admin');
  };

  useEffect(() => {
    api.verify()
      .then(() => setAuthed(true))
      .catch(() => { localStorage.removeItem('nexo_token'); navigate('/admin'); })
      .finally(() => setChecking(false));
  }, [navigate]);

  if (checking) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-base)' }}>
      <div style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
        Verificando acceso...
      </div>
    </div>
  );
  if (!authed) return null;

  const path = location.pathname;
  const editMatch = path.match(/^\/admin\/edit\/(.+)$/);

  return (
    <div className="admin-layout">
      <Sidebar onLogout={logout} />
      <main className="admin-main">
        <div className="admin-content">
          {path === '/admin/dashboard' && <Dashboard navigate={navigate} />}
          {path === '/admin/new'       && <NewPost navigate={navigate} />}
          {path === '/admin/posts'     && <AllPosts navigate={navigate} />}
          {editMatch                   && <EditPost navigate={navigate} id={editMatch[1]} />}
        </div>
      </main>
    </div>
  );
}
