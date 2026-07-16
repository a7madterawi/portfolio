import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { translations } from './data';
import { useProjects, useServices } from './hooks/useLocalData';
import { MeshBackground, MagneticCursor } from './components/UI';
import Navbar              from './components/Navbar';
import HeroSection         from './components/HeroSection';
import ServicesSection     from './components/ServicesSection';
import PortfolioSection    from './components/PortfolioSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection      from './components/ContactSection';
import Footer              from './components/Footer';
import ContentPage         from './components/ContentPage';
import ProjectPage         from './components/ProjectPage';

export default function App() {
  const [lang,          setLang]          = useState('en');
  const [activeTab,     setActiveTab]     = useState('all');
  const [scrolled,      setScrolled]      = useState(false);
  const [activePage,    setActivePage]    = useState('home');
  const [activeProject, setActiveProject] = useState(null);

  // ── Dynamic data from localStorage (syncs with admin panel) ───────────────
  const { projects, setProjects } = useProjects();
  const { services, setServices } = useServices();

  const t     = translations[lang];
  const isRTL = lang === 'ar';

  // ── Scroll listener ───────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Listen for admin data changes in other tabs ───────────────────────────
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'ag_portfolio_projects' && e.newValue) {
        try { setProjects(JSON.parse(e.newValue)); } catch {}
      }
      if (e.key === 'ag_portfolio_services' && e.newValue) {
        try { setServices(JSON.parse(e.newValue)); } catch {}
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [setProjects, setServices]);

  // ── Client-side security (exact original logic) ───────────────────────────
  useEffect(() => {
    const blockContextMenu = (e) => e.preventDefault();
    const blockKeys = (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C' || e.key === 'J')) ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener('contextmenu', blockContextMenu);
    document.addEventListener('keydown', blockKeys);
    return () => {
      document.removeEventListener('contextmenu', blockContextMenu);
      document.removeEventListener('keydown', blockKeys);
    };
  }, []);

  // ── RTL / font dir ────────────────────────────────────────────────────────
  useEffect(() => {
    document.documentElement.dir  = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang, isRTL]);

  const toggleLanguage = () => setLang((l) => (l === 'en' ? 'ar' : 'en'));

  // ── Navigation helpers ────────────────────────────────────────────────────
  const handleNavClick = (sectionId, e) => {
    if (e) e.preventDefault();
    if (activePage !== 'home') {
      setActivePage('home');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToPage = (pageId, e) => {
    if (e) e.preventDefault();
    setActiveProject(null);
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToProject = (project) => {
    setActiveProject(project);
    setActivePage('project');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToContact = () => {
    setActiveProject(null);
    setActivePage('home');
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#030712] text-slate-100 font-sans antialiased relative noise"
    >
      {/* ── Animated mesh background ── */}
      <MeshBackground />

      {/* ── Custom cursor (desktop only) ── */}
      <MagneticCursor />

      {/* ── Scarcity banner ── */}
      <div className="relative z-50 w-full text-center py-2.5 px-4
        bg-gradient-to-r from-orange-700 via-red-600 to-orange-700
        text-white text-xs sm:text-sm font-bold tracking-wide
        shadow-[0_2px_16px_rgba(234,88,12,0.4)]">
        {t.scarcity}
      </div>

      {/* ── Navbar ── */}
      <Navbar
        t={t}
        lang={lang}
        scrolled={scrolled}
        toggleLanguage={toggleLanguage}
        handleNavClick={handleNavClick}
        navigateToPage={navigateToPage}
        activePage={activePage}
      />

      {/* ── Page content ── */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {activePage === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{   opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <HeroSection
                t={t}
                lang={lang}
                isRTL={isRTL}
                handleNavClick={handleNavClick}
              />

              {/* Section divider */}
              <div className="section-divider" />

              <ServicesSection t={t} servicesOverride={services} />

              <div className="section-divider" />

              <PortfolioSection
                t={t}
                projects={projects}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isRTL={isRTL}
                onViewProject={navigateToProject}
              />

              <div className="section-divider" />

              <TestimonialsSection t={t} />

              <div className="section-divider" />

              <ContactSection t={t} lang={lang} isRTL={isRTL} />
            </motion.div>
          ) : activePage === 'project' && activeProject ? (
            <ProjectPage
              key={`project-${activeProject.id}`}
              project={activeProject}
              backText={t.pages.backButton}
              onBack={() => navigateToPage('home')}
              isRTL={isRTL}
              t={t}
              onContactClick={navigateToContact}
            />
          ) : (
            <ContentPage
              key={activePage}
              pageId={activePage}
              pageData={t.pages[activePage]}
              backText={t.pages.backButton}
              onBack={() => navigateToPage('home')}
              isRTL={isRTL}
            />
          )}
        </AnimatePresence>
      </main>

      {/* ── Footer ── */}
      <Footer t={t} lang={lang} navigateToPage={navigateToPage} />
    </div>
  );
}
