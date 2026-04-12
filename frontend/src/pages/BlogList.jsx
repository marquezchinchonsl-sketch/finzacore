import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import AdSlot from '../components/AdSlot';
import { api, CATEGORIES } from '../utils';

export default function BlogList() {
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
