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
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <SectionHeading eyebrow="$ cat about.md" title={t('about.title')} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Bio & Stats */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div
            onMouseMove={handleTiltMove}
            onMouseLeave={handleTiltLeave}
            className="tilt-card bg-[#121721]/90 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl transition-transform duration-200"
          >
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              {getText(data.aboutText)}
            </p>

            {data.location && (
              <div className="mt-6 pt-6 border-t border-slate-800/80 flex items-center gap-2 text-sm font-mono text-slate-400">
                <MapPin className="w-4 h-4 text-accent-coral" />
                <span>{data.location}</span>
              </div>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div
              onMouseMove={handleTiltMove}
              onMouseLeave={handleTiltLeave}
              className="tilt-card bg-[#121721]/90 border border-slate-800/80 rounded-xl p-5 text-center transition-all duration-200 hover:border-accent-mint/50 hover:shadow-lg hover:shadow-accent-mint/10 shadow-lg"
            >
              <div className="flex justify-center mb-2 text-accent-mint">
                <Award className="w-6 h-6 animate-pulse" />
              </div>
              <span className="block text-2xl sm:text-4xl font-extrabold font-heading text-white">
                <AnimatedCounter target={data.yearsExperience || 3} />
              </span>
              <span className="text-xs font-mono text-slate-400 mt-1 block">
                {t('about.statYears')}
              </span>
            </div>

            <div
              onMouseMove={handleTiltMove}
              onMouseLeave={handleTiltLeave}
              className="tilt-card bg-[#121721]/90 border border-slate-800/80 rounded-xl p-5 text-center transition-all duration-200 hover:border-accent-coral/50 hover:shadow-lg hover:shadow-accent-coral/10 shadow-lg"
            >
              <div className="flex justify-center mb-2 text-accent-coral">
                <Briefcase className="w-6 h-6 animate-pulse" />
              </div>
              <span className="block text-2xl sm:text-4xl font-extrabold font-heading text-white">
                <AnimatedCounter target={data.projectsCompleted || 15} />
              </span>
              <span className="text-xs font-mono text-slate-400 mt-1 block">
                {t('about.statProjects')}
              </span>
            </div>

            <div
              onMouseMove={handleTiltMove}
              onMouseLeave={handleTiltLeave}
              className="tilt-card bg-[#121721]/90 border border-slate-800/80 rounded-xl p-5 text-center transition-all duration-200 hover:border-accent-amber/50 hover:shadow-lg hover:shadow-accent-amber/10 shadow-lg"
            >
              <div className="flex justify-center mb-2 text-accent-amber">
                <Cpu className="w-6 h-6 animate-pulse" />
              </div>
              <span className="block text-2xl sm:text-4xl font-extrabold font-heading text-white">
                <AnimatedCounter target={data.technologiesCount || 14} />
              </span>
              <span className="text-xs font-mono text-slate-400 mt-1 block">
                {t('about.statTech')}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Code Terminal Card */}
        <div className="lg:col-span-5">
          <div
            onMouseMove={handleTiltMove}
            onMouseLeave={handleTiltLeave}
            className="tilt-card bg-[#0e121a] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden transition-transform duration-200"
          >
            {/* Terminal Header */}
            <div className="bg-[#161b24] px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-mono text-slate-400">
                {data.shortName?.toLowerCase() || 'barkamol'}@arch: ~
              </span>
              <div className="w-10" />
            </div>

            {/* Terminal Body */}
            <div className="p-5 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed overflow-x-auto custom-scrollbar">
              <p className="text-slate-500">
                <span className="text-accent-mint font-bold">┌──(</span>
                <span className="text-accent-coral">{data.shortName?.toLowerCase() || 'barkamol'}</span>
                <span className="text-accent-mint">㉿arch)-[~]</span>
              </p>
              <p className="text-slate-400 mb-2">
                <span className="text-accent-mint font-bold">└─$</span> cat profile.json
              </p>

              <pre className="text-slate-300 bg-black/40 p-4 rounded-xl border border-slate-800/80 font-mono text-xs overflow-x-auto">
{`{
  "name": "${data.fullName || 'Barkamol Abduraximov'}",
  "role": "${getText(data.role)}",
  "location": "${data.location || 'Uzbekistan'}",
  "status": "available_for_hire",
  "frontend": ["React.js", "Tailwind CSS", "JavaScript ES6+"],
  "tools": ["Git", "Vite", "REST API", "Telegram Bot"],
  "mentorAt": "Chust IT Serves"
}`}
              </pre>

              <p className="mt-3 text-slate-500">
                <span className="text-accent-mint font-bold">┌──(</span>
                <span className="text-accent-coral">{data.shortName?.toLowerCase() || 'barkamol'}</span>
                <span className="text-accent-mint">㉿arch)-[~]</span>
              </p>
              <p className="text-slate-400 flex items-center">
                <span className="text-accent-mint font-bold mr-1">└─$</span>
                <span className="w-2 h-4 bg-accent-mint animate-pulse inline-block" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
