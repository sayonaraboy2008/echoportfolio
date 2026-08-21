import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { SocialIcon } from '../ui/SocialIcon';
import { ArrowRight, ChevronDown, Sparkles, Code2, Laptop } from 'lucide-react';

export const HeroSection = () => {
  const { t, getText, lang } = useLanguage();
  const { data } = useData();

  const tagline = getText(data.tagline);
  const [displayedText, setDisplayedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    setDisplayedText('');
    setTextIndex(0);
  }, [tagline, lang]);

  useEffect(() => {
    if (textIndex < tagline.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + tagline[textIndex]);
        setTextIndex(prev => prev + 1);
      }, 25);
      return () => clearTimeout(timeout);
    }
  }, [textIndex, tagline]);

  const activeSocials = (data.socials || []).filter(s => s.enabled !== false);

  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    if (data.email) {
      navigator.clipboard.writeText(data.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  return (
    <section id="home" className="relative min-h-[85vh] flex items-center justify-center pt-28 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle Central Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-accent-cyan/15 via-accent-violet/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center z-10">
        {/* Availability Status Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 dark:bg-[#0c1017]/90 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 shadow-md mb-6 hover:border-accent-cyan/50 transition-colors">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="font-mono text-slate-600 dark:text-slate-400">Available for projects & mentorship</span>
        </div>

        {/* Name Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight leading-[1.08] mb-3">
          <span className="text-slate-500 dark:text-slate-400 block sm:inline font-normal">{t('hero.greeting')} </span>
          <span className="text-gradient">{data.shortName || 'Barkamol'}.</span>
        </h1>

        {/* Role Subtitle */}
        <p className="text-lg sm:text-2xl font-heading font-medium text-slate-700 dark:text-slate-300 mb-6">
          {getText(data.role)}
        </p>

        {/* Tagline Box with Typing cursor */}
        <div className="w-full max-w-2xl bg-white/80 dark:bg-[#0c1017]/80 border border-slate-200 dark:border-slate-800/90 rounded-2xl p-4 sm:p-5 backdrop-blur-md mb-7 shadow-xl">
          <p className="font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-300 flex items-start text-left leading-relaxed">
            <span className="text-accent-cyan mr-2 font-bold select-none">&gt;</span>
            <span className="flex-1">
              {displayedText}
              <span className="inline-block w-2 h-4 bg-accent-cyan ml-1 animate-pulse align-middle" />
            </span>
          </p>
        </div>

        {/* CTA Buttons & Email Copy */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-8">
          <a
            href="#projects"
            className="px-6 py-3 rounded-xl font-heading font-bold text-xs sm:text-sm bg-accent-cyan text-slate-950 hover:bg-[#50c8ff] transition-all shadow-lg shadow-accent-cyan/20 hover:shadow-accent-cyan/40 hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <span>{t('hero.ctaProjects')}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#contact"
            className="px-6 py-3 rounded-xl font-heading font-bold text-xs sm:text-sm bg-slate-100 dark:bg-[#0c1017] hover:bg-slate-200 dark:hover:bg-[#141a24] text-slate-900 dark:text-white border border-slate-300 dark:border-slate-800 hover:border-accent-cyan/50 transition-all shadow-md hover:-translate-y-0.5 active:scale-95 cursor-pointer"
          >
            {t('hero.ctaContact')}
          </a>

          {data.email && (
            <button
              onClick={handleCopyEmail}
              className="px-4 py-3 rounded-xl font-mono text-xs bg-slate-100 dark:bg-[#0c1017]/90 hover:bg-slate-200 dark:hover:bg-[#141a24] text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-all active:scale-95 cursor-pointer flex items-center gap-2"
              title="Copy Email address"
            >
              <span>{copiedEmail ? '✓ Copied!' : data.email}</span>
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
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-[#0c1017] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-accent-cyan hover:border-sky-300 dark:hover:border-accent-cyan/40 hover:bg-slate-200 dark:hover:bg-[#141a24] transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-sm"
              title={social.name}
            >
              <SocialIcon name={social.icon || social.id || social.name} className="w-5 h-5" />
            </a>
          ))}
        </div>

        {/* Scroll Indicator */}
        <a
          href="#about"
          className="mt-10 inline-flex flex-col items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-500 hover:text-accent-cyan transition-colors group"
        >
          <span>{t('hero.scroll')}</span>
          <div className="w-4 h-7 rounded-full border border-slate-400 dark:border-slate-700 flex items-start justify-center p-1 group-hover:border-accent-cyan transition-colors">
            <div className="w-1 h-1.5 bg-accent-cyan rounded-full animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
};
