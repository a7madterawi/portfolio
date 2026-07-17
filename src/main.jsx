import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App      from './App.jsx';
import AdminApp from './components/admin/AdminApp.jsx';
import './index.css';

// ─── Hash-based router — portfolio vs admin ───────────────────────────────────
function Root() {
  const [isAdmin, setIsAdmin] = useState(
    () => window.location.hash.startsWith('#/admin')
  );

  useEffect(() => {
    const handler = () => setIsAdmin(window.location.hash.startsWith('#/admin'));
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  const exitAdmin = () => {
    window.location.hash = '';
    setIsAdmin(false);
  };

  if (isAdmin) {
    return <AdminApp onExit={exitAdmin} />;
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  );
}

// Support for react-snap pre-rendering
const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(
    rootElement,
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  );
} else {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  );
}
