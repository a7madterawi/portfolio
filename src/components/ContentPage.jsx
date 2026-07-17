import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ShieldCheck, CreditCard, Briefcase, User } from 'lucide-react';
import { staggerContainer, fadeUp } from '../data';

const pageIcons = {
  about:   User,
  privacy: ShieldCheck,
  payment: CreditCard,
  work:    Briefcase,
};

export default function ContentPage({ pageData, backText, onBack, isRTL, pageId }) {
  if (!pageData) return null;
  const Icon = pageIcons[pageId] || User;

  return (
    <motion.section
      key={pageId}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{   opacity: 0, y: -20 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-screen py-32 overflow-hidden"
    >
      {/* Background accent */}
      <div className="pointer-events-none absolute top-0 inset-x-0 h-[400px]"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(234,88,12,0.08) 0%, transparent 65%)' }} />
      <div className="pointer-events-none absolute top-0 inset-x-0 h-px
        bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          onClick={onBack}
          className="group flex items-center gap-2.5 mb-12
            glass border border-white/[0.08] px-5 py-2.5 rounded-full
            text-slate-400 hover:text-white hover:border-orange-500/30
            transition-all duration-300 w-fit"
          aria-label="Back to home"
        >
          {isRTL
            ? <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            : <ArrowLeft  size={15} className="group-hover:-translate-x-1 transition-transform" />}
          <span className="text-sm font-semibold">{backText}</span>
        </motion.button>

        {/* Page heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex items-center gap-4 mb-12"
        >
          <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20
            flex items-center justify-center flex-shrink-0">
            <Icon size={26} className="text-orange-400" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              {pageData.title}
            </h1>
            <div className="h-0.5 w-12 bg-gradient-to-r from-orange-500 to-amber-500 mt-3 rounded-full" />
          </div>
        </motion.div>

        {/* Content card */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="glass border border-white/[0.07] rounded-3xl p-8 md:p-12
            shadow-[0_24px_80px_rgba(0,0,0,0.35)] space-y-7"
        >
          {pageData.paragraphs.map((paragraph, idx) => {
            if (paragraph.includes(':')) {
              const colonIdx = paragraph.indexOf(':');
              const heading  = paragraph.slice(0, colonIdx);
              const body     = paragraph.slice(colonIdx + 1);
              return (
                <motion.div key={idx} variants={fadeUp} className="group">
                  <div className="flex gap-3 items-start">
                    <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-500" />
                    <p className="text-slate-300 leading-relaxed text-base md:text-[1.0625rem]">
                      <span className="font-bold text-white">{heading}:</span>
                      {body}
                    </p>
                  </div>
                </motion.div>
              );
            }
            return (
              <motion.p
                key={idx}
                variants={fadeUp}
                className="text-slate-400 leading-relaxed text-base md:text-[1.0625rem]"
              >
                {paragraph}
              </motion.p>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
