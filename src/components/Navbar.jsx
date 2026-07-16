import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Menu, X } from 'lucide-react';

export default function Navbar({ t, lang, scrolled, toggleLanguage, handleNavClick, navigateToPage, activePage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isRTL = lang === 'ar';

  const closeMenu = () => setMenuOpen(false);

  const navItems = [
    { id: 'home',         label: t.nav.home },
    { id: 'services',     label: t.nav.services },
    { id: 'portfolio',    label: t.nav.portfolio },
    { id: 'testimonials', label: t.nav.testimonials },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 pt-4 px-4 sm:px-6 lg:px-8"
    >
      {/* ── Pill container ── */}
      <div className={`max-w-7xl mx-auto transition-all duration-500 ${
        scrolled
          ? 'glass border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-2xl px-5 py-3'
          : 'bg-transparent px-2 py-3'
      }`}>
        <div className="flex items-center justify-between">

          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={(e) => { navigateToPage('home', e); closeMenu(); }}
            className="flex items-center gap-3 group"
            aria-label="Go to home"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 via-orange-600 to-red-700
              flex items-center justify-center font-black text-lg text-white
              shadow-[0_0_20px_rgba(234,88,12,0.4)] group-hover:shadow-[0_0_30px_rgba(234,88,12,0.6)]
              transition-shadow duration-300">
              A
              <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-bold text-[1.1rem] tracking-tight text-white hidden sm:block">
              Ahmed<span className="text-orange-500">.</span>
            </span>
          </motion.button>

          {/* Desktop links */}
          <div className={`hidden md:flex items-center ${isRTL ? 'gap-6 flex-row-reverse' : 'gap-6'}`}>
            {navItems.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => handleNavClick(id, e)}
                className="nav-link text-sm font-medium text-slate-300 hover:text-white transition-colors relative py-1"
              >
                {label}
              </a>
            ))}

            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                text-slate-400 hover:text-orange-400 hover:bg-orange-500/10
                border border-transparent hover:border-orange-500/20
                transition-all duration-200 text-xs font-bold tracking-wider uppercase"
              aria-label="Toggle language"
            >
              <Globe size={14} />
              {lang === 'en' ? 'AR' : 'EN'}
            </button>

            {/* CTA */}
            <motion.a
              whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(234,88,12,0.45)' }}
              whileTap={{ scale: 0.97 }}
              href="#contact"
              onClick={(e) => handleNavClick('contact', e)}
              className="px-5 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white
                text-sm font-bold rounded-xl shadow-[0_0_15px_rgba(234,88,12,0.25)]
                transition-all duration-300"
            >
              {t.nav.contact}
            </motion.a>
          </div>

          {/* Mobile right */}
          <div className="md:hidden flex items-center gap-3">
            <button onClick={toggleLanguage}
              className="p-2 text-slate-400 hover:text-orange-400 transition-colors"
              aria-label="Toggle language">
              <Globe size={18} />
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-slate-300 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,   scale: 1 }}
            exit={{   opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden mt-2 max-w-7xl mx-auto"
          >
            <div className="glass border border-white/[0.08] rounded-2xl p-3 shadow-2xl space-y-1">
              {navItems.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => { handleNavClick(id, e); closeMenu(); }}
                  className="block px-4 py-3 text-sm font-medium text-slate-300
                    hover:text-white hover:bg-white/[0.04] rounded-xl transition-all"
                >
                  {label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => { handleNavClick('contact', e); closeMenu(); }}
                className="block mt-2 px-4 py-3 text-sm font-bold text-center
                  bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl"
              >
                {t.nav.contact}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
