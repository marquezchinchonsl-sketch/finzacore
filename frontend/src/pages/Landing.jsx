import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import AdSlot from '../components/AdSlot';
import { api, getCategoryColor, getCategoryIcon } from '../utils';

const CATEGORIES_INFO = [
  { name: 'Finanzas',   desc: 'Ahorro, crédito, planificación' },
  { name: 'Tecnología', desc: 'IA, gadgets, futuro digital' },
  { name: 'Inversión',  desc: 'Bolsa, ETFs, análisis' },
  { name: 'Economía',   desc: 'Macro, inflación, mercados' },
  { name: 'Cripto',     desc: 'Bitcoin, DeFi, blockchain' },
  { name: 'General',    desc: 'Tendencias y más' },
];

export default function Landing() {
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
