import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, CheckCircle, Wrench,
<<<<<<< HEAD
  BarChart2, Calendar, User, Tag, ChevronLeft, ChevronRight
} from 'lucide-react';
import { staggerContainer, fadeUp } from '../data';

export default function ProjectPage({ project, backText, onBack, isRTL, t, onContactClick }) {
  const [activeImg, setActiveImg] = useState(0);
=======
  BarChart2, Calendar, User, Tag, ChevronLeft, ChevronRight, Play
} from 'lucide-react';
import { staggerContainer, fadeUp } from '../data';
import ReelsThumbnail from './ReelsThumbnail';
import VideoModal from './VideoModal';

export default function ProjectPage({ project, backText, onBack, isRTL, t, onContactClick }) {
  const [activeImg, setActiveImg] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
>>>>>>> origin/master
  const allImages = [project.image, ...(project.gallery || [])];

  const prevImg = () => setActiveImg((i) => (i - 1 + allImages.length) % allImages.length);
  const nextImg = () => setActiveImg((i) => (i + 1) % allImages.length);

  // Category label from tab translations
  const categoryLabel = t?.portfolio?.tabs?.[project.category] ?? project.category;

  return (
    <motion.section
      key={project.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{   opacity: 0, y: -20 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-screen pt-32 pb-24 overflow-hidden"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute top-0 inset-x-0 h-[500px]"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(234,88,12,0.07) 0%, transparent 65%)' }} />
      <div className="pointer-events-none absolute top-0 inset-x-0 h-px
        bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Back button ── */}
        <motion.button
          initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          onClick={onBack}
          className="group flex items-center gap-2.5 mb-10
            glass border border-white/[0.08] px-5 py-2.5 rounded-full
            text-slate-400 hover:text-white hover:border-orange-500/30
            transition-all duration-300 w-fit"
          aria-label="Back"
        >
          {isRTL
            ? <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            : <ArrowLeft  size={15} className="group-hover:-translate-x-1 transition-transform" />}
          <span className="text-sm font-semibold">{backText}</span>
        </motion.button>

<<<<<<< HEAD
        {/* ── Hero image carousel ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden mb-10 group"
          style={{ aspectRatio: '16/7' }}
        >
=======
        {/* ── Hero image carousel or Video Thumbnail ── */}
        {project.category === 'video' && project.videoUrl ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center mb-10"
          >
            <div className="w-full max-w-sm">
              <ReelsThumbnail 
                image={project.image} 
                onClick={() => setIsModalOpen(true)} 
                title={project.title} 
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl overflow-hidden mb-10 group"
            style={{ aspectRatio: '16/7' }}
          >
>>>>>>> origin/master
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImg}
              src={allImages[activeImg]}
              alt={`${project.title} — image ${activeImg + 1}`}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{   opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className="w-full h-full object-cover absolute inset-0"
            />
          </AnimatePresence>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Carousel controls */}
          {allImages.length > 1 && (
            <>
              <button onClick={prevImg} aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full
                  glass border border-white/20 flex items-center justify-center
                  text-white hover:border-orange-500/50 transition-all duration-200
                  opacity-0 group-hover:opacity-100">
                <ChevronLeft size={18} />
              </button>
              <button onClick={nextImg} aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full
                  glass border border-white/20 flex items-center justify-center
                  text-white hover:border-orange-500/50 transition-all duration-200
                  opacity-0 group-hover:opacity-100">
                <ChevronRight size={18} />
              </button>

              {/* Dot indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {allImages.map((_, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} aria-label={`Image ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeImg ? 'w-5 bg-orange-500' : 'w-1.5 bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Thumbnail strip */}
          {allImages.length > 1 && (
            <div className="absolute bottom-0 inset-x-0 px-6 pb-4 hidden sm:flex gap-2 justify-end">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                    i === activeImg ? 'border-orange-500 scale-105' : 'border-white/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>
<<<<<<< HEAD
=======
        )}
>>>>>>> origin/master

        {/* ── Main content grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: overview + deliverables */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="lg:col-span-2 space-y-6"
          >
            {/* Title + meta */}
            <motion.div variants={fadeUp}>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="tag-pill">{categoryLabel}</span>
                {project.tags?.slice(1).map((tag, i) => (
                  <span key={i} className="tag-pill">{tag}</span>
                ))}
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-2">
                {project.title}
              </h1>
              <div className="h-0.5 w-14 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mt-4" />
            </motion.div>

            {/* Overview */}
            <motion.div variants={fadeUp}
              className="glass border border-white/[0.07] rounded-2xl p-7">
              <h2 className="text-xs font-bold text-slate-500 tracking-[0.2em] uppercase mb-4">
                {isRTL ? 'نظرة عامة' : 'Project Overview'}
              </h2>
              <p className="text-slate-300 leading-relaxed text-base md:text-[1.05rem]">
                {project.overview}
              </p>
            </motion.div>

            {/* Deliverables */}
            <motion.div variants={fadeUp}
              className="glass border border-white/[0.07] rounded-2xl p-7">
              <h2 className="text-xs font-bold text-slate-500 tracking-[0.2em] uppercase mb-5 flex items-center gap-2">
                <CheckCircle size={13} className="text-orange-500" />
                {isRTL ? 'المخرجات' : 'Deliverables'}
              </h2>
              <ul className="space-y-3">
                {project.deliverables?.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: isRTL ? 12 : -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}
                    className="flex items-start gap-3 text-slate-300 text-sm"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Results */}
            {project.results?.length > 0 && (
              <motion.div variants={fadeUp}
                className="glass border border-white/[0.07] rounded-2xl p-7">
                <h2 className="text-xs font-bold text-slate-500 tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
                  <BarChart2 size={13} className="text-orange-500" />
                  {isRTL ? 'النتائج' : 'Results'}
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  {project.results.map((r, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
                      className="text-center p-4 rounded-xl bg-orange-500/[0.06] border border-orange-500/10"
                    >
                      <div className="text-2xl md:text-3xl font-black text-white mb-1 gradient-text">
                        {r.value}
                      </div>
                      <div className="text-[0.65rem] text-slate-500 font-semibold tracking-wider uppercase">
                        {r.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right: project info sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5"
          >
            {/* Info card */}
            <div className="glass border border-white/[0.07] rounded-2xl p-6 space-y-5">
              <InfoRow Icon={User} label={isRTL ? 'العميل' : 'Client'} value={project.client} />
              <InfoRow Icon={Calendar} label={isRTL ? 'السنة' : 'Year'}   value={project.year} />
              <InfoRow Icon={Tag} label={isRTL ? 'النوع' : 'Category'}    value={categoryLabel} />
            </div>

            {/* Tools */}
            {project.tools?.length > 0 && (
              <div className="glass border border-white/[0.07] rounded-2xl p-6">
                <h3 className="text-xs font-bold text-slate-500 tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
                  <Wrench size={12} className="text-orange-500" />
                  {isRTL ? 'الأدوات المستخدمة' : 'Tools Used'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool, i) => (
                    <span key={i} className="tag-pill">{tool}</span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
<<<<<<< HEAD
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 0 28px rgba(234,88,12,0.45)' }}
              whileTap={{ scale: 0.97 }}
              onClick={onContactClick}
              className="w-full py-4 px-6 rounded-2xl font-black text-white text-base
                bg-gradient-to-r from-orange-600 to-red-600
                shadow-[0_0_20px_rgba(234,88,12,0.25)]
                transition-all duration-300"
            >
              {isRTL ? 'ابدأ مشروعاً مماثلاً' : 'Start a Similar Project'}
            </motion.button>
          </motion.div>
        </div>
      </div>
=======
            <div className="space-y-3">
              {project.category === 'video' && project.videoUrl && (
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: '0 0 28px rgba(255,255,255,0.1)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-4 px-6 rounded-2xl font-black text-black text-base
                    bg-white
                    shadow-[0_0_20px_rgba(255,255,255,0.15)]
                    transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Play size={18} fill="currentColor" />
                  {isRTL ? 'مشاهدة المشروع' : 'Watch Project'}
                </motion.button>
              )}
              
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 0 28px rgba(234,88,12,0.45)' }}
                whileTap={{ scale: 0.97 }}
                onClick={onContactClick}
                className="w-full py-4 px-6 rounded-2xl font-black text-white text-base
                  bg-gradient-to-r from-orange-600 to-red-600
                  shadow-[0_0_20px_rgba(234,88,12,0.25)]
                  transition-all duration-300"
              >
                {isRTL ? 'ابدأ مشروعاً مماثلاً' : 'Start a Similar Project'}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Video Modal */}
      {project.category === 'video' && project.videoUrl && (
        <VideoModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          videoUrl={project.videoUrl} 
        />
      )}
>>>>>>> origin/master
    </motion.section>
  );
}

/* ─── Small helper ─── */
function InfoRow({ Icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
        <Icon size={13} className="text-orange-400" />
      </div>
      <div className="min-w-0">
        <div className="text-[0.65rem] text-slate-600 font-semibold tracking-wider uppercase">{label}</div>
        <div className="text-sm text-white font-semibold truncate">{value}</div>
      </div>
    </div>
  );
}
