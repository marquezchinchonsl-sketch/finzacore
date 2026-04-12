import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem('finzacore_token');
    if (token) {
      api.verify().then(() => navigate('/admin/dashboard')).catch(() => {
        localStorage.removeItem('finzacore_token');
      });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { token } = await api.login(password);
      localStorage.setItem('finzacore_token', token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Contraseña incorrecta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Orbs */}
      <div style={{
        position: 'absolute', top: -100, right: -100,
        width: 500, height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(108,99,255,0.3) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }}></div>
      <div style={{
        position: 'absolute', bottom: -100, left: -100,
        width: 400, height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,255,0.2) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }}></div>

      <div className="login-card animate-fade-up">
        <div className="login-card__logo">FinzaCore</div>
        <div className="login-card__subtitle">Panel de administración</div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Contraseña de acceso</label>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoFocus
            />
          </div>

          {error && (
            <div style={{
              background: 'rgba(255,60,76,0.1)',
              border: '1px solid rgba(255,60,76,0.2)',
              borderRadius: 'var(--radius-md)',
              padding: '0.75rem',
              color: '#ff3c4c',
              fontSize: '0.875rem',
            }}>
              ✕ {error}
            </div>
          )}

          <button type="submit" className="btn btn--primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', padding: '0.875rem' }}>
            {loading ? 'Verificando...' : 'Entrar al panel →'}
          </button>
        </form>

        <p style={{ marginTop: 'var(--space-lg)', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
          Solo tú puedes acceder a esta página.
        </p>
      </div>
    </div>
  );
}
