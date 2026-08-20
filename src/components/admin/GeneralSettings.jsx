import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Save, User, FileText, Bot, MapPin, Mail, Award, Check } from 'lucide-react';

export const GeneralSettings = () => {
  const { data, updateProfile } = useData();

  const [form, setForm] = useState({
    brand: data.brand || 'BarkamolDev',
    fullName: data.fullName || 'Barkamol Abduraximov',
    shortName: data.shortName || 'Barkamol',
    role_en: data.role?.en || '',
    role_uz: data.role?.uz || '',
    tagline_en: data.tagline?.en || '',
    tagline_uz: data.tagline?.uz || '',
    about_en: data.aboutText?.en || '',
    about_uz: data.aboutText?.uz || '',
    location: data.location || '',
    yearsExperience: data.yearsExperience || 3,
    projectsCompleted: data.projectsCompleted || 15,
    technologiesCount: data.technologiesCount || 14,
    email: data.email || '',
    avatarUrl: data.avatarUrl || '',
    botToken: data.telegramBot?.token || '',
    botChatId: data.telegramBot?.chatId || '',
    botEnabled: data.telegramBot?.enabled !== false,
  });

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({
      brand: form.brand,
      fullName: form.fullName,
      shortName: form.shortName,
      role: {
        en: form.role_en,
        uz: form.role_uz,
      },
      tagline: {
        en: form.tagline_en,
        uz: form.tagline_uz,
      },
      aboutText: {
        en: form.about_en,
        uz: form.about_uz,
      },
      location: form.location,
      yearsExperience: Number(form.yearsExperience),
      projectsCompleted: Number(form.projectsCompleted),
      technologiesCount: Number(form.technologiesCount),
      email: form.email,
      avatarUrl: form.avatarUrl,
      telegramBot: {
        token: form.botToken,
        chatId: form.botChatId,
        enabled: form.botEnabled,
      },
    });
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {/* Basic Identity */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-2 text-accent-mint font-heading font-bold text-base pb-2 border-b border-slate-800">
          <User className="w-5 h-5" />
          <span>Profile & Brand Identity</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Brand Name</label>
            <input
              type="text"
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
              className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-mint"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Full Name</label>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-mint"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Short / First Name</label>
            <input
              type="text"
              value={form.shortName}
              onChange={(e) => setForm({ ...form, shortName: e.target.value })}
              className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-mint"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Role (English)</label>
            <input
              type="text"
              value={form.role_en}
              onChange={(e) => setForm({ ...form, role_en: e.target.value })}
              className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-mint"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Role (Uzbek)</label>
            <input
              type="text"
              value={form.role_uz}
              onChange={(e) => setForm({ ...form, role_uz: e.target.value })}
              className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-mint"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Tagline (English)</label>
            <textarea
              rows={2}
              value={form.tagline_en}
              onChange={(e) => setForm({ ...form, tagline_en: e.target.value })}
              className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-mint resize-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Tagline (Uzbek)</label>
            <textarea
              rows={2}
              value={form.tagline_uz}
              onChange={(e) => setForm({ ...form, tagline_uz: e.target.value })}
              className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-mint resize-none"
            />
          </div>
        </div>
      </div>

      {/* About Me Details */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-2 text-accent-coral font-heading font-bold text-base pb-2 border-b border-slate-800">
          <FileText className="w-5 h-5" />
          <span>About Me Bios</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">About Text (English)</label>
            <textarea
              rows={4}
              value={form.about_en}
              onChange={(e) => setForm({ ...form, about_en: e.target.value })}
              className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-mint resize-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">About Text (Uzbek)</label>
            <textarea
              rows={4}
              value={form.about_uz}
              onChange={(e) => setForm({ ...form, about_uz: e.target.value })}
              className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-mint resize-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Location</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-mint"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Email Address</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-mint"
            />
          </div>
        </div>
      </div>

      {/* Stats Counter */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-2 text-accent-amber font-heading font-bold text-base pb-2 border-b border-slate-800">
          <Award className="w-5 h-5" />
          <span>Stats & Numbers</span>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Years Experience</label>
            <input
              type="number"
              value={form.yearsExperience}
              onChange={(e) => setForm({ ...form, yearsExperience: e.target.value })}
              className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-mint"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Projects Completed</label>
            <input
              type="number"
              value={form.projectsCompleted}
              onChange={(e) => setForm({ ...form, projectsCompleted: e.target.value })}
              className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-mint"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Technologies Count</label>
            <input
              type="number"
              value={form.technologiesCount}
              onChange={(e) => setForm({ ...form, technologiesCount: e.target.value })}
              className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-mint"
            />
          </div>
        </div>
      </div>

      {/* Telegram Bot Contact Integration */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2 text-accent-blue font-heading font-bold text-base">
            <Bot className="w-5 h-5" />
            <span>Telegram Bot Form Dispatcher</span>
          </div>
          <label className="flex items-center gap-2 text-xs font-mono text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={form.botEnabled}
              onChange={(e) => setForm({ ...form, botEnabled: e.target.checked })}
              className="rounded bg-slate-900 border-slate-700 text-accent-mint focus:ring-0"
            />
            <span>Enable Bot</span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Bot Token</label>
            <input
              type="text"
              value={form.botToken}
              onChange={(e) => setForm({ ...form, botToken: e.target.value })}
              placeholder="e.g. 123456789:ABCDef..."
              className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-accent-mint"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Chat ID or @channel</label>
            <input
              type="text"
              value={form.botChatId}
              onChange={(e) => setForm({ ...form, botChatId: e.target.value })}
              placeholder="e.g. @messagesfromu or 12345678"
              className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-accent-mint"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end sticky bottom-0 bg-[#121721] pt-4 pb-2 border-t border-slate-800">
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-heading font-bold text-sm bg-accent-mint text-slate-950 hover:bg-[#72ffe0] transition-all shadow-md shadow-accent-mint/20"
        >
          <Save className="w-4 h-4" />
          <span>Save Profile Changes</span>
        </button>
      </div>
    </form>
  );
};
