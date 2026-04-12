const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// -- Configuración Base --
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'nexo_blog_secret_2026_change_this';
// Encriptación manual nativa reemplazando a Bcrypt
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || crypto.scryptSync('admin123', 'salty', 64).toString('hex');
const DATA_PATH = path.join(__dirname, 'data', 'blogs.json');

// -- Sistema de Archivos de Blogs --
function readBlogs() {
  try {
    if (!fs.existsSync(DATA_PATH)) return [];
    const raw = fs.readFileSync(DATA_PATH, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeBlogs(blogs) {
  if (!fs.existsSync(path.dirname(DATA_PATH))) {
    fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
  }
  fs.writeFileSync(DATA_PATH, JSON.stringify(blogs, null, 2), 'utf8');
}

// -- Helpers de JWT Hechos a Mano --
function signJWT(payload, expiresInSeconds = 7 * 24 * 60 * 60) {
  const header = { alg: 'HS256', typ: 'JWT' };
  payload.exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
  
  const hBase64 = Buffer.from(JSON.stringify(header)).toString('base64url');
  const pBase64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(`${hBase64}.${pBase64}`).digest('base64url');
  
  return `${hBase64}.${pBase64}.${signature}`;
}

function verifyJWT(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    const signature = crypto.createHmac('sha256', JWT_SECRET).update(`${parts[0]}.${parts[1]}`).digest('base64url');
    if (signature !== parts[2]) return false;
    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString());
    if (payload.exp && payload.exp < Date.now() / 1000) return false;
    return payload;
  } catch (e) { return false; }
}

function getAuthUser(req) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return null;
  const token = authHeader.split(' ')[1];
  return verifyJWT(token);
}

function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      try { resolve(body ? JSON.parse(body) : {}); } 
      catch { resolve({}); }
    });
  });
}

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

// -- Servidor Estático Purgado Pura Magia --
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.svg': 'image/svg+xml'
};

function serveStatic(req, res, pathname) {
  let filepath = path.join(__dirname, 'public', pathname === '/' ? 'index.html' : pathname);
  
  if (!path.extname(filepath)) {
    if (fs.existsSync(filepath + '.html')) filepath += '.html';
    else filepath = path.join(__dirname, 'public', 'index.html');
  }

  fs.stat(filepath, (err, stat) => {
    if (err || !stat.isFile()) {
      if (pathname.includes('.')) {
        res.writeHead(404); return res.end();
      }
      filepath = path.join(__dirname, 'public', 'index.html');
    }
    
    fs.readFile(filepath, (err, content) => {
      if (err) { res.writeHead(500); return res.end(); }
      const ext = path.extname(filepath);
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
      res.end(content, 'utf-8');
    });
  });
}

