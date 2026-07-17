import { useState } from 'react';
import AdminLogin      from './AdminLogin';
import AdminSidebar    from './AdminSidebar';
import ProjectsPanel   from './ProjectsPanel';
import ProjectEditor   from './ProjectEditor';
import ServicesPanel   from './ServicesPanel';
import { useProjects, useServices } from '../../hooks/useLocalData';

const CREDENTIALS = { username: 'aterawi', password: 'Ter@w!98' };

export default function AdminApp({ onExit }) {
  const [isAuth, setIsAuth] = useState(
    () => sessionStorage.getItem('admin_auth') === '1'
  );
  const [panel,          setPanel]          = useState('projects'); // 'projects' | 'services'
  const [editingProject, setEditingProject] = useState(null);       // null = list, object = editor

  const { projects, addProject, updateProject, deleteProject } = useProjects();
  const { services, addService, updateService, deleteService }  = useServices();

  /* ── Auth ─────────────────────────────────────────────────────────────── */
  const login = (username, password) => {
    if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
      sessionStorage.setItem('admin_auth', '1');
      setIsAuth(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsAuth(false);
  };

  /* ── Project save handler ─────────────────────────────────────────────── */
  const handleProjectSave = (data) => {
    if (data.id) {
      updateProject(data.id, data);
    } else {
      addProject(data);
    }
    setEditingProject(null);
  };

  /* ── Render ───────────────────────────────────────────────────────────── */
  if (!isAuth) return <AdminLogin onLogin={login} />;

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar
        active={panel}
        onChange={(p) => { setPanel(p); setEditingProject(null); }}
        onLogout={logout}
        onViewPortfolio={onExit}
      />

      {/* Main scroll area */}
      <main className="flex-1 overflow-y-auto bg-slate-950">
        {editingProject !== null ? (
          <ProjectEditor
            project={editingProject.isNew ? null : editingProject}
            onSave={handleProjectSave}
            onCancel={() => setEditingProject(null)}
          />
        ) : panel === 'projects' ? (
          <ProjectsPanel
            projects={projects}
            onEdit={(project) => setEditingProject(project)}
            onDelete={deleteProject}
            onAdd={() => setEditingProject({ isNew: true })}
          />
        ) : (
          <ServicesPanel
            services={services}
            onAdd={addService}
            onUpdate={updateService}
            onDelete={deleteService}
          />
        )}
      </main>
    </div>
  );
}
