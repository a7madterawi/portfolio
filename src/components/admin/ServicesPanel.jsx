import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Check, ChevronDown, ChevronUp, GripVertical, CheckCircle } from 'lucide-react';

const inputCls =
  'w-full bg-slate-800/60 border border-slate-700/80 rounded-xl px-4 py-3 text-white ' +
  'placeholder-slate-600 text-sm focus:outline-none focus:border-orange-500/50 ' +
  'focus:ring-2 focus:ring-orange-500/10 transition-all duration-200';

const emptyService = { num: '01', title: '', desc: '', tags: [] };

function TagInput({ tags, onChange }) {
  const [input, setInput] = useState('');
  const add    = (val) => { const t = val.trim(); if (t && !tags.includes(t)) onChange([...tags, t]); setInput(''); };
  const remove = (t)   => onChange(tags.filter((x) => x !== t));
  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {tags.map((t) => (
          <span key={t} className="flex items-center gap-1 px-2.5 py-1 rounded-full
            bg-orange-500/10 border border-orange-500/20 text-orange-300 text-[0.7rem] font-semibold">
            {t}
            <button onClick={() => remove(t)} className="hover:text-red-400"><X size={10} /></button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ',') && input.trim()) { e.preventDefault(); add(input); } }}
        onBlur={() => input.trim() && add(input)}
        placeholder="Add tag, press Enter"
        className={`${inputCls} text-xs py-2`}
      />
    </div>
  );
}

function ServiceCard({ service, index, onUpdate, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const [draft,    setDraft]    = useState(service);
  const [saved,    setSaved]    = useState(false);

  const save = () => {
    onUpdate(index, draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
    setExpanded(false);
  };

  const cancel = () => {
    setDraft(service);
    setExpanded(false);
  };

  return (
    <motion.div
      layout
      className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden
        hover:border-slate-700 transition-colors"
    >
      {/* Card header */}
      <div
        className="flex items-start gap-4 p-5 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="text-2xl font-black text-slate-700 flex-shrink-0 w-10 text-center mt-0.5">
          {service.num}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-bold text-sm leading-snug">
            {service.title || <span className="text-slate-500 italic">Untitled Service</span>}
          </h3>
          <p className="text-slate-500 text-xs mt-1 line-clamp-1">{service.desc}</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {service.tags.map((t) => (
              <span key={t} className="text-[0.6rem] font-bold px-2 py-0.5 rounded-full
                bg-orange-500/10 border border-orange-500/20 text-orange-400">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {saved && <CheckCircle size={14} className="text-green-400" />}
          <button
            onClick={(e) => { e.stopPropagation(); if (window.confirm(`Delete "${service.title}"?`)) onDelete(index); }}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600
              hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <Trash2 size={13} />
          </button>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500">
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </div>
        </div>
      </div>

      {/* Expanded editor */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{   height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-slate-800 pt-5 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-[0.65rem] font-bold text-slate-500 tracking-widest uppercase mb-1.5">Title</label>
                <input
                  type="text"
                  value={draft.title}
                  onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                  placeholder="Service title"
                  className={inputCls}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-[0.65rem] font-bold text-slate-500 tracking-widest uppercase mb-1.5">Description</label>
                <textarea
                  value={draft.desc}
                  onChange={(e) => setDraft({ ...draft, desc: e.target.value })}
                  rows={3}
                  placeholder="Describe this service..."
                  className={`${inputCls} resize-none`}
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-[0.65rem] font-bold text-slate-500 tracking-widest uppercase mb-1.5">Tags</label>
                <TagInput tags={draft.tags} onChange={(v) => setDraft({ ...draft, tags: v })} />
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-1">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={save}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl
                    bg-gradient-to-r from-orange-600 to-red-600 text-white
                    font-bold text-xs shadow-[0_0_10px_rgba(234,88,12,0.2)]"
                >
                  <Check size={13} /> Save Changes
                </motion.button>
                <button
                  onClick={cancel}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-slate-400
                    hover:text-white text-xs font-semibold transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ServicesPanel({ services, onAdd, onUpdate, onDelete }) {
  const [showForm, setShowForm] = useState(false);
  const [newSvc,   setNewSvc]   = useState({ ...emptyService });

  const handleAdd = () => {
    if (!newSvc.title.trim()) { alert('Please enter a service title.'); return; }
    onAdd(newSvc);
    setNewSvc({ ...emptyService });
    setShowForm(false);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-white">Services</h1>
          <p className="text-slate-500 text-sm mt-0.5">{services.length} service card{services.length !== 1 ? 's' : ''}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(234,88,12,0.35)' }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl
            bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold text-sm
            shadow-[0_0_14px_rgba(234,88,12,0.25)]"
        >
          <Plus size={16} />
          Add New Service
        </motion.button>
      </div>

      {/* Note */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-6 text-xs text-amber-300">
        <span className="font-bold flex-shrink-0">ℹ</span>
        Service edits apply to the English version of the portfolio. Arabic content is managed separately in the source translations.
      </div>

      {/* Add new form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{   opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6 overflow-hidden"
          >
            <div className="bg-slate-900 border border-orange-500/20 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-orange-400">New Service</h3>
              <div>
                <label className="block text-[0.65rem] font-bold text-slate-500 tracking-widest uppercase mb-1.5">Title</label>
                <input type="text" value={newSvc.title}
                  onChange={(e) => setNewSvc({ ...newSvc, title: e.target.value })}
                  placeholder="Service title" className={inputCls} />
              </div>
              <div>
                <label className="block text-[0.65rem] font-bold text-slate-500 tracking-widest uppercase mb-1.5">Description</label>
                <textarea rows={3} value={newSvc.desc}
                  onChange={(e) => setNewSvc({ ...newSvc, desc: e.target.value })}
                  placeholder="Describe this service..." className={`${inputCls} resize-none`} />
              </div>
              <div>
                <label className="block text-[0.65rem] font-bold text-slate-500 tracking-widest uppercase mb-1.5">Tags</label>
                <TagInput tags={newSvc.tags} onChange={(v) => setNewSvc({ ...newSvc, tags: v })} />
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={handleAdd}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl
                    bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold text-xs"
                >
                  <Plus size={13} /> Add Service
                </motion.button>
                <button onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-slate-400 text-xs font-semibold hover:text-white transition-all">
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Service list */}
      <motion.div layout className="space-y-3">
        <AnimatePresence>
          {services.map((service, idx) => (
            <motion.div
              key={`${service.num}-${service.title}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{   opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <ServiceCard
                service={service}
                index={idx}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
