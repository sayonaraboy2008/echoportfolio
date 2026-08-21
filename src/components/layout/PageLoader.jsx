import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { Code2, Sparkles } from 'lucide-react';

export const PageLoader = () => {
  const { isLoading, data } = useData();
  const { lang } = useLanguage();

  const [progress, setProgress] = useState(10);
  const [isDone, setIsDone] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Ultra-fast progress transition (total ~350ms intro, 200ms fadeout)
    const t1 = setTimeout(() => setProgress(70), 60);
    const t2 = setTimeout(() => setProgress(100), 180);
    const t3 = setTimeout(() => setIsDone(true), 300);
    const t4 = setTimeout(() => setShouldRender(false), 550);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  if (!shouldRender) return null;

  const brandName = data?.shortName || 'Barkamol';

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center px-4 transition-all duration-700 ease-out select-none bg-slate-50/98 dark:bg-[#05070c]/98 backdrop-blur-2xl ${
        isDone ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-sky-400/20 dark:bg-accent-cyan/15 blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-purple-500/15 dark:bg-accent-violet/15 blur-3xl animate-pulse delay-700" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full text-center">
        {/* Animated Glowing Tech Ring */}
        <div className="relative flex items-center justify-center w-24 h-24 mb-8">
          {/* Outer Spinner Ring */}
          <div className="absolute inset-0 rounded-3xl border-2 border-sky-400/20 dark:border-accent-cyan/20 animate-[spin_4s_linear_infinite]" />
          <div className="absolute -inset-1 rounded-3xl border-2 border-dashed border-sky-500/40 dark:border-accent-cyan/40 animate-[spin_8s_linear_infinite_reverse]" />

          {/* Glowing Center Card */}
          <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-white dark:bg-[#0c1017] border border-slate-200 dark:border-slate-800 shadow-xl shadow-sky-500/10 dark:shadow-accent-cyan/10">
            <Code2 className="w-8 h-8 text-sky-600 dark:text-accent-cyan animate-pulse" />
          </div>

          {/* Floating Sparkle Badge */}
          <div className="absolute -top-1 -right-1 p-1.5 rounded-full bg-accent-cyan text-slate-950 shadow-lg shadow-accent-cyan/30 animate-bounce">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight mb-2 flex items-center gap-1">
          <span>{brandName}</span>
          <span className="text-sky-600 dark:text-accent-cyan">Dev</span>
        </h1>

        <p className="text-xs font-mono text-slate-600 dark:text-slate-400 mb-6">
          {lang === 'uz' ? 'Tizim yuklanmoqda...' : 'Loading portfolio ecosystem...'}
        </p>

        {/* Smooth Progress Bar */}
        <div className="w-full h-2 rounded-full bg-slate-200/80 dark:bg-slate-800/80 overflow-hidden p-0.5 border border-slate-300/50 dark:border-slate-700/50 shadow-inner mb-3">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-500 via-accent-cyan to-accent-violet transition-all duration-300 ease-out shadow-sm"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Percentage & Status */}
        <div className="flex items-center justify-between w-full text-[11px] font-mono text-slate-500 dark:text-slate-400 px-1">
          <span className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500 dark:bg-accent-cyan" />
            </span>
            <span>{progress < 100 ? (lang === 'uz' ? 'Ma\'lumotlar tayyorlanmoqda' : 'Fetching data') : (lang === 'uz' ? 'Tayyor!' : 'Ready!')}</span>
          </span>
          <span className="font-bold text-slate-700 dark:text-slate-300">{progress}%</span>
        </div>
      </div>
    </div>
  );
};
