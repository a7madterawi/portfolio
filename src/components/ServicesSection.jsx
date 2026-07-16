import { motion } from 'framer-motion';
import { PenTool, Layers, TrendingUp, Video, FileText } from 'lucide-react';
import { fadeUp, staggerContainer } from '../data';
import { SectionLabel } from './UI';

const serviceIcons = [PenTool, Layers, TrendingUp, Video, FileText];

export default function ServicesSection({ t, servicesOverride }) {
  // Use admin-managed services if available, otherwise fall back to translation items
  const items = servicesOverride?.length ? servicesOverride : (t.services?.items || []);
  return (
    <section id="services" className="relative py-28 overflow-hidden">
      {/* Subtle background accent */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(234,88,12,0.4) 0%, transparent 65%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>{t.services.title}</SectionLabel>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mt-2 max-w-2xl leading-[1.05]">
              {t.services.subtitle}
            </h2>
          </motion.div>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {items.map((srv, idx) => {
            const Icon = serviceIcons[idx] || PenTool;
            return (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="service-card gradient-border relative p-7 rounded-2xl
                  glass border border-white/[0.07] cursor-default group overflow-hidden"
              >
                {/* Large background number */}
                <div className="absolute -bottom-3 -right-2 text-[7rem] font-black leading-none
                  text-white/[0.03] group-hover:text-orange-500/[0.04] transition-colors duration-500
                  pointer-events-none select-none ltr:right-0 rtl:left-0 rtl:right-auto">
                  {srv.num}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20
                  flex items-center justify-center mb-6 group-hover:bg-orange-500/15
                  group-hover:border-orange-500/30 transition-all duration-300">
                  <Icon size={22} className="text-orange-400" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-3 leading-snug">{srv.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 min-h-[60px]">{srv.desc}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {srv.tags.map((tag, i) => (
                    <span key={i} className="tag-pill">{tag}</span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
