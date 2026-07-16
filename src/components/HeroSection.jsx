import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, ArrowDownRight } from 'lucide-react';
import { fadeUp, staggerContainer } from '../data';
import { SectionLabel } from './UI';

// ─── Marquee strip ─────────────────────────────────────────────────────────
const marqueeItems = [
  'Graphic Design', 'Branding & Identity', 'Paid Advertising',
  'Video Editing', 'ATS CV Writing', 'UI/UX Design', 'Social Media',
  'Graphic Design', 'Branding & Identity', 'Paid Advertising',
  'Video Editing', 'ATS CV Writing', 'UI/UX Design', 'Social Media',
];

export default function HeroSection({ t, lang, isRTL, handleNavClick }) {
  const stats = [
    { value: t.hero.stat1Value, label: t.hero.stat1Label },
    { value: t.hero.stat2Value, label: t.hero.stat2Label },
    { value: t.hero.stat3Value, label: t.hero.stat3Label },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-12"
    >
      {/* ── Radial spotlight ── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[900px] h-[600px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(ellipse, rgba(234,88,12,0.2) 0%, transparent 65%)' }}
        />
      </div>

      {/* ── Grid dot pattern ── */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #f97316 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-5xl"
        >
          {/* Greeting badge */}
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full
              glass border border-orange-500/20 text-sm font-semibold text-orange-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
              </span>
              {t.hero.greeting} {t.hero.name}
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={fadeUp}
            className="text-[clamp(2.8rem,8vw,7rem)] font-black tracking-tight leading-[1.02] text-white mb-6"
          >
            {lang === 'ar' ? (
              <>
                تصاميم وتسويق{' '}
                <span className="gradient-text">يضاعف</span>{' '}
                مبيعاتك.
              </>
            ) : (
              <>
                High-Converting{' '}
                <span className="gradient-text">Design</span>
                {' '}&{' '}
                <br className="hidden sm:block" />
                Digital Marketing.
              </>
            )}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mb-10 font-light"
          >
            {t.hero.desc}
          </motion.p>

          {/* CTA row */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mb-16">
            <motion.a
              whileHover={{ scale: 1.03, boxShadow: '0 0 32px rgba(234,88,12,0.5)' }}
              whileTap={{ scale: 0.97 }}
              href="#contact"
              onClick={(e) => handleNavClick('contact', e)}
              className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4
                bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold text-base rounded-xl
                shadow-[0_0_24px_rgba(234,88,12,0.3)] overflow-hidden transition-all duration-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 opacity-0
                group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2">
                {t.hero.cta}
                {isRTL
                  ? <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                  : <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />}
              </span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.03, borderColor: 'rgba(249,115,22,0.4)' }}
              whileTap={{ scale: 0.97 }}
              href="#portfolio"
              onClick={(e) => handleNavClick('portfolio', e)}
              className="inline-flex items-center justify-center gap-2 px-8 py-4
                glass border border-white/10 text-white font-bold text-base rounded-xl
                hover:bg-white/[0.06] transition-all duration-300"
            >
              {t.hero.subCta}
              <ArrowDownRight size={18} className="opacity-60" />
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-8"
          >
            {stats.map((s, i) => (
              <motion.div key={i} variants={fadeUp} className="flex flex-col">
                <span className="text-3xl md:text-4xl font-black text-white tracking-tight">
                  {s.value}
                </span>
                <span className="text-xs text-slate-500 font-medium mt-1 tracking-wider uppercase">
                  {s.label}
                </span>
              </motion.div>
            ))}

            {/* Vertical dividers */}
            {stats.length > 1 && (
              <div className="hidden sm:flex items-stretch gap-8 absolute" style={{ display: 'none' }} />
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scrolling marquee ── */}
      <div className="relative z-10 mt-16 overflow-hidden border-y border-white/[0.05] py-4">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-6 px-6 text-sm font-semibold text-slate-600 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-600 flex-shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
