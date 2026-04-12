// src/main.jsx
import React15 from "react";
import ReactDOM from "react-dom/client";

// src/App.jsx
import React14 from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation as useLocation3 } from "react-router-dom";

// src/ToastContext.jsx
import React, { createContext, useContext, useState, useCallback } from "react";
var ToastContext = createContext(null);
function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const addToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);
  return /* @__PURE__ */ React.createElement(ToastContext.Provider, { value: addToast }, children, /* @__PURE__ */ React.createElement("div", null, toasts.map((t) => /* @__PURE__ */ React.createElement("div", { key: t.id, className: `toast toast--${t.type}` }, /* @__PURE__ */ React.createElement("span", null, t.type === "success" ? "\u2713" : "\u2715"), t.message))));
}
var useToast = () => useContext(ToastContext);

// src/components/Navbar.jsx
import React2, { useState as useState2, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
var NAV_LINKS = [
  { to: "/", label: "Inicio", end: true },
  { to: "/blogs", label: "Blog" },
  { to: "/recursos", label: "Recursos" },
  { to: "/sobre", label: "Sobre Nosotros" },
  { to: "/contacto", label: "Contacto" }
];
function Navbar() {
  const [scrolled, setScrolled] = useState2(false);
  const [menuOpen, setMenuOpen] = useState2(false);
  const location = useLocation();
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);
  return /* @__PURE__ */ React2.createElement("nav", { className: `navbar ${scrolled ? "scrolled" : ""}`, role: "navigation", "aria-label": "Navegaci\xF3n principal" }, /* @__PURE__ */ React2.createElement("div", { className: "container" }, /* @__PURE__ */ React2.createElement("div", { className: "navbar__inner" }, /* @__PURE__ */ React2.createElement(Link, { to: "/", className: "navbar__logo", "aria-label": "FinzaCore \u2013 Inicio" }, "FinzaCore"), /* @__PURE__ */ React2.createElement("ul", { className: "navbar__links", role: "list" }, NAV_LINKS.map(({ to, label, end }) => /* @__PURE__ */ React2.createElement("li", { key: to }, /* @__PURE__ */ React2.createElement(NavLink, { to, end }, label)))), /* @__PURE__ */ React2.createElement("div", { className: "navbar__cta" }, /* @__PURE__ */ React2.createElement(Link, { to: "/blogs", className: "btn btn--primary", id: "navbar-cta-btn" }, "Leer art\xEDculos \u2197")), /* @__PURE__ */ React2.createElement(
    "button",
    {
      className: `navbar__hamburger ${menuOpen ? "open" : ""}`,
      onClick: () => setMenuOpen((o) => !o),
      "aria-label": menuOpen ? "Cerrar men\xFA" : "Abrir men\xFA",
      "aria-expanded": menuOpen
    },
    /* @__PURE__ */ React2.createElement("span", null),
    /* @__PURE__ */ React2.createElement("span", null),
    /* @__PURE__ */ React2.createElement("span", null)
  )), /* @__PURE__ */ React2.createElement("div", { className: `navbar__mobile ${menuOpen ? "navbar__mobile--open" : ""}`, "aria-hidden": !menuOpen }, NAV_LINKS.map(({ to, label, end }) => /* @__PURE__ */ React2.createElement(
    NavLink,
    {
      key: to,
      to,
      end,
      className: "navbar__mobile-link",
      onClick: () => setMenuOpen(false)
    },
    label
  )), /* @__PURE__ */ React2.createElement(Link, { to: "/blogs", className: "btn btn--primary", style: { marginTop: "0.5rem", justifyContent: "center" } }, "Leer art\xEDculos \u2197"))));
}

// src/components/Footer.jsx
import React3 from "react";
import { Link as Link2 } from "react-router-dom";
function Footer() {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ React3.createElement("footer", { className: "footer", role: "contentinfo" }, /* @__PURE__ */ React3.createElement("div", { className: "container" }, /* @__PURE__ */ React3.createElement("div", { className: "footer__inner" }, /* @__PURE__ */ React3.createElement("div", { className: "footer__brand" }, /* @__PURE__ */ React3.createElement("div", { className: "footer__logo" }, "FinzaCore"), /* @__PURE__ */ React3.createElement("p", { className: "footer__desc" }, "Tu gu\xEDa definitiva en finanzas y tecnolog\xEDa. Contenido original, bien investigado y actualizado diariamente para que tomes mejores decisiones financieras."), /* @__PURE__ */ React3.createElement("div", { className: "footer__social", style: { display: "flex", gap: "0.75rem", marginTop: "1rem", flexWrap: "wrap" } }, /* @__PURE__ */ React3.createElement("a", { href: "https://twitter.com/finzacore", target: "_blank", rel: "noopener noreferrer", className: "footer__social-link", "aria-label": "Twitter" }, "\u{1D54F} Twitter"), /* @__PURE__ */ React3.createElement("a", { href: "https://linkedin.com/company/finzacore", target: "_blank", rel: "noopener noreferrer", className: "footer__social-link", "aria-label": "LinkedIn" }, "in LinkedIn"), /* @__PURE__ */ React3.createElement("a", { href: "https://t.me/finzacore", target: "_blank", rel: "noopener noreferrer", className: "footer__social-link", "aria-label": "Telegram" }, "\u2708 Telegram"))), /* @__PURE__ */ React3.createElement("div", null, /* @__PURE__ */ React3.createElement("p", { className: "footer__col-title" }, "Categor\xEDas"), /* @__PURE__ */ React3.createElement("ul", { className: "footer__links" }, /* @__PURE__ */ React3.createElement("li", null, /* @__PURE__ */ React3.createElement(Link2, { to: "/blogs?category=Finanzas" }, "\u{1F4B0} Finanzas")), /* @__PURE__ */ React3.createElement("li", null, /* @__PURE__ */ React3.createElement(Link2, { to: "/blogs?category=Tecnolog\xEDa" }, "\u26A1 Tecnolog\xEDa")), /* @__PURE__ */ React3.createElement("li", null, /* @__PURE__ */ React3.createElement(Link2, { to: "/blogs?category=Inversi\xF3n" }, "\u{1F4C8} Inversi\xF3n")), /* @__PURE__ */ React3.createElement("li", null, /* @__PURE__ */ React3.createElement(Link2, { to: "/blogs?category=Econom\xEDa" }, "\u{1F310} Econom\xEDa")), /* @__PURE__ */ React3.createElement("li", null, /* @__PURE__ */ React3.createElement(Link2, { to: "/blogs?category=Cripto" }, "\u20BF Cripto")))), /* @__PURE__ */ React3.createElement("div", null, /* @__PURE__ */ React3.createElement("p", { className: "footer__col-title" }, "Navegaci\xF3n"), /* @__PURE__ */ React3.createElement("ul", { className: "footer__links" }, /* @__PURE__ */ React3.createElement("li", null, /* @__PURE__ */ React3.createElement(Link2, { to: "/" }, "Inicio")), /* @__PURE__ */ React3.createElement("li", null, /* @__PURE__ */ React3.createElement(Link2, { to: "/blogs" }, "Blog")), /* @__PURE__ */ React3.createElement("li", null, /* @__PURE__ */ React3.createElement(Link2, { to: "/recursos" }, "Recursos")), /* @__PURE__ */ React3.createElement("li", null, /* @__PURE__ */ React3.createElement(Link2, { to: "/sobre" }, "Sobre Nosotros")), /* @__PURE__ */ React3.createElement("li", null, /* @__PURE__ */ React3.createElement(Link2, { to: "/contacto" }, "Contacto")))), /* @__PURE__ */ React3.createElement("div", null, /* @__PURE__ */ React3.createElement("p", { className: "footer__col-title" }, "Legal"), /* @__PURE__ */ React3.createElement("ul", { className: "footer__links" }, /* @__PURE__ */ React3.createElement("li", null, /* @__PURE__ */ React3.createElement(Link2, { to: "/privacidad" }, "Pol\xEDtica de privacidad")), /* @__PURE__ */ React3.createElement("li", null, /* @__PURE__ */ React3.createElement(Link2, { to: "/aviso-legal" }, "Aviso legal")), /* @__PURE__ */ React3.createElement("li", null, /* @__PURE__ */ React3.createElement(Link2, { to: "/cookies" }, "Pol\xEDtica de cookies")), /* @__PURE__ */ React3.createElement("li", null, /* @__PURE__ */ React3.createElement("a", { href: "https://policies.google.com/technologies/ads", target: "_blank", rel: "noopener noreferrer" }, "Publicidad (AdSense)"))))), /* @__PURE__ */ React3.createElement("div", { className: "footer__bottom" }, /* @__PURE__ */ React3.createElement("span", null, "\xA9 ", year, " FinzaCore \xB7 Todos los derechos reservados"), /* @__PURE__ */ React3.createElement("span", { style: { color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "0.75rem" } }, "Hecho con \u2665 en Espa\xF1a \xB7 Contenido original bajo CC BY-NC-SA"))));
}

// src/pages/Landing.jsx
import React6, { useEffect as useEffect2, useState as useState3 } from "react";
import { Link as Link4, useNavigate } from "react-router-dom";

// src/components/BlogCard.jsx
import React4 from "react";
import { Link as Link3 } from "react-router-dom";

