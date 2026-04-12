import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
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
