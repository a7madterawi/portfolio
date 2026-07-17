import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Save, Plus, X, ImageIcon,
  ChevronUp, ChevronDown, GripVertical, CheckCircle
} from 'lucide-react';

const CATEGORIES = ['branding', 'logos', 'social', 'video', 'campaign'];

const emptyProject = {
  category: 'branding',
  image:    '',
  videoUrl: '',
  gallery:  ['', '', ''],
  title:    '',
  client:   '',
  year:     String(new Date().getFullYear()),
  tags:     [],
  tools:    [],
  overview: '',
  deliverables: [''],
  results: [{ label: '', value: '' }],
};

/* ─── Small reusable input ────────────────────────────────────────────────── */
function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-400 tracking-widest uppercase mb-2">{label}</label>
      {children}
    </div>
  );
}

const inputCls =
  'w-full bg-slate-800/60 border border-slate-700/80 rounded-xl px-4 py-3 text-white ' +
  'placeholder-slate-600 text-sm focus:outline-none focus:border-orange-500/50 ' +
  'focus:ring-2 focus:ring-orange-500/10 transition-all duration-200';

/* ─── Tag input (for tools) ───────────────────────────────────────────────── */
function TagInput({ tags, onChange, placeholder }) {
  const [input, setInput] = useState('');

  const addTag = (val) => {
    const trimmed = val.trim();
    if (trimmed && !tags.includes(trimmed)) onChange([...tags, trimmed]);
    setInput('');
  };

  const removeTag = (t) => onChange(tags.filter((x) => x !== t));

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((t) => (
          <span key={t} className="flex items-center gap-1.5 px-3 py-1 rounded-full
            bg-orange-500/10 border border-orange-500/20 text-orange-300 text-xs font-semibold">
            {t}
            <button onClick={() => removeTag(t)} className="hover:text-red-400 transition-colors">
              <X size={11} />
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
            e.preventDefault();
            addTag(input);
          }
        }}
        onBlur={() => input.trim() && addTag(input)}
        placeholder={placeholder || 'Type and press Enter to add'}
        className={inputCls}
      />
    </div>
  );
}

/* ─── Dynamic list (deliverables) ─────────────────────────────────────────── */
function DynamicList({ items, onChange, placeholder }) {
  const add    = ()      => onChange([...items, '']);
  const update = (i, v)  => onChange(items.map((x, j) => (j === i ? v : x)));
  const remove = (i)     => onChange(items.filter((_, j) => j !== i));

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 items-center">
          <span className="text-orange-500 text-xs font-bold w-4 text-center flex-shrink-0">•</span>
          <input
            type="text"
            value={item}
            onChange={(e) => update(i, e.target.value)}
            placeholder={placeholder}
            className={`${inputCls} flex-1`}
          />
          <button onClick={() => remove(i)}
            className="text-slate-600 hover:text-red-400 transition-colors flex-shrink-0">
            <X size={15} />
          </button>
        </div>
      ))}
      <button
        onClick={add}
        className="flex items-center gap-2 text-xs font-semibold text-orange-400
          hover:text-orange-300 transition-colors mt-1"
      >
        <Plus size={13} /> Add item
      </button>
    </div>
  );
}

/* ─── Results metrics editor ──────────────────────────────────────────────── */
function ResultsList({ results, onChange }) {
  const add    = ()          => onChange([...results, { label: '', value: '' }]);
  const update = (i, field, v) => onChange(results.map((r, j) => j === i ? { ...r, [field]: v } : r));
  const remove = (i)         => onChange(results.filter((_, j) => j !== i));

  return (
    <div className="space-y-2">
      {results.map((r, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input
            type="text"
            value={r.value}
            onChange={(e) => update(i, 'value', e.target.value)}
            placeholder="Value (e.g. +210%)"
            className={`${inputCls} w-28 flex-shrink-0`}
          />
          <input
            type="text"
            value={r.label}
            onChange={(e) => update(i, 'label', e.target.value)}
            placeholder="Label (e.g. Engagement)"
            className={`${inputCls} flex-1`}
          />
          <button onClick={() => remove(i)}
            className="text-slate-600 hover:text-red-400 transition-colors flex-shrink-0">
            <X size={15} />
          </button>
        </div>
      ))}
      <button
        onClick={add}
        className="flex items-center gap-2 text-xs font-semibold text-orange-400
          hover:text-orange-300 transition-colors mt-1"
      >
        <Plus size={13} /> Add metric
      </button>
    </div>
  );
}

