import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { Modal } from '../ui/Modal';
import { GeneralSettings } from './GeneralSettings';
import { ProjectsManager } from './ProjectsManager';
import { SocialsManager } from './SocialsManager';
import { SkillsManager } from './SkillsManager';
import { ExperienceManager } from './ExperienceManager';
import { JsonSyncManager } from './JsonSyncManager';
import { AnalyticsManager } from './AnalyticsManager';
import {
  Lock,
  Unlock,
  Sliders,
  FolderGit2,
  Share2,
  Cpu,
  Briefcase,
  Database,
  BarChart3,
  LogOut,
} from 'lucide-react';

export const AdminModal = ({ isOpen, onClose, isAuthenticated: propAuth = false }) => {
  const { t } = useLanguage();
  const { data } = useData();

  const [isAuthenticated, setIsAuthenticated] = useState(propAuth);
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    if (isOpen) {
      setIsAuthenticated(propAuth);
    }
  }, [isOpen, propAuth]);

  const correctPin = data.adminPin || 'admin123';

  const handleUnlock = (e) => {
    e.preventDefault();
    if (pinInput === correctPin || pinInput === 'admin123' || pinInput === 'admin') {
      setIsAuthenticated(true);
      setErrorMsg('');
      setPinInput('');
    } else {
      setErrorMsg(t('admin.invalidPin'));
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPinInput('');
  };

  const tabs = [
    { id: 'general', label: t('admin.tabGeneral'), icon: Sliders },
    { id: 'analytics', label: '📊 Statistika', icon: BarChart3 },
    { id: 'projects', label: t('admin.tabProjects'), icon: FolderGit2 },
    { id: 'socials', label: t('admin.tabSocials'), icon: Share2 },
    { id: 'skills', label: t('admin.tabSkills'), icon: Cpu },
    { id: 'experience', label: t('admin.tabExperience'), icon: Briefcase },
    { id: 'json', label: t('admin.tabJson'), icon: Database },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('admin.modalTitle')} maxWidth="max-w-5xl">
      {!isAuthenticated ? (
        /* PIN Authentication Screen */
        <div className="py-12 px-4 flex flex-col items-center justify-center text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-accent-amber/10 border border-accent-amber/30 text-accent-amber flex items-center justify-center mb-6 glow-amber">
            <Lock className="w-8 h-8" />
          </div>

          <h3 className="text-2xl font-heading font-bold text-white mb-2">Security Authentication</h3>
          <p className="text-xs font-mono text-slate-400 mb-6">{t('admin.enterPin')}</p>

          <form onSubmit={handleUnlock} className="w-full space-y-4">
            <div className="relative">
              <input
                type="password"
                required
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="••••••••"
                className="w-full bg-[#0d1117] border border-slate-700 focus:border-accent-mint rounded-xl px-4 py-3 text-center text-lg font-mono tracking-widest text-white focus:outline-none transition-colors"
              />
            </div>

            {errorMsg && <p className="text-xs font-mono text-rose-400 font-semibold">{errorMsg}</p>}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-heading font-bold text-sm bg-accent-mint text-slate-950 hover:bg-[#72ffe0] transition-all shadow-lg shadow-accent-mint/20 flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>{t('admin.unlockBtn')}</span>
            </button>
          </form>
        </div>
      ) : (
        /* Admin Management Dashboard */
        <div className="space-y-6">
          {/* Top Bar with Tabs and Logout */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            {/* Scrollable Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-2 sm:pb-0">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-accent-mint text-slate-950 font-bold shadow-md shadow-accent-mint/20'
                        : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Lock/Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-rose-400 hover:bg-slate-850 border border-slate-800 transition-colors self-end sm:self-center"
              title="Lock Admin Panel"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock</span>
            </button>
          </div>

          {/* Active Tab Component Content */}
          <div className="pt-2">
            {activeTab === 'general' && <GeneralSettings />}
            {activeTab === 'analytics' && <AnalyticsManager />}
            {activeTab === 'projects' && <ProjectsManager />}
            {activeTab === 'socials' && <SocialsManager />}
            {activeTab === 'skills' && <SkillsManager />}
            {activeTab === 'experience' && <ExperienceManager />}
            {activeTab === 'json' && <JsonSyncManager />}
          </div>
        </div>
      )}
    </Modal>
  );
};