// =========================================================================
// EL SERVIDOR NATIVO
// =========================================================================
const server = http.createServer(async (req, res) => {
  setCorsHeaders(res);
  
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  // Parse URL manually replacing Express Router
  const urlObj = new URL(req.url, `http://${req.headers.host}`);
  const pathname = decodeURI(urlObj.pathname);
  
  // -- ÁRBOL DE RUTAS API --
  if (pathname.startsWith('/api/')) {
    const route = pathname.replace('/api/', '');

    // 1. Auth: Login
    if (route === 'auth/login' && req.method === 'POST') {
      const body = await parseBody(req);
      const attemptHash = crypto.scryptSync(body.password || '', 'salty', 64).toString('hex');
      if (attemptHash !== ADMIN_PASSWORD_HASH) {
        return sendJson(res, 401, { error: 'Contraseña incorrecta' });
      }
      return sendJson(res, 200, { token: signJWT({ admin: true }) });
    }

    // 2. Auth: Verify
    if (route === 'auth/verify' && req.method === 'GET') {
      const user = getAuthUser(req);
      if (!user) return sendJson(res, 401, { error: 'No autorizado' });
      return sendJson(res, 200, { valid: true });
    }

    // 3. Blogs Múltiples (Vistas públicas)
    if (route === 'blogs' && req.method === 'GET') {
      const blogs = readBlogs();
      const category = urlObj.searchParams.get('category');
      const search = urlObj.searchParams.get('search');
      const featured = urlObj.searchParams.get('featured');
      
      let result = blogs.filter(b => b.published);
      if (category && category !== 'Todos') result = result.filter(b => b.category === category);
      if (search) {
        const s = search.toLowerCase();
        result = result.filter(b => b.title.toLowerCase().includes(s) || (b.tags||[]).some(t=>t.toLowerCase().includes(s)));
      }
      if (featured === 'true') result = result.filter(b => b.featured);
      
      result.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
      return sendJson(res, 200, { blogs: result, total: result.length, pages: 1 });
    }

    // 4. Categorías públicas
    if (route === 'categories' && req.method === 'GET') {
      const blogs = readBlogs().filter(b => b.published);
      const cats = [...new Set(blogs.map(b => b.category))];
      const counts = cats.map(cat => ({ name: cat, count: blogs.filter(b => b.category === cat).length }));
      return sendJson(res, 200, counts);
    }

    // 5. Blog Específico (Público)
    if (route.startsWith('blogs/') && req.method === 'GET') {
      const slug = route.split('/')[1];
      const blogs = readBlogs();
      const blog = blogs.find(b => b.slug === slug && b.published);
      if (!blog) return sendJson(res, 404, { error: 'No encontrado' });
      
      blog.views = (blog.views || 0) + 1;
      writeBlogs(blogs);
      return sendJson(res, 200, blog);
    }

    // ---------------------------------------------------------------------
    // RUTAS ADMIN PROTEGIDAS
    // ---------------------------------------------------------------------
    if (route.startsWith('admin/blogs')) {
      const user = getAuthUser(req);
      if (!user) return sendJson(res, 401, { error: 'No autorizado o caducado.' });

      // GET: Todo el listado
      if (req.method === 'GET') {
        const blogs = readBlogs();
        blogs.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
        return sendJson(res, 200, blogs);
      }
      
      // POST: Crear nuevo
      if (req.method === 'POST') {
        const blogs = readBlogs();
        const body = await parseBody(req);
        const now = new Date().toISOString();
        const blog = {
          id: crypto.randomUUID(), // Resuelto con Native Crypto 
          ...body,
          views: 0, createdAt: now, updatedAt: now
        };
        
        if (!blog.slug) blog.slug = blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const existing = blogs.filter(b => b.slug.startsWith(blog.slug));
        if (existing.length > 0) blog.slug = `${blog.slug}-${existing.length}`;
        
        blogs.unshift(blog);
        writeBlogs(blogs);
        return sendJson(res, 200, blog);
      }
      
      // UPDATE & DELETE
      const idStr = route.split('/')[2];
      if (idStr) {
        let blogs = readBlogs();
        const idx = blogs.findIndex(b => b.id === idStr);
        if (idx === -1) return sendJson(res, 404, { error: 'No encontrado' });

        if (req.method === 'PUT') {
          const body = await parseBody(req);
          blogs[idx] = { ...blogs[idx], ...body, id: blogs[idx].id, createdAt: blogs[idx].createdAt, updatedAt: new Date().toISOString() };
          writeBlogs(blogs);
          return sendJson(res, 200, blogs[idx]);
        }
        
        if (req.method === 'DELETE') {
          writeBlogs(blogs.filter(b => b.id !== idStr));
          return sendJson(res, 200, { success: true });
        }
      }
    }

    // Ruta no encontrada en la API
    return sendJson(res, 404, { error: 'API Endpoint Not Found' });
  }

  // Si no es /api/, sírvelo como archivo estático
  serveStatic(req, res, pathname);
});

server.listen(PORT, () => {
  console.log(`🚀 [NATIVO] NEXO Backend Vanilla corriendo en http://localhost:${PORT}`);
  console.log(`🍃 CERO DEPENDENCIAS. Eliminando node_modules...`);
});
