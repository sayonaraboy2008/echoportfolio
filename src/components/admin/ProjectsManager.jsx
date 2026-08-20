import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { GithubIcon } from '../ui/SocialIcon';
import { Plus, Edit2, Trash2, ExternalLink, Sparkles, Check, X, Image as ImageIcon } from 'lucide-react';

export const ProjectsManager = () => {
  const { data, addProject, updateProject, deleteProject } = useData();
  const projects = data.projects || [];

  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const initialProjectForm = {
    title: '',
    badge: 'Featured',
    featured: true,
    description_en: '',
    description_uz: '',
    image: 'https://picsum.photos/seed/project/700/500',
    tags: 'React, Tailwind CSS, JavaScript',
    demoUrl: 'https://',
    codeUrl: 'https://github.com/barkamol-dev',
  };

  const [form, setForm] = useState(initialProjectForm);

  const handleStartAdd = () => {
    setForm(initialProjectForm);
    setEditingId(null);
    setIsAdding(true);
  };

  const handleStartEdit = (proj) => {
    setEditingId(proj.id);
    setIsAdding(false);
    setForm({
      title: proj.title || '',
      badge: proj.badge || '',
      featured: !!proj.featured,
      description_en: proj.description?.en || '',
      description_uz: proj.description?.uz || '',
      image: proj.image || '',
      tags: (proj.tags || []).join(', '),
      demoUrl: proj.demoUrl || '',
      codeUrl: proj.codeUrl || '',
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    const tagsArray = form.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const projectData = {
      title: form.title,
      badge: form.badge,
      featured: form.featured,
      description: {
        en: form.description_en,
        uz: form.description_uz,
      },
      image: form.image,
      tags: tagsArray,
      demoUrl: form.demoUrl,
      codeUrl: form.codeUrl,
    };

    if (isAdding) {
      addProject(projectData);
    } else if (editingId) {
      updateProject(editingId, projectData);
    }

    handleCancel();
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h4 className="text-base font-heading font-bold text-white">Projects Management</h4>
          <p className="text-xs text-slate-400">Total {projects.length} projects registered in JSON</p>
        </div>

        {!isAdding && !editingId && (
          <button
            onClick={handleStartAdd}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-accent-mint text-slate-950 hover:bg-[#72ffe0] transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Project</span>
          </button>
        )}
      </div>

      {/* Add / Edit Form Modal/Card */}
      {(isAdding || editingId) && (
        <form onSubmit={handleSave} className="bg-slate-900/90 border border-accent-mint/30 rounded-xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h5 className="text-sm font-heading font-bold text-accent-mint flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>{isAdding ? 'Create New Project' : 'Edit Project'}</span>
            </h5>
            <button
              type="button"
              onClick={handleCancel}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-mono text-slate-400 mb-1">Project Title *</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Inamjanov Shop 3D"
                className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-mint"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Badge Tag</label>
              <input
                type="text"
                value={form.badge}
                onChange={(e) => setForm({ ...form, badge: e.target.value })}
                placeholder="Featured, Interactive..."
                className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-mint"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Description (English)</label>
              <textarea
                rows={3}
                value={form.description_en}
                onChange={(e) => setForm({ ...form, description_en: e.target.value })}
                placeholder="Describe features and tech..."
                className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-accent-mint resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Description (Uzbek)</label>
              <textarea
                rows={3}
                value={form.description_uz}
                onChange={(e) => setForm({ ...form, description_uz: e.target.value })}
                placeholder="Loyiha haqida o'zbekcha tavsif..."
                className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-accent-mint resize-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Image URL</label>
              <input
                type="text"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="https://images..."
                className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-accent-mint"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Tags (Comma separated)</label>
              <input
                type="text"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                placeholder="React, Tailwind, Vite"
                className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-accent-mint"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Live Demo URL</label>
              <input
                type="text"
                value={form.demoUrl}
                onChange={(e) => setForm({ ...form, demoUrl: e.target.value })}
                placeholder="https://..."
                className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-accent-mint"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">GitHub Code URL</label>
              <input
                type="text"
                value={form.codeUrl}
                onChange={(e) => setForm({ ...form, codeUrl: e.target.value })}
                placeholder="https://github.com/..."
                className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-accent-mint"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 text-xs font-mono text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="rounded bg-slate-900 border-slate-700 text-accent-mint focus:ring-0"
              />
              <span>Mark as Featured project</span>
            </label>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 rounded-lg text-xs font-mono text-slate-400 hover:text-white hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-xs font-mono font-bold bg-accent-mint text-slate-950 hover:bg-[#72ffe0]"
              >
                <Check className="w-4 h-4" />
                <span>{isAdding ? 'Add Project' : 'Save Changes'}</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Projects List */}
      <div className="space-y-3">
        {projects.map((proj) => (
          <div
            key={proj.id || proj.title}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 gap-4 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-lg bg-slate-950 overflow-hidden shrink-0 border border-slate-800">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://picsum.photos/seed/fallback/100/100';
                  }}
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h5 className="font-heading font-bold text-white text-sm">{proj.title}</h5>
                  {proj.badge && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-accent-mint/10 text-accent-mint border border-accent-mint/20">
                      {proj.badge}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {(proj.tags || []).slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-[10px] font-mono text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              {proj.demoUrl && (
                <a
                  href={proj.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-accent-mint hover:bg-slate-800 rounded-lg"
                  title="View Live"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              <button
                onClick={() => handleStartEdit(proj)}
                className="p-2 text-slate-400 hover:text-accent-amber hover:bg-slate-800 rounded-lg"
                title="Edit Project"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`Are you sure you want to delete "${proj.title}"?`)) {
                    deleteProject(proj.id);
                  }
                }}
                className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg"
                title="Delete Project"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
