import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { SectionHeading } from '../ui/SectionHeading';
import { Briefcase, Calendar, CheckCircle2 } from 'lucide-react';

export const ExperienceSection = () => {
  const { t, getText } = useLanguage();
  const { data } = useData();

  const experiences = data.experience || [];

  return (
    <section id="experience" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10">
      <SectionHeading
        eyebrow="[ CAREER & EXPERIENCE ]"
        title={t('experience.title')}
        subtitle={t('experience.subtitle')}
      />

      <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-800 space-y-8 sm:space-y-9">
        {experiences.map((exp, idx) => (
          <div key={exp.id || idx} className="relative group">
            {/* Timeline Marker */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-[#090d16] border-2 border-accent-cyan flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-accent-cyan" />
            </div>

            {/* Experience Card */}
            <div className="bg-white/90 dark:bg-[#0c1017]/90 border border-slate-200 dark:border-slate-800/90 hover:border-slate-300 dark:hover:border-slate-700 rounded-2xl p-5 sm:p-6 backdrop-blur-md transition-all shadow-lg dark:shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                <h3 className="text-lg sm:text-xl font-heading font-bold text-slate-900 dark:text-white group-hover:text-accent-cyan transition-colors">
                  {getText(exp.role)}
                </h3>
                <div className="flex items-center gap-1.5 text-xs font-mono text-accent-cyan bg-accent-cyan/10 px-3 py-1 rounded-full border border-accent-cyan/20 w-fit">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{getText(exp.period)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-slate-600 dark:text-slate-400 mb-3.5">
                <Briefcase className="w-4 h-4 text-accent-violet" />
                <span className="text-slate-900 dark:text-white font-semibold">{exp.company}</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3.5">
                {getText(exp.description)}
              </p>

              {/* Bullet Points */}
              {exp.points && (
                <ul className="space-y-2 mt-3.5 pt-3.5 border-t border-slate-200 dark:border-slate-800/80">
                  {(Array.isArray(exp.points) ? exp.points : (exp.points[useLanguage().lang] || exp.points.en || [])).map(
                    (point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                        <CheckCircle2 className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    )
                  )}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
