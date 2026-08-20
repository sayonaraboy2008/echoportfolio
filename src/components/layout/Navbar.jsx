import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const { data } = useData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#skills', label: t('nav.skills') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#experience', label: t('nav.experience') },
    { href: '#terminal', label: t('nav.terminal') },
    { href: '#contact', label: t('nav.contact') },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0d14]/85 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-lg shadow-black/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-accent-amber via-accent-coral to-accent-mint p-[2px] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#0d1117] rounded-[10px] flex items-center justify-center">
              <span className="font-mono font-extrabold text-sm text-white tracking-tighter">BA</span>
            </div>
          </div>
          <span className="font-heading font-bold text-lg text-white tracking-tight">
            {data.shortName || 'Barkamol'}<span className="text-accent-mint">Dev</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-accent-mint transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-accent-mint hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions (Lang & Contact CTA) */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-lg p-0.5">
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium transition-all ${
                lang === 'en'
                  ? 'bg-accent-mint text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('uz')}
              className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium transition-all ${
                lang === 'uz'
                  ? 'bg-accent-mint text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              UZ
            </button>
          </div>

          {/* Contact CTA */}
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-accent-mint/10 hover:bg-accent-mint text-accent-mint hover:text-slate-950 border border-accent-mint/30 hover:border-transparent transition-all shadow-sm glow-mint"
          >
            <span>{t('nav.contact')}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 mr-1">
            <button
              onClick={() => setLang(lang === 'en' ? 'uz' : 'en')}
              className="px-2 py-1 rounded text-xs font-mono font-bold bg-accent-mint text-slate-950"
            >
              {lang.toUpperCase()}
            </button>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bg-[#0d1117]/95 border-b border-slate-800 backdrop-blur-xl px-6 py-6 flex flex-col gap-4 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-mono text-slate-400">Language:</span>
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-md text-xs font-mono font-medium ${
                  lang === 'en' ? 'bg-accent-mint text-slate-950 font-bold' : 'text-slate-400'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('uz')}
                className={`px-3 py-1 rounded-md text-xs font-mono font-medium ${
                  lang === 'uz' ? 'bg-accent-mint text-slate-950 font-bold' : 'text-slate-400'
                }`}
              >
                UZ
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-200 hover:text-accent-mint py-1 border-b border-slate-800/40"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-accent-mint text-slate-950 font-heading font-bold text-sm"
            >
              <span>{t('nav.contact')}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
