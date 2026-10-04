import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Trash2, Edit2, GraduationCap, Check, X, Calendar, CheckCircle2, Clock } from 'lucide-react';

export const EducationManager = () => {
  const { data, updateEducation, addEducation, deleteEducation } = useData();
  const educationList = data.education || [];

  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const initialForm = {
    institution: '',
    degree_en: '',
    degree_uz: '',
    period_en: '',
    period_uz: '',
    status: 'completed', // 'completed' | 'ongoing'
    desc_en: '',
    desc_uz: '',
  };

  const [form, setForm] = useState(initialForm);

  const handleStartAdd = () => {
    setForm(initialForm);
    setEditingId(null);
    setIsAdding(true);
  };

  const handleStartEdit = (edu) => {
    setEditingId(edu.id);
    setIsAdding(false);
    setForm({
      institution: edu.institution || '',
      degree_en: edu.degree?.en || '',
      degree_uz: edu.degree?.uz || '',
      period_en: edu.period?.en || '',
      period_uz: edu.period?.uz || '',
      status: edu.status || 'completed',
      desc_en: edu.description?.en || '',
      desc_uz: edu.description?.uz || '',
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.institution.trim()) return;

    const eduData = {
      institution: form.institution,
      degree: { en: form.degree_en, uz: form.degree_uz },
      period: { en: form.period_en, uz: form.period_uz },
      status: form.status,
      description: { en: form.desc_en, uz: form.desc_uz },
    };

    if (isAdding) {
      addEducation(eduData);
    } else if (editingId) {
      const updated = educationList.map((edu) => (edu.id === editingId ? { ...edu, ...eduData } : edu));
      updateEducation(updated);
    }

    handleCancel();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h4 className="text-base font-heading font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-accent-cyan" />
            <span>Ta'lim & Akademik Darajalar</span>
          </h4>
          <p className="text-xs text-slate-400">Jami {educationList.length} ta o'quv maskani kiritilgan</p>
        </div>

        {!isAdding && !editingId && (
          <button
            onClick={handleStartAdd}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-accent-cyan text-slate-950 hover:bg-[#50c8ff] transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Yangi Ta'lim Qo'shish</span>
          </button>
        )}
      </div>

      {/* Form */}
      {(isAdding || editingId) && (
        <form onSubmit={handleSave} className="bg-slate-900/90 border border-accent-cyan/30 rounded-xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-sm font-heading font-bold text-accent-cyan">
              {isAdding ? "Yangi Ta'lim Maskani Qo'shish" : "Ta'lim Ma'lumotini Tahrirlash"}
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
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-mono text-slate-400 mb-1">O'quv Maskani / Universitet *</label>
              <input
                type="text"
                required
                value={form.institution}
                onChange={(e) => setForm({ ...form, institution: e.target.value })}
                placeholder="e.g. Namangan Davlat Universiteti (NamSU)"
                className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-accent-cyan"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">Ta'lim Holati *</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-accent-cyan"
              >
                <option value="ongoing">🟢 Hozirda o'qimoqda (Active)</option>
                <option value="completed">✓ Bitirgan / Tugatgan (Completed)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">Yo'nalish / Yutuq (English)</label>
              <input
                type="text"
                value={form.degree_en}
                onChange={(e) => setForm({ ...form, degree_en: e.target.value })}
                placeholder="Bachelor of Software Engineering"
                className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-accent-cyan"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">Yo'nalish / Yutuq (Uzbek)</label>
              <input
                type="text"
                value={form.degree_uz}
                onChange={(e) => setForm({ ...form, degree_uz: e.target.value })}
                placeholder="Dasturiy Injiniring (Bakalavr)"
                className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-accent-cyan"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">Yillar / Davr (English)</label>
              <input
                type="text"
                value={form.period_en}
                onChange={(e) => setForm({ ...form, period_en: e.target.value })}
                placeholder="2021 — 2025 (or 2023 — Present)"
                className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-accent-cyan"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">Yillar / Davr (Uzbek)</label>
              <input
                type="text"
                value={form.period_uz}
                onChange={(e) => setForm({ ...form, period_uz: e.target.value })}
                placeholder="2021 — 2025 (yoki 2023 — Hozirgacha)"
                className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-accent-cyan"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">Tavsif (English)</label>
              <textarea
                rows={3}
                value={form.desc_en}
                onChange={(e) => setForm({ ...form, desc_en: e.target.value })}
                placeholder="Studied Computer Science..."
                className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-accent-cyan resize-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">Tavsif (Uzbek)</label>
              <textarea
                rows={3}
                value={form.desc_uz}
                onChange={(e) => setForm({ ...form, desc_uz: e.target.value })}
                placeholder="O'quv maskanidagi ta'lim va o'rganilgan bilimlar..."
                className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-accent-cyan resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-white hover:bg-slate-800"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg text-xs font-mono font-bold bg-accent-cyan text-slate-950 hover:bg-[#50c8ff]"
            >
              {isAdding ? "Ta'lim Qo'shish" : "Saqlash"}
            </button>
          </div>
        </form>
      )}

      {/* Education List */}
      <div className="space-y-3">
        {educationList.map((edu) => (
          <div
            key={edu.id || edu.institution}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-900/60 border border-slate-800 gap-3"
          >
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h5 className="font-heading font-bold text-white text-sm">{edu.institution}</h5>
                <span className="text-xs font-mono text-accent-cyan">({edu.period?.en || edu.period?.uz})</span>
                {edu.status === 'ongoing' ? (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Hozirda o'qimoqda</span>
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-accent-cyan" />
                    <span>Bitirgan</span>
                  </span>
                )}
              </div>
              <p className="text-xs font-mono text-slate-400 mt-1">{edu.degree?.en || edu.degree?.uz}</p>
            </div>

            <div className="flex items-center gap-1.5 self-end sm:self-center">
              <button
                onClick={() => handleStartEdit(edu)}
                className="p-1.5 text-slate-400 hover:text-accent-amber hover:bg-slate-800 rounded-lg"
                title="Tahrirlash"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`"${edu.institution}" ta'lim ma'lumotini o'chirmoqchimisiz?`)) {
                    deleteEducation(edu.id);
                  }
                }}
                className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg"
                title="O'chirish"
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
