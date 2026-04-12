import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/',        label: 'Inicio',        end: true  },
  { to: '/blogs',   label: 'Blog' },
  { to: '/recursos', label: 'Recursos' },
  { to: '/sobre',   label: 'Sobre Nosotros' },
  { to: '/contacto', label: 'Contacto' },
];

export default function Navbar() {
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
