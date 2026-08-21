import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { Heart, Code2, Eye, Users } from 'lucide-react';

export const Footer = () => {
  const { t } = useLanguage();
  const { data, analytics } = useData();

  const totalViews = (analytics?.totalVisitors || 0).toLocaleString();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#05070c] py-8 sm:py-10 px-4 sm:px-6 lg:px-8 relative z-10 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
        {/* Brand */}
        <div className="flex flex-col items-center sm:items-start gap-1">
          <a href="#home" className="flex items-center gap-2">
            <span className="font-heading font-bold text-base sm:text-lg text-slate-900 dark:text-white">
              {data.shortName || 'Barkamol'}<span className="text-accent-cyan">Dev</span>
            </span>
          </a>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm">
            {t('footer.text')}
          </p>
        </div>

        {/* Visitor Counter & Tech Stack */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-[#0c1017] px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-800">
            <Code2 className="w-3.5 h-3.5 text-accent-cyan" />
            <span>React.js + Vite</span>
          </div>

          <div
            className="flex items-center gap-2 text-xs font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-[#0c1017] px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm"
            title={`Jami Tashriflar: ${totalViews} | Unikal Qurilmalar: ${analytics?.uniqueVisitors || 0}`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <Users className="w-3.5 h-3.5 text-emerald-500" />
            <span>Tashriflar: <strong className="text-slate-900 dark:text-white font-bold">{totalViews}</strong></span>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-xs text-slate-500 font-sans">
          <p>© {new Date().getFullYear()} {data.fullName || 'Barkamol Abduraximov'}.</p>
          <p>{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};
