import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react';

const CREDENTIALS = { username: 'aterawi', password: 'Ter@w!98' };

export default function AdminLogin({ onLogin }) {
  const [form,      setForm]      = useState({ username: '', password: '' });
  const [showPass,  setShowPass]  = useState(false);
  const [error,     setError]     = useState('');
  const [shaking,   setShaking]   = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = onLogin(form.username, form.password);
    if (!ok) {
      setError('Invalid username or password.');
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  const inputCls =
    'w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3.5 text-white ' +
    'placeholder-slate-500 text-sm focus:outline-none focus:border-orange-500/60 ' +
    'focus:ring-2 focus:ring-orange-500/10 transition-all duration-200';

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(234,88,12,0.08) 0%, #020617 55%)' }}>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0,  scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`w-full max-w-md ${shaking ? 'animate-[shake_0.4s_ease]' : ''}`}
        style={shaking ? { animation: 'shake 0.4s ease' } : {}}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-700
            flex items-center justify-center text-3xl font-black text-white mb-4
            shadow-[0_0_30px_rgba(234,88,12,0.4)]">
            A
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Admin Panel</h1>
          <p className="text-slate-500 text-sm mt-1">Ahmed Abdullah Portfolio CMS</p>
        </div>

        {/* Form card */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Username */}
            <div>
              <label className="block text-xs font-bold text-slate-400 tracking-widest uppercase mb-2">
                Username
              </label>
              <div className="relative">
                <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={form.username}
                  onChange={(e) => { setForm({ ...form, username: e.target.value }); setError(''); }}
                  placeholder="Enter username"
                  className={`${inputCls} pl-10`}
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-400 tracking-widest uppercase mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => { setForm({ ...form, password: e.target.value }); setError(''); }}
                  placeholder="Enter password"
                  className={`${inputCls} pl-10 pr-12`}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl
                  bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
              >
                <AlertCircle size={14} className="flex-shrink-0" />
                {error}
              </motion.div>
            )}

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 28px rgba(234,88,12,0.45)' }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full py-3.5 rounded-xl font-black text-white text-sm
                bg-gradient-to-r from-orange-600 to-red-600
                shadow-[0_0_16px_rgba(234,88,12,0.3)] transition-all duration-300 mt-2"
            >
              Sign In
            </motion.button>
          </form>
        </div>

        <p className="text-center text-slate-700 text-xs mt-6">
          Restricted access — portfolio owners only
        </p>
      </motion.div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-8px); }
          40%       { transform: translateX(8px); }
          60%       { transform: translateX(-5px); }
          80%       { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}