// src/utils.js
var API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";
async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("nexo_token");
  const headers = { "Content-Type": "application/json", ...options.headers };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error en la petici\xF3n");
  return data;
}
var api = {
  // Public
  getBlogs: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return apiFetch(`/api/blogs${q ? "?" + q : ""}`);
  },
  getBlog: (slug) => apiFetch(`/api/blogs/${slug}`),
  getCategories: () => apiFetch("/api/categories"),
  // Auth
  login: (password) => apiFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ password })
  }),
  verify: () => apiFetch("/api/auth/verify"),
  // Admin
  adminGetBlogs: () => apiFetch("/api/admin/blogs"),
  adminCreate: (data) => apiFetch("/api/admin/blogs", { method: "POST", body: JSON.stringify(data) }),
  adminUpdate: (id, data) => apiFetch(`/api/admin/blogs/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  adminDelete: (id) => apiFetch(`/api/admin/blogs/${id}`, { method: "DELETE" })
};
function getCategoryClass(cat) {
  const map = {
    "Finanzas": "finanzas",
    "Tecnolog\xEDa": "tecnologia",
    "Inversi\xF3n": "inversion",
    "Econom\xEDa": "economia",
    "Cripto": "cripto",
    "General": "general"
  };
  return `category-badge category-badge--${map[cat] || "default"}`;
}
function getCategoryIcon(cat) {
  const icons = {
    "Finanzas": "\u{1F4B0}",
    "Tecnolog\xEDa": "\u26A1",
    "Inversi\xF3n": "\u{1F4C8}",
    "Econom\xEDa": "\u{1F310}",
    "Cripto": "\u20BF",
    "General": "\u2726"
  };
  return icons[cat] || "\u{1F4DD}";
}
function getCategoryColor(cat) {
  const colors = {
    "Finanzas": { bg: "rgba(108,99,255,0.15)", color: "#9c92ff" },
    "Tecnolog\xEDa": { bg: "rgba(0,212,255,0.15)", color: "#00d4ff" },
    "Inversi\xF3n": { bg: "rgba(0,255,170,0.12)", color: "#00ffaa" },
    "Econom\xEDa": { bg: "rgba(255,200,0,0.12)", color: "#ffc800" },
    "Cripto": { bg: "rgba(255,107,53,0.15)", color: "#ff6b35" },
    "General": { bg: "rgba(255,107,157,0.12)", color: "#ff6b9d" }
  };
  return colors[cat] || { bg: "rgba(255,255,255,0.08)", color: "#9ba3b8" };
}
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}
function formatDateShort(dateStr) {
  return new Date(dateStr).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
function readTime(content = "") {
  const words = content.split(/\s+/).length;
  const mins = Math.max(1, Math.ceil(words / 200));
  return `${mins} min`;
}
var CATEGORIES = ["Finanzas", "Tecnolog\xEDa", "Inversi\xF3n", "Econom\xEDa", "Cripto", "General"];

// src/components/BlogCard.jsx
function BlogCard({ blog, featured = false }) {
  const catClass = getCategoryClass(blog.category);
  return /* @__PURE__ */ React4.createElement(Link3, { to: `/blogs/${blog.slug}`, className: `blog-card ${featured ? "blog-card--featured" : ""}` }, /* @__PURE__ */ React4.createElement("div", { className: "blog-card__image" }, blog.coverImage ? /* @__PURE__ */ React4.createElement(
    "img",
    {
      src: blog.coverImage,
      alt: blog.title,
      loading: "lazy",
      onError: (e) => {
        e.target.style.display = "none";
        e.target.nextSibling.style.display = "flex";
      }
    }
  ) : null, /* @__PURE__ */ React4.createElement("div", { className: "blog-card__image-placeholder", style: { display: blog.coverImage ? "none" : "flex" } }, blog.category === "Finanzas" ? "\u{1F4B0}" : blog.category === "Tecnolog\xEDa" ? "\u26A1" : blog.category === "Inversi\xF3n" ? "\u{1F4C8}" : blog.category === "Cripto" ? "\u20BF" : "\u{1F4DD}")), /* @__PURE__ */ React4.createElement("div", { className: "blog-card__body" }, /* @__PURE__ */ React4.createElement("div", { className: "blog-card__meta" }, /* @__PURE__ */ React4.createElement("span", { className: catClass }, blog.category), /* @__PURE__ */ React4.createElement("span", { className: "blog-card__date" }, formatDateShort(blog.createdAt)), /* @__PURE__ */ React4.createElement("span", { className: "blog-card__date" }, "\xB7 ", readTime(blog.content), " lectura")), /* @__PURE__ */ React4.createElement("h2", { className: "blog-card__title" }, blog.title), /* @__PURE__ */ React4.createElement("p", { className: "blog-card__summary" }, blog.summary), /* @__PURE__ */ React4.createElement("div", { className: "blog-card__footer" }, /* @__PURE__ */ React4.createElement("span", { className: "blog-card__read-more" }, "Leer art\xEDculo ", /* @__PURE__ */ React4.createElement("span", null, "\u2192")), blog.views > 0 && /* @__PURE__ */ React4.createElement("span", { className: "blog-card__views" }, "\u{1F441} ", blog.views))));
}

// src/components/AdSlot.jsx
import React5 from "react";
function AdSlot({ type = "rectangle", adSlot = "", adClient = "" }) {
  return /* @__PURE__ */ React5.createElement("div", { className: `ad-slot ad-slot--${type}` }, /* @__PURE__ */ React5.createElement("span", { style: {
    fontSize: "0.75rem",
    color: "var(--text-muted)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px"
  } }, /* @__PURE__ */ React5.createElement("span", null, "\u{1F4E2}"), /* @__PURE__ */ React5.createElement("span", null, "Google AdSense"), /* @__PURE__ */ React5.createElement("span", { style: { fontSize: "0.65rem", opacity: 0.6 } }, type)));
}

// src/pages/Landing.jsx
var CATEGORIES_INFO = [
  { name: "Finanzas", desc: "Ahorro, cr\xE9dito, planificaci\xF3n" },
  { name: "Tecnolog\xEDa", desc: "IA, gadgets, futuro digital" },
  { name: "Inversi\xF3n", desc: "Bolsa, ETFs, an\xE1lisis" },
  { name: "Econom\xEDa", desc: "Macro, inflaci\xF3n, mercados" },
  { name: "Cripto", desc: "Bitcoin, DeFi, blockchain" },
  { name: "General", desc: "Tendencias y m\xE1s" }
];
function Landing() {
  const [featured, setFeatured] = useState3([]);
  const [latest, setLatest] = useState3([]);
  const [loading, setLoading] = useState3(true);
  const navigate = useNavigate();
  useEffect2(() => {
    Promise.all([
      api.getBlogs({ featured: "true", limit: 3 }),
      api.getBlogs({ limit: 6 })
    ]).then(([f, l]) => {
      setFeatured(f.blogs);
      setLatest(l.blogs);
    }).finally(() => setLoading(false));
  }, []);
  return /* @__PURE__ */ React6.createElement(React6.Fragment, null, /* @__PURE__ */ React6.createElement("section", { className: "hero" }, /* @__PURE__ */ React6.createElement("div", { className: "hero__bg" }, /* @__PURE__ */ React6.createElement("div", { className: "hero__orb hero__orb--1" }), /* @__PURE__ */ React6.createElement("div", { className: "hero__orb hero__orb--2" }), /* @__PURE__ */ React6.createElement("div", { className: "hero__orb hero__orb--3" }), /* @__PURE__ */ React6.createElement("div", { className: "hero__grid" })), /* @__PURE__ */ React6.createElement("div", { className: "container" }, /* @__PURE__ */ React6.createElement("div", { className: "hero__content" }, /* @__PURE__ */ React6.createElement("div", { className: "hero__label animate-fade-up" }, /* @__PURE__ */ React6.createElement("span", { className: "hero__dot" }), "Publicaci\xF3n diaria \xB7 Finanzas & Tecnolog\xEDa"), /* @__PURE__ */ React6.createElement("h1", { className: "hero__title animate-fade-up animate-delay-1" }, "El conocimiento", /* @__PURE__ */ React6.createElement("br", null), /* @__PURE__ */ React6.createElement("span", { className: "gradient-text" }, "es tu mejor"), /* @__PURE__ */ React6.createElement("br", null), "inversi\xF3n"), /* @__PURE__ */ React6.createElement("p", { className: "hero__subtitle animate-fade-up animate-delay-2" }, "Art\xEDculos diarios sobre finanzas personales, tecnolog\xEDa, inversiones y econom\xEDa. Informaci\xF3n clara, profunda y sin rodeos."), /* @__PURE__ */ React6.createElement("div", { className: "hero__actions animate-fade-up animate-delay-3" }, /* @__PURE__ */ React6.createElement(Link4, { to: "/blogs", className: "btn btn--primary btn--lg" }, "Ver todos los art\xEDculos \u2192"), /* @__PURE__ */ React6.createElement(Link4, { to: "/blogs?category=Finanzas", className: "btn btn--outline btn--lg" }, "\u{1F4B0} Finanzas")), /* @__PURE__ */ React6.createElement("div", { className: "hero__stats animate-fade-up animate-delay-3" }, /* @__PURE__ */ React6.createElement("div", null, /* @__PURE__ */ React6.createElement("div", { className: "hero__stat-value" }, "\u221E"), /* @__PURE__ */ React6.createElement("div", { className: "hero__stat-label" }, "Art\xEDculos diarios")), /* @__PURE__ */ React6.createElement("div", null, /* @__PURE__ */ React6.createElement("div", { className: "hero__stat-value" }, "6"), /* @__PURE__ */ React6.createElement("div", { className: "hero__stat-label" }, "Categor\xEDas")), /* @__PURE__ */ React6.createElement("div", null, /* @__PURE__ */ React6.createElement("div", { className: "hero__stat-value" }, "0\u20AC"), /* @__PURE__ */ React6.createElement("div", { className: "hero__stat-label" }, "Siempre gratis")))))), /* @__PURE__ */ React6.createElement("div", { style: { background: "var(--bg-elevated)", padding: "1rem 0", borderBottom: "1px solid var(--border)", borderTop: "1px solid var(--border)" } }, /* @__PURE__ */ React6.createElement("div", { className: "container", style: { display: "flex", justifyContent: "center" } }, /* @__PURE__ */ React6.createElement(AdSlot, { type: "leaderboard" }))), /* @__PURE__ */ React6.createElement("section", { className: "section" }, /* @__PURE__ */ React6.createElement("div", { className: "container" }, /* @__PURE__ */ React6.createElement("div", { className: "section__header" }, /* @__PURE__ */ React6.createElement("span", { className: "section__label" }, "\u2726 Destacados"), /* @__PURE__ */ React6.createElement("h2", { className: "section__title" }, "Art\xEDculos ", /* @__PURE__ */ React6.createElement("span", { className: "gradient-text" }, "imprescindibles")), /* @__PURE__ */ React6.createElement("p", { className: "section__subtitle" }, "Los art\xEDculos m\xE1s relevantes de nuestra selecci\xF3n editorial")), loading ? /* @__PURE__ */ React6.createElement("div", { className: "blog-grid" }, [...Array(3)].map((_, i) => /* @__PURE__ */ React6.createElement("div", { key: i, style: { borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--border)" } }, /* @__PURE__ */ React6.createElement("div", { className: "skeleton", style: { aspectRatio: "16/9" } }), /* @__PURE__ */ React6.createElement("div", { style: { padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" } }, /* @__PURE__ */ React6.createElement("div", { className: "skeleton", style: { height: 20, width: "60%", borderRadius: 4 } }), /* @__PURE__ */ React6.createElement("div", { className: "skeleton", style: { height: 28, borderRadius: 4 } }), /* @__PURE__ */ React6.createElement("div", { className: "skeleton", style: { height: 16, borderRadius: 4 } }), /* @__PURE__ */ React6.createElement("div", { className: "skeleton", style: { height: 16, width: "80%", borderRadius: 4 } }))))) : /* @__PURE__ */ React6.createElement("div", { className: "blog-grid" }, featured.map((blog, i) => /* @__PURE__ */ React6.createElement(BlogCard, { key: blog.id, blog, featured: i === 0 }))))), /* @__PURE__ */ React6.createElement("section", { className: "section", style: { background: "var(--bg-elevated)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" } }, /* @__PURE__ */ React6.createElement("div", { className: "container" }, /* @__PURE__ */ React6.createElement("div", { className: "section__header" }, /* @__PURE__ */ React6.createElement("span", { className: "section__label" }, "\u221E Explora"), /* @__PURE__ */ React6.createElement("h2", { className: "section__title" }, "Elige tu ", /* @__PURE__ */ React6.createElement("span", { className: "gradient-text" }, "categor\xEDa"))), /* @__PURE__ */ React6.createElement("div", { className: "cat-cards" }, CATEGORIES_INFO.map((cat) => {
    const color = getCategoryColor(cat.name);
    return /* @__PURE__ */ React6.createElement(
      "div",
      {
        key: cat.name,
        className: "cat-card",
        onClick: () => navigate(`/blogs?category=${encodeURIComponent(cat.name)}`)
      },
      /* @__PURE__ */ React6.createElement("div", { className: "cat-card__icon", style: { background: color.bg } }, getCategoryIcon(cat.name)),
      /* @__PURE__ */ React6.createElement("div", null, /* @__PURE__ */ React6.createElement("div", { className: "cat-card__name", style: { color: color.color } }, cat.name), /* @__PURE__ */ React6.createElement("div", { className: "cat-card__count" }, cat.desc))
    );
  })))), /* @__PURE__ */ React6.createElement("section", { className: "section" }, /* @__PURE__ */ React6.createElement("div", { className: "container" }, /* @__PURE__ */ React6.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--space-2xl)", flexWrap: "wrap", gap: "1rem" } }, /* @__PURE__ */ React6.createElement("div", null, /* @__PURE__ */ React6.createElement("span", { className: "section__label" }, "\u{1F4F0} \xDAltimas publicaciones"), /* @__PURE__ */ React6.createElement("h2", { className: "section__title", style: { marginTop: "0.25rem" } }, "Art\xEDculos ", /* @__PURE__ */ React6.createElement("span", { className: "gradient-text" }, "recientes"))), /* @__PURE__ */ React6.createElement(Link4, { to: "/blogs", className: "btn btn--outline" }, "Ver todos \u2192")), loading ? /* @__PURE__ */ React6.createElement("div", { className: "blog-grid" }, [...Array(6)].map((_, i) => /* @__PURE__ */ React6.createElement("div", { key: i, style: { borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--border)" } }, /* @__PURE__ */ React6.createElement("div", { className: "skeleton", style: { aspectRatio: "16/9" } }), /* @__PURE__ */ React6.createElement("div", { style: { padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" } }, /* @__PURE__ */ React6.createElement("div", { className: "skeleton", style: { height: 20, width: "50%", borderRadius: 4 } }), /* @__PURE__ */ React6.createElement("div", { className: "skeleton", style: { height: 24, borderRadius: 4 } }), /* @__PURE__ */ React6.createElement("div", { className: "skeleton", style: { height: 14, borderRadius: 4 } }))))) : /* @__PURE__ */ React6.createElement("div", { className: "blog-grid" }, latest.map((blog) => /* @__PURE__ */ React6.createElement(BlogCard, { key: blog.id, blog }))), /* @__PURE__ */ React6.createElement("div", { style: { textAlign: "center", marginTop: "var(--space-2xl)" } }, /* @__PURE__ */ React6.createElement(Link4, { to: "/blogs", className: "btn btn--primary btn--lg" }, "Ver todos los art\xEDculos \u2192")))), /* @__PURE__ */ React6.createElement("div", { style: { background: "var(--bg-surface)", padding: "1.5rem 0", borderTop: "1px solid var(--border)" } }, /* @__PURE__ */ React6.createElement("div", { className: "container", style: { display: "flex", justifyContent: "center" } }, /* @__PURE__ */ React6.createElement(AdSlot, { type: "leaderboard" }))), /* @__PURE__ */ React6.createElement("section", { className: "section" }, /* @__PURE__ */ React6.createElement("div", { className: "container" }, /* @__PURE__ */ React6.createElement("div", { className: "newsletter-section" }, /* @__PURE__ */ React6.createElement("div", { style: {
    position: "absolute",
    top: -40,
    right: -40,
    width: 200,
    height: 200,
    background: "radial-gradient(circle, rgba(108,99,255,0.3) 0%, transparent 70%)",
    filter: "blur(40px)",
    pointerEvents: "none"
  } }), /* @__PURE__ */ React6.createElement("span", { className: "section__label" }, "\u{1F4EC} Newsletter"), /* @__PURE__ */ React6.createElement("h2", { className: "section__title", style: { marginTop: "0.5rem" } }, "No te pierdas ning\xFAn ", /* @__PURE__ */ React6.createElement("span", { className: "gradient-text" }, "art\xEDculo")), /* @__PURE__ */ React6.createElement("p", { className: "section__subtitle" }, "Suscr\xEDbete y recibe los mejores art\xEDculos de finanzas y tecnolog\xEDa directamente en tu correo."), /* @__PURE__ */ React6.createElement(
    "form",
    {
      className: "newsletter-form",
      onSubmit: (e) => {
        e.preventDefault();
        alert("\xA1Gracias! Newsletter pr\xF3ximamente disponible.");
      }
    },
    /* @__PURE__ */ React6.createElement(
      "input",
      {
        type: "email",
        placeholder: "tu@email.com",
        className: "newsletter-input",
        required: true
      }
    ),
    /* @__PURE__ */ React6.createElement("button", { type: "submit", className: "btn btn--primary" }, "Suscribirme")
  )))));
}

// src/pages/BlogList.jsx
import React7, { useEffect as useEffect3, useState as useState4, useCallback as useCallback2 } from "react";
import { useSearchParams, Link as Link5 } from "react-router-dom";
function BlogList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [blogs, setBlogs] = useState4([]);
  const [total, setTotal] = useState4(0);
  const [pages, setPages] = useState4(1);
  const [loading, setLoading] = useState4(true);
  const category = searchParams.get("category") || "Todos";
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const fetchBlogs = useCallback2(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 9 };
      if (category !== "Todos") params.category = category;
      if (search) params.search = search;
      const data = await api.getBlogs(params);
      setBlogs(data.blogs);
      setTotal(data.total);
      setPages(data.pages);
    } finally {
      setLoading(false);
    }
  }, [category, search, page]);
  useEffect3(() => {
    fetchBlogs();
  }, [fetchBlogs]);
  const setParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    if (key !== "page") next.delete("page");
    setSearchParams(next);
  };
  return /* @__PURE__ */ React7.createElement("div", { style: { minHeight: "100vh", paddingTop: 80 } }, /* @__PURE__ */ React7.createElement("div", { style: {
    background: "var(--bg-surface)",
    borderBottom: "1px solid var(--border)",
    padding: "var(--space-2xl) 0 var(--space-xl)"
  } }, /* @__PURE__ */ React7.createElement("div", { className: "container" }, /* @__PURE__ */ React7.createElement("span", { className: "section__label" }, "\u{1F4F0} Art\xEDculos"), /* @__PURE__ */ React7.createElement("h1", { className: "section__title", style: { marginTop: "0.5rem" } }, category !== "Todos" ? /* @__PURE__ */ React7.createElement(React7.Fragment, null, /* @__PURE__ */ React7.createElement("span", { className: "gradient-text" }, category)) : /* @__PURE__ */ React7.createElement(React7.Fragment, null, "Todos los ", /* @__PURE__ */ React7.createElement("span", { className: "gradient-text" }, "art\xEDculos"))), total > 0 && /* @__PURE__ */ React7.createElement("p", { style: { color: "var(--text-muted)", marginTop: "0.5rem", fontSize: "0.9rem" } }, total, " art\xEDculo", total !== 1 ? "s" : "", " encontrado", total !== 1 ? "s" : ""))), /* @__PURE__ */ React7.createElement("div", { className: "container", style: { padding: "var(--space-2xl) var(--space-xl)" } }, /* @__PURE__ */ React7.createElement("div", { style: {
    display: "flex",
    gap: "var(--space-md)",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: "var(--space-xl)"
  } }, /* @__PURE__ */ React7.createElement("div", { className: "search-bar", style: { flex: "1", minWidth: 240 } }, /* @__PURE__ */ React7.createElement("span", { className: "search-bar__icon" }, "\u{1F50D}"), /* @__PURE__ */ React7.createElement(
    "input",
    {
      type: "search",
      placeholder: "Buscar art\xEDculos...",
      value: search,
      onChange: (e) => setParam("search", e.target.value)
    }
  ))), /* @__PURE__ */ React7.createElement("div", { className: "cat-filter" }, ["Todos", ...CATEGORIES].map((cat) => /* @__PURE__ */ React7.createElement(
    "button",
    {
      key: cat,
      className: `cat-filter__btn ${category === cat ? "active" : ""}`,
      onClick: () => setParam("category", cat === "Todos" ? "" : cat)
    },
    cat
  ))), loading ? /* @__PURE__ */ React7.createElement("div", { className: "blog-grid" }, [...Array(9)].map((_, i) => /* @__PURE__ */ React7.createElement("div", { key: i, style: { borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--border)" } }, /* @__PURE__ */ React7.createElement("div", { className: "skeleton", style: { aspectRatio: "16/9" } }), /* @__PURE__ */ React7.createElement("div", { style: { padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" } }, /* @__PURE__ */ React7.createElement("div", { className: "skeleton", style: { height: 18, width: "50%", borderRadius: 4 } }), /* @__PURE__ */ React7.createElement("div", { className: "skeleton", style: { height: 22, borderRadius: 4 } }), /* @__PURE__ */ React7.createElement("div", { className: "skeleton", style: { height: 14, borderRadius: 4 } }), /* @__PURE__ */ React7.createElement("div", { className: "skeleton", style: { height: 14, width: "80%", borderRadius: 4 } }))))) : blogs.length === 0 ? /* @__PURE__ */ React7.createElement("div", { style: { textAlign: "center", padding: "var(--space-3xl)", color: "var(--text-muted)" } }, /* @__PURE__ */ React7.createElement("div", { style: { fontSize: "4rem", marginBottom: "1rem" } }, "\u{1F50D}"), /* @__PURE__ */ React7.createElement("h3", { style: { fontSize: "1.25rem", marginBottom: "0.5rem" } }, "No se encontraron art\xEDculos"), /* @__PURE__ */ React7.createElement("p", null, "Prueba con otra categor\xEDa o b\xFAsqueda"), /* @__PURE__ */ React7.createElement(
    "button",
    {
      className: "btn btn--outline",
      style: { marginTop: "1.5rem" },
      onClick: () => setSearchParams({})
    },
    "Ver todos los art\xEDculos"
  )) : /* @__PURE__ */ React7.createElement(React7.Fragment, null, /* @__PURE__ */ React7.createElement("div", { className: "blog-grid" }, blogs.slice(0, 3).map((b) => /* @__PURE__ */ React7.createElement(BlogCard, { key: b.id, blog: b }))), blogs.length > 3 && /* @__PURE__ */ React7.createElement("div", { style: { margin: "var(--space-xl) 0", display: "flex", justifyContent: "center" } }, /* @__PURE__ */ React7.createElement(AdSlot, { type: "leaderboard" })), blogs.length > 3 && /* @__PURE__ */ React7.createElement("div", { className: "blog-grid" }, blogs.slice(3).map((b) => /* @__PURE__ */ React7.createElement(BlogCard, { key: b.id, blog: b })))), pages > 1 && /* @__PURE__ */ React7.createElement("div", { className: "pagination" }, /* @__PURE__ */ React7.createElement(
    "button",
    {
      className: "pagination__btn",
      disabled: page === 1,
      onClick: () => setParam("page", page - 1)
    },
    "\u2190"
  ), [...Array(pages)].map((_, i) => /* @__PURE__ */ React7.createElement(
    "button",
    {
      key: i + 1,
      className: `pagination__btn ${page === i + 1 ? "active" : ""}`,
      onClick: () => setParam("page", i + 1)
    },
    i + 1
  )), /* @__PURE__ */ React7.createElement(
    "button",
    {
      className: "pagination__btn",
      disabled: page === pages,
      onClick: () => setParam("page", page + 1)
    },
    "\u2192"
  ))));
}

// src/pages/BlogPost.jsx
import React8, { useEffect as useEffect4, useState as useState5 } from "react";
import { useParams, Link as Link6 } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
function BlogPost() {
  const { slug } = useParams();
  const [blog, setBlog] = useState5(null);
  const [related, setRelated] = useState5([]);
  const [loading, setLoading] = useState5(true);
  const [notFound, setNotFound] = useState5(false);
  useEffect4(() => {
    setLoading(true);
    setNotFound(false);
    api.getBlog(slug).then(async (b) => {
      setBlog(b);
      const rel = await api.getBlogs({ category: b.category, limit: 3 });
      setRelated(rel.blogs.filter((r) => r.id !== b.id).slice(0, 3));
    }).catch(() => setNotFound(true)).finally(() => setLoading(false));
  }, [slug]);
  useEffect4(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  if (loading) return /* @__PURE__ */ React8.createElement("div", { style: { minHeight: "100vh", paddingTop: 120, display: "flex", justifyContent: "center" } }, /* @__PURE__ */ React8.createElement("div", { style: { width: "100%", maxWidth: 720 } }, /* @__PURE__ */ React8.createElement("div", { className: "skeleton", style: { height: 400, borderRadius: "var(--radius-lg)", marginBottom: "2rem" } }), /* @__PURE__ */ React8.createElement("div", { className: "skeleton", style: { height: 40, marginBottom: "1rem", borderRadius: 4 } }), /* @__PURE__ */ React8.createElement("div", { className: "skeleton", style: { height: 20, marginBottom: "0.5rem", borderRadius: 4 } }), /* @__PURE__ */ React8.createElement("div", { className: "skeleton", style: { height: 20, width: "80%", borderRadius: 4 } })));
  if (notFound) return /* @__PURE__ */ React8.createElement("div", { style: { minHeight: "100vh", paddingTop: 120, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem" } }, /* @__PURE__ */ React8.createElement("div", { style: { fontSize: "5rem" } }, "404"), /* @__PURE__ */ React8.createElement("h1", { style: { fontFamily: "var(--font-display)", fontSize: "2rem" } }, "Art\xEDculo no encontrado"), /* @__PURE__ */ React8.createElement(Link6, { to: "/blogs", className: "btn btn--primary" }, "\u2190 Volver a art\xEDculos"));
  return /* @__PURE__ */ React8.createElement("div", { style: { minHeight: "100vh", paddingTop: 80 } }, blog.coverImage && /* @__PURE__ */ React8.createElement("div", { style: { width: "100%", maxHeight: 480, overflow: "hidden", position: "relative" } }, /* @__PURE__ */ React8.createElement("div", { style: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to bottom, transparent 60%, var(--bg-base) 100%)",
    zIndex: 1
  } }), /* @__PURE__ */ React8.createElement(
    "img",
    {
      src: blog.coverImage,
      alt: blog.title,
      style: { width: "100%", height: 480, objectFit: "cover", filter: "brightness(0.7)" }
    }
  )), /* @__PURE__ */ React8.createElement("div", { className: "container", style: { maxWidth: 800, padding: "var(--space-2xl) var(--space-xl)" } }, /* @__PURE__ */ React8.createElement("nav", { style: { display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "var(--space-lg)", fontSize: "0.85rem", color: "var(--text-muted)" } }, /* @__PURE__ */ React8.createElement(Link6, { to: "/", style: { color: "var(--text-muted)" } }, "Inicio"), /* @__PURE__ */ React8.createElement("span", null, "\u2192"), /* @__PURE__ */ React8.createElement(Link6, { to: "/blogs", style: { color: "var(--text-muted)" } }, "Art\xEDculos"), /* @__PURE__ */ React8.createElement("span", null, "\u2192"), /* @__PURE__ */ React8.createElement(Link6, { to: `/blogs?category=${encodeURIComponent(blog.category)}`, style: { color: "var(--primary)" } }, blog.category)), /* @__PURE__ */ React8.createElement("div", { style: { display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "var(--space-lg)" } }, /* @__PURE__ */ React8.createElement("span", { className: getCategoryClass(blog.category) }, blog.category), /* @__PURE__ */ React8.createElement("span", { style: { color: "var(--text-muted)", fontSize: "0.85rem", fontFamily: "var(--font-mono)" } }, formatDate(blog.createdAt)), /* @__PURE__ */ React8.createElement("span", { style: { color: "var(--text-muted)", fontSize: "0.85rem" } }, "\xB7 ", readTime(blog.content), " de lectura"), blog.views > 0 && /* @__PURE__ */ React8.createElement("span", { style: { color: "var(--text-muted)", fontSize: "0.85rem" } }, "\xB7 \u{1F441} ", blog.views, " vistas")), /* @__PURE__ */ React8.createElement("h1", { style: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
    fontWeight: 800,
    lineHeight: 1.15,
    letterSpacing: "-1px",
    marginBottom: "var(--space-lg)"
  } }, blog.title), blog.summary && /* @__PURE__ */ React8.createElement("p", { style: {
    fontSize: "1.15rem",
    color: "var(--text-secondary)",
    lineHeight: 1.7,
    borderLeft: "3px solid var(--primary)",
    paddingLeft: "var(--space-lg)",
    marginBottom: "var(--space-xl)"
  } }, blog.summary), blog.tags?.length > 0 && /* @__PURE__ */ React8.createElement("div", { style: { display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "var(--space-xl)" } }, blog.tags.map((t) => /* @__PURE__ */ React8.createElement("span", { key: t, style: {
    background: "var(--bg-elevated)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-sm)",
    padding: "0.2rem 0.6rem",
    fontSize: "0.75rem",
    color: "var(--text-muted)",
    fontFamily: "var(--font-mono)"
  } }, "#", t))), /* @__PURE__ */ React8.createElement("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-md)",
    padding: "var(--space-md)",
    background: "var(--bg-surface)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-lg)",
    marginBottom: "var(--space-2xl)"
  } }, /* @__PURE__ */ React8.createElement("div", { style: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: "linear-gradient(135deg, var(--primary), var(--secondary))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.2rem",
    flexShrink: 0
  } }, "\u2726"), /* @__PURE__ */ React8.createElement("div", null, /* @__PURE__ */ React8.createElement("div", { style: { fontWeight: 700, fontSize: "0.9rem" } }, blog.author), /* @__PURE__ */ React8.createElement("div", { style: { color: "var(--text-muted)", fontSize: "0.8rem" } }, "Editor de NEXO"))), /* @__PURE__ */ React8.createElement("hr", { style: { border: "none", borderTop: "1px solid var(--border)", marginBottom: "var(--space-2xl)" } }), /* @__PURE__ */ React8.createElement("article", { className: "prose" }, /* @__PURE__ */ React8.createElement(ReactMarkdown, { remarkPlugins: [remarkGfm] }, blog.content)), /* @__PURE__ */ React8.createElement(AdSlot, { type: "in-article" }), /* @__PURE__ */ React8.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginTop: "var(--space-2xl)", paddingTop: "var(--space-xl)", borderTop: "1px solid var(--border)", flexWrap: "wrap", gap: "1rem" } }, /* @__PURE__ */ React8.createElement(Link6, { to: "/blogs", className: "btn btn--outline" }, "\u2190 Volver a art\xEDculos"), /* @__PURE__ */ React8.createElement("div", { style: { display: "flex", gap: "0.5rem" } }, /* @__PURE__ */ React8.createElement(
    "button",
    {
      className: "btn btn--ghost btn--sm",
      onClick: () => {
        if (navigator.share) {
          navigator.share({ title: blog.title, url: window.location.href });
        } else {
          navigator.clipboard.writeText(window.location.href);
          alert("Enlace copiado al portapapeles");
        }
      }
    },
    "\u{1F4E4} Compartir"
  )))), related.length > 0 && /* @__PURE__ */ React8.createElement("section", { style: { background: "var(--bg-surface)", borderTop: "1px solid var(--border)", padding: "var(--space-3xl) 0" } }, /* @__PURE__ */ React8.createElement("div", { className: "container" }, /* @__PURE__ */ React8.createElement("h2", { style: { fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.5rem", marginBottom: "var(--space-xl)" } }, "Tambi\xE9n te puede interesar"), /* @__PURE__ */ React8.createElement("div", { className: "blog-grid" }, related.map((b) => /* @__PURE__ */ React8.createElement(BlogCard, { key: b.id, blog: b }))))), /* @__PURE__ */ React8.createElement("div", { style: { background: "var(--bg-base)", padding: "1.5rem 0", borderTop: "1px solid var(--border)" } }, /* @__PURE__ */ React8.createElement("div", { className: "container", style: { display: "flex", justifyContent: "center" } }, /* @__PURE__ */ React8.createElement(AdSlot, { type: "leaderboard" }))));
}

// src/pages/AdminLogin.jsx
import React9, { useState as useState6, useEffect as useEffect5 } from "react";
import { useNavigate as useNavigate2 } from "react-router-dom";
function AdminLogin() {
  const [password, setPassword] = useState6("");
  const [loading, setLoading] = useState6(false);
  const [error, setError] = useState6("");
  const navigate = useNavigate2();
  useEffect5(() => {
    const token = localStorage.getItem("nexo_token");
    if (token) {
      api.verify().then(() => navigate("/admin/dashboard")).catch(() => {
        localStorage.removeItem("nexo_token");
      });
    }
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { token } = await api.login(password);
      localStorage.setItem("nexo_token", token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Contrase\xF1a incorrecta");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ React9.createElement("div", { className: "login-page" }, /* @__PURE__ */ React9.createElement("div", { style: {
    position: "absolute",
    top: -100,
    right: -100,
    width: 500,
    height: 500,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(108,99,255,0.3) 0%, transparent 70%)",
    filter: "blur(60px)",
    pointerEvents: "none"
  } }), /* @__PURE__ */ React9.createElement("div", { style: {
    position: "absolute",
    bottom: -100,
    left: -100,
    width: 400,
    height: 400,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(0,212,255,0.2) 0%, transparent 70%)",
    filter: "blur(60px)",
    pointerEvents: "none"
  } }), /* @__PURE__ */ React9.createElement("div", { className: "login-card animate-fade-up" }, /* @__PURE__ */ React9.createElement("div", { className: "login-card__logo" }, "NEXO"), /* @__PURE__ */ React9.createElement("div", { className: "login-card__subtitle" }, "Panel de administraci\xF3n"), /* @__PURE__ */ React9.createElement("form", { onSubmit: handleSubmit, style: { display: "flex", flexDirection: "column", gap: "var(--space-lg)" } }, /* @__PURE__ */ React9.createElement("div", { className: "form-group", style: { marginBottom: 0 } }, /* @__PURE__ */ React9.createElement("label", { className: "form-label" }, "Contrase\xF1a de acceso"), /* @__PURE__ */ React9.createElement(
    "input",
    {
      type: "password",
      className: "form-input",
      placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
      value: password,
      onChange: (e) => setPassword(e.target.value),
      required: true,
      autoFocus: true
    }
  )), error && /* @__PURE__ */ React9.createElement("div", { style: {
    background: "rgba(255,60,76,0.1)",
    border: "1px solid rgba(255,60,76,0.2)",
    borderRadius: "var(--radius-md)",
    padding: "0.75rem",
    color: "#ff3c4c",
    fontSize: "0.875rem"
  } }, "\u2715 ", error), /* @__PURE__ */ React9.createElement("button", { type: "submit", className: "btn btn--primary", disabled: loading, style: { width: "100%", justifyContent: "center", padding: "0.875rem" } }, loading ? "Verificando..." : "Entrar al panel \u2192")), /* @__PURE__ */ React9.createElement("p", { style: { marginTop: "var(--space-lg)", fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center" } }, "Solo t\xFA puedes acceder a esta p\xE1gina.")));
}

// src/pages/Admin.jsx
import React10, { useState as useState7, useEffect as useEffect6, useCallback as useCallback3 } from "react";
import { Link as Link7, useNavigate as useNavigate3, useLocation as useLocation2 } from "react-router-dom";
function Sidebar({ onLogout }) {
  const location = useLocation2();
  const path = location.pathname;
  return /* @__PURE__ */ React10.createElement("aside", { className: "admin-sidebar" }, /* @__PURE__ */ React10.createElement("div", { className: "admin-sidebar__header" }, /* @__PURE__ */ React10.createElement("div", { className: "admin-sidebar__logo" }, "NEXO"), /* @__PURE__ */ React10.createElement("div", { className: "admin-sidebar__tagline" }, "Panel de administraci\xF3n")), /* @__PURE__ */ React10.createElement("nav", { className: "admin-sidebar__nav" }, /* @__PURE__ */ React10.createElement("div", { className: "admin-sidebar__section-label" }, "Gesti\xF3n"), /* @__PURE__ */ React10.createElement(Link7, { to: "/admin/dashboard", className: `admin-nav-link ${path === "/admin/dashboard" ? "active" : ""}` }, /* @__PURE__ */ React10.createElement("span", { className: "admin-nav-link__icon" }, "\u{1F4CA}"), /* @__PURE__ */ React10.createElement("span", null, "Dashboard")), /* @__PURE__ */ React10.createElement(Link7, { to: "/admin/new", className: `admin-nav-link ${path === "/admin/new" ? "active" : ""}` }, /* @__PURE__ */ React10.createElement("span", { className: "admin-nav-link__icon" }, "\u270F\uFE0F"), /* @__PURE__ */ React10.createElement("span", null, "Nuevo art\xEDculo")), /* @__PURE__ */ React10.createElement(Link7, { to: "/admin/posts", className: `admin-nav-link ${path === "/admin/posts" ? "active" : ""}` }, /* @__PURE__ */ React10.createElement("span", { className: "admin-nav-link__icon" }, "\u{1F4C4}"), /* @__PURE__ */ React10.createElement("span", null, "Mis art\xEDculos"))), /* @__PURE__ */ React10.createElement("div", { className: "admin-sidebar__footer" }, /* @__PURE__ */ React10.createElement("a", { href: "/", target: "_blank", className: "admin-nav-link" }, /* @__PURE__ */ React10.createElement("span", { className: "admin-nav-link__icon" }, "\u{1F310}"), /* @__PURE__ */ React10.createElement("span", null, "Ver el blog")), /* @__PURE__ */ React10.createElement("button", { onClick: onLogout, className: "admin-logout-btn" }, /* @__PURE__ */ React10.createElement("span", null, "\u21A9"), "Cerrar sesi\xF3n")));
}
function TopBar({ title, subtitle, action }) {
  return /* @__PURE__ */ React10.createElement("div", { className: "admin-topbar" }, /* @__PURE__ */ React10.createElement("div", { className: "admin-topbar__left" }, /* @__PURE__ */ React10.createElement("h1", { className: "admin-topbar__title" }, title), subtitle && /* @__PURE__ */ React10.createElement("p", { className: "admin-topbar__subtitle" }, subtitle)), action && /* @__PURE__ */ React10.createElement("div", { className: "admin-topbar__action" }, action));
}
function BlogEditor({ existing = null, onSave }) {
  const toast = useToast();
  const [loading, setLoading] = useState7(false);
  const [preview, setPreview] = useState7(false);
  const [form, setForm] = useState7({
    title: "",
    summary: "",
    content: "",
    category: "Finanzas",
    tags: "",
    coverImage: "",
    published: true,
    featured: false,
    author: "NEXO Editorial",
    ...existing ? {
      ...existing,
      tags: Array.isArray(existing.tags) ? existing.tags.join(", ") : ""
    } : {}
  });
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const wordCount = form.content.split(/\s+/).filter(Boolean).length;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return toast("El t\xEDtulo es obligatorio", "error");
    if (!form.content.trim()) return toast("El contenido es obligatorio", "error");
    setLoading(true);
    try {
      const payload = {
        ...form,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean)
      };
      if (existing) {
        await api.adminUpdate(existing.id, payload);
        toast("Art\xEDculo actualizado correctamente \u2713");
      } else {
        await api.adminCreate(payload);
        toast("Art\xEDculo publicado correctamente \u2713");
      }
      onSave?.();
    } catch (err) {
      toast(err.message || "Error al guardar", "error");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ React10.createElement("form", { onSubmit: handleSubmit, className: "editor-layout" }, /* @__PURE__ */ React10.createElement("div", { className: "editor-main" }, /* @__PURE__ */ React10.createElement("div", { className: "editor-card" }, /* @__PURE__ */ React10.createElement("label", { className: "form-label" }, "T\xEDtulo del art\xEDculo *"), /* @__PURE__ */ React10.createElement(
    "input",
    {
      className: "form-input editor-title-input",
      value: form.title,
      onChange: (e) => update("title", e.target.value),
      placeholder: "Escribe un t\xEDtulo atractivo para tu art\xEDculo...",
      required: true
    }
  ), /* @__PURE__ */ React10.createElement("label", { className: "form-label", style: { marginTop: "1.25rem" } }, "Resumen ", /* @__PURE__ */ React10.createElement("span", { style: { fontWeight: 400, color: "var(--text-muted)" } }, "(aparece en las tarjetas)")), /* @__PURE__ */ React10.createElement(
    "textarea",
    {
      className: "form-textarea",
      value: form.summary,
      onChange: (e) => update("summary", e.target.value),
      placeholder: "Describe brevemente de qu\xE9 trata el art\xEDculo (2-3 frases)...",
      rows: 3
    }
  )), /* @__PURE__ */ React10.createElement("div", { className: "editor-card", style: { flex: 1 } }, /* @__PURE__ */ React10.createElement("div", { className: "editor-content-header" }, /* @__PURE__ */ React10.createElement("div", null, /* @__PURE__ */ React10.createElement("label", { className: "form-label" }, "Contenido en Markdown *"), form.content && /* @__PURE__ */ React10.createElement("span", { className: "editor-wordcount" }, wordCount, " palabras \xB7 ", readTime(form.content), " lectura")), /* @__PURE__ */ React10.createElement(
    "button",
    {
      type: "button",
      className: `editor-tab ${!preview ? "active" : ""}`,
      onClick: () => setPreview(false)
    },
    "\u270F\uFE0F Editar"
  ), /* @__PURE__ */ React10.createElement(
    "button",
    {
      type: "button",
      className: `editor-tab ${preview ? "active" : ""}`,
      onClick: () => setPreview(true)
    },
    "\u{1F441} Preview"
  )), preview ? /* @__PURE__ */ React10.createElement("div", { className: "editor-preview prose" }, form.content ? /* @__PURE__ */ React10.createElement("div", { dangerouslySetInnerHTML: { __html: simpleMdToHtml(form.content) } }) : /* @__PURE__ */ React10.createElement("p", { style: { color: "var(--text-muted)", fontStyle: "italic" } }, "El contenido aparecer\xE1 aqu\xED...")) : /* @__PURE__ */ React10.createElement(
    "textarea",
    {
      className: "form-textarea editor-textarea",
      value: form.content,
      onChange: (e) => update("content", e.target.value),
      placeholder: `# T\xEDtulo del art\xEDculo

Escribe aqu\xED el contenido en Markdown...

## Secci\xF3n 1

Texto de la primera secci\xF3n.

## Secci\xF3n 2

Texto de la segunda secci\xF3n.

> Cita importante

- Punto clave 1
- Punto clave 2`,
      required: true
    }
  ), /* @__PURE__ */ React10.createElement("div", { className: "editor-md-help" }, /* @__PURE__ */ React10.createElement("span", null, "Formato Markdown:"), /* @__PURE__ */ React10.createElement("code", null, "# T\xEDtulo"), /* @__PURE__ */ React10.createElement("code", null, "## Subt\xEDtulo"), /* @__PURE__ */ React10.createElement("code", null, "**negrita**"), /* @__PURE__ */ React10.createElement("code", null, "*cursiva*"), /* @__PURE__ */ React10.createElement("code", null, "- lista"), /* @__PURE__ */ React10.createElement("code", null, "> cita"), /* @__PURE__ */ React10.createElement("code", null, "`c\xF3digo`")))), /* @__PURE__ */ React10.createElement("div", { className: "editor-sidebar" }, /* @__PURE__ */ React10.createElement("div", { className: "editor-card editor-publish-box" }, /* @__PURE__ */ React10.createElement("div", { className: "editor-publish-title" }, "Publicaci\xF3n"), /* @__PURE__ */ React10.createElement("div", { className: "editor-toggles" }, /* @__PURE__ */ React10.createElement("div", { className: "toggle-row" }, /* @__PURE__ */ React10.createElement("div", null, /* @__PURE__ */ React10.createElement("div", { className: "toggle-row__label" }, "Estado"), /* @__PURE__ */ React10.createElement("div", { className: "toggle-row__desc" }, form.published ? "Visible en el blog" : "Guardado como borrador")), /* @__PURE__ */ React10.createElement("label", { className: "toggle" }, /* @__PURE__ */ React10.createElement("input", { type: "checkbox", checked: form.published, onChange: (e) => update("published", e.target.checked) }), /* @__PURE__ */ React10.createElement("span", { className: "toggle__slider" }))), /* @__PURE__ */ React10.createElement("div", { className: "toggle-row" }, /* @__PURE__ */ React10.createElement("div", null, /* @__PURE__ */ React10.createElement("div", { className: "toggle-row__label" }, "Destacado \u2B50"), /* @__PURE__ */ React10.createElement("div", { className: "toggle-row__desc" }, "Aparece en la landing")), /* @__PURE__ */ React10.createElement("label", { className: "toggle" }, /* @__PURE__ */ React10.createElement("input", { type: "checkbox", checked: form.featured, onChange: (e) => update("featured", e.target.checked) }), /* @__PURE__ */ React10.createElement("span", { className: "toggle__slider" })))), /* @__PURE__ */ React10.createElement(
    "button",
    {
      type: "submit",
      className: "btn btn--primary editor-submit-btn",
      disabled: loading
    },
    loading ? "Guardando..." : existing ? "\u{1F4BE} Guardar cambios" : "\u{1F680} Publicar art\xEDculo"
  )), /* @__PURE__ */ React10.createElement("div", { className: "editor-card" }, /* @__PURE__ */ React10.createElement("div", { className: "editor-section-title" }, "Metadata"), /* @__PURE__ */ React10.createElement("div", { className: "form-group" }, /* @__PURE__ */ React10.createElement("label", { className: "form-label" }, "Categor\xEDa"), /* @__PURE__ */ React10.createElement(
    "select",
    {
      className: "form-select",
      value: form.category,
      onChange: (e) => update("category", e.target.value)
    },
    CATEGORIES.map((c) => /* @__PURE__ */ React10.createElement("option", { key: c }, c))
  )), /* @__PURE__ */ React10.createElement("div", { className: "form-group" }, /* @__PURE__ */ React10.createElement("label", { className: "form-label" }, "Autor"), /* @__PURE__ */ React10.createElement(
    "input",
    {
      className: "form-input",
      value: form.author,
      onChange: (e) => update("author", e.target.value),
      placeholder: "NEXO Editorial"
    }
  )), /* @__PURE__ */ React10.createElement("div", { className: "form-group", style: { marginBottom: 0 } }, /* @__PURE__ */ React10.createElement("label", { className: "form-label" }, "Tags ", /* @__PURE__ */ React10.createElement("span", { style: { fontWeight: 400, color: "var(--text-muted)" } }, "(separados por comas)")), /* @__PURE__ */ React10.createElement(
    "input",
    {
      className: "form-input",
      value: form.tags,
      onChange: (e) => update("tags", e.target.value),
      placeholder: "inversi\xF3n, ETF, bolsa, bitcoin..."
    }
  ))), /* @__PURE__ */ React10.createElement("div", { className: "editor-card" }, /* @__PURE__ */ React10.createElement("div", { className: "editor-section-title" }, "Imagen de portada"), /* @__PURE__ */ React10.createElement("div", { className: "form-group", style: { marginBottom: "0.75rem" } }, /* @__PURE__ */ React10.createElement("label", { className: "form-label" }, "URL de la imagen"), /* @__PURE__ */ React10.createElement(
    "input",
    {
      className: "form-input",
      value: form.coverImage,
      onChange: (e) => update("coverImage", e.target.value),
      placeholder: "https://images.unsplash.com/..."
    }
  )), form.coverImage && /* @__PURE__ */ React10.createElement(
    "img",
    {
      src: form.coverImage,
      alt: "preview",
      style: {
        width: "100%",
        height: 160,
        objectFit: "cover",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--border)"
      },
      onError: (e) => {
        e.target.style.display = "none";
      }
    }
  ), !form.coverImage && /* @__PURE__ */ React10.createElement("div", { style: {
    width: "100%",
    height: 120,
    background: "var(--bg-base)",
    borderRadius: "var(--radius-md)",
    border: "2px dashed var(--border)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: "0.5rem",
    color: "var(--text-muted)",
    fontSize: "0.8rem"
  } }, /* @__PURE__ */ React10.createElement("span", { style: { fontSize: "2rem" } }, "\u{1F5BC}\uFE0F"), /* @__PURE__ */ React10.createElement("span", null, "Pega la URL arriba")), /* @__PURE__ */ React10.createElement("p", { style: { fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.5rem" } }, "Recomendado: im\xE1genes de ", /* @__PURE__ */ React10.createElement("a", { href: "https://unsplash.com", target: "_blank", rel: "noreferrer", style: { color: "var(--primary)" } }, "Unsplash.com"), " (gratis)"))));
}
function simpleMdToHtml(md) {
  return md.replace(/^### (.+)$/gm, "<h3>$1</h3>").replace(/^## (.+)$/gm, "<h2>$1</h2>").replace(/^# (.+)$/gm, "<h1>$1</h1>").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>").replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>").replace(/^- (.+)$/gm, "<li>$1</li>").replace(/`(.+?)`/g, "<code>$1</code>").replace(/\n\n/g, "</p><p>").trim();
}
function Dashboard({ navigate }) {
  const [blogs, setBlogs] = useState7([]);
  const [loading, setLoading] = useState7(true);
  const load = useCallback3(async () => {
    const data = await api.adminGetBlogs();
    setBlogs(data);
    setLoading(false);
  }, []);
  useEffect6(() => {
    load();
  }, [load]);
  const published = blogs.filter((b) => b.published).length;
  const drafts = blogs.filter((b) => !b.published).length;
  const featured = blogs.filter((b) => b.featured).length;
  const totalViews = blogs.reduce((acc, b) => acc + (b.views || 0), 0);
  return /* @__PURE__ */ React10.createElement(React10.Fragment, null, /* @__PURE__ */ React10.createElement(
    TopBar,
    {
      title: "Dashboard",
      subtitle: "Resumen de tu blog NEXO",
      action: /* @__PURE__ */ React10.createElement("button", { className: "btn btn--primary", onClick: () => navigate("/admin/new") }, "\u270F\uFE0F Nuevo art\xEDculo")
    }
  ), /* @__PURE__ */ React10.createElement("div", { className: "dashboard-stats" }, [
    { label: "Total art\xEDculos", value: loading ? "\u2014" : blogs.length, icon: "\u{1F4C4}", color: "#6c63ff", bg: "rgba(108,99,255,0.08)" },
    { label: "Publicados", value: loading ? "\u2014" : published, icon: "\u2705", color: "#059669", bg: "rgba(16,185,129,0.08)" },
    { label: "Borradores", value: loading ? "\u2014" : drafts, icon: "\u{1F4DD}", color: "#d97706", bg: "rgba(245,158,11,0.08)" },
    { label: "Vistas totales", value: loading ? "\u2014" : totalViews, icon: "\u{1F441}", color: "#0085e0", bg: "rgba(0,153,255,0.08)" }
  ].map((s) => /* @__PURE__ */ React10.createElement("div", { key: s.label, className: "stat-card", style: { "--stat-color": s.color, "--stat-bg": s.bg } }, /* @__PURE__ */ React10.createElement("div", { className: "stat-card__icon", style: { background: s.bg } }, s.icon), /* @__PURE__ */ React10.createElement("div", { className: "stat-card__value", style: { color: s.color } }, s.value), /* @__PURE__ */ React10.createElement("div", { className: "stat-card__label" }, s.label)))), /* @__PURE__ */ React10.createElement("div", { className: "dashboard-quick" }, /* @__PURE__ */ React10.createElement("div", { className: "editor-card", style: { flex: 1 } }, /* @__PURE__ */ React10.createElement("div", { className: "editor-section-title", style: { marginBottom: "1rem" } }, "Acciones r\xE1pidas"), /* @__PURE__ */ React10.createElement("div", { style: { display: "flex", gap: "0.75rem", flexWrap: "wrap" } }, /* @__PURE__ */ React10.createElement("button", { className: "btn btn--primary", onClick: () => navigate("/admin/new") }, "\u270F\uFE0F Escribir art\xEDculo"), /* @__PURE__ */ React10.createElement("button", { className: "btn btn--outline", onClick: () => navigate("/admin/posts") }, "\u{1F4CB} Gestionar art\xEDculos"), /* @__PURE__ */ React10.createElement("a", { href: "/", target: "_blank", className: "btn btn--ghost" }, "\u{1F310} Ver el blog")))), /* @__PURE__ */ React10.createElement("div", { className: "editor-card", style: { marginTop: "1.5rem" } }, /* @__PURE__ */ React10.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" } }, /* @__PURE__ */ React10.createElement("div", { className: "editor-section-title", style: { marginBottom: 0 } }, "Art\xEDculos recientes"), /* @__PURE__ */ React10.createElement("button", { className: "btn btn--ghost btn--sm", onClick: () => navigate("/admin/posts") }, "Ver todos \u2192")), loading ? /* @__PURE__ */ React10.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "0.75rem" } }, [...Array(3)].map((_, i) => /* @__PURE__ */ React10.createElement("div", { key: i, className: "skeleton", style: { height: 52, borderRadius: "var(--radius-md)" } }))) : blogs.length === 0 ? /* @__PURE__ */ React10.createElement("div", { style: { textAlign: "center", padding: "2rem", color: "var(--text-muted)" } }, /* @__PURE__ */ React10.createElement("div", { style: { fontSize: "3rem", marginBottom: "0.75rem" } }, "\u{1F4ED}"), /* @__PURE__ */ React10.createElement("p", null, "Todav\xEDa no hay art\xEDculos. \xA1Crea el primero!")) : /* @__PURE__ */ React10.createElement("table", { className: "admin-table" }, /* @__PURE__ */ React10.createElement("thead", null, /* @__PURE__ */ React10.createElement("tr", null, /* @__PURE__ */ React10.createElement("th", null, "T\xEDtulo"), /* @__PURE__ */ React10.createElement("th", null, "Categor\xEDa"), /* @__PURE__ */ React10.createElement("th", null, "Estado"), /* @__PURE__ */ React10.createElement("th", null, "Fecha"), /* @__PURE__ */ React10.createElement("th", null, "Vistas"), /* @__PURE__ */ React10.createElement("th", null, "Acciones"))), /* @__PURE__ */ React10.createElement("tbody", null, blogs.slice(0, 5).map((b) => /* @__PURE__ */ React10.createElement(BlogRow, { key: b.id, blog: b, navigate, onDelete: load }))))));
}
function AllPosts({ navigate }) {
  const [blogs, setBlogs] = useState7([]);
  const [loading, setLoading] = useState7(true);
  const [search, setSearch] = useState7("");
  const [filterCat, setFilterCat] = useState7("Todos");
  const load = useCallback3(async () => {
    const data = await api.adminGetBlogs();
    setBlogs(data);
    setLoading(false);
  }, []);
  useEffect6(() => {
    load();
  }, [load]);
  const filtered = blogs.filter((b) => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "Todos" || b.category === filterCat;
    return matchSearch && matchCat;
  });
  return /* @__PURE__ */ React10.createElement(React10.Fragment, null, /* @__PURE__ */ React10.createElement(
    TopBar,
    {
      title: "Todos los art\xEDculos",
      subtitle: `${blogs.length} art\xEDculos en total`,
      action: /* @__PURE__ */ React10.createElement("button", { className: "btn btn--primary", onClick: () => navigate("/admin/new") }, "\u270F\uFE0F Nuevo art\xEDculo")
    }
  ), /* @__PURE__ */ React10.createElement("div", { className: "editor-card", style: { marginBottom: "1.5rem" } }, /* @__PURE__ */ React10.createElement("div", { style: { display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" } }, /* @__PURE__ */ React10.createElement("div", { className: "search-bar", style: { flex: "1", minWidth: 260 } }, /* @__PURE__ */ React10.createElement("span", { className: "search-bar__icon" }, "\u{1F50D}"), /* @__PURE__ */ React10.createElement(
    "input",
    {
      type: "search",
      placeholder: "Buscar por t\xEDtulo...",
      value: search,
      onChange: (e) => setSearch(e.target.value)
    }
  )), /* @__PURE__ */ React10.createElement("div", { className: "cat-filter", style: { marginBottom: 0, flexWrap: "wrap" } }, ["Todos", ...CATEGORIES].map((cat) => /* @__PURE__ */ React10.createElement(
    "button",
    {
      key: cat,
      className: `cat-filter__btn ${filterCat === cat ? "active" : ""}`,
      onClick: () => setFilterCat(cat)
    },
    cat
  ))))), /* @__PURE__ */ React10.createElement("div", { className: "editor-card" }, loading ? /* @__PURE__ */ React10.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "0.75rem" } }, [...Array(5)].map((_, i) => /* @__PURE__ */ React10.createElement("div", { key: i, className: "skeleton", style: { height: 52, borderRadius: "var(--radius-md)" } }))) : filtered.length === 0 ? /* @__PURE__ */ React10.createElement("div", { style: { textAlign: "center", padding: "3rem", color: "var(--text-muted)" } }, /* @__PURE__ */ React10.createElement("div", { style: { fontSize: "3rem", marginBottom: "0.75rem" } }, "\u{1F4ED}"), /* @__PURE__ */ React10.createElement("p", null, "No se encontraron art\xEDculos.")) : /* @__PURE__ */ React10.createElement("table", { className: "admin-table" }, /* @__PURE__ */ React10.createElement("thead", null, /* @__PURE__ */ React10.createElement("tr", null, /* @__PURE__ */ React10.createElement("th", { style: { width: "40%" } }, "T\xEDtulo"), /* @__PURE__ */ React10.createElement("th", null, "Categor\xEDa"), /* @__PURE__ */ React10.createElement("th", null, "Estado"), /* @__PURE__ */ React10.createElement("th", null, "\u2B50"), /* @__PURE__ */ React10.createElement("th", null, "Fecha"), /* @__PURE__ */ React10.createElement("th", null, "Vistas"), /* @__PURE__ */ React10.createElement("th", null, "Acciones"))), /* @__PURE__ */ React10.createElement("tbody", null, filtered.map((b) => /* @__PURE__ */ React10.createElement(BlogRow, { key: b.id, blog: b, navigate, onDelete: load, showFeatured: true }))))));
}
function BlogRow({ blog, navigate, onDelete, showFeatured = false }) {
  const toast = useToast();
  const [deleting, setDeleting] = useState7(false);
  const handleDelete = async () => {
    if (!window.confirm(`\xBFEliminar "${blog.title}"? Esta acci\xF3n no se puede deshacer.`)) return;
    setDeleting(true);
    try {
      await api.adminDelete(blog.id);
      toast("Art\xEDculo eliminado");
      onDelete?.();
    } catch (err) {
      toast(err.message || "Error al eliminar", "error");
    } finally {
      setDeleting(false);
    }
  };
  return /* @__PURE__ */ React10.createElement("tr", null, /* @__PURE__ */ React10.createElement("td", null, /* @__PURE__ */ React10.createElement(
    "div",
    {
      style: { fontWeight: 600, fontSize: "0.9rem", color: "var(--text-primary)" },
      title: blog.title
    },
    blog.title.length > 60 ? blog.title.slice(0, 60) + "\u2026" : blog.title
  ), /* @__PURE__ */ React10.createElement("div", { style: { fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginTop: 2 } }, "/", blog.slug)), /* @__PURE__ */ React10.createElement("td", null, /* @__PURE__ */ React10.createElement("span", { style: { fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 500 } }, blog.category)), /* @__PURE__ */ React10.createElement("td", null, /* @__PURE__ */ React10.createElement("span", { className: `status-badge status-badge--${blog.published ? "published" : "draft"}` }, /* @__PURE__ */ React10.createElement("span", { className: "status-dot" }), blog.published ? "Publicado" : "Borrador")), showFeatured && /* @__PURE__ */ React10.createElement("td", { style: { textAlign: "center" } }, blog.featured ? "\u2B50" : /* @__PURE__ */ React10.createElement("span", { style: { color: "var(--text-muted)" } }, "\u2014")), /* @__PURE__ */ React10.createElement("td", { style: { fontSize: "0.8rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", whiteSpace: "nowrap" } }, formatDateShort(blog.createdAt)), /* @__PURE__ */ React10.createElement("td", { style: { fontSize: "0.8rem", color: "var(--text-muted)" } }, "\u{1F441} ", blog.views || 0), /* @__PURE__ */ React10.createElement("td", null, /* @__PURE__ */ React10.createElement("div", { style: { display: "flex", gap: "0.4rem" } }, /* @__PURE__ */ React10.createElement(
    "button",
    {
      className: "btn btn--ghost btn--sm",
      onClick: () => navigate(`/admin/edit/${blog.id}`),
      title: "Editar"
    },
    "\u270F\uFE0F Editar"
  ), /* @__PURE__ */ React10.createElement(
    "a",
    {
      href: `/blogs/${blog.slug}`,
      target: "_blank",
      rel: "noreferrer",
      className: "btn btn--ghost btn--sm",
      title: "Ver en el blog"
    },
    "\u{1F517}"
  ), /* @__PURE__ */ React10.createElement(
    "button",
    {
      className: "btn btn--danger btn--sm",
      onClick: handleDelete,
      disabled: deleting,
      title: "Eliminar"
    },
    "\u{1F5D1}"
  ))));
}
function NewPost({ navigate }) {
  return /* @__PURE__ */ React10.createElement(React10.Fragment, null, /* @__PURE__ */ React10.createElement(
    TopBar,
    {
      title: "Nuevo art\xEDculo",
      subtitle: "Escribe y publica un nuevo art\xEDculo en tu blog"
    }
  ), /* @__PURE__ */ React10.createElement(BlogEditor, { onSave: () => navigate("/admin/posts") }));
}
function EditPost({ navigate, id }) {
  const [blog, setBlog] = useState7(null);
  const [loading, setLoading] = useState7(true);
  useEffect6(() => {
    api.adminGetBlogs().then((blogs) => {
      setBlog(blogs.find((b) => b.id === id) || null);
      setLoading(false);
    });
  }, [id]);
  if (loading) return /* @__PURE__ */ React10.createElement("div", { style: { padding: "2rem" } }, /* @__PURE__ */ React10.createElement("div", { className: "skeleton", style: { height: 40, width: 300, borderRadius: 8, marginBottom: "2rem" } }), /* @__PURE__ */ React10.createElement("div", { className: "skeleton", style: { height: 400, borderRadius: 12 } }));
  if (!blog) return /* @__PURE__ */ React10.createElement("div", { style: { padding: "2rem", textAlign: "center" } }, /* @__PURE__ */ React10.createElement("p", null, "Art\xEDculo no encontrado."), /* @__PURE__ */ React10.createElement("button", { className: "btn btn--outline", style: { marginTop: "1rem" }, onClick: () => navigate("/admin/posts") }, "\u2190 Volver"));
  return /* @__PURE__ */ React10.createElement(React10.Fragment, null, /* @__PURE__ */ React10.createElement(
    TopBar,
    {
      title: "Editar art\xEDculo",
      subtitle: blog.title
    }
  ), /* @__PURE__ */ React10.createElement(BlogEditor, { existing: blog, onSave: () => navigate("/admin/posts") }));
}
function Admin() {
  const navigate = useNavigate3();
  const location = useLocation2();
  const [authed, setAuthed] = useState7(false);
  const [checking, setChecking] = useState7(true);
  const logout = () => {
    localStorage.removeItem("nexo_token");
    navigate("/admin");
  };
  useEffect6(() => {
    api.verify().then(() => setAuthed(true)).catch(() => {
      localStorage.removeItem("nexo_token");
      navigate("/admin");
    }).finally(() => setChecking(false));
  }, [navigate]);
  if (checking) return /* @__PURE__ */ React10.createElement("div", { style: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-base)" } }, /* @__PURE__ */ React10.createElement("div", { style: { color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "0.9rem" } }, "Verificando acceso..."));
  if (!authed) return null;
  const path = location.pathname;
  const editMatch = path.match(/^\/admin\/edit\/(.+)$/);
  return /* @__PURE__ */ React10.createElement("div", { className: "admin-layout" }, /* @__PURE__ */ React10.createElement(Sidebar, { onLogout: logout }), /* @__PURE__ */ React10.createElement("main", { className: "admin-main" }, /* @__PURE__ */ React10.createElement("div", { className: "admin-content" }, path === "/admin/dashboard" && /* @__PURE__ */ React10.createElement(Dashboard, { navigate }), path === "/admin/new" && /* @__PURE__ */ React10.createElement(NewPost, { navigate }), path === "/admin/posts" && /* @__PURE__ */ React10.createElement(AllPosts, { navigate }), editMatch && /* @__PURE__ */ React10.createElement(EditPost, { navigate, id: editMatch[1] }))));
}

// src/pages/Recursos.jsx
import React11 from "react";
import { Link as Link8 } from "react-router-dom";
var RESOURCES = [
  {
    category: "Herramientas de inversi\xF3n",
    emoji: "\u{1F4CA}",
    items: [
      { name: "Google Finance", desc: "Seguimiento de acciones y mercados en tiempo real.", url: "https://finance.google.com", badge: "Gratis" },
      { name: "Yahoo Finance", desc: "Noticias financieras, cotizaciones y an\xE1lisis.", url: "https://finance.yahoo.com", badge: "Gratis" },
      { name: "TradingView", desc: "Gr\xE1ficos avanzados y an\xE1lisis t\xE9cnico profesional.", url: "https://tradingview.com", badge: "Freemium" },
      { name: "Morningstar", desc: "An\xE1lisis de fondos de inversi\xF3n y ETFs en profundidad.", url: "https://morningstar.es", badge: "Freemium" }
    ]
  },
  {
    category: "Criptomonedas",
    emoji: "\u20BF",
    items: [
      { name: "CoinGecko", desc: "Precios, capitalizaci\xF3n y datos de miles de criptomonedas.", url: "https://coingecko.com", badge: "Gratis" },
      { name: "CoinMarketCap", desc: "El agregador de datos cripto m\xE1s usado del mundo.", url: "https://coinmarketcap.com", badge: "Gratis" },
      { name: "DefiLlama", desc: "Datos de TVL y protocolos DeFi en todas las blockchains.", url: "https://defillama.com", badge: "Gratis" },
      { name: "Glassnode", desc: "An\xE1lisis on-chain avanzado para inversores de Bitcoin.", url: "https://glassnode.com", badge: "Freemium" }
    ]
  },
  {
    category: "Educaci\xF3n financiera",
    emoji: "\u{1F4DA}",
    items: [
      { name: "Investopedia", desc: "El diccionario financiero m\xE1s completo de internet.", url: "https://investopedia.com", badge: "Gratis" },
      { name: "Khan Academy \u2013 Finanzas", desc: "Cursos gratuitos de econom\xEDa y finanzas personales.", url: "https://es.khanacademy.org/economics-finance-domain", badge: "Gratis" },
      { name: "Coursera \u2013 Finanzas", desc: "Cursos de universidades top sobre inversi\xF3n y finanzas.", url: "https://coursera.org/browse/business/finance", badge: "Freemium" }
    ]
  },
  {
    category: "Tecnolog\xEDa e IA",
    emoji: "\u{1F916}",
    items: [
      { name: "Hacker News", desc: "Las noticias tecnol\xF3gicas m\xE1s relevantes de startups y tech.", url: "https://news.ycombinator.com", badge: "Gratis" },
      { name: "MIT Technology Review", desc: "An\xE1lisis profundo de innovaci\xF3n tecnol\xF3gica.", url: "https://technologyreview.com", badge: "Freemium" },
      { name: "arXiv \u2013 CS", desc: "\xDAltimos papers de investigaci\xF3n en inform\xE1tica e IA.", url: "https://arxiv.org/archive/cs", badge: "Gratis" }
    ]
  }
];
function Recursos() {
  return /* @__PURE__ */ React11.createElement("main", { style: { paddingTop: "80px", minHeight: "100vh", background: "var(--bg-base)" } }, /* @__PURE__ */ React11.createElement("section", { style: {
    background: "linear-gradient(135deg, rgba(108,99,255,0.07) 0%, rgba(0,153,255,0.04) 100%)",
    borderBottom: "1px solid var(--border)",
    padding: "4rem 0 3rem",
    textAlign: "center"
  } }, /* @__PURE__ */ React11.createElement("div", { className: "container" }, /* @__PURE__ */ React11.createElement("span", { className: "section__label" }, "\u{1F4E6} Recursos"), /* @__PURE__ */ React11.createElement("h1", { className: "section__title", style: { marginTop: "0.5rem" } }, "Herramientas y ", /* @__PURE__ */ React11.createElement("span", { className: "gradient-text" }, "recursos esenciales")), /* @__PURE__ */ React11.createElement("p", { className: "section__subtitle" }, "Una selecci\xF3n curada de las mejores herramientas gratuitas y de pago para inversores, entusiastas de la tecnolog\xEDa y curiosos de las finanzas."))), /* @__PURE__ */ React11.createElement("div", { style: { background: "var(--bg-elevated)", padding: "1rem 0", borderBottom: "1px solid var(--border)" } }, /* @__PURE__ */ React11.createElement("div", { className: "container", style: { display: "flex", justifyContent: "center" } }, /* @__PURE__ */ React11.createElement(AdSlot, { type: "leaderboard" }))), /* @__PURE__ */ React11.createElement("section", { className: "section" }, /* @__PURE__ */ React11.createElement("div", { className: "container" }, RESOURCES.map((group) => /* @__PURE__ */ React11.createElement("div", { key: group.category, style: { marginBottom: "3rem" } }, /* @__PURE__ */ React11.createElement("h2", { style: {
    fontFamily: "var(--font-display)",
    fontSize: "1.35rem",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "1.25rem",
    paddingBottom: "0.75rem",
    borderBottom: "2px solid var(--border)"
  } }, /* @__PURE__ */ React11.createElement("span", null, group.emoji), " ", group.category), /* @__PURE__ */ React11.createElement("div", { style: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "1rem"
  } }, group.items.map((item) => /* @__PURE__ */ React11.createElement(
    "a",
    {
      key: item.name,
      href: item.url,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "resource-card",
      "aria-label": `${item.name}: ${item.desc}`
    },
    /* @__PURE__ */ React11.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" } }, /* @__PURE__ */ React11.createElement("h3", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)" } }, item.name), /* @__PURE__ */ React11.createElement("span", { className: `resource-badge resource-badge--${item.badge === "Gratis" ? "free" : "freemium"}` }, item.badge)),
    /* @__PURE__ */ React11.createElement("p", { style: { fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 } }, item.desc),
    /* @__PURE__ */ React11.createElement("span", { style: { fontSize: "0.8rem", color: "var(--primary)", marginTop: "0.75rem", display: "inline-flex", alignItems: "center", gap: "0.25rem", fontWeight: 600 } }, "Visitar \u2192")
  ))))))), /* @__PURE__ */ React11.createElement("section", { style: { background: "var(--bg-elevated)", padding: "3rem 0", borderTop: "1px solid var(--border)" } }, /* @__PURE__ */ React11.createElement("div", { className: "container", style: { textAlign: "center" } }, /* @__PURE__ */ React11.createElement("h2", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.5rem", marginBottom: "0.75rem" } }, "\xBFQuieres m\xE1s an\xE1lisis y gu\xEDas?"), /* @__PURE__ */ React11.createElement("p", { style: { color: "var(--text-secondary)", marginBottom: "1.5rem" } }, "Lee nuestros art\xEDculos para sacar el m\xE1ximo partido a estas herramientas."), /* @__PURE__ */ React11.createElement(Link8, { to: "/blogs", className: "btn btn--primary btn--lg", id: "recursos-cta-blog" }, "Ver todos los art\xEDculos \u2192"))));
}

// src/pages/SobreNosotros.jsx
import React12 from "react";
import { Link as Link9 } from "react-router-dom";
var TEAM = [
  {
    name: "Adri\xE1n M\xE1rquez",
    role: "Fundador & Editor Jefe",
    bio: "Apasionado por las finanzas personales y la tecnolog\xEDa. Llevo a\xF1os investigando mercados financieros, criptomonedas y tendencias tecnol\xF3gicas para hacerlos accesibles a todos.",
    emoji: "\u{1F468}\u200D\u{1F4BC}"
  }
];
var VALUES = [
  { emoji: "\u{1F50D}", title: "Rigor e investigaci\xF3n", desc: "Cada art\xEDculo est\xE1 respaldado por datos, fuentes verificadas y an\xE1lisis propio. No publicamos rumores ni especulaci\xF3n sin fundamento." },
  { emoji: "\u{1F310}", title: "Accesibilidad", desc: "Creemos que la educaci\xF3n financiera debe llegar a todos. Explicamos conceptos complejos de forma clara y sin jerga innecesaria." },
  { emoji: "\u26A1", title: "Actualidad", desc: "Publicamos contenido fresco a diario. Seguimos los mercados y las tendencias tecnol\xF3gicas para que nunca te quedes atr\xE1s." },
  { emoji: "\u{1F6AB}", title: "Sin conflictos de inter\xE9s", desc: "No vendemos asesor\xEDa financiera ni productos de inversi\xF3n. Nuestros ingresos provienen de publicidad contextual, no de comisiones." }
];
function SobreNosotros() {
  return /* @__PURE__ */ React12.createElement("main", { style: { paddingTop: "80px", minHeight: "100vh", background: "var(--bg-base)" } }, /* @__PURE__ */ React12.createElement("section", { style: {
    background: "linear-gradient(135deg, rgba(108,99,255,0.07) 0%, rgba(0,153,255,0.04) 100%)",
    borderBottom: "1px solid var(--border)",
    padding: "4rem 0 3rem",
    textAlign: "center"
  } }, /* @__PURE__ */ React12.createElement("div", { className: "container" }, /* @__PURE__ */ React12.createElement("span", { className: "section__label" }, "\u{1F44B} Sobre Nosotros"), /* @__PURE__ */ React12.createElement("h1", { className: "section__title", style: { marginTop: "0.5rem" } }, "Conoce ", /* @__PURE__ */ React12.createElement("span", { className: "gradient-text" }, "FinzaCore")), /* @__PURE__ */ React12.createElement("p", { className: "section__subtitle" }, "Somos un blog independiente dedicado a hacer el mundo de las finanzas y la tecnolog\xEDa m\xE1s comprensible, accesible y \xFAtil para todos."))), /* @__PURE__ */ React12.createElement("section", { className: "section" }, /* @__PURE__ */ React12.createElement("div", { className: "container" }, /* @__PURE__ */ React12.createElement("div", { style: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "3rem",
    alignItems: "center"
  } }, /* @__PURE__ */ React12.createElement("div", null, /* @__PURE__ */ React12.createElement("span", { className: "section__label" }, "Nuestra misi\xF3n"), /* @__PURE__ */ React12.createElement("h2", { style: { fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2rem)", margin: "0.5rem 0 1rem", lineHeight: 1.2 } }, "El conocimiento financiero es el mejor activo que puedes tener"), /* @__PURE__ */ React12.createElement("p", { style: { color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "1rem" } }, "En ", /* @__PURE__ */ React12.createElement("strong", null, "FinzaCore"), " creemos que la brecha de conocimiento financiero es uno de los mayores problemas de nuestra generaci\xF3n. Millones de personas trabajan duro pero no saben c\xF3mo hacer crecer su dinero."), /* @__PURE__ */ React12.createElement("p", { style: { color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "1.5rem" } }, "Por eso creamos este espacio: para publicar art\xEDculos de calidad, bien investigados, que expliquen desde lo m\xE1s b\xE1sico hasta las tendencias m\xE1s avanzadas en finanzas, inversi\xF3n y tecnolog\xEDa."), /* @__PURE__ */ React12.createElement(Link9, { to: "/blogs", className: "btn btn--primary", id: "sobre-cta-blog" }, "Leer nuestros art\xEDculos \u2192")), /* @__PURE__ */ React12.createElement("div", { style: {
    background: "linear-gradient(135deg, rgba(108,99,255,0.08), rgba(0,153,255,0.05))",
    borderRadius: "var(--radius-xl)",
    border: "1px solid var(--border)",
    padding: "2.5rem",
    textAlign: "center"
  } }, /* @__PURE__ */ React12.createElement("div", { style: { fontSize: "4rem", marginBottom: "1rem" } }, "\u26A1"), /* @__PURE__ */ React12.createElement("div", { style: { fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2.5rem", background: "var(--grad-text)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" } }, "FinzaCore"), /* @__PURE__ */ React12.createElement("p", { style: { color: "var(--text-muted)", marginTop: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "0.85rem" } }, "Tu Gu\xEDa Definitiva en Finanzas y Tecnolog\xEDa"), /* @__PURE__ */ React12.createElement("div", { style: { display: "flex", justifyContent: "center", gap: "2rem", marginTop: "2rem" } }, [["\u221E", "Art\xEDculos"], ["6", "Categor\xEDas"], ["0\u20AC", "Siempre gratis"]].map(([v, l]) => /* @__PURE__ */ React12.createElement("div", { key: l }, /* @__PURE__ */ React12.createElement("div", { style: { fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.5rem", color: "var(--primary)" } }, v), /* @__PURE__ */ React12.createElement("div", { style: { fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px" } }, l)))))))), /* @__PURE__ */ React12.createElement("section", { className: "section", style: { background: "var(--bg-elevated)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" } }, /* @__PURE__ */ React12.createElement("div", { className: "container" }, /* @__PURE__ */ React12.createElement("div", { className: "section__header" }, /* @__PURE__ */ React12.createElement("span", { className: "section__label" }, "\u{1F9ED} Nuestros valores"), /* @__PURE__ */ React12.createElement("h2", { className: "section__title" }, "En qu\xE9 creemos")), /* @__PURE__ */ React12.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.25rem" } }, VALUES.map((v) => /* @__PURE__ */ React12.createElement("div", { key: v.title, style: {
    background: "white",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-lg)",
    padding: "1.5rem",
    boxShadow: "var(--shadow-sm)"
  } }, /* @__PURE__ */ React12.createElement("div", { style: { fontSize: "2rem", marginBottom: "0.75rem" } }, v.emoji), /* @__PURE__ */ React12.createElement("h3", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", marginBottom: "0.5rem" } }, v.title), /* @__PURE__ */ React12.createElement("p", { style: { fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 } }, v.desc)))))), /* @__PURE__ */ React12.createElement("section", { className: "section" }, /* @__PURE__ */ React12.createElement("div", { className: "container" }, /* @__PURE__ */ React12.createElement("div", { className: "section__header" }, /* @__PURE__ */ React12.createElement("span", { className: "section__label" }, "\u{1F465} El equipo"), /* @__PURE__ */ React12.createElement("h2", { className: "section__title" }, "Qui\xE9n est\xE1 detr\xE1s")), /* @__PURE__ */ React12.createElement("div", { style: { display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap" } }, TEAM.map((member) => /* @__PURE__ */ React12.createElement("div", { key: member.name, style: {
    background: "white",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-xl)",
    padding: "2rem",
    maxWidth: 360,
    textAlign: "center",
    boxShadow: "var(--shadow-sm)"
  } }, /* @__PURE__ */ React12.createElement("div", { style: { fontSize: "4rem", marginBottom: "1rem" } }, member.emoji), /* @__PURE__ */ React12.createElement("h3", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem" } }, member.name), /* @__PURE__ */ React12.createElement("p", { style: { color: "var(--primary)", fontSize: "0.8rem", fontWeight: 600, margin: "0.25rem 0 1rem", fontFamily: "var(--font-mono)" } }, member.role), /* @__PURE__ */ React12.createElement("p", { style: { fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.7 } }, member.bio)))))), /* @__PURE__ */ React12.createElement("section", { style: { background: "var(--bg-elevated)", borderTop: "1px solid var(--border)", padding: "2.5rem 0" } }, /* @__PURE__ */ React12.createElement("div", { className: "container", style: { maxWidth: 720 } }, /* @__PURE__ */ React12.createElement("div", { style: {
    background: "rgba(245,158,11,0.08)",
    border: "1px solid rgba(245,158,11,0.2)",
    borderRadius: "var(--radius-lg)",
    padding: "1.5rem"
  } }, /* @__PURE__ */ React12.createElement("h3", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9rem", color: "#d97706", marginBottom: "0.5rem" } }, "\u26A0\uFE0F Aviso legal importante"), /* @__PURE__ */ React12.createElement("p", { style: { fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.7 } }, "El contenido de FinzaCore tiene car\xE1cter exclusivamente informativo y educativo. Nada de lo publicado en este sitio constituye asesoramiento financiero, de inversi\xF3n, fiscal o legal. Las inversiones conllevan riesgo de p\xE9rdida. Consulta siempre con un profesional cualificado antes de tomar decisiones financieras.")))));
}

// src/pages/Contacto.jsx
import React13, { useState as useState8 } from "react";
var FAQS = [
  { q: "\xBFFinzaCore ofrece asesoramiento financiero?", a: "No. Todo el contenido es exclusivamente educativo e informativo. No somos asesores financieros. Consulta siempre a un profesional antes de invertir." },
  { q: "\xBFPuedo colaborar o escribir en el blog?", a: "S\xED, aceptamos colaboraciones de expertos en finanzas y tecnolog\xEDa. Escr\xEDbenos a trav\xE9s de este formulario indicando tu propuesta." },
  { q: "\xBFTienen newsletter?", a: "Estamos trabajando en ello. Por el momento, visita el blog diariamente o s\xEDguenos en redes sociales para no perderte nada." },
  { q: "\xBFLa publicidad afecta al contenido editorial?", a: "No. Los anunciantes no influyen en nuestras opiniones ni art\xEDculos. Mantenemos plena independencia editorial." }
];
function Contacto() {
  const [form, setForm] = useState8({ nombre: "", email: "", asunto: "general", mensaje: "" });
  const [sent, setSent] = useState8(false);
  const [error, setError] = useState8("");
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.email.trim() || !form.mensaje.trim()) {
      setError("Por favor, rellena todos los campos obligatorios.");
      return;
    }
    await new Promise((r) => setTimeout(r, 800));
    setSent(true);
    setError("");
  };
  return /* @__PURE__ */ React13.createElement("main", { style: { paddingTop: "80px", minHeight: "100vh", background: "var(--bg-base)" } }, /* @__PURE__ */ React13.createElement("section", { style: {
    background: "linear-gradient(135deg, rgba(108,99,255,0.07) 0%, rgba(0,153,255,0.04) 100%)",
    borderBottom: "1px solid var(--border)",
    padding: "4rem 0 3rem",
    textAlign: "center"
  } }, /* @__PURE__ */ React13.createElement("div", { className: "container" }, /* @__PURE__ */ React13.createElement("span", { className: "section__label" }, "\u2709\uFE0F Contacto"), /* @__PURE__ */ React13.createElement("h1", { className: "section__title", style: { marginTop: "0.5rem" } }, "Ponte en ", /* @__PURE__ */ React13.createElement("span", { className: "gradient-text" }, "contacto")), /* @__PURE__ */ React13.createElement("p", { className: "section__subtitle" }, "\xBFTienes alguna pregunta, sugerencia o propuesta de colaboraci\xF3n? Escr\xEDbenos y te responderemos en menos de 48 horas."))), /* @__PURE__ */ React13.createElement("section", { className: "section" }, /* @__PURE__ */ React13.createElement("div", { className: "container", style: { maxWidth: 1e3 } }, /* @__PURE__ */ React13.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "3rem", alignItems: "start" } }, /* @__PURE__ */ React13.createElement("div", null, /* @__PURE__ */ React13.createElement("h2", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.25rem", marginBottom: "1.25rem" } }, "Antes de escribirnos"), /* @__PURE__ */ React13.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" } }, [
    { icon: "\u{1F4E7}", title: "Email", value: "hola@finzacore.com" },
    { icon: "\u{1F4CD}", title: "Ubicaci\xF3n", value: "Espa\xF1a" },
    { icon: "\u23F1\uFE0F", title: "Tiempo de respuesta", value: "< 48 horas laborables" }
  ].map((item) => /* @__PURE__ */ React13.createElement("div", { key: item.title, style: {
    display: "flex",
    alignItems: "center",
    gap: "0.875rem",
    background: "white",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-md)",
    padding: "0.875rem 1.25rem",
    boxShadow: "var(--shadow-sm)"
  } }, /* @__PURE__ */ React13.createElement("span", { style: { fontSize: "1.5rem" } }, item.icon), /* @__PURE__ */ React13.createElement("div", null, /* @__PURE__ */ React13.createElement("div", { style: { fontWeight: 700, fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px" } }, item.title), /* @__PURE__ */ React13.createElement("div", { style: { fontSize: "0.875rem", color: "var(--text-primary)", fontWeight: 500 } }, item.value))))), /* @__PURE__ */ React13.createElement("h2", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", marginBottom: "1rem" } }, "Motivos frecuentes"), /* @__PURE__ */ React13.createElement("ul", { style: { display: "flex", flexDirection: "column", gap: "0.5rem" } }, ["Propuesta de colaboraci\xF3n", "Correcci\xF3n de un art\xEDculo", "Consulta sobre contenido", "Publicidad y patrocinios", "Otras consultas"].map((m) => /* @__PURE__ */ React13.createElement("li", { key: m, style: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.875rem",
    color: "var(--text-secondary)"
  } }, /* @__PURE__ */ React13.createElement("span", { style: { color: "var(--primary)" } }, "\u2192"), " ", m)))), /* @__PURE__ */ React13.createElement("div", { style: {
    background: "white",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-xl)",
    padding: "2rem",
    boxShadow: "var(--shadow-md)"
  } }, sent ? /* @__PURE__ */ React13.createElement("div", { style: { textAlign: "center", padding: "2rem 0" } }, /* @__PURE__ */ React13.createElement("div", { style: { fontSize: "4rem", marginBottom: "1rem" } }, "\u2705"), /* @__PURE__ */ React13.createElement("h3", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.25rem", marginBottom: "0.75rem" } }, "\xA1Mensaje enviado!"), /* @__PURE__ */ React13.createElement("p", { style: { color: "var(--text-secondary)", lineHeight: 1.6 } }, "Gracias por contactar con nosotros. Te responderemos en menos de 48 horas."), /* @__PURE__ */ React13.createElement(
    "button",
    {
      className: "btn btn--outline",
      style: { marginTop: "1.5rem" },
      onClick: () => {
        setSent(false);
        setForm({ nombre: "", email: "", asunto: "general", mensaje: "" });
      }
    },
    "Enviar otro mensaje"
  )) : /* @__PURE__ */ React13.createElement("form", { onSubmit: handleSubmit, noValidate: true }, /* @__PURE__ */ React13.createElement("h3", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", marginBottom: "1.5rem" } }, "Env\xEDanos un mensaje"), error && /* @__PURE__ */ React13.createElement("div", { style: {
    background: "rgba(239,68,68,0.08)",
    border: "1px solid rgba(239,68,68,0.2)",
    borderRadius: "var(--radius-md)",
    padding: "0.875rem 1rem",
    fontSize: "0.875rem",
    color: "#dc2626",
    marginBottom: "1.25rem"
  } }, "\u26A0\uFE0F ", error), /* @__PURE__ */ React13.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" } }, /* @__PURE__ */ React13.createElement("div", { className: "form-group", style: { marginBottom: 0 } }, /* @__PURE__ */ React13.createElement("label", { className: "form-label", htmlFor: "contact-nombre" }, "Nombre *"), /* @__PURE__ */ React13.createElement(
    "input",
    {
      id: "contact-nombre",
      className: "form-input",
      type: "text",
      placeholder: "Tu nombre",
      value: form.nombre,
      onChange: (e) => update("nombre", e.target.value),
      required: true,
      autoComplete: "name"
    }
  )), /* @__PURE__ */ React13.createElement("div", { className: "form-group", style: { marginBottom: 0 } }, /* @__PURE__ */ React13.createElement("label", { className: "form-label", htmlFor: "contact-email" }, "Email *"), /* @__PURE__ */ React13.createElement(
    "input",
    {
      id: "contact-email",
      className: "form-input",
      type: "email",
      placeholder: "tu@email.com",
      value: form.email,
      onChange: (e) => update("email", e.target.value),
      required: true,
      autoComplete: "email"
    }
  ))), /* @__PURE__ */ React13.createElement("div", { className: "form-group" }, /* @__PURE__ */ React13.createElement("label", { className: "form-label", htmlFor: "contact-asunto" }, "Motivo"), /* @__PURE__ */ React13.createElement(
    "select",
    {
      id: "contact-asunto",
      className: "form-select",
      value: form.asunto,
      onChange: (e) => update("asunto", e.target.value)
    },
    /* @__PURE__ */ React13.createElement("option", { value: "general" }, "Consulta general"),
    /* @__PURE__ */ React13.createElement("option", { value: "colaboracion" }, "Propuesta de colaboraci\xF3n"),
    /* @__PURE__ */ React13.createElement("option", { value: "correccion" }, "Correcci\xF3n de art\xEDculo"),
    /* @__PURE__ */ React13.createElement("option", { value: "publicidad" }, "Publicidad / Patrocinio"),
    /* @__PURE__ */ React13.createElement("option", { value: "otro" }, "Otro")
  )), /* @__PURE__ */ React13.createElement("div", { className: "form-group" }, /* @__PURE__ */ React13.createElement("label", { className: "form-label", htmlFor: "contact-mensaje" }, "Mensaje *"), /* @__PURE__ */ React13.createElement(
    "textarea",
    {
      id: "contact-mensaje",
      className: "form-textarea",
      rows: 6,
      placeholder: "Escribe aqu\xED tu mensaje...",
      value: form.mensaje,
      onChange: (e) => update("mensaje", e.target.value),
      required: true
    }
  )), /* @__PURE__ */ React13.createElement("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" } }, /* @__PURE__ */ React13.createElement("input", { type: "checkbox", id: "contact-privacy", required: true, style: { accentColor: "var(--primary)" } }), /* @__PURE__ */ React13.createElement("label", { htmlFor: "contact-privacy", style: { fontSize: "0.8rem", color: "var(--text-secondary)" } }, "He le\xEDdo y acepto la", " ", /* @__PURE__ */ React13.createElement("a", { href: "/privacidad", style: { color: "var(--primary)", textDecoration: "underline" } }, "pol\xEDtica de privacidad"))), /* @__PURE__ */ React13.createElement("button", { type: "submit", className: "btn btn--primary", id: "contact-submit-btn", style: { width: "100%", justifyContent: "center", padding: "0.875rem" } }, "\u2709\uFE0F Enviar mensaje")))))), /* @__PURE__ */ React13.createElement("section", { className: "section", style: { background: "var(--bg-elevated)", borderTop: "1px solid var(--border)" } }, /* @__PURE__ */ React13.createElement("div", { className: "container", style: { maxWidth: 720 } }, /* @__PURE__ */ React13.createElement("div", { className: "section__header" }, /* @__PURE__ */ React13.createElement("span", { className: "section__label" }, "\u2753 Preguntas frecuentes"), /* @__PURE__ */ React13.createElement("h2", { className: "section__title" }, "FAQ")), /* @__PURE__ */ React13.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "1rem" } }, FAQS.map((faq) => /* @__PURE__ */ React13.createElement("details", { key: faq.q, style: {
    background: "white",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-lg)",
    overflow: "hidden",
    boxShadow: "var(--shadow-sm)"
  } }, /* @__PURE__ */ React13.createElement("summary", { style: {
    padding: "1rem 1.5rem",
    cursor: "pointer",
    fontFamily: "var(--font-display)",
    fontWeight: 600,
    fontSize: "0.95rem",
    color: "var(--text-primary)",
    listStyle: "none",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    userSelect: "none"
  } }, faq.q, /* @__PURE__ */ React13.createElement("span", { style: { color: "var(--primary)", fontWeight: 700, marginLeft: "1rem", flexShrink: 0 } }, "+")), /* @__PURE__ */ React13.createElement("p", { style: { padding: "0 1.5rem 1.25rem", fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.7 } }, faq.a)))))));
}

// src/App.jsx
function Layout({ children }) {
  const { pathname } = useLocation3();
  const isAdmin = pathname.startsWith("/admin");
  return /* @__PURE__ */ React14.createElement(React14.Fragment, null, !isAdmin && /* @__PURE__ */ React14.createElement(Navbar, null), children, !isAdmin && /* @__PURE__ */ React14.createElement(Footer, null));
}
function App() {
  return /* @__PURE__ */ React14.createElement(BrowserRouter, null, /* @__PURE__ */ React14.createElement(ToastProvider, null, /* @__PURE__ */ React14.createElement(Layout, null, /* @__PURE__ */ React14.createElement(Routes, null, /* @__PURE__ */ React14.createElement(Route, { path: "/", element: /* @__PURE__ */ React14.createElement(Landing, null) }), /* @__PURE__ */ React14.createElement(Route, { path: "/blogs", element: /* @__PURE__ */ React14.createElement(BlogList, null) }), /* @__PURE__ */ React14.createElement(Route, { path: "/blogs/:slug", element: /* @__PURE__ */ React14.createElement(BlogPost, null) }), /* @__PURE__ */ React14.createElement(Route, { path: "/recursos", element: /* @__PURE__ */ React14.createElement(Recursos, null) }), /* @__PURE__ */ React14.createElement(Route, { path: "/sobre", element: /* @__PURE__ */ React14.createElement(SobreNosotros, null) }), /* @__PURE__ */ React14.createElement(Route, { path: "/contacto", element: /* @__PURE__ */ React14.createElement(Contacto, null) }), /* @__PURE__ */ React14.createElement(Route, { path: "/admin", element: /* @__PURE__ */ React14.createElement(AdminLogin, null) }), /* @__PURE__ */ React14.createElement(Route, { path: "/admin/dashboard", element: /* @__PURE__ */ React14.createElement(Admin, null) }), /* @__PURE__ */ React14.createElement(Route, { path: "/admin/new", element: /* @__PURE__ */ React14.createElement(Admin, null) }), /* @__PURE__ */ React14.createElement(Route, { path: "/admin/posts", element: /* @__PURE__ */ React14.createElement(Admin, null) }), /* @__PURE__ */ React14.createElement(Route, { path: "/admin/edit/:id", element: /* @__PURE__ */ React14.createElement(Admin, null) }), /* @__PURE__ */ React14.createElement(Route, { path: "/privacidad", element: /* @__PURE__ */ React14.createElement(Navigate, { to: "/" }) }), /* @__PURE__ */ React14.createElement(Route, { path: "/aviso-legal", element: /* @__PURE__ */ React14.createElement(Navigate, { to: "/" }) }), /* @__PURE__ */ React14.createElement(Route, { path: "/cookies", element: /* @__PURE__ */ React14.createElement(Navigate, { to: "/" }) }), /* @__PURE__ */ React14.createElement(Route, { path: "*", element: /* @__PURE__ */ React14.createElement(Navigate, { to: "/" }) })))));
}

// src/main.jsx
ReactDOM.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ React15.createElement(React15.StrictMode, null, /* @__PURE__ */ React15.createElement(App, null))
);