/* ─── Gallery editor ──────────────────────────────────────────────────────── */
function GalleryEditor({ images, onChange }) {
  const update = (i, v) => onChange(images.map((x, j) => (j === i ? v : x)));
  const add    = ()     => onChange([...images, '']);
  const remove = (i)    => onChange(images.filter((_, j) => j !== i));

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((url, i) => (
          <div key={i} className="group relative">
            <div className="aspect-video bg-slate-800 rounded-xl overflow-hidden border border-slate-700 mb-1.5">
              {url ? (
                <img src={url} alt="" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon size={20} className="text-slate-600" />
                </div>
              )}
              <button
                onClick={() => remove(i)}
                className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-red-600
                  flex items-center justify-center opacity-0 group-hover:opacity-100
                  transition-opacity text-white"
              >
                <X size={10} />
              </button>
            </div>
            <input
              type="url"
              value={url}
              onChange={(e) => update(i, e.target.value)}
              placeholder="Image URL..."
              className={`${inputCls} text-xs py-2`}
            />
          </div>
        ))}

        {/* Add button */}
        <button
          onClick={add}
          className="aspect-video bg-slate-800/50 border border-dashed border-slate-700
            rounded-xl flex flex-col items-center justify-center gap-2
            text-slate-600 hover:text-orange-400 hover:border-orange-500/40
            transition-all duration-200"
        >
          <Plus size={20} />
          <span className="text-xs font-semibold">Add Image</span>
        </button>
      </div>
    </div>
  );
}

/* ─── Toast ───────────────────────────────────────────────────────────────── */
function Toast({ msg }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: '-50%' }}
          animate={{ opacity: 1, y: 0,  x: '-50%' }}
          exit={{   opacity: 0, y: 20,  x: '-50%' }}
          className="fixed bottom-8 left-1/2 z-50 flex items-center gap-2.5
            px-5 py-3 rounded-2xl bg-green-600 text-white font-bold text-sm shadow-xl"
        >
          <CheckCircle size={16} />
          {msg}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  Main ProjectEditor                                                         */
