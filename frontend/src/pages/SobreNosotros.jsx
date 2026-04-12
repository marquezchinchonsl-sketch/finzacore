import React from 'react';
import { Link } from 'react-router-dom';

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

export default function SobreNosotros() {
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
