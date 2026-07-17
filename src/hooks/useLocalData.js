import { useState } from 'react';
import { mockProjects } from '../data';

// ─── Default English service items (mirrors translations.en.services.items) ──
const defaultServices = [
  { num: '01', title: 'Graphic & UI Design',       desc: "Psychology-driven layouts and visuals that capture attention and guide the user's journey.", tags: ['Visuals', 'Layouts', 'UI/UX'] },
  { num: '02', title: 'Branding & Logos',           desc: 'Memorable identities engineered to build trust and separate you from the competition.',       tags: ['Identity', 'Typography', 'Colors'] },
  { num: '03', title: 'Paid Advertising',           desc: 'High-stakes conversion campaigns built to maximize your ad spend and lead generation.',        tags: ['Google Ads', 'Meta Ads', 'ROI'] },
  { num: '04', title: 'Video & Reels',              desc: 'Short-form video content designed for virality and high engagement on social platforms.',       tags: ['Editing', 'Transitions', 'TikTok/Reels'] },
  { num: '05', title: 'ATS-Compliant CV Writing',   desc: 'Professional, keyword-optimized resumes designed to pass Applicant Tracking Systems and secure interviews.', tags: ['Resume', 'ATS', 'Career'] },
];

const PROJECTS_KEY = 'ag_portfolio_projects';
const SERVICES_KEY = 'ag_portfolio_services';

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    // Dispatch storage event so other tabs pick up changes
    window.dispatchEvent(new StorageEvent('storage', { key, newValue: JSON.stringify(value) }));
  } catch {}
}

// ─── Projects hook ────────────────────────────────────────────────────────────
export function useProjects() {
  const [projects, setProjects] = useState(() => load(PROJECTS_KEY, mockProjects));

  const persist = (list) => {
    setProjects(list);
    save(PROJECTS_KEY, list);
  };

  return {
    projects,
    setProjects: persist,
    addProject: (p) => {
      const created = { ...p, id: Date.now() };
      persist([...projects, created]);
      return created;
    },
    updateProject: (id, patch) =>
      persist(projects.map((p) => (p.id === id ? { ...p, ...patch } : p))),
    deleteProject: (id) =>
      persist(projects.filter((p) => p.id !== id)),
  };
}

// ─── Services hook ────────────────────────────────────────────────────────────
export function useServices() {
  const [services, setServices] = useState(() => load(SERVICES_KEY, defaultServices));

  const persist = (list) => {
    setServices(list);
    save(SERVICES_KEY, list);
  };

  const renum = (list) =>
    list.map((s, i) => ({ ...s, num: String(i + 1).padStart(2, '0') }));

  return {
    services,
    setServices: persist,
    addService:    (s)          => persist(renum([...services, { ...s }])),
    updateService: (idx, patch) => persist(services.map((s, i) => (i === idx ? { ...s, ...patch } : s))),
    deleteService: (idx)        => persist(renum(services.filter((_, i) => i !== idx))),
  };
}