/* ═══════════════════════════════════════════════════════════════════════════ */
export default function ProjectEditor({ project, onSave, onCancel }) {
  const isNew = !project?.id;
  const [draft, setDraft] = useState(() => ({
    ...emptyProject,
    ...(project || {}),
    gallery:      project?.gallery?.length      ? [...project.gallery]      : ['', '', ''],
    deliverables: project?.deliverables?.length ? [...project.deliverables] : [''],
    results:      project?.results?.length      ? [...project.results]      : [{ label: '', value: '' }],
    tags:         project?.tags  ? [...project.tags]  : [],
    tools:        project?.tools ? [...project.tools] : [],
  }));
  const [toast, setToast] = useState('');

  const set = (field, value) => setDraft((d) => ({ ...d, [field]: value }));

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const handleSave = () => {
    if (!draft.title.trim()) { alert('Please enter a project title.'); return; }
    onSave({ ...draft, id: project?.id });
    showToast(isNew ? 'Project created!' : 'Changes saved!');
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* ── Sticky header ── */}
      <div className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800 px-8 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <button
            onClick={onCancel}
            className="flex items-center gap-2 text-slate-400 hover:text-white
              transition-colors text-sm font-semibold"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </button>

          <div className="flex items-center gap-3">
            <span className="text-slate-500 text-xs font-semibold hidden sm:block">
              {isNew ? 'New Project' : 'Editing Project'}
            </span>
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-xl border border-slate-700 text-slate-400
                hover:text-white hover:border-slate-600 text-sm font-semibold transition-all"
            >
              Cancel
            </button>
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(234,88,12,0.4)' }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2 rounded-xl
                bg-gradient-to-r from-orange-600 to-red-600
                text-white font-bold text-sm shadow-[0_0_14px_rgba(234,88,12,0.2)]"
            >
              <Save size={15} />
              {isNew ? 'Create Project' : 'Save Changes'}
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 pb-20">

        {/* ── Behance-style: Cover Image Hero ── */}
        <div className="mt-8 mb-8">
          <div className="relative w-full rounded-2xl overflow-hidden border border-slate-800
            group" style={{ aspectRatio: '21/8', background: '#0f172a' }}>
            {draft.image ? (
              <img
                src={draft.image}
                alt="Cover"
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-slate-700">
                <ImageIcon size={48} />
                <span className="text-sm font-semibold">Add a cover image URL below</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </div>

          {/* Cover URL */}
          <div className="mt-3 flex gap-3 items-center">
            <ImageIcon size={14} className="text-slate-500 flex-shrink-0" />
            <input
              type="url"
              value={draft.image}
              onChange={(e) => set('image', e.target.value)}
              placeholder="Cover image URL (e.g. https://images.unsplash.com/...)"
              className={`${inputCls} flex-1 text-xs py-2.5`}
            />
          </div>
          
          {/* Vertical Video URL */}
          {draft.category === 'video' && (
            <div className="mt-3 flex gap-3 items-center">
              <span className="text-slate-500 flex-shrink-0 text-xs font-bold w-4 flex justify-center">▶</span>
              <input
                type="url"
                value={draft.videoUrl || ''}
                onChange={(e) => set('videoUrl', e.target.value)}
                placeholder="Vertical Video URL (.mp4) (e.g. https://domain.com/video.mp4)"
                className={`${inputCls} flex-1 text-xs py-2.5 border-orange-500/30`}
              />
            </div>
          )}
        </div>

        {/* ── Behance-style: Large editable title ── */}
        <div className="mb-10">
          <input
            type="text"
            value={draft.title}
            onChange={(e) => set('title', e.target.value)}
            placeholder="Project Title"
            className="w-full bg-transparent text-white font-black text-4xl md:text-5xl
              tracking-tight placeholder-slate-700 focus:outline-none border-b-2
              border-slate-800 focus:border-orange-500/40 pb-3 transition-colors"
          />
        </div>

        {/* ── Two-column Behance layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT — main content (2/3) */}
          <div className="lg:col-span-2 space-y-8">

            {/* Overview */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
              <h2 className="text-xs font-bold text-slate-500 tracking-[0.2em] uppercase mb-5">
                Project Overview
              </h2>
              <Field label="">
                <textarea
                  value={draft.overview}
                  onChange={(e) => set('overview', e.target.value)}
                  rows={5}
                  placeholder="Describe the project — what it was, why it mattered, and how you approached it..."
                  className={`${inputCls} resize-none`}
                />
              </Field>
            </section>

            {/* Deliverables */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
              <h2 className="text-xs font-bold text-slate-500 tracking-[0.2em] uppercase mb-5">
                Deliverables
              </h2>
              <DynamicList
                items={draft.deliverables}
                onChange={(v) => set('deliverables', v)}
                placeholder="e.g. Brand guidelines PDF..."
              />
            </section>

            {/* Gallery */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
              <h2 className="text-xs font-bold text-slate-500 tracking-[0.2em] uppercase mb-5">
                Gallery Images
              </h2>
              <GalleryEditor
                images={draft.gallery}
                onChange={(v) => set('gallery', v)}
              />
            </section>

          </div>

          {/* RIGHT — metadata sidebar (1/3) */}
          <div className="space-y-5">

            {/* Project Details */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
              <h2 className="text-xs font-bold text-slate-500 tracking-[0.2em] uppercase">
                Project Details
              </h2>

              <Field label="Client">
                <input type="text" value={draft.client}
                  onChange={(e) => set('client', e.target.value)}
                  placeholder="Client or company name"
                  className={inputCls} />
              </Field>

              <Field label="Year">
                <input type="text" value={draft.year}
                  onChange={(e) => set('year', e.target.value)}
                  placeholder="2025"
                  className={inputCls} />
              </Field>

              <Field label="Category">
                <select
                  value={draft.category}
                  onChange={(e) => set('category', e.target.value)}
                  className={`${inputCls} cursor-pointer appearance-none`}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c} className="bg-slate-900 capitalize">{c}</option>
                  ))}
                </select>
              </Field>
            </section>

            {/* Tags */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-xs font-bold text-slate-500 tracking-[0.2em] uppercase">
                Tags
              </h2>
              <TagInput
                tags={draft.tags}
                onChange={(v) => set('tags', v)}
                placeholder="Add tag, press Enter"
              />
            </section>

            {/* Tools */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-xs font-bold text-slate-500 tracking-[0.2em] uppercase">
                Tools Used
              </h2>
              <TagInput
                tags={draft.tools}
                onChange={(v) => set('tools', v)}
                placeholder="Add tool, press Enter"
              />
            </section>

            {/* Results */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-xs font-bold text-slate-500 tracking-[0.2em] uppercase">
                Results / Metrics
              </h2>
              <ResultsList
                results={draft.results}
                onChange={(v) => set('results', v)}
              />
            </section>

          </div>
        </div>
      </div>

      <Toast msg={toast} />
    </div>
  );
}
