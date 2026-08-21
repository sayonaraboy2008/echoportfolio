import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { SectionHeading } from '../ui/SectionHeading';
import { Award, Briefcase, Cpu, MapPin } from 'lucide-react';

const AnimatedCounter = ({ target, duration = 1400 }) => {
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
  const { t, getText } = useLanguage();
  const { data } = useData();

  // 3D Tilt Card handler
  const handleTiltMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const handleTiltLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  return (
    <section id="about" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <SectionHeading eyebrow="[ ABOUT ME ]" title={t('about.title')} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-8 items-start">
        {/* Left Column: Bio & Stats */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div
            onMouseMove={handleTiltMove}
            onMouseLeave={handleTiltLeave}
            className="tilt-card bg-white/90 dark:bg-[#0c1017]/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 backdrop-blur-md shadow-lg dark:shadow-xl transition-transform duration-200"
          >
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              {getText(data.aboutText)}
            </p>

            {data.location && (
              <div className="mt-5 pt-5 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center gap-2 text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400">
                <MapPin className="w-4 h-4 text-accent-cyan" />
                <span>{data.location}</span>
              </div>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-3.5 sm:gap-4">
            <div
              onMouseMove={handleTiltMove}
              onMouseLeave={handleTiltLeave}
              className="tilt-card bg-white/90 dark:bg-[#0c1017]/90 border border-slate-200 dark:border-slate-800/80 rounded-xl p-4 sm:p-5 text-center transition-all duration-200 hover:border-accent-cyan/50 hover:shadow-lg shadow-md"
            >
              <div className="flex justify-center mb-1.5 text-accent-cyan">
                <Award className="w-5 h-5" />
              </div>
              <span className="block text-xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
                <AnimatedCounter target={data.yearsExperience || 3} />
              </span>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1 block">
                {t('about.statYears')}
              </span>
            </div>

            <div
              onMouseMove={handleTiltMove}
              onMouseLeave={handleTiltLeave}
              className="tilt-card bg-white/90 dark:bg-[#0c1017]/90 border border-slate-200 dark:border-slate-800/80 rounded-xl p-4 sm:p-5 text-center transition-all duration-200 hover:border-accent-violet/50 hover:shadow-lg shadow-md"
            >
              <div className="flex justify-center mb-1.5 text-accent-violet">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="block text-xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
                <AnimatedCounter target={data.projectsCompleted || 15} />
              </span>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1 block">
                {t('about.statProjects')}
              </span>
            </div>

            <div
              onMouseMove={handleTiltMove}
              onMouseLeave={handleTiltLeave}
              className="tilt-card bg-white/90 dark:bg-[#0c1017]/90 border border-slate-200 dark:border-slate-800/80 rounded-xl p-4 sm:p-5 text-center transition-all duration-200 hover:border-accent-cyan/50 hover:shadow-lg shadow-md"
            >
              <div className="flex justify-center mb-1.5 text-accent-cyan">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="block text-xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
                <AnimatedCounter target={data.technologiesCount || 14} />
              </span>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1 block">
                {t('about.statTech')}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Clean Profile Overview Card */}
        <div className="lg:col-span-5">
          <div
            onMouseMove={handleTiltMove}
            onMouseLeave={handleTiltLeave}
            className="tilt-card bg-white dark:bg-[#090d16] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl dark:shadow-2xl overflow-hidden transition-transform duration-200"
          >
            {/* Header */}
            <div className="bg-slate-100 dark:bg-[#131926] px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                profile.json — Overview
              </span>
              <div className="w-8" />
            </div>

            {/* Body */}
            <div className="p-5 font-mono text-xs leading-relaxed overflow-x-auto custom-scrollbar">
              <pre className="text-slate-800 dark:text-slate-300 bg-slate-100 dark:bg-black/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800/80 font-mono text-xs overflow-x-auto">
{`{
  "name": "${data.fullName || 'Barkamol Abduraximov'}",
  "role": "${getText(data.role)}",
  "location": "${data.location || 'Uzbekistan'}",
  "status": "Available for Work",
  "stack": ["React", "Tailwind CSS", "JavaScript ES6+"],
  "tools": ["Git", "Vite", "REST API", "Telegram API"],
  "mentoring": "Chust IT Serves"
}`}
              </pre>

              <div className="mt-4 flex items-center gap-2 text-slate-600 dark:text-slate-400 text-xs">
                <span className="text-accent-cyan font-bold">status:</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Ready for hire & mentorship</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
