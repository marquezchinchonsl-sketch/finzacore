import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import AdSlot from '../components/AdSlot';
import BlogCard from '../components/BlogCard';
import { api, getCategoryClass, formatDate, readTime } from '../utils';

export default function BlogPost() {
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
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Editor de NEXO</div>
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
