import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';

export const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const { data } = useData();
  const { theme, toggleTheme, isDark } = useTheme();
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
          ? 'bg-white/90 dark:bg-[#06080d]/90 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800/80 py-3 shadow-md dark:shadow-xl'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-accent-cyan via-accent-violet to-accent-mint p-[2px] transition-transform duration-300 group-hover:scale-105 shadow-md shadow-accent-cyan/10">
            <div className="w-full h-full bg-white dark:bg-[#0c1017] rounded-[10px] flex items-center justify-center">
              <span className="font-mono font-extrabold text-sm text-slate-900 dark:text-white tracking-tighter">BA</span>
            </div>
          </div>
          <span className="font-heading font-bold text-lg text-slate-900 dark:text-white tracking-tight">
            {data.shortName || 'Barkamol'}<span className="text-accent-cyan">Dev</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 hover:text-accent-cyan dark:hover:text-accent-cyan transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-accent-cyan hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions (Theme Toggle, Lang & Contact CTA) */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-100 dark:bg-[#0c1017] border border-slate-200 dark:border-slate-800 text-indigo-600 dark:text-amber-400 hover:scale-110 active:scale-95 transition-all shadow-sm cursor-pointer"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Language Switcher */}
          <div className="flex items-center bg-slate-100 dark:bg-[#0c1017] border border-slate-200 dark:border-slate-800 rounded-xl p-0.5 shadow-inner">
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                lang === 'en'
                  ? 'bg-accent-cyan text-slate-950 shadow'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('uz')}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                lang === 'uz'
                  ? 'bg-accent-cyan text-slate-950 shadow'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              UZ
            </button>
          </div>

          {/* Contact CTA */}
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold bg-accent-cyan/10 hover:bg-accent-cyan text-accent-cyan hover:text-slate-950 border border-accent-cyan/30 hover:border-transparent transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <span>{t('nav.contact')}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="flex sm:hidden items-center gap-2">
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-[#0c1017] border border-slate-200 dark:border-slate-800 text-indigo-600 dark:text-amber-400"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <div className="flex items-center bg-slate-100 dark:bg-[#0c1017] border border-slate-200 dark:border-slate-800 rounded-lg p-0.5 mr-1">
            <button
              onClick={() => setLang(lang === 'en' ? 'uz' : 'en')}
              className="px-2 py-1 rounded text-xs font-mono font-bold bg-accent-cyan text-slate-950"
            >
              {lang.toUpperCase()}
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-100 dark:bg-[#0c1017] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bg-white/95 dark:bg-[#090d16]/95 border-b border-slate-200 dark:border-slate-800 backdrop-blur-xl px-6 py-6 flex flex-col gap-4 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800/60">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Language & Theme:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="px-3 py-1 rounded-md text-xs font-mono bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-amber-400"
              >
                {isDark ? '☀️ Light' : '🌙 Dark'}
              </button>
              <div className="flex items-center bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-0.5">
                <button
                  onClick={() => setLang('en')}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium ${
                    lang === 'en' ? 'bg-accent-cyan text-slate-950 font-bold' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang('uz')}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium ${
                    lang === 'uz' ? 'bg-accent-cyan text-slate-950 font-bold' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  UZ
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-800 dark:text-slate-200 hover:text-accent-cyan py-1 border-b border-slate-200/50 dark:border-slate-800/40"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-accent-cyan text-slate-950 font-heading font-bold text-sm"
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
