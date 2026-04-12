import React from 'react';
import { Link } from 'react-router-dom';
import AdSlot from '../components/AdSlot';

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

export default function Recursos() {
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
