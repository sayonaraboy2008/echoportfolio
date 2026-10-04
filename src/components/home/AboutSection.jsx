import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { SectionHeading } from '../ui/SectionHeading';
import { Award, Briefcase, Cpu, MapPin, CheckCircle2 } from 'lucide-react';

const AnimatedCounter = ({ target, duration = 1200 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime = null;
          const endVal = Number(target) || 0;

          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * endVal));

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(endVal);
            }
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}+</span>;
};

export const AboutSection = () => {
  const { t, getText, lang } = useLanguage();
  const { data } = useData();

  return (
    <section id="about" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
      <SectionHeading eyebrow="[ BACKGROUND ]" title={t('about.title')} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Bio Text Card */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/90 rounded-2xl p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between shadow-lg dark:shadow-xl">
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 dark:text-white tracking-tight">
              {lang === 'uz' ? "Zamonaviy veb va foydalanuvchilar uchun qulay loyihalar" : "Crafting clean code & human-centric software"}
            </h3>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              {getText(data.aboutText)}
            </p>
          </div>

          {data.location && (
            <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent-cyan" />
                <span className="text-slate-800 dark:text-slate-300 font-semibold">{data.location}</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{lang === 'uz' ? "Masofaviy & Loyihaga Ochiq" : "Available for Remote Work"}</span>
              </div>
            </div>
          )}
        </div>

        {/* 3 Key Stats Column */}
        <div className="lg:col-span-4 grid grid-cols-1 gap-4">
          <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/90 rounded-2xl p-5 flex items-center gap-4 shadow-md dark:shadow-lg hover:border-accent-cyan/40 transition-all">
            <div className="p-3.5 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-2xl font-extrabold font-heading text-slate-900 dark:text-white">
                <AnimatedCounter target={data.yearsExperience || 3} />
              </span>
              <span className="text-xs font-mono text-slate-600 dark:text-slate-400">
                {t('about.statYears')}
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/90 rounded-2xl p-5 flex items-center gap-4 shadow-md dark:shadow-lg hover:border-accent-violet/40 transition-all">
            <div className="p-3.5 rounded-xl bg-accent-violet/10 border border-accent-violet/20 text-accent-violet shrink-0">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-2xl font-extrabold font-heading text-slate-900 dark:text-white">
                <AnimatedCounter target={data.projectsCompleted || 15} />
              </span>
              <span className="text-xs font-mono text-slate-600 dark:text-slate-400">
                {t('about.statProjects')}
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/90 rounded-2xl p-5 flex items-center gap-4 shadow-md dark:shadow-lg hover:border-emerald-400/40 transition-all">
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 dark:text-emerald-400 shrink-0">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-2xl font-extrabold font-heading text-slate-900 dark:text-white">
                <AnimatedCounter target={data.technologiesCount || 14} />
              </span>
              <span className="text-xs font-mono text-slate-600 dark:text-slate-400">
                {t('about.statTech')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
