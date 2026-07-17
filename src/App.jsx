import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Routes, Route, useNavigate, useLocation, useParams, Navigate } from 'react-router-dom';

import { translations } from './data';
import { useProjects, useServices } from './hooks/useLocalData';
import { MeshBackground, MagneticCursor } from './components/UI';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import PortfolioSection from './components/PortfolioSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ContentPage from './components/ContentPage';
import ProjectPage from './components/ProjectPage';
import SEO from './components/SEO';

// Helper component to handle scrolling to hash when navigating to home from another page
function ScrollToHash() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300); // Wait for render
    }
  }, [hash]);
  return null;
}

export default function App() {
  const [lang, setLang] = useState('en');
  const [activeTab, setActiveTab] = useState('all');
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // ── Dynamic data from localStorage (syncs with admin panel) ───────────────
  const { projects, setProjects } = useProjects();
  const { services, setServices } = useServices();

  const t = translations[lang];
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
        try { setProjects(JSON.parse(e.newValue)); } catch { }
      }
      if (e.key === 'ag_portfolio_services' && e.newValue) {
        try { setServices(JSON.parse(e.newValue)); } catch { }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [setProjects, setServices]);

  // ── Client-side security ──────────────────────────────────────────────────
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
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang, isRTL]);

  const toggleLanguage = () => setLang((l) => (l === 'en' ? 'ar' : 'en'));

  // ── Navigation helpers ────────────────────────────────────────────────────
  const handleNavClick = (sectionId, e) => {
    if (e) e.preventDefault();
    navigate(`/#${sectionId}`);
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  const navigateToPage = (pageId, e) => {
    if (e) e.preventDefault();
    if (pageId === 'home') {
      navigate('/');
    } else {
      navigate(`/${pageId}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToProject = (project) => {
    navigate(`/project/${project.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToContact = () => {
    navigate('/#contact');
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  // Determine active page for Navbar highlighting
  let activePage = 'home';
  if (location.pathname.startsWith('/project')) activePage = 'project';
  else if (location.pathname !== '/') activePage = location.pathname.substring(1);

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#030712] text-slate-100 font-sans antialiased relative noise"
    >
      {/* ── Background & Layout elements ── */}
      <MeshBackground />
      <MagneticCursor />
      <ScrollToHash />

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

      {/* ── Page content Routing ── */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <SEO title="Home" description={t.hero.desc} />
                <HeroSection t={t} lang={lang} isRTL={isRTL} handleNavClick={handleNavClick} />
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
            } />
            <Route path="/project/:id" element={<ProjectRoute projects={projects} t={t} isRTL={isRTL} navigateToPage={navigateToPage} navigateToContact={navigateToContact} />} />
            <Route path="/:pageId" element={<PageRoute t={t} isRTL={isRTL} navigateToPage={navigateToPage} />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* ── Footer ── */}
      <Footer t={t} lang={lang} navigateToPage={navigateToPage} />
    </div>
  );
}

// Wrapper for Project Route
function ProjectRoute({ projects, t, isRTL, navigateToPage, navigateToContact }) {
  const { id } = useParams();
  const project = projects.find(p => p.id.toString() === id);

  if (!project) return <Navigate to="/" replace />;

  return (
    <>
      <SEO
        title={project.title}
        description={project.overview}
        image={project.image}
      />
      <ProjectPage
        project={project}
        backText={t.pages.backButton}
        onBack={() => navigateToPage('home')}
        isRTL={isRTL}
        t={t}
        onContactClick={navigateToContact}
      />
    </>
  );
}

// Wrapper for Content Pages Route
function PageRoute({ t, isRTL, navigateToPage }) {
  const { pageId } = useParams();
  const pageData = t.pages[pageId];

  if (!pageData) return <Navigate to="/" replace />;

  return (
    <>
      <SEO
        title={pageData.title}
        description={pageData.paragraphs?.[0] || t.hero.desc}
      />
      <ContentPage
        pageId={pageId}
        pageData={pageData}
        backText={t.pages.backButton}
        onBack={() => navigateToPage('home')}
        isRTL={isRTL}
      />
    </>
  );
}