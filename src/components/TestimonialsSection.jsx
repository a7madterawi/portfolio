import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { fadeUp, staggerContainer, mockTestimonials } from '../data';
import { SectionLabel, GlassCard } from './UI';

// Avatar gradient palettes
const avatarGradients = [
  'from-orange-500 to-red-600',
  'from-amber-500 to-orange-600',
  'from-red-500 to-pink-600',
];

export default function TestimonialsSection({ t }) {
  const [current, setCurrent] = useState(0);
  const total = mockTestimonials.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  return (
    <section id="testimonials" className="relative py-28 overflow-hidden">
      {/* Top / bottom dividers */}
      <div className="pointer-events-none absolute top-0 inset-x-0 h-px
        bg-gradient-to-r from-transparent via-orange-500/25 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-px
        bg-gradient-to-r from-transparent via-orange-500/25 to-transparent" />

      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(234,88,12,0.06) 0%, transparent 65%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>{t.testimonials.subtitle}</SectionLabel>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mt-2">
              {t.testimonials.title}
            </h2>
          </motion.div>
        </motion.div>

        {/* Desktop: all cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="hidden md:grid grid-cols-3 gap-5"
        >
          {mockTestimonials.map((rev, idx) => (
            <motion.div key={rev.id} variants={fadeUp}>
              <TestimonialCard review={rev} gradient={avatarGradients[idx]} />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile: carousel */}
        <div className="md:hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{   opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <TestimonialCard
                review={mockTestimonials[current]}
                gradient={avatarGradients[current]}
              />
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-2">
              {mockTestimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? 'w-6 bg-orange-500' : 'w-1.5 bg-slate-700'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={prev}
                className="w-9 h-9 rounded-xl glass border border-white/10
                  flex items-center justify-center text-slate-400 hover:text-white
                  hover:border-orange-500/30 transition-all"
                aria-label="Previous">
                <ChevronLeft size={16} />
              </button>
              <button onClick={next}
                className="w-9 h-9 rounded-xl glass border border-white/10
                  flex items-center justify-center text-slate-400 hover:text-white
                  hover:border-orange-500/30 transition-all"
                aria-label="Next">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ review, gradient }) {
  return (
    <div className="glass border border-white/[0.07] rounded-2xl p-7 h-full flex flex-col
      hover:border-orange-500/20 transition-all duration-400 group relative overflow-hidden">

      {/* Background quote mark */}
      <Quote
        size={80}
        className="absolute -top-2 -right-2 text-white/[0.03] group-hover:text-orange-500/[0.05]
          transition-colors duration-500 pointer-events-none rotate-180"
      />

      {/* Stars */}
      <div className="flex gap-1 mb-5">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} size={14} className="text-amber-400" fill="currentColor" />
        ))}
      </div>

      {/* Quote text */}
      <p className="text-slate-300 text-sm leading-relaxed flex-1 mb-6 italic relative z-10">
        "{review.text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3.5">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient}
          flex items-center justify-center font-bold text-white text-base shadow-lg`}>
          {review.name.charAt(0)}
        </div>
        <div>
          <h5 className="font-bold text-white text-sm">{review.name}</h5>
          <span className="text-xs text-slate-500">{review.role}</span>
        </div>
      </div>
    </div>
  );
}
