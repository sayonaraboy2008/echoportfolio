import React, { useState, useRef } from 'react';
import { useData } from '../../context/DataContext';
import { GithubIcon } from '../ui/SocialIcon';
import { Plus, Edit2, Trash2, ExternalLink, Sparkles, Check, X, Image as ImageIcon, Upload, Camera, Loader2 } from 'lucide-react';

export const ProjectsManager = () => {
  const { data, addProject, updateProject, deleteProject, addToast } = useData();
  const projects = data.projects || [];

  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

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

  // Helper: Compress image file via HTML Canvas before saving Data URL
  const compressImageFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxWidth = 900;
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
          resolve(compressedDataUrl);
        };
        img.onerror = (err) => reject(err);
        img.src = e.target.result;
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  // Handle local file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      if (addToast) addToast('Faqat rasm fayli tanlashingiz mumkin (PNG, JPG, WEBP)!', 'error');
      return;
    }

    setIsUploading(true);
    try {
      const compressedUrl = await compressImageFile(file);
      setForm((prev) => ({ ...prev, image: compressedUrl }));
      if (addToast) addToast('Kompyuterdan rasm muvaffaqiyatli yuklandi va optimallashtirildi!', 'success');
    } catch (err) {
      console.error('File upload error:', err);
      if (addToast) addToast('Rasm faylini o\'qishda xatolik yuz berdi', 'error');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Handle auto screenshot capture from Live Demo URL (Free open APIs: Microlink & WP mShots)
  const handleAutoScreenshot = async (engine = 'microlink') => {
    const targetUrl = form.demoUrl?.trim();
    if (!targetUrl || targetUrl === 'https://' || !targetUrl.startsWith('http')) {
      if (addToast) addToast('Iltimos, avval Live Demo URL maydoniga to\'g\'ri sayt havolasini kiriting! (masalan: https://example.com)', 'error');
      return;
    }

    setIsCapturing(true);
    try {
      let screenshotUrl = '';
      if (engine === 'wpshots') {
        // WordPress mShots (100% free open API)
        screenshotUrl = `https://s0.wp.com/mshots/v1/${encodeURIComponent(targetUrl)}?w=1200`;
      } else {
        // Microlink API (High resolution free screenshot embed)
        screenshotUrl = `https://api.microlink.io/?url=${encodeURIComponent(targetUrl)}&screenshot=true&embed=screenshot.url`;
      }

      setForm((prev) => ({ ...prev, image: screenshotUrl }));
      if (addToast) addToast('Saytdan avtomatik skrinshot olindi va rasmga o\'rnatildi!', 'success');
    } catch (err) {
      console.error('Screenshot error:', err);
      if (addToast) addToast('Skrinshot olishda xatolik yuz berdi', 'error');
    } finally {
      setIsCapturing(false);
    }
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

          {/* Enhanced Image & Screenshot Section */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-accent-mint" />
                <span>Loyiha Rasmi / Skrinshoti</span>
              </label>
              <span className="text-[11px] text-slate-500 font-mono">Yuklash, URL yoki Avto-skrinshot</span>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-start">
              {/* Image Preview Thumbnail */}
              <div className="relative w-full md:w-44 h-28 rounded-lg bg-slate-900 border border-slate-700 overflow-hidden shrink-0 group flex items-center justify-center">
                {form.image ? (
                  <img
                    src={form.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://picsum.photos/seed/error/400/250';
                    }}
                  />
                ) : (
                  <div className="text-center p-2 text-slate-500 text-xs">Rasm mavjud emas</div>
                )}
                {isCapturing && (
                  <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center gap-1 text-accent-mint">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="text-[10px] font-mono">Skrinshot olinmoqda...</span>
                  </div>
                )}
              </div>

              {/* Upload & Capture Buttons + URL input */}
              <div className="flex-1 w-full space-y-2.5">
                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* File Upload Button */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    disabled={isUploading || isCapturing}
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white transition-all border border-slate-700 disabled:opacity-50"
                  >
                    {isUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5 text-accent-cyan" />}
                    <span>Kompyuterdan rasm yuklash</span>
                  </button>

                  {/* Auto Screenshot Buttons */}
                  <button
                    type="button"
                    disabled={isCapturing || isUploading}
                    onClick={() => handleAutoScreenshot('microlink')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-indigo-950/80 text-indigo-200 hover:bg-indigo-900 transition-all border border-indigo-700/50 disabled:opacity-50"
                  >
                    {isCapturing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Camera className="w-3.5 h-3.5 text-indigo-400" />}
                    <span>📸 HD Skrinshot (Microlink)</span>
                  </button>

                  <button
                    type="button"
                    disabled={isCapturing || isUploading}
                    onClick={() => handleAutoScreenshot('wpshots')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-cyan-950/80 text-cyan-200 hover:bg-cyan-900 transition-all border border-cyan-700/50 disabled:opacity-50"
                  >
                    {isCapturing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Camera className="w-3.5 h-3.5 text-cyan-400" />}
                    <span>⚡ WP mShots Skrinshot</span>
                  </button>
                </div>

                {/* Direct Image URL input */}
                <div>
                  <input
                    type="text"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    placeholder="https://... yoki base64 rasm kodi"
                    className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-accent-mint"
                  />
                </div>

                {/* Preset image suggestions */}
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono flex-wrap">
                  <span>Tayyor rasm vizual topshiriqlar:</span>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80' })}
                    className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                  >
                    Code Editor
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80' })}
                    className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                  >
                    Dashboard UI
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80' })}
                    className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                  >
                    Cyber/Matrix
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Live Demo URL (Skrinshot uchun zarur)</label>
              <input
                type="text"
                value={form.demoUrl}
                onChange={(e) => setForm({ ...form, demoUrl: e.target.value })}
                placeholder="https://..."
                className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-accent-mint"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
