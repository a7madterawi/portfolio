import { motion, AnimatePresence } from 'framer-motion';
import { Eye } from 'lucide-react';
import { fadeUp, staggerContainer } from '../data';
import { SectionLabel } from './UI';

export default function PortfolioSection({ t, projects = [], activeTab, setActiveTab, isRTL, onViewProject }) {
  const tabs     = Object.entries(t.portfolio.tabs);
  const filtered = activeTab === 'all'
    ? projects
    : projects.filter((p) => p.category === activeTab);

  return (
    <section id="portfolio" className="relative py-28 overflow-hidden">
      {/* Subtle top glow */}
      <div className="pointer-events-none absolute top-0 inset-x-0 h-px
        bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>{t.portfolio.subtitle}</SectionLabel>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mt-2">
              {t.portfolio.title}
            </h2>
          </motion.div>
        </motion.div>

        {/* Tab pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2.5 mb-12"
        >
          {tabs.map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className="relative px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-200 focus:outline-none"
              aria-pressed={activeTab === key}
            >
              {activeTab === key && (
                <motion.span
                  layoutId="portfolio-tab"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-600 to-red-600
                    shadow-[0_0_16px_rgba(234,88,12,0.35)]"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className={`relative z-10 ${
                activeTab === key ? 'text-white' : 'text-slate-500 hover:text-slate-300'
              }`}>
                {label}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => (
              <motion.article
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.88, y: 20 }}
                animate={{ opacity: 1, scale: 1,    y: 0 }}
                exit={{   opacity: 0, scale: 0.88, y: 20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: idx * 0.04 }}
                onClick={() => onViewProject(project)}
                className={`portfolio-card group relative rounded-2xl overflow-hidden
                  border border-white/[0.07] cursor-pointer
                  ${idx === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}
                role="button"
                tabIndex={0}
                aria-label={`View project: ${project.title}`}
                onKeyDown={(e) => e.key === 'Enter' && onViewProject(project)}
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Gradient overlay always */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Hover overlay */}
                <div className="overlay absolute inset-0 bg-orange-950/50 backdrop-blur-[3px]
                  flex items-center justify-center">
                  <div className="flex items-center gap-2 px-5 py-2.5 bg-white text-black
                    font-bold text-sm rounded-full shadow-xl transform translate-y-3
                    group-hover:translate-y-0 transition-all duration-300"
                    onClick={(e) => { e.stopPropagation(); onViewProject(project); }}
                  >
                    <Eye size={15} />
                    {isRTL ? 'عرض التفاصيل' : 'View Project'}
                  </div>
                </div>

                {/* Info */}
                <div className="absolute bottom-0 inset-x-0 p-5 z-10 transform translate-y-1
                  group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-orange-400 text-[0.65rem] font-bold tracking-[0.15em] uppercase block mb-1">
                    {t.portfolio.tabs[project.category]}
                  </span>
                  <h3 className="text-white font-bold text-base leading-snug">{project.title}</h3>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Subtle bottom glow */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-px
        bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  );
}
