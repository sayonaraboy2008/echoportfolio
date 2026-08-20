import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { Heart, Code2 } from 'lucide-react';

export const Footer = () => {
  const { t } = useLanguage();
  const { data } = useData();

  return (
    <footer className="border-t border-slate-800/80 bg-[#080b10] py-12 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        {/* Brand */}
        <div className="flex flex-col items-center sm:items-start gap-1">
          <a href="#home" className="flex items-center gap-2">
            <span className="font-heading font-bold text-lg text-white">
              {data.shortName || 'Barkamol'}<span className="text-accent-mint">Dev</span>
            </span>
          </a>
          <p className="text-xs text-slate-400 max-w-sm">
            {t('footer.text')}
          </p>
        </div>

        {/* Dynamic Tech Tags */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-900/60 px-3 py-1.5 rounded-full border border-slate-800">
          <Code2 className="w-3.5 h-3.5 text-accent-mint" />
          <span>React.js + Tailwind CSS + JSON</span>
        </div>

        {/* Copyright */}
        <div className="text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {data.fullName || 'Barkamol Abduraximov'}.</p>
          <p>{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};
