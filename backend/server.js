const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'finzacore_secret_2026_change_this';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || bcrypt.hashSync('admin123', 10);

// ── Persistencia: archivo local si existe, si no memoria ─────────────────────
const DATA_PATH = path.join(__dirname, 'data', 'blogs.json');

// Blogs iniciales embebidos (seed) — se usan si no hay archivo en disco
const SEED_BLOGS = [
  {
    "id": "1",
    "title": "Bienvenido a FinzaCore: Tu fuente de Finanzas y Tecnología",
    "slug": "bienvenido-finzacore-finanzas-tecnologia",
    "summary": "Descubre cómo FinzaCore te ayudará a entender el mundo financiero y tecnológico con artículos claros, profundos y actualizados cada día.",
    "content": "# Bienvenido a FinzaCore\n\nEste es el primer artículo de nuestro blog. Aquí encontrarás contenido diario sobre **finanzas personales**, **inversiones**, **tecnología** y mucho más.\n\n## ¿Qué encontrarás aquí?\n\n- Análisis de mercados financieros\n- Guías de inversión para principiantes y avanzados\n- Noticias de tecnología e inteligencia artificial\n- Estrategias de ahorro y crecimiento patrimonial\n\n## Nuestra misión\n\nEn FinzaCore creemos que la **educación financiera y tecnológica** es la clave para la libertad económica. Por eso publicamos contenido de calidad, accesible y actualizado.\n\n> \"El conocimiento es la mejor inversión que puedes hacer.\"\n\n¡Bienvenido a la comunidad!",
    "category": "General",
    "tags": ["bienvenida", "finanzas", "tecnología"],
    "coverImage": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80",
    "author": "FinzaCore Editorial",
    "published": true,
    "featured": true,
    "views": 0,
    "createdAt": "2026-03-31T12:00:00Z",
    "updatedAt": "2026-03-31T12:00:00Z"
  },
  {
    "id": "2",
    "title": "Cómo empezar a invertir en 2026: Guía completa para principiantes",
    "slug": "como-empezar-invertir-2026-guia-principiantes",
    "summary": "Aprende los conceptos básicos de la inversión, desde fondos indexados hasta criptomonedas, con una guía paso a paso diseñada para quienes comienzan desde cero.",
    "content": "# Cómo empezar a invertir en 2026\n\nInvertir ya no es solo para los ricos. En 2026, con el acceso a plataformas digitales y cuentas de inversión gratuitas, **cualquiera puede empezar con tan solo 10€**.\n\n## Paso 1: Ordena tus finanzas primero\n\nAntes de invertir, asegúrate de:\n- Tener un fondo de emergencia (3-6 meses de gastos)\n- No tener deudas de alto interés\n- Tener un presupuesto mensual claro\n\n## Paso 2: Elige tu perfil de inversor\n\n| Perfil | Riesgo | Instrumentos |\n|--------|--------|-------------|\n| Conservador | Bajo | Bonos, fondos monetarios |\n| Moderado | Medio | ETFs mixtos, fondos indexados |\n| Agresivo | Alto | Acciones, criptomonedas |\n\n## Paso 3: Empieza con fondos indexados\n\nLos fondos indexados son la opción más recomendada para principiantes: **bajo coste, diversificación automática y rentabilidad histórica positiva**.\n\n## Conclusión\n\nLo más importante es empezar. El tiempo en el mercado siempre supera al tiempo del mercado.",
    "category": "Finanzas",
    "tags": ["inversión", "principiantes", "ETF", "fondos indexados"],
    "coverImage": "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=1200&q=80",
    "author": "FinzaCore Editorial",
    "published": true,
    "featured": true,
    "views": 0,
    "createdAt": "2026-03-30T10:00:00Z",
    "updatedAt": "2026-03-30T10:00:00Z"
  },
  {
    "id": "3",
    "title": "Inteligencia Artificial en 2026: Las herramientas que están cambiando el mundo",
    "slug": "inteligencia-artificial-2026-herramientas",
    "summary": "Un repaso por las IAs más potentes del momento y cómo puedes usarlas para mejorar tu productividad, negocio y vida cotidiana.",
    "content": "# Inteligencia Artificial en 2026\n\nLa IA ya no es el futuro. Es el **presente**. En 2026, las herramientas de inteligencia artificial han transformado la forma en que trabajamos, creamos y nos comunicamos.\n\n### 1. Modelos de lenguaje (LLMs)\nGPT-5, Claude 4, Gemini Ultra... los modelos de lenguaje son cada vez más potentes y accesibles.\n\n### 2. IA generativa de imágenes\nMidjourney, Stable Diffusion, DALL-E 4... crean imágenes fotorrealistas en segundos.\n\n### 3. IA de código\nGitHub Copilot, Cursor, Devin... ya escriben código mejor que muchos programadores juniors.\n\n## ¿Cómo puedes aprovecharlo?\n\n1. **Automatiza tareas repetitivas** con agentes de IA\n2. **Crea contenido** más rápido con asistentes creativos\n3. **Analiza datos** con herramientas de BI potenciadas por IA\n4. **Aprende más rápido** con tutores personalizados basados en IA",
    "category": "Tecnología",
    "tags": ["IA", "inteligencia artificial", "tecnología", "productividad"],
    "coverImage": "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80",
    "author": "FinzaCore Editorial",
    "published": true,
    "featured": false,
    "views": 0,
    "createdAt": "2026-03-29T09:00:00Z",
    "updatedAt": "2026-03-29T09:00:00Z"
  }
];

