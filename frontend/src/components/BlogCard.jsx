import React from 'react';
import { Link } from 'react-router-dom';
import { getCategoryClass, formatDateShort, readTime } from '../utils';

export default function BlogCard({ blog, featured = false }) {
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
