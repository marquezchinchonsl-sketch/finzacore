import React, { useState } from 'react';

const FAQS = [
  { q: '¿FinzaCore ofrece asesoramiento financiero?', a: 'No. Todo el contenido es exclusivamente educativo e informativo. No somos asesores financieros. Consulta siempre a un profesional antes de invertir.' },
  { q: '¿Puedo colaborar o escribir en el blog?', a: 'Sí, aceptamos colaboraciones de expertos en finanzas y tecnología. Escríbenos a través de este formulario indicando tu propuesta.' },
  { q: '¿Tienen newsletter?', a: 'Estamos trabajando en ello. Por el momento, visita el blog diariamente o síguenos en redes sociales para no perderte nada.' },
  { q: '¿La publicidad afecta al contenido editorial?', a: 'No. Los anunciantes no influyen en nuestras opiniones ni artículos. Mantenemos plena independencia editorial.' },
];

export default function Contacto() {
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
