const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'blogs.json');
const PASSWORD_HASH = crypto.scryptSync('NUEVACLAVE123', 'salty', 64).toString('hex');

// --- Helpers ---
const readDB = () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf8') || '[]');
const writeDB = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
const sendJSON = (res, status, data) => { res.writeHead(status, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(data)); };
const parseBody = (req) => new Promise(res => { let b = ''; req.on('data', c => b += c); req.on('end', () => res(JSON.parse(b || '{}'))); });

// --- Server ---
http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const route = url.pathname;

  // 1. Static Files
  if (!route.startsWith('/api')) {
    let file = path.join(__dirname, route === '/' ? 'index.html' : route);
    if (!path.extname(file)) file += '.html';
    if (fs.existsSync(file)) {
      const ext = path.extname(file);
      const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript' }[ext] || 'text/plain';
      res.writeHead(200, { 'Content-Type': mime });
      return fs.createReadStream(file).pipe(res);
    }
    res.writeHead(404); return res.end('Not Found');
  }

  // 2. API
  try {
    // Auth
    if (route === '/api/auth/login' && req.method === 'POST') {
      const { password } = await parseBody(req);
      if (crypto.scryptSync(password || '', 'salty', 64).toString('hex') === PASSWORD_HASH) {
        return sendJSON(res, 200, { token: 'simple-token-123' });
      }
      return sendJSON(res, 401, { error: 'Incorrecto' });
    }

    // Public Blogs
    if (route === '/api/blogs' && req.method === 'GET') {
      return sendJSON(res, 200, { blogs: readDB().filter(b => b.published) });
    }
    if (route.startsWith('/api/blogs/') && req.method === 'GET') {
      const slug = route.split('/').pop();
      const blog = readDB().find(b => b.slug === slug);
      return blog ? sendJSON(res, 200, blog) : sendJSON(res, 404, { error: 'No existe' });
    }

    // Admin (Protected)
    if (route.startsWith('/api/admin/blogs')) {
      const blogs = readDB();
      if (req.method === 'GET') return sendJSON(res, 200, blogs);
      if (req.method === 'POST') {
        const body = await parseBody(req);
        const slug = body.title.toLowerCase()
          .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove accents
          .replace(/[^a-z0-9 ]/g, '') // Remove special chars
          .replace(/\s+/g, '-'); // Replace spaces with dashes
        const blog = { ...body, id: Date.now().toString(), slug, createdAt: new Date().toISOString() };
        blogs.push(blog); writeDB(blogs);
        return sendJSON(res, 200, blog);
      }
      const id = route.split('/').pop();
      const idx = blogs.findIndex(b => b.id === id);
      if (req.method === 'PUT') {
        const body = await parseBody(req);
        blogs[idx] = { ...blogs[idx], ...body }; writeDB(blogs);
        return sendJSON(res, 200, blogs[idx]);
      }
      if (req.method === 'DELETE') {
        blogs.splice(idx, 1); writeDB(blogs);
        return sendJSON(res, 200, { success: true });
      }
    }
  } catch (e) { sendJSON(res, 500, { error: 'Error' }); }

}).listen(PORT, () => console.log(`🚀 FinzaCore Simple en http://localhost:${PORT}`));
