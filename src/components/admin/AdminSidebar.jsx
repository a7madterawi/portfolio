import { Briefcase, Layers, LogOut, ExternalLink, LayoutGrid, ChevronRight } from 'lucide-react';

const navItems = [
  { id: 'projects',  label: 'Projects',  Icon: LayoutGrid },
  { id: 'services',  label: 'Services',  Icon: Layers },
];

export default function AdminSidebar({ active, onChange, onLogout, onViewPortfolio }) {
  return (
    <aside className="w-64 flex-shrink-0 h-screen flex flex-col bg-slate-900 border-r border-slate-800/60 sticky top-0">

      {/* Brand */}
      <div className="px-6 pt-8 pb-6 border-b border-slate-800/60">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-red-700
            flex items-center justify-center text-lg font-black text-white
            shadow-[0_0_16px_rgba(234,88,12,0.35)]">
            A
          </div>
          <div>
            <p className="font-black text-white text-sm leading-tight">Ahmed Abdullah</p>
            <p className="text-orange-500 text-[0.65rem] font-bold tracking-wider uppercase">CMS Admin</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1">
        <p className="px-3 text-[0.6rem] font-bold text-slate-600 tracking-[0.2em] uppercase mb-3">
          Content
        </p>
        {navItems.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold
                transition-all duration-200 group
                ${isActive
                  ? 'bg-orange-500/15 text-orange-400 border border-orange-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'}`}
            >
              <Icon size={16} className={isActive ? 'text-orange-400' : 'text-slate-500 group-hover:text-slate-300'} />
              {label}
              {isActive && <ChevronRight size={14} className="ml-auto text-orange-500/60" />}
            </button>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="px-3 pb-6 space-y-1 border-t border-slate-800/60 pt-4">
        <button
          onClick={onViewPortfolio}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold
            text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all group"
        >
          <ExternalLink size={16} className="text-slate-500 group-hover:text-slate-300" />
          View Portfolio
        </button>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold
            text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all group"
        >
          <LogOut size={16} className="group-hover:text-red-400" />
          Logout
        </button>
      </div>
    </aside>
  );
}
