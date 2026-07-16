import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
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

  return <App />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
