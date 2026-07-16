import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, ImageOff, Tag } from 'lucide-react';

const categoryColors = {
  branding: 'bg-purple-500/15 text-purple-400 border-purple-500/20',
  logos:    'bg-blue-500/15   text-blue-400   border-blue-500/20',
  social:   'bg-pink-500/15   text-pink-400   border-pink-500/20',
  video:    'bg-red-500/15    text-red-400    border-red-500/20',
  campaign: 'bg-amber-500/15  text-amber-400  border-amber-500/20',
  default:  'bg-slate-500/15  text-slate-400  border-slate-500/20',
};

function getCategoryColor(cat) {
  return categoryColors[cat] || categoryColors.default;
}

export default function ProjectsPanel({ projects, onEdit, onDelete, onAdd }) {
  const handleDelete = (e, project) => {
    e.stopPropagation();
    if (window.confirm(`Delete "${project.title}"? This cannot be undone.`)) {
      onDelete(project.id);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-white">Projects</h1>
          <p className="text-slate-500 text-sm mt-0.5">{projects.length} project{projects.length !== 1 ? 's' : ''} total</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(234,88,12,0.35)' }}
          whileTap={{ scale: 0.96 }}
          onClick={onAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl
            bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold text-sm
            shadow-[0_0_14px_rgba(234,88,12,0.25)] transition-all"
        >
          <Plus size={16} />
          Add New Project
        </motion.button>
      </div>

      {/* Behance-style grid */}
      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <ImageOff size={48} className="text-slate-700 mb-4" />
          <p className="text-slate-500 font-semibold">No projects yet</p>
          <p className="text-slate-600 text-sm mt-1">Click "Add New Project" to get started</p>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
        >
          <AnimatePresence>
            {projects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{   opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-slate-900 border border-slate-800 rounded-2xl
                  overflow-hidden cursor-pointer hover:border-slate-700 transition-all duration-300"
                onClick={() => onEdit(project)}
              >
                {/* Thumbnail */}
                <div className="aspect-[16/10] overflow-hidden bg-slate-800 relative">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageOff size={32} className="text-slate-600" />
                    </div>
                  )}

                  {/* Hover overlay with actions */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100
                    transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); onEdit(project); }}
                      className="flex items-center gap-1.5 px-4 py-2 bg-white text-black
                        rounded-full text-xs font-bold hover:bg-orange-500 hover:text-white transition-colors"
                    >
                      <Pencil size={12} />
                      Edit
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, project)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-red-600 text-white
                        rounded-full text-xs font-bold hover:bg-red-500 transition-colors"
                    >
                      <Trash2 size={12} />
                      Delete
                    </button>
                  </div>
                </div>

                {/* Card info */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-white font-bold text-sm leading-snug line-clamp-2 flex-1">
                      {project.title || <span className="text-slate-500 italic">Untitled</span>}
                    </h3>
                    <span className={`flex-shrink-0 text-[0.6rem] font-bold px-2 py-0.5 rounded-full
                      border ${getCategoryColor(project.category)}`}>
                      {project.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-xs">
                    <Tag size={10} />
                    <span>{project.tags?.slice(0, 2).join(', ') || '—'}</span>
                    {project.year && <span className="ml-auto">{project.year}</span>}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
