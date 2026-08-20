import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { SocialIcon } from '../ui/SocialIcon';
import { Plus, Trash2, Save, Check, X, Share2 } from 'lucide-react';

export const SocialsManager = () => {
  const { data, updateSocials, addToast } = useData();

  // Local state for smooth editing
  const [socialList, setSocialList] = useState([]);

  useEffect(() => {
    if (data.socials) {
      setSocialList(data.socials);
    }
  }, [data.socials]);

  const [newSocial, setNewSocial] = useState({
    name: '',
    url: '',
    icon: 'globe',
  });

  const [isAdding, setIsAdding] = useState(false);

  const handleToggle = (id) => {
    setSocialList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const handleUrlChange = (id, newUrl) => {
    setSocialList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, url: newUrl } : s))
    );
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newSocial.name.trim() || !newSocial.url.trim()) return;

    const newItem = {
      id: `soc-${Date.now()}`,
      name: newSocial.name.trim(),
      url: newSocial.url.trim(),
      icon: newSocial.icon || newSocial.name.toLowerCase(),
      enabled: true,
    };

    setSocialList((prev) => [...prev, newItem]);
    setNewSocial({ name: '', url: '', icon: 'globe' });
    setIsAdding(false);
    addToast(`Added "${newItem.name}". Click "Save Social Links" to apply.`, 'info');
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      setSocialList((prev) => prev.filter((s) => s.id !== id));
      addToast(`Removed "${name}". Click "Save Social Links" to apply.`, 'info');
    }
  };

  const handleSaveAll = (e) => {
    e.preventDefault();
    updateSocials(socialList);
  };

  return (
    <form onSubmit={handleSaveAll} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h4 className="text-base font-heading font-bold text-white flex items-center gap-2">
            <Share2 className="w-5 h-5 text-accent-mint" />
            <span>Social Media Profiles</span>
          </h4>
          <p className="text-xs text-slate-400">
            Edit URLs and toggle platforms visible in Hero and Contact sections
          </p>
        </div>

        {!isAdding && (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-accent-mint text-slate-950 hover:bg-[#72ffe0] transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add Social Link</span>
          </button>
        )}
      </div>

      {/* Add New Channel Form */}
      {isAdding && (
        <div className="bg-slate-900/90 border border-accent-mint/30 rounded-xl p-4 space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-accent-mint">
              Add New Social Platform
            </span>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                Platform Name
              </label>
              <input
                type="text"
                required
                value={newSocial.name}
                onChange={(e) =>
                  setNewSocial({
                    ...newSocial,
                    name: e.target.value,
                    icon: e.target.value.toLowerCase(),
                  })
                }
                placeholder="e.g. Telegram, YouTube, Twitter"
                className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-accent-mint"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                URL / Link
              </label>
              <input
                type="text"
                required
                value={newSocial.url}
                onChange={(e) => setNewSocial({ ...newSocial, url: e.target.value })}
                placeholder="https://t.me/... or https://..."
                className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-accent-mint"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-white hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAddSubmit}
              className="px-4 py-1.5 rounded-lg text-xs font-mono font-bold bg-accent-mint text-slate-950 hover:bg-[#72ffe0]"
            >
              Add to List
            </button>
          </div>
        </div>
      )}

      {/* Social List */}
      <div className="space-y-3">
        {socialList.map((soc) => (
          <div
            key={soc.id || soc.name}
            className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border transition-all gap-4 ${
              soc.enabled !== false
                ? 'bg-slate-900/60 border-slate-800'
                : 'bg-slate-950/40 border-slate-800/40 opacity-60'
            }`}
          >
            <div className="flex items-center gap-3 sm:w-1/3">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-accent-mint shrink-0">
                <SocialIcon name={soc.icon || soc.name} className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-heading font-bold text-white text-sm">{soc.name}</h5>
                <span className="text-[10px] font-mono text-slate-500">
                  {soc.enabled !== false ? 'Active' : 'Hidden'}
                </span>
              </div>
            </div>

            <div className="flex-1">
              <input
                type="text"
                value={soc.url}
                onChange={(e) => handleUrlChange(soc.id, e.target.value)}
                placeholder="https://..."
                className="w-full bg-[#0d1117] border border-slate-700 focus:border-accent-mint rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <label className="flex items-center gap-1.5 text-xs font-mono text-slate-400 cursor-pointer mr-2 select-none">
                <input
                  type="checkbox"
                  checked={soc.enabled !== false}
                  onChange={() => handleToggle(soc.id)}
                  className="rounded bg-slate-900 border-slate-700 text-accent-mint focus:ring-0"
                />
                <span>Visible</span>
              </label>

              <button
                type="button"
                onClick={() => handleDelete(soc.id, soc.name)}
                className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Prominent Save Button */}
      <div className="flex justify-end sticky bottom-0 bg-[#121721] pt-4 pb-2 border-t border-slate-800">
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-heading font-bold text-sm bg-accent-mint text-slate-950 hover:bg-[#72ffe0] transition-all shadow-lg shadow-accent-mint/20 hover:shadow-accent-mint/40"
        >
          <Save className="w-4 h-4" />
          <span>Save Social Links</span>
        </button>
      </div>
    </form>
  );
};
