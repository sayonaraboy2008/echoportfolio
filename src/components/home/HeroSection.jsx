import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { SocialIcon } from '../ui/SocialIcon';
import { ArrowRight, Copy, Check } from 'lucide-react';

export const HeroSection = () => {
  const { t, getText, lang } = useLanguage();
  const { data } = useData();

  const tagline = getText(data.tagline);
  const activeSocials = (data.socials || []).filter((s) => s.enabled !== false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    if (data.email) {
      navigator.clipboard.writeText(data.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  return (
    <section id="home" className="relative min-h-[85vh] flex items-center justify-center pt-28 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Ambient Radial Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-cyan-500/12 via-emerald-500/10 to-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center z-10">
        {/* Modern Live Status Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300 shadow-md mb-8 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>
            {lang === 'uz' ? "Loyihalar va mentorlik uchun ochiq" : "Open for projects & software engineering"}
          </span>
        </div>

        {/* Main Name Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight leading-[1.08] mb-4">
          <span className="text-slate-500 dark:text-slate-400 font-normal">{t('hero.greeting')} </span>
          <span className="text-gradient">{data.fullName || 'Barkamol Abduraximov'}</span>
        </h1>

        {/* Role Subtitle */}
        <p className="text-lg sm:text-2xl font-heading font-semibold text-slate-700 dark:text-slate-200 mb-5 max-w-2xl">
          {getText(data.role)}
        </p>

        {/* Clean Human Bio Paragraph */}
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed mb-9 font-sans">
          {tagline}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10">
          <a
            href="#projects"
            className="px-6 py-3 rounded-xl font-heading font-bold text-xs sm:text-sm bg-accent-cyan text-slate-950 hover:bg-[#50c8ff] transition-all shadow-lg shadow-accent-cyan/20 hover:shadow-accent-cyan/35 hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <span>{t('hero.ctaProjects')}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#contact"
            className="px-6 py-3 rounded-xl font-heading font-bold text-xs sm:text-sm bg-white dark:bg-slate-900/90 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-800 transition-all shadow-md hover:-translate-y-0.5 active:scale-95 cursor-pointer"
          >
            {t('hero.ctaContact')}
          </a>

          {data.email && (
            <button
              onClick={handleCopyEmail}
              className="px-4 py-3 rounded-xl font-mono text-xs bg-white dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-800 transition-all active:scale-95 cursor-pointer flex items-center gap-2 shadow-sm"
              title="Copy Email"
            >
              {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copiedEmail ? (lang === 'uz' ? "Nusxalandi!" : "Copied!") : data.email}</span>
            </button>
          )}
        </div>

        {/* Social Links Row */}
        <div className="flex items-center justify-center gap-2.5 flex-wrap">
          {activeSocials.map((social) => (
            <a
              key={social.id || social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-accent-cyan/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
              title={social.name}
            >
              <SocialIcon name={social.icon || social.id || social.name} className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
