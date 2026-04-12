import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastProvider } from './ToastContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import AdminLogin from './pages/AdminLogin';
import Admin from './pages/Admin';
import Recursos from './pages/Recursos';
import SobreNosotros from './pages/SobreNosotros';
import Contacto from './pages/Contacto';

function Layout({ children }) {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');
  return (
    <>
      {!isAdmin && <Navbar />}
      {children}
      {!isAdmin && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Layout>
          <Routes>
            {/* Public */}
            <Route path="/"         element={<Landing />} />
            <Route path="/blogs"    element={<BlogList />} />
            <Route path="/blogs/:slug" element={<BlogPost />} />
            <Route path="/recursos" element={<Recursos />} />
            <Route path="/sobre"    element={<SobreNosotros />} />
            <Route path="/contacto" element={<Contacto />} />

            {/* Admin */}
            <Route path="/admin"           element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<Admin />} />
            <Route path="/admin/new"       element={<Admin />} />
            <Route path="/admin/posts"     element={<Admin />} />
            <Route path="/admin/edit/:id"  element={<Admin />} />

            {/* Legal placeholders (redirect to home until pages are built) */}
            <Route path="/privacidad"  element={<Navigate to="/" />} />
            <Route path="/aviso-legal" element={<Navigate to="/" />} />
            <Route path="/cookies"     element={<Navigate to="/" />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </ToastProvider>
    </BrowserRouter>
  );
}
