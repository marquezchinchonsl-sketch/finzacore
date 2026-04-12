import React, { createContext, useContext, useState, useCallback } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { getCategoryClass, formatDateShort, readTime } from '../utils';
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { api, CATEGORIES, formatDateShort, readTime } from '../utils';
import { useToast } from '../ToastContext';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils';
import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import AdSlot from '../components/AdSlot';
import { api, CATEGORIES } from '../utils';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { api, getCategoryClass, formatDate, readTime } from '../utils';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api, getCategoryColor, getCategoryIcon } from '../utils';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastProvider } from './ToastContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import AdminLogin from './pages/AdminLogin';
import Admin from './pages/Admin';
import Recursos from './pages/Recursos';
import SobreNosotros from './pages/SobreNosotros';
import Contacto from './pages/Contacto';

/* --- utils.js --- */
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

const api = {
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

function getCategoryClass(cat) {
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

function getCategoryIcon(cat) {
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

function getCategoryColor(cat) {
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

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

function formatDateShort(dateStr) {
  return new Date(dateStr).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

function readTime(content = '') {
  const words = content.split(/\s+/).length;
  const mins = Math.max(1, Math.ceil(words / 200));
  return `${mins} min`;
}

const CATEGORIES = ['Finanzas', 'Tecnología', 'Inversión', 'Economía', 'Cripto', 'General'];

/* --- ToastContext.jsx --- */

const ToastContext = createContext(null);

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div>
        {toasts.map(t => (
          <div key={t.id} className={`toast toast--${t.type}`}>
            <span>{t.type === 'success' ? '✓' : '✕'}</span>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

const useToast = () => useContext(ToastContext);

/* --- components/AdSlot.jsx --- */

/**
 * AdSlot - Ready for Google AdSense
 * Replace the data-ad-* attributes with your AdSense slot info
 * and uncomment the <ins> tag when ready.
 */
function AdSlot({ type = 'rectangle', adSlot = '', adClient = '' }) {
  // When AdSense is approved, replace the placeholder div with:
  // <ins className="adsbygoogle"
  //   style={{ display: 'block' }}
  //   data-ad-client={adClient}
  //   data-ad-slot={adSlot}
  //   data-ad-format="auto"
  //   data-full-width-responsive="true">
  // </ins>

  return (
    <div className={`ad-slot ad-slot--${type}`}>
      <span style={{
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px'
      }}>
        <span>📢</span>
        <span>Google AdSense</span>
        <span style={{ fontSize: '0.65rem', opacity: 0.6 }}>{type}</span>
      </span>
    </div>
  );
}

/* --- components/BlogCard.jsx --- */

function BlogCard({ blog, featured = false }) {
  const catClass = getCategoryClass(blog.category);

  return (
    <Link to={`/blogs/${blog.slug}`} className={`blog-card ${featured ? 'blog-card--featured' : ''}`}>
      <div className="blog-card__image">
        {blog.coverImage ? (
          <img
            src={blog.coverImage}
            alt={blog.title}
            loading="lazy"
            onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
          />
        ) : null}
        <div className="blog-card__image-placeholder" style={{ display: blog.coverImage ? 'none' : 'flex' }}>
          {blog.category === 'Finanzas' ? '💰' :
           blog.category === 'Tecnología' ? '⚡' :
           blog.category === 'Inversión' ? '📈' :
           blog.category === 'Cripto' ? '₿' : '📝'}
        </div>
      </div>

      <div className="blog-card__body">
        <div className="blog-card__meta">
          <span className={catClass}>{blog.category}</span>
          <span className="blog-card__date">{formatDateShort(blog.createdAt)}</span>
          <span className="blog-card__date">· {readTime(blog.content)} lectura</span>
        </div>

        <h2 className="blog-card__title">{blog.title}</h2>
        <p className="blog-card__summary">{blog.summary}</p>

        <div className="blog-card__footer">
          <span className="blog-card__read-more">
            Leer artículo <span>→</span>
          </span>
          {blog.views > 0 && (
            <span className="blog-card__views">
              👁 {blog.views}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

/* --- components/Footer.jsx --- */

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__inner">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">FinzaCore</div>
            <p className="footer__desc">
              Tu guía definitiva en finanzas y tecnología. Contenido original, bien investigado y actualizado diariamente para que tomes mejores decisiones financieras.
            </p>
            {/* Social share links */}
            <div className="footer__social" style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <a href="https://twitter.com/finzacore" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Twitter">
                𝕏 Twitter
              </a>
              <a href="https://linkedin.com/company/finzacore" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="LinkedIn">
                in LinkedIn
              </a>
              <a href="https://t.me/finzacore" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Telegram">
                ✈ Telegram
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <p className="footer__col-title">Categorías</p>
            <ul className="footer__links">
              <li><Link to="/blogs?category=Finanzas">💰 Finanzas</Link></li>
              <li><Link to="/blogs?category=Tecnología">⚡ Tecnología</Link></li>
              <li><Link to="/blogs?category=Inversión">📈 Inversión</Link></li>
              <li><Link to="/blogs?category=Economía">🌐 Economía</Link></li>
              <li><Link to="/blogs?category=Cripto">₿ Cripto</Link></li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <p className="footer__col-title">Navegación</p>
            <ul className="footer__links">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/blogs">Blog</Link></li>
              <li><Link to="/recursos">Recursos</Link></li>
              <li><Link to="/sobre">Sobre Nosotros</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="footer__col-title">Legal</p>
            <ul className="footer__links">
              <li><Link to="/privacidad">Política de privacidad</Link></li>
              <li><Link to="/aviso-legal">Aviso legal</Link></li>
              <li><Link to="/cookies">Política de cookies</Link></li>
              <li><a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">Publicidad (AdSense)</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {year} FinzaCore · Todos los derechos reservados</span>
          <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
            Hecho con ♥ en España · Contenido original bajo CC BY-NC-SA
          </span>
        </div>
      </div>
    </footer>
  );
}

/* --- components/Navbar.jsx --- */

const NAV_LINKS = [
  { to: '/',        label: 'Inicio',        end: true  },
  { to: '/blogs',   label: 'Blog' },
  { to: '/recursos', label: 'Recursos' },
  { to: '/sobre',   label: 'Sobre Nosotros' },
  { to: '/contacto', label: 'Contacto' },
];

function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Navegación principal">
      <div className="container">
        <div className="navbar__inner">
          {/* Logo */}
          <Link to="/" className="navbar__logo" aria-label="FinzaCore – Inicio">
            FinzaCore
          </Link>

          {/* Desktop links */}
          <ul className="navbar__links" role="list">
            {NAV_LINKS.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink to={to} end={end}>{label}</NavLink>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="navbar__cta">
            <Link to="/blogs" className="btn btn--primary" id="navbar-cta-btn">
              Leer artículos ↗
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`} aria-hidden={!menuOpen}>
          {NAV_LINKS.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className="navbar__mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          <Link to="/blogs" className="btn btn--primary" style={{ marginTop: '0.5rem', justifyContent: 'center' }}>
            Leer artículos ↗
          </Link>
        </div>
      </div>
    </nav>
  );
}

/* --- pages/Admin.jsx --- */

// ── SIDEBAR ─────────────────────────────────────────────────────────────────
function Sidebar({ onLogout }) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__header">
        <div className="admin-sidebar__logo">FinzaCore</div>
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
    author: 'FinzaCore Editorial',
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
              placeholder="FinzaCore Editorial"
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
        subtitle="Resumen de tu blog FinzaCore"
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
function Admin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);

  const logout = () => {
    localStorage.removeItem('finzacore_token');
    navigate('/admin');
  };

  useEffect(() => {
    api.verify()
      .then(() => setAuthed(true))
      .catch(() => { localStorage.removeItem('finzacore_token'); navigate('/admin'); })
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

/* --- pages/AdminLogin.jsx --- */

function AdminLogin() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem('finzacore_token');
    if (token) {
      api.verify().then(() => navigate('/admin/dashboard')).catch(() => {
        localStorage.removeItem('finzacore_token');
      });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { token } = await api.login(password);
      localStorage.setItem('finzacore_token', token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Contraseña incorrecta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Orbs */}
      <div style={{
        position: 'absolute', top: -100, right: -100,
        width: 500, height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(108,99,255,0.3) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }}></div>
      <div style={{
        position: 'absolute', bottom: -100, left: -100,
        width: 400, height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,255,0.2) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }}></div>

      <div className="login-card animate-fade-up">
        <div className="login-card__logo">FinzaCore</div>
        <div className="login-card__subtitle">Panel de administración</div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Contraseña de acceso</label>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoFocus
            />
          </div>

          {error && (
            <div style={{
              background: 'rgba(255,60,76,0.1)',
              border: '1px solid rgba(255,60,76,0.2)',
              borderRadius: 'var(--radius-md)',
              padding: '0.75rem',
              color: '#ff3c4c',
              fontSize: '0.875rem',
            }}>
              ✕ {error}
            </div>
          )}

          <button type="submit" className="btn btn--primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', padding: '0.875rem' }}>
            {loading ? 'Verificando...' : 'Entrar al panel →'}
          </button>
        </form>

        <p style={{ marginTop: 'var(--space-lg)', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
          Solo tú puedes acceder a esta página.
        </p>
      </div>
    </div>
  );
}

/* --- pages/BlogList.jsx --- */

function BlogList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [blogs, setBlogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const category = searchParams.get('category') || 'Todos';
  const search   = searchParams.get('search')   || '';
  const page     = parseInt(searchParams.get('page') || '1');

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 9 };
      if (category !== 'Todos') params.category = category;
      if (search) params.search = search;
      const data = await api.getBlogs(params);
      setBlogs(data.blogs);
      setTotal(data.total);
      setPages(data.pages);
    } finally {
      setLoading(false);
    }
  }, [category, search, page]);

  useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

  const setParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value); else next.delete(key);
    if (key !== 'page') next.delete('page');
    setSearchParams(next);
  };

  return (
    <div style={{ minHeight: '100vh', paddingTop: 80 }}>
      {/* Header */}
      <div style={{
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border)',
        padding: 'var(--space-2xl) 0 var(--space-xl)',
      }}>
        <div className="container">
          <span className="section__label">📰 Artículos</span>
          <h1 className="section__title" style={{ marginTop: '0.5rem' }}>
            {category !== 'Todos' ? (
              <>
                <span className="gradient-text">{category}</span>
              </>
            ) : (
              <>Todos los <span className="gradient-text">artículos</span></>
            )}
          </h1>
          {total > 0 && (
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
              {total} artículo{total !== 1 ? 's' : ''} encontrado{total !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>

      <div className="container" style={{ padding: 'var(--space-2xl) var(--space-xl)' }}>
        {/* Search + Filter */}
        <div style={{
          display: 'flex',
          gap: 'var(--space-md)',
          flexWrap: 'wrap',
          alignItems: 'center',
          marginBottom: 'var(--space-xl)'
        }}>
          {/* Search */}
          <div className="search-bar" style={{ flex: '1', minWidth: 240 }}>
            <span className="search-bar__icon">🔍</span>
            <input
              type="search"
              placeholder="Buscar artículos..."
              value={search}
              onChange={e => setParam('search', e.target.value)}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="cat-filter">
          {['Todos', ...CATEGORIES].map(cat => (
            <button
              key={cat}
              className={`cat-filter__btn ${category === cat ? 'active' : ''}`}
              onClick={() => setParam('category', cat === 'Todos' ? '' : cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="blog-grid">
            {[...Array(9)].map((_, i) => (
              <div key={i} style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                <div className="skeleton" style={{ aspectRatio: '16/9' }}></div>
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div className="skeleton" style={{ height: 18, width: '50%', borderRadius: 4 }}></div>
                  <div className="skeleton" style={{ height: 22, borderRadius: 4 }}></div>
                  <div className="skeleton" style={{ height: 14, borderRadius: 4 }}></div>
                  <div className="skeleton" style={{ height: 14, width: '80%', borderRadius: 4 }}></div>
                </div>
              </div>
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-3xl)', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No se encontraron artículos</h3>
            <p>Prueba con otra categoría o búsqueda</p>
            <button
              className="btn btn--outline"
              style={{ marginTop: '1.5rem' }}
              onClick={() => setSearchParams({})}
            >
              Ver todos los artículos
            </button>
          </div>
        ) : (
          <>
            {/* Ad between first row and rest */}
            <div className="blog-grid">
              {blogs.slice(0, 3).map(b => <BlogCard key={b.id} blog={b} />)}
            </div>

            {blogs.length > 3 && (
              <div style={{ margin: 'var(--space-xl) 0', display: 'flex', justifyContent: 'center' }}>
                <AdSlot type="leaderboard" />
              </div>
            )}

            {blogs.length > 3 && (
              <div className="blog-grid">
                {blogs.slice(3).map(b => <BlogCard key={b.id} blog={b} />)}
              </div>
            )}
          </>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div className="pagination">
            <button
              className="pagination__btn"
              disabled={page === 1}
              onClick={() => setParam('page', page - 1)}
            >
              ←
            </button>
            {[...Array(pages)].map((_, i) => (
              <button
                key={i + 1}
                className={`pagination__btn ${page === i + 1 ? 'active' : ''}`}
                onClick={() => setParam('page', i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="pagination__btn"
              disabled={page === pages}
              onClick={() => setParam('page', page + 1)}
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* --- pages/BlogPost.jsx --- */

function BlogPost() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    api.getBlog(slug)
      .then(async b => {
        setBlog(b);
        // Fetch related from same category
        const rel = await api.getBlogs({ category: b.category, limit: 3 });
        setRelated(rel.blogs.filter(r => r.id !== b.id).slice(0, 3));
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  // Scroll to top on slug change
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (loading) return (
    <div style={{ minHeight: '100vh', paddingTop: 120, display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 720 }}>
        <div className="skeleton" style={{ height: 400, borderRadius: 'var(--radius-lg)', marginBottom: '2rem' }}></div>
        <div className="skeleton" style={{ height: 40, marginBottom: '1rem', borderRadius: 4 }}></div>
        <div className="skeleton" style={{ height: 20, marginBottom: '0.5rem', borderRadius: 4 }}></div>
        <div className="skeleton" style={{ height: 20, width: '80%', borderRadius: 4 }}></div>
      </div>
    </div>
  );

  if (notFound) return (
    <div style={{ minHeight: '100vh', paddingTop: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
      <div style={{ fontSize: '5rem' }}>404</div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem' }}>Artículo no encontrado</h1>
      <Link to="/blogs" className="btn btn--primary">← Volver a artículos</Link>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', paddingTop: 80 }}>
      {/* Cover image */}
      {blog.coverImage && (
        <div style={{ width: '100%', maxHeight: 480, overflow: 'hidden', position: 'relative' }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, transparent 60%, var(--bg-base) 100%)',
            zIndex: 1
          }}></div>
          <img
            src={blog.coverImage}
            alt={blog.title}
            style={{ width: '100%', height: 480, objectFit: 'cover', filter: 'brightness(0.7)' }}
          />
        </div>
      )}

      <div className="container" style={{ maxWidth: 800, padding: 'var(--space-2xl) var(--space-xl)' }}>
        {/* Breadcrumb */}
        <nav style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: 'var(--space-lg)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--text-muted)' }}>Inicio</Link>
          <span>→</span>
          <Link to="/blogs" style={{ color: 'var(--text-muted)' }}>Artículos</Link>
          <span>→</span>
          <Link to={`/blogs?category=${encodeURIComponent(blog.category)}`} style={{ color: 'var(--primary)' }}>
            {blog.category}
          </Link>
        </nav>

        {/* Meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: 'var(--space-lg)' }}>
          <span className={getCategoryClass(blog.category)}>{blog.category}</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
            {formatDate(blog.createdAt)}
          </span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            · {readTime(blog.content)} de lectura
          </span>
          {blog.views > 0 && (
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>· 👁 {blog.views} vistas</span>
          )}
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
          fontWeight: 800,
          lineHeight: 1.15,
          letterSpacing: '-1px',
          marginBottom: 'var(--space-lg)',
        }}>
          {blog.title}
        </h1>

        {/* Summary */}
        {blog.summary && (
          <p style={{
            fontSize: '1.15rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            borderLeft: '3px solid var(--primary)',
            paddingLeft: 'var(--space-lg)',
            marginBottom: 'var(--space-xl)',
          }}>
            {blog.summary}
          </p>
        )}

        {/* Tags */}
        {blog.tags?.length > 0 && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: 'var(--space-xl)' }}>
            {blog.tags.map(t => (
              <span key={t} style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.2rem 0.6rem',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
              }}>
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* Author */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-md)',
          padding: 'var(--space-md)',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          marginBottom: 'var(--space-2xl)',
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.2rem', flexShrink: 0,
          }}>
            ✦
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{blog.author}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Editor de FinzaCore</div>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border)', marginBottom: 'var(--space-2xl)' }} />

        {/* Content */}
        <article className="prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {blog.content}
          </ReactMarkdown>
        </article>

        {/* In-article Ad */}
        <AdSlot type="in-article" />

        {/* Share / back */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-2xl)', paddingTop: 'var(--space-xl)', borderTop: '1px solid var(--border)', flexWrap: 'wrap', gap: '1rem' }}>
          <Link to="/blogs" className="btn btn--outline">← Volver a artículos</Link>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className="btn btn--ghost btn--sm"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: blog.title, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Enlace copiado al portapapeles');
                }
              }}
            >
              📤 Compartir
            </button>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {related.length > 0 && (
        <section style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)', padding: 'var(--space-3xl) 0' }}>
          <div className="container">
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', marginBottom: 'var(--space-xl)' }}>
              También te puede interesar
            </h2>
            <div className="blog-grid">
              {related.map(b => <BlogCard key={b.id} blog={b} />)}
            </div>
          </div>
        </section>
      )}

      {/* Bottom ad */}
      <div style={{ background: 'var(--bg-base)', padding: '1.5rem 0', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
          <AdSlot type="leaderboard" />
        </div>
      </div>
    </div>
  );
}

/* --- pages/Contacto.jsx --- */

const FAQS = [
  { q: '¿FinzaCore ofrece asesoramiento financiero?', a: 'No. Todo el contenido es exclusivamente educativo e informativo. No somos asesores financieros. Consulta siempre a un profesional antes de invertir.' },
  { q: '¿Puedo colaborar o escribir en el blog?', a: 'Sí, aceptamos colaboraciones de expertos en finanzas y tecnología. Escríbenos a través de este formulario indicando tu propuesta.' },
  { q: '¿Tienen newsletter?', a: 'Estamos trabajando en ello. Por el momento, visita el blog diariamente o síguenos en redes sociales para no perderte nada.' },
  { q: '¿La publicidad afecta al contenido editorial?', a: 'No. Los anunciantes no influyen en nuestras opiniones ni artículos. Mantenemos plena independencia editorial.' },
];

function Contacto() {
  const [form, setForm] = useState({ nombre: '', email: '', asunto: 'general', mensaje: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.email.trim() || !form.mensaje.trim()) {
      setError('Por favor, rellena todos los campos obligatorios.');
      return;
    }
    // Simulate form submission (replace with real endpoint when ready)
    await new Promise(r => setTimeout(r, 800));
    setSent(true);
    setError('');
  };

  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-base)' }}>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(108,99,255,0.07) 0%, rgba(0,153,255,0.04) 100%)',
        borderBottom: '1px solid var(--border)',
        padding: '4rem 0 3rem',
        textAlign: 'center',
      }}>
        <div className="container">
          <span className="section__label">✉️ Contacto</span>
          <h1 className="section__title" style={{ marginTop: '0.5rem' }}>
            Ponte en <span className="gradient-text">contacto</span>
          </h1>
          <p className="section__subtitle">
            ¿Tienes alguna pregunta, sugerencia o propuesta de colaboración? Escríbenos y te responderemos en menos de 48 horas.
          </p>
        </div>
      </section>

      {/* Contact layout */}
      <section className="section">
        <div className="container" style={{ maxWidth: 1000 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem', alignItems: 'start' }}>

            {/* Left: info */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', marginBottom: '1.25rem' }}>
                Antes de escribirnos
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {[
                  { icon: '📧', title: 'Email', value: 'hola@finzacore.com' },
                  { icon: '📍', title: 'Ubicación', value: 'España' },
                  { icon: '⏱️', title: 'Tiempo de respuesta', value: '< 48 horas laborables' },
                ].map(item => (
                  <div key={item.title} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.875rem',
                    background: 'white',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.875rem 1.25rem',
                    boxShadow: 'var(--shadow-sm)',
                  }}>
                    <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.title}</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 500 }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>
                Motivos frecuentes
              </h2>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {['Propuesta de colaboración', 'Corrección de un artículo', 'Consulta sobre contenido', 'Publicidad y patrocinios', 'Otras consultas'].map(m => (
                  <li key={m} style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    fontSize: '0.875rem', color: 'var(--text-secondary)',
                  }}>
                    <span style={{ color: 'var(--primary)' }}>→</span> {m}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: form */}
            <div style={{
              background: 'white',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              boxShadow: 'var(--shadow-md)',
            }}>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.75rem' }}>
                    ¡Mensaje enviado!
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    Gracias por contactar con nosotros. Te responderemos en menos de 48 horas.
                  </p>
                  <button
                    className="btn btn--outline"
                    style={{ marginTop: '1.5rem' }}
                    onClick={() => { setSent(false); setForm({ nombre: '', email: '', asunto: 'general', mensaje: '' }); }}
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                    Envíanos un mensaje
                  </h3>

                  {error && (
                    <div style={{
                      background: 'rgba(239,68,68,0.08)',
                      border: '1px solid rgba(239,68,68,0.2)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.875rem 1rem',
                      fontSize: '0.875rem',
                      color: '#dc2626',
                      marginBottom: '1.25rem',
                    }}>
                      ⚠️ {error}
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" htmlFor="contact-nombre">Nombre *</label>
                      <input
                        id="contact-nombre"
                        className="form-input"
                        type="text"
                        placeholder="Tu nombre"
                        value={form.nombre}
                        onChange={e => update('nombre', e.target.value)}
                        required
                        autoComplete="name"
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" htmlFor="contact-email">Email *</label>
                      <input
                        id="contact-email"
                        className="form-input"
                        type="email"
                        placeholder="tu@email.com"
                        value={form.email}
                        onChange={e => update('email', e.target.value)}
                        required
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-asunto">Motivo</label>
                    <select
                      id="contact-asunto"
                      className="form-select"
                      value={form.asunto}
                      onChange={e => update('asunto', e.target.value)}
                    >
                      <option value="general">Consulta general</option>
                      <option value="colaboracion">Propuesta de colaboración</option>
                      <option value="correccion">Corrección de artículo</option>
                      <option value="publicidad">Publicidad / Patrocinio</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-mensaje">Mensaje *</label>
                    <textarea
                      id="contact-mensaje"
                      className="form-textarea"
                      rows={6}
                      placeholder="Escribe aquí tu mensaje..."
                      value={form.mensaje}
                      onChange={e => update('mensaje', e.target.value)}
                      required
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    <input type="checkbox" id="contact-privacy" required style={{ accentColor: 'var(--primary)' }} />
                    <label htmlFor="contact-privacy" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      He leído y acepto la{' '}
                      <a href="/privacidad" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>política de privacidad</a>
                    </label>
                  </div>

                  <button type="submit" className="btn btn--primary" id="contact-submit-btn" style={{ width: '100%', justifyContent: 'center', padding: '0.875rem' }}>
                    ✉️ Enviar mensaje
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section" style={{ background: 'var(--bg-elevated)', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <div className="section__header">
            <span className="section__label">❓ Preguntas frecuentes</span>
            <h2 className="section__title">FAQ</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {FAQS.map(faq => (
              <details key={faq.q} style={{
                background: 'white',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
              }}>
                <summary style={{
                  padding: '1rem 1.5rem',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  color: 'var(--text-primary)',
                  listStyle: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  userSelect: 'none',
                }}>
                  {faq.q}
                  <span style={{ color: 'var(--primary)', fontWeight: 700, marginLeft: '1rem', flexShrink: 0 }}>+</span>
                </summary>
                <p style={{ padding: '0 1.5rem 1.25rem', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/* --- pages/Landing.jsx --- */

const CATEGORIES_INFO = [
  { name: 'Finanzas',   desc: 'Ahorro, crédito, planificación' },
  { name: 'Tecnología', desc: 'IA, gadgets, futuro digital' },
  { name: 'Inversión',  desc: 'Bolsa, ETFs, análisis' },
  { name: 'Economía',   desc: 'Macro, inflación, mercados' },
  { name: 'Cripto',     desc: 'Bitcoin, DeFi, blockchain' },
  { name: 'General',    desc: 'Tendencias y más' },
];

function Landing() {
  const [featured, setFeatured] = useState([]);
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      api.getBlogs({ featured: 'true', limit: 3 }),
      api.getBlogs({ limit: 6 }),
    ]).then(([f, l]) => {
      setFeatured(f.blogs);
      setLatest(l.blogs);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero__bg">
          <div className="hero__orb hero__orb--1"></div>
          <div className="hero__orb hero__orb--2"></div>
          <div className="hero__orb hero__orb--3"></div>
          <div className="hero__grid"></div>
        </div>

        <div className="container">
          <div className="hero__content">
            <div className="hero__label animate-fade-up">
              <span className="hero__dot"></span>
              Publicación diaria · Finanzas & Tecnología
            </div>

            <h1 className="hero__title animate-fade-up animate-delay-1">
              El conocimiento
              <br />
              <span className="gradient-text">es tu mejor</span>
              <br />
              inversión
            </h1>

            <p className="hero__subtitle animate-fade-up animate-delay-2">
              Artículos diarios sobre finanzas personales, tecnología, inversiones y economía. Información clara, profunda y sin rodeos.
            </p>

            <div className="hero__actions animate-fade-up animate-delay-3">
              <Link to="/blogs" className="btn btn--primary btn--lg">
                Ver todos los artículos →
              </Link>
              <Link to="/blogs?category=Finanzas" className="btn btn--outline btn--lg">
                💰 Finanzas
              </Link>
            </div>

            <div className="hero__stats animate-fade-up animate-delay-3">
              <div>
                <div className="hero__stat-value">∞</div>
                <div className="hero__stat-label">Artículos diarios</div>
              </div>
              <div>
                <div className="hero__stat-value">6</div>
                <div className="hero__stat-label">Categorías</div>
              </div>
              <div>
                <div className="hero__stat-value">0€</div>
                <div className="hero__stat-label">Siempre gratis</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AD LEADERBOARD ────────────────────────────────────────── */}
      <div style={{ background: 'var(--bg-elevated)', padding: '1rem 0', borderBottom: '1px solid var(--border)', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
          <AdSlot type="leaderboard" />
        </div>
      </div>

      {/* ── FEATURED POSTS ────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section__header">
            <span className="section__label">✦ Destacados</span>
            <h2 className="section__title">Artículos <span className="gradient-text">imprescindibles</span></h2>
            <p className="section__subtitle">Los artículos más relevantes de nuestra selección editorial</p>
          </div>

          {loading ? (
            <div className="blog-grid">
              {[...Array(3)].map((_, i) => (
                <div key={i} style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                  <div className="skeleton" style={{ aspectRatio: '16/9' }}></div>
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div className="skeleton" style={{ height: 20, width: '60%', borderRadius: 4 }}></div>
                    <div className="skeleton" style={{ height: 28, borderRadius: 4 }}></div>
                    <div className="skeleton" style={{ height: 16, borderRadius: 4 }}></div>
                    <div className="skeleton" style={{ height: 16, width: '80%', borderRadius: 4 }}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="blog-grid">
              {featured.map((blog, i) => (
                <BlogCard key={blog.id} blog={blog} featured={i === 0} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CATEGORIES ────────────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg-elevated)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section__header">
            <span className="section__label">∞ Explora</span>
            <h2 className="section__title">Elige tu <span className="gradient-text">categoría</span></h2>
          </div>

          <div className="cat-cards">
            {CATEGORIES_INFO.map(cat => {
              const color = getCategoryColor(cat.name);
              return (
                <div
                  key={cat.name}
                  className="cat-card"
                  onClick={() => navigate(`/blogs?category=${encodeURIComponent(cat.name)}`)}
                >
                  <div className="cat-card__icon" style={{ background: color.bg }}>
                    {getCategoryIcon(cat.name)}
                  </div>
                  <div>
                    <div className="cat-card__name" style={{ color: color.color }}>{cat.name}</div>
                    <div className="cat-card__count">{cat.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── LATEST POSTS ──────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2xl)', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="section__label">📰 Últimas publicaciones</span>
              <h2 className="section__title" style={{ marginTop: '0.25rem' }}>Artículos <span className="gradient-text">recientes</span></h2>
            </div>
            <Link to="/blogs" className="btn btn--outline">Ver todos →</Link>
          </div>

          {loading ? (
            <div className="blog-grid">
              {[...Array(6)].map((_, i) => (
                <div key={i} style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                  <div className="skeleton" style={{ aspectRatio: '16/9' }}></div>
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div className="skeleton" style={{ height: 20, width: '50%', borderRadius: 4 }}></div>
                    <div className="skeleton" style={{ height: 24, borderRadius: 4 }}></div>
                    <div className="skeleton" style={{ height: 14, borderRadius: 4 }}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="blog-grid">
              {latest.map(blog => <BlogCard key={blog.id} blog={blog} />)}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: 'var(--space-2xl)' }}>
            <Link to="/blogs" className="btn btn--primary btn--lg">Ver todos los artículos →</Link>
          </div>
        </div>
      </section>

      {/* ── AD ────────────────────────────────────────────────────── */}
      <div style={{ background: 'var(--bg-surface)', padding: '1.5rem 0', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
          <AdSlot type="leaderboard" />
        </div>
      </div>

      {/* ── NEWSLETTER ────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="newsletter-section">
            {/* Decorative orbs */}
            <div style={{
              position: 'absolute', top: -40, right: -40,
              width: 200, height: 200,
              background: 'radial-gradient(circle, rgba(108,99,255,0.3) 0%, transparent 70%)',
              filter: 'blur(40px)', pointerEvents: 'none'
            }}></div>

            <span className="section__label">📬 Newsletter</span>
            <h2 className="section__title" style={{ marginTop: '0.5rem' }}>
              No te pierdas ningún <span className="gradient-text">artículo</span>
            </h2>
            <p className="section__subtitle">
              Suscríbete y recibe los mejores artículos de finanzas y tecnología directamente en tu correo.
            </p>
            <form
              className="newsletter-form"
              onSubmit={e => { e.preventDefault(); alert('¡Gracias! Newsletter próximamente disponible.'); }}
            >
              <input
                type="email"
                placeholder="tu@email.com"
                className="newsletter-input"
                required
              />
              <button type="submit" className="btn btn--primary">Suscribirme</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

/* --- pages/Recursos.jsx --- */

const RESOURCES = [
  {
    category: 'Herramientas de inversión',
    emoji: '📊',
    items: [
      { name: 'Google Finance', desc: 'Seguimiento de acciones y mercados en tiempo real.', url: 'https://finance.google.com', badge: 'Gratis' },
      { name: 'Yahoo Finance', desc: 'Noticias financieras, cotizaciones y análisis.', url: 'https://finance.yahoo.com', badge: 'Gratis' },
      { name: 'TradingView', desc: 'Gráficos avanzados y análisis técnico profesional.', url: 'https://tradingview.com', badge: 'Freemium' },
      { name: 'Morningstar', desc: 'Análisis de fondos de inversión y ETFs en profundidad.', url: 'https://morningstar.es', badge: 'Freemium' },
    ]
  },
  {
    category: 'Criptomonedas',
    emoji: '₿',
    items: [
      { name: 'CoinGecko', desc: 'Precios, capitalización y datos de miles de criptomonedas.', url: 'https://coingecko.com', badge: 'Gratis' },
      { name: 'CoinMarketCap', desc: 'El agregador de datos cripto más usado del mundo.', url: 'https://coinmarketcap.com', badge: 'Gratis' },
      { name: 'DefiLlama', desc: 'Datos de TVL y protocolos DeFi en todas las blockchains.', url: 'https://defillama.com', badge: 'Gratis' },
      { name: 'Glassnode', desc: 'Análisis on-chain avanzado para inversores de Bitcoin.', url: 'https://glassnode.com', badge: 'Freemium' },
    ]
  },
  {
    category: 'Educación financiera',
    emoji: '📚',
    items: [
      { name: 'Investopedia', desc: 'El diccionario financiero más completo de internet.', url: 'https://investopedia.com', badge: 'Gratis' },
      { name: 'Khan Academy – Finanzas', desc: 'Cursos gratuitos de economía y finanzas personales.', url: 'https://es.khanacademy.org/economics-finance-domain', badge: 'Gratis' },
      { name: 'Coursera – Finanzas', desc: 'Cursos de universidades top sobre inversión y finanzas.', url: 'https://coursera.org/browse/business/finance', badge: 'Freemium' },
    ]
  },
  {
    category: 'Tecnología e IA',
    emoji: '🤖',
    items: [
      { name: 'Hacker News', desc: 'Las noticias tecnológicas más relevantes de startups y tech.', url: 'https://news.ycombinator.com', badge: 'Gratis' },
      { name: 'MIT Technology Review', desc: 'Análisis profundo de innovación tecnológica.', url: 'https://technologyreview.com', badge: 'Freemium' },
      { name: 'arXiv – CS', desc: 'Últimos papers de investigación en informática e IA.', url: 'https://arxiv.org/archive/cs', badge: 'Gratis' },
    ]
  },
];

function Recursos() {
  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-base)' }}>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(108,99,255,0.07) 0%, rgba(0,153,255,0.04) 100%)',
        borderBottom: '1px solid var(--border)',
        padding: '4rem 0 3rem',
        textAlign: 'center',
      }}>
        <div className="container">
          <span className="section__label">📦 Recursos</span>
          <h1 className="section__title" style={{ marginTop: '0.5rem' }}>
            Herramientas y <span className="gradient-text">recursos esenciales</span>
          </h1>
          <p className="section__subtitle">
            Una selección curada de las mejores herramientas gratuitas y de pago para inversores, entusiastas de la tecnología y curiosos de las finanzas.
          </p>
        </div>
      </section>

      {/* Ad leaderboard */}
      <div style={{ background: 'var(--bg-elevated)', padding: '1rem 0', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
          <AdSlot type="leaderboard" />
        </div>
      </div>

      {/* Resources grid */}
      <section className="section">
        <div className="container">
          {RESOURCES.map(group => (
            <div key={group.category} style={{ marginBottom: '3rem' }}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1.25rem',
                paddingBottom: '0.75rem',
                borderBottom: '2px solid var(--border)',
              }}>
                <span>{group.emoji}</span> {group.category}
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1rem',
              }}>
                {group.items.map(item => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resource-card"
                    aria-label={`${item.name}: ${item.desc}`}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
                        {item.name}
                      </h3>
                      <span className={`resource-badge resource-badge--${item.badge === 'Gratis' ? 'free' : 'freemium'}`}>
                        {item.badge}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
                    <span style={{ fontSize: '0.8rem', color: 'var(--primary)', marginTop: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>
                      Visitar →
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--bg-elevated)', padding: '3rem 0', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', marginBottom: '0.75rem' }}>
            ¿Quieres más análisis y guías?
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Lee nuestros artículos para sacar el máximo partido a estas herramientas.
          </p>
          <Link to="/blogs" className="btn btn--primary btn--lg" id="recursos-cta-blog">
            Ver todos los artículos →
          </Link>
        </div>
      </section>
    </main>
  );
}

/* --- pages/SobreNosotros.jsx --- */

const TEAM = [
  {
    name: 'Adrián Márquez',
    role: 'Fundador & Editor Jefe',
    bio: 'Apasionado por las finanzas personales y la tecnología. Llevo años investigando mercados financieros, criptomonedas y tendencias tecnológicas para hacerlos accesibles a todos.',
    emoji: '👨‍💼',
  },
];

const VALUES = [
  { emoji: '🔍', title: 'Rigor e investigación', desc: 'Cada artículo está respaldado por datos, fuentes verificadas y análisis propio. No publicamos rumores ni especulación sin fundamento.' },
  { emoji: '🌐', title: 'Accesibilidad', desc: 'Creemos que la educación financiera debe llegar a todos. Explicamos conceptos complejos de forma clara y sin jerga innecesaria.' },
  { emoji: '⚡', title: 'Actualidad', desc: 'Publicamos contenido fresco a diario. Seguimos los mercados y las tendencias tecnológicas para que nunca te quedes atrás.' },
  { emoji: '🚫', title: 'Sin conflictos de interés', desc: 'No vendemos asesoría financiera ni productos de inversión. Nuestros ingresos provienen de publicidad contextual, no de comisiones.' },
];

function SobreNosotros() {
  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-base)' }}>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(108,99,255,0.07) 0%, rgba(0,153,255,0.04) 100%)',
        borderBottom: '1px solid var(--border)',
        padding: '4rem 0 3rem',
        textAlign: 'center',
      }}>
        <div className="container">
          <span className="section__label">👋 Sobre Nosotros</span>
          <h1 className="section__title" style={{ marginTop: '0.5rem' }}>
            Conoce <span className="gradient-text">FinzaCore</span>
          </h1>
          <p className="section__subtitle">
            Somos un blog independiente dedicado a hacer el mundo de las finanzas y la tecnología más comprensible, accesible y útil para todos.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem',
            alignItems: 'center',
          }}>
            <div>
              <span className="section__label">Nuestra misión</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.5rem, 3vw, 2rem)', margin: '0.5rem 0 1rem', lineHeight: 1.2 }}>
                El conocimiento financiero es el mejor activo que puedes tener
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1rem' }}>
                En <strong>FinzaCore</strong> creemos que la brecha de conocimiento financiero es uno de los mayores problemas de nuestra generación. Millones de personas trabajan duro pero no saben cómo hacer crecer su dinero.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                Por eso creamos este espacio: para publicar artículos de calidad, bien investigados, que expliquen desde lo más básico hasta las tendencias más avanzadas en finanzas, inversión y tecnología.
              </p>
              <Link to="/blogs" className="btn btn--primary" id="sobre-cta-blog">
                Leer nuestros artículos →
              </Link>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, rgba(108,99,255,0.08), rgba(0,153,255,0.05))',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border)',
              padding: '2.5rem',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚡</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.5rem', background: 'var(--grad-text)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                FinzaCore
              </div>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                Tu Guía Definitiva en Finanzas y Tecnología
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem' }}>
                {[['∞', 'Artículos'], ['6', 'Categorías'], ['0€', 'Siempre gratis']].map(([v, l]) => (
                  <div key={l}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', color: 'var(--primary)' }}>{v}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: 'var(--bg-elevated)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section__header">
            <span className="section__label">🧭 Nuestros valores</span>
            <h2 className="section__title">En qué creemos</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {VALUES.map(v => (
              <div key={v.title} style={{
                background: 'white',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-sm)',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{v.emoji}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>{v.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <div className="section__header">
            <span className="section__label">👥 El equipo</span>
            <h2 className="section__title">Quién está detrás</h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            {TEAM.map(member => (
              <div key={member.name} style={{
                background: 'white',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-xl)',
                padding: '2rem',
                maxWidth: 360,
                textAlign: 'center',
                boxShadow: 'var(--shadow-sm)',
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{member.emoji}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem' }}>{member.name}</h3>
                <p style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 600, margin: '0.25rem 0 1rem', fontFamily: 'var(--font-mono)' }}>
                  {member.role}
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section style={{ background: 'var(--bg-elevated)', borderTop: '1px solid var(--border)', padding: '2.5rem 0' }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <div style={{
            background: 'rgba(245,158,11,0.08)',
            border: '1px solid rgba(245,158,11,0.2)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
          }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', color: '#d97706', marginBottom: '0.5rem' }}>
              ⚠️ Aviso legal importante
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              El contenido de FinzaCore tiene carácter exclusivamente informativo y educativo. Nada de lo publicado en este sitio constituye asesoramiento financiero, de inversión, fiscal o legal. Las inversiones conllevan riesgo de pérdida. Consulta siempre con un profesional cualificado antes de tomar decisiones financieras.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

/* --- App.jsx --- */

function Layout({ children }) {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');
  return (
    <>
      {!isAdmin && <Navbar />}
      {children}
      {!isAdmin && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Layout>
          <Routes>
            {/* Public */}
            <Route path="/"         element={<Landing />} />
            <Route path="/blogs"    element={<BlogList />} />
            <Route path="/blogs/:slug" element={<BlogPost />} />
            <Route path="/recursos" element={<Recursos />} />
            <Route path="/sobre"    element={<SobreNosotros />} />
            <Route path="/contacto" element={<Contacto />} />

            {/* Admin */}
            <Route path="/admin"           element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<Admin />} />
            <Route path="/admin/new"       element={<Admin />} />
            <Route path="/admin/posts"     element={<Admin />} />
            <Route path="/admin/edit/:id"  element={<Admin />} />

            {/* Legal placeholders (redirect to home until pages are built) */}
            <Route path="/privacidad"  element={<Navigate to="/" />} />
            <Route path="/aviso-legal" element={<Navigate to="/" />} />
            <Route path="/cookies"     element={<Navigate to="/" />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </ToastProvider>
    </BrowserRouter>
  );
}
