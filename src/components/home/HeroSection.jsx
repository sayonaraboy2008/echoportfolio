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

  return (
    <section id="home" className="relative min-h-[95vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-accent-mint/10 via-accent-coral/10 to-accent-amber/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center z-10">
        {/* Eyebrow CLI Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300 shadow-md mb-6 hover:border-accent-mint/40 transition-colors">
          <span className="w-2 h-2 rounded-full bg-accent-mint animate-ping" />
          <span className="text-slate-400">~/portfolio</span>
          <span className="text-accent-mint font-bold">$</span>
          <span>whoami</span>
        </div>

        {/* Name Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-heading text-white tracking-tight leading-[1.1] mb-4">
          <span className="text-slate-400 block sm:inline">{t('hero.greeting')} </span>
          <span className="text-gradient">{data.shortName || 'Barkamol'}.</span>
        </h1>

        {/* Role Subtitle */}
        <p className="text-xl sm:text-2xl md:text-3xl font-heading font-medium text-slate-300 mb-6 flex items-center justify-center gap-2">
          <span>{getText(data.role)}</span>
        </p>

        {/* Tagline Box with Typing cursor */}
        <div className="w-full max-w-2xl bg-slate-900/70 border border-slate-800/90 rounded-xl p-4 sm:p-5 backdrop-blur-md mb-8 shadow-xl">
          <p className="font-mono text-sm sm:text-base text-slate-300 flex items-start text-left">
            <span className="text-accent-mint mr-2.5 font-bold select-none">&gt;</span>
            <span className="flex-1">
              {displayedText}
              <span className="inline-block w-2 h-4 bg-accent-mint ml-1 animate-pulse align-middle" />
            </span>
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <a
            href="#projects"
            className="px-6 py-3.5 rounded-xl font-heading font-bold text-sm bg-accent-mint text-slate-950 hover:bg-[#72ffe0] transition-all shadow-lg shadow-accent-mint/20 hover:shadow-accent-mint/40 hover:-translate-y-0.5 flex items-center gap-2"
          >
            <span>{t('hero.ctaProjects')}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#contact"
            className="px-6 py-3.5 rounded-xl font-heading font-bold text-sm bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700/80 hover:border-slate-500 transition-all shadow-md hover:-translate-y-0.5"
          >
            {t('hero.ctaContact')}
          </a>
        </div>

        {/* Social Links Row */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {activeSocials.map((social) => (
            <a
              key={social.id || social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-accent-mint hover:border-accent-mint/40 hover:bg-slate-850 transition-all hover:scale-110 shadow-sm"
              title={social.name}
            >
              <SocialIcon name={social.icon || social.id || social.name} className="w-5 h-5" />
            </a>
          ))}
        </div>

        {/* Scroll Indicator */}
        <a
          href="#about"
          className="mt-14 inline-flex flex-col items-center gap-2 text-xs font-mono text-slate-500 hover:text-accent-mint transition-colors group"
        >
          <span>{t('hero.scroll')}</span>
          <div className="w-5 h-8 rounded-full border border-slate-700 flex items-start justify-center p-1 group-hover:border-accent-mint transition-colors">
            <div className="w-1.5 h-2 bg-accent-mint rounded-full animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
};