// En memoria para Railway (filesystem efímero)
let blogsMemory = null;

function readBlogs() {
  // Si ya cargamos en memoria, devolver
  if (blogsMemory !== null) return blogsMemory;
  // Intentar leer del archivo
  try {
    if (fs.existsSync(DATA_PATH)) {
      blogsMemory = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
      return blogsMemory;
    }
  } catch {}
  // Fallback: seed inicial
  blogsMemory = [...SEED_BLOGS];
  return blogsMemory;
}

function writeBlogs(blogs) {
  blogsMemory = blogs;
  // Intentar persistir en disco (funciona en local, falla silenciosamente en Railway)
  try {
    const dir = path.dirname(DATA_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DATA_PATH, JSON.stringify(blogs, null, 2), 'utf8');
  } catch {}
}

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No autorizado' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Token inválido' });
  }
}

app.use(cors({
  origin: ['https://finzacore.com', 'https://www.finzacore.com', 'http://localhost:5173', 'http://localhost:3461'],
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', project: 'FinzaCore' }));

// ── Auth ──────────────────────────────────────────────────────────────────────
app.post('/api/auth/login', async (req, res) => {
  const { password } = req.body;
  const valid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  if (!valid) return res.status(401).json({ error: 'Contraseña incorrecta' });
  const token = jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
});

app.get('/api/auth/verify', authMiddleware, (req, res) => {
  res.json({ valid: true });
});

// ── Public: Blogs ─────────────────────────────────────────────────────────────
app.get('/api/blogs', (req, res) => {
  const blogs = readBlogs();
  const { category, search, featured, limit, page = 1 } = req.query;
  let result = blogs.filter(b => b.published);

  if (category && category !== 'Todos') {
    result = result.filter(b => b.category === category);
  }
  if (search) {
    const s = search.toLowerCase();
    result = result.filter(b =>
      b.title.toLowerCase().includes(s) ||
      b.summary.toLowerCase().includes(s) ||
      (b.tags || []).some(t => t.toLowerCase().includes(s))
    );
  }
  if (featured === 'true') {
    result = result.filter(b => b.featured);
  }

  result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const total = result.length;
  const perPage = parseInt(limit) || 9;
  const start = (parseInt(page) - 1) * perPage;
  const paginated = result.slice(start, start + perPage);

  res.json({ blogs: paginated, total, pages: Math.ceil(total / perPage) });
});

app.get('/api/blogs/:slug', (req, res) => {
  const blogs = readBlogs();
  const blog = blogs.find(b => b.slug === req.params.slug && b.published);
  if (!blog) return res.status(404).json({ error: 'Artículo no encontrado' });

  // Incrementar vistas en memoria
  const idx = blogs.findIndex(b => b.id === blog.id);
  if (idx !== -1) {
    blogs[idx].views = (blogs[idx].views || 0) + 1;
    writeBlogs(blogs);
  }

  res.json(blog);
});

app.get('/api/categories', (req, res) => {
  const blogs = readBlogs().filter(b => b.published);
  const cats = [...new Set(blogs.map(b => b.category))];
  const counts = cats.map(cat => ({
    name: cat,
    count: blogs.filter(b => b.category === cat).length
  }));
  res.json(counts);
});

// ── Admin: Blogs CRUD ─────────────────────────────────────────────────────────
app.get('/api/admin/blogs', authMiddleware, (req, res) => {
  const blogs = readBlogs();
  blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(blogs);
});

app.post('/api/admin/blogs', authMiddleware, (req, res) => {
  const blogs = readBlogs();
  const now = new Date().toISOString();
  const blog = {
    id: uuidv4(),
    ...req.body,
    author: req.body.author || 'FinzaCore Editorial',
    views: 0,
    createdAt: now,
    updatedAt: now
  };

  if (!blog.slug) {
    blog.slug = blog.title
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 80);
  }

  const existing = blogs.filter(b => b.slug.startsWith(blog.slug));
  if (existing.length > 0) blog.slug = `${blog.slug}-${existing.length}`;

  blogs.unshift(blog);
  writeBlogs(blogs);
  res.json(blog);
});

app.put('/api/admin/blogs/:id', authMiddleware, (req, res) => {
  const blogs = readBlogs();
  const idx = blogs.findIndex(b => b.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'No encontrado' });

  blogs[idx] = {
    ...blogs[idx],
    ...req.body,
    id: blogs[idx].id,
    createdAt: blogs[idx].createdAt,
    updatedAt: new Date().toISOString()
  };

  writeBlogs(blogs);
  res.json(blogs[idx]);
});

app.delete('/api/admin/blogs/:id', authMiddleware, (req, res) => {
  let blogs = readBlogs();
  blogs = blogs.filter(b => b.id !== req.params.id);
  writeBlogs(blogs);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`🚀 FinzaCore API corriendo en http://localhost:${PORT}`);
});
