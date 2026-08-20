import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Trash2, Edit2, Briefcase, Check, X } from 'lucide-react';

export const ExperienceManager = () => {
  const { data, updateExperience, addExperience, deleteExperience } = useData();
  const experiences = data.experience || [];

  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const initialForm = {
    role_en: '',
    role_uz: '',
    company: '',
    period_en: '',
    period_uz: '',
    desc_en: '',
    desc_uz: '',
    points_en: '',
    points_uz: '',
  };

  const [form, setForm] = useState(initialForm);

  const handleStartAdd = () => {
    setForm(initialForm);
    setEditingId(null);
    setIsAdding(true);
  };

  const handleStartEdit = (exp) => {
    setEditingId(exp.id);
    setIsAdding(false);
    setForm({
      role_en: exp.role?.en || '',
      role_uz: exp.role?.uz || '',
      company: exp.company || '',
      period_en: exp.period?.en || '',
      period_uz: exp.period?.uz || '',
      desc_en: exp.description?.en || '',
      desc_uz: exp.description?.uz || '',
      points_en: Array.isArray(exp.points?.en || exp.points) ? (exp.points?.en || exp.points).join('\n') : '',
      points_uz: Array.isArray(exp.points?.uz) ? exp.points.uz.join('\n') : '',
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.company.trim()) return;

    const pointsEnArray = form.points_en.split('\n').map((p) => p.trim()).filter(Boolean);
    const pointsUzArray = form.points_uz.split('\n').map((p) => p.trim()).filter(Boolean);

    const expData = {
      role: { en: form.role_en, uz: form.role_uz },
      company: form.company,
      period: { en: form.period_en, uz: form.period_uz },
      description: { en: form.desc_en, uz: form.desc_uz },
      points: { en: pointsEnArray, uz: pointsUzArray },
    };

    if (isAdding) {
      addExperience(expData);
    } else if (editingId) {
      const updated = experiences.map((exp) => (exp.id === editingId ? { ...exp, ...expData } : exp));
      updateExperience(updated);
    }

    handleCancel();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h4 className="text-base font-heading font-bold text-white">Experience & Career</h4>
          <p className="text-xs text-slate-400">Total {experiences.length} career milestones</p>
        </div>

        {!isAdding && !editingId && (
          <button
            onClick={handleStartAdd}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-accent-mint text-slate-950 hover:bg-[#72ffe0] transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add Experience</span>
          </button>
        )}
      </div>

      {/* Form */}
      {(isAdding || editingId) && (
        <form onSubmit={handleSave} className="bg-slate-900/90 border border-accent-mint/30 rounded-xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-sm font-heading font-bold text-accent-mint">
              {isAdding ? 'Add Career Milestone' : 'Edit Career Milestone'}
            </span>
            <button
              type="button"
              onClick={handleCancel}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">Company / Organization *</label>
              <input
                type="text"
                required
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="e.g. Chust IT Serves"
                className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-accent-mint"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">Role (English)</label>
              <input
                type="text"
                value={form.role_en}
                onChange={(e) => setForm({ ...form, role_en: e.target.value })}
                placeholder="e.g. Front-End Mentor"
                className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-accent-mint"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">Role (Uzbek)</label>
              <input
                type="text"
                value={form.role_uz}
                onChange={(e) => setForm({ ...form, role_uz: e.target.value })}
                placeholder="Front-End Mentor & Dasturchi"
                className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-accent-mint"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">Period (English)</label>
              <input
                type="text"
                value={form.period_en}
                onChange={(e) => setForm({ ...form, period_en: e.target.value })}
                placeholder="Jan 2025 — Present"
                className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-accent-mint"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">Period (Uzbek)</label>
              <input
                type="text"
                value={form.period_uz}
                onChange={(e) => setForm({ ...form, period_uz: e.target.value })}
                placeholder="Yanvar 2025 — Hozirgacha"
                className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-accent-mint"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">Key Points (EN - one per line)</label>
              <textarea
                rows={3}
                value={form.points_en}
                onChange={(e) => setForm({ ...form, points_en: e.target.value })}
                placeholder="Point 1&#10;Point 2&#10;Point 3"
                className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-accent-mint resize-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">Key Points (UZ - one per line)</label>
              <textarea
                rows={3}
                value={form.points_uz}
                onChange={(e) => setForm({ ...form, points_uz: e.target.value })}
                placeholder="1-band&#10;2-band&#10;3-band"
                className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-accent-mint resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-white hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg text-xs font-mono font-bold bg-accent-mint text-slate-950 hover:bg-[#72ffe0]"
            >
              {isAdding ? 'Add Milestone' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}

      {/* Experience List */}
      <div className="space-y-3">
        {experiences.map((exp) => (
          <div
            key={exp.id || exp.company}
            className="flex items-center justify-between p-4 rounded-xl bg-slate-900/60 border border-slate-800 gap-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <h5 className="font-heading font-bold text-white text-sm">{exp.company}</h5>
                <span className="text-xs font-mono text-accent-coral">({exp.period?.en || exp.period?.uz})</span>
              </div>
              <p className="text-xs font-mono text-slate-400">{exp.role?.en || exp.role?.uz}</p>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleStartEdit(exp)}
                className="p-1.5 text-slate-400 hover:text-accent-amber hover:bg-slate-800 rounded-lg"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`Delete ${exp.company}?`)) {
                    deleteExperience(exp.id);
                  }
                }}
                className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg"
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
