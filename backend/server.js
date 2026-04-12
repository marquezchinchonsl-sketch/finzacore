const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'nexo_blog_secret_2026_change_this';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || bcrypt.hashSync('admin123', 10);

const DATA_PATH = path.join(__dirname, 'data', 'blogs.json');

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Serve frontend build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function readBlogs() {
  try {
    const raw = fs.readFileSync(DATA_PATH, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeBlogs(blogs) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(blogs, null, 2), 'utf8');
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

  // Sort by date desc
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

  // Increment views
  const all = readBlogs();
  const idx = all.findIndex(b => b.id === blog.id);
  if (idx !== -1) {
    all[idx].views = (all[idx].views || 0) + 1;
    writeBlogs(all);
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
    views: 0,
    createdAt: now,
    updatedAt: now
  };

  // Auto-generate slug if not provided
  if (!blog.slug) {
    blog.slug = blog.title
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 80);
  }

  // Ensure slug uniqueness
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

// ── Catch-all for SPA in production ──────────────────────────────────────────
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 NEXO Backend corriendo en http://localhost:${PORT}`);
  console.log(`📝 Admin: Contraseña por defecto → admin123`);
});
