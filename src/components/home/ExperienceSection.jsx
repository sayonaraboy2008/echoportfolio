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
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10">
      <SectionHeading
        eyebrow="$ git log --oneline --graph"
        title={t('experience.title')}
        subtitle={t('experience.subtitle')}
      />

      <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-800 space-y-12">
        {experiences.map((exp, idx) => (
          <div key={exp.id || idx} className="relative group">
            {/* Timeline Marker */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-[#0a0d14] border-2 border-accent-mint flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
              <div className="w-2 h-2 rounded-full bg-accent-mint animate-pulse" />
            </div>

            {/* Experience Card */}
            <div className="bg-[#121721]/90 border border-slate-800/90 hover:border-slate-700 rounded-2xl p-6 sm:p-7 backdrop-blur-md transition-all shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-xl font-heading font-bold text-white group-hover:text-accent-mint transition-colors">
                  {getText(exp.role)}
                </h3>
                <div className="flex items-center gap-2 text-xs font-mono text-accent-coral bg-accent-coral/10 px-3 py-1 rounded-full border border-accent-coral/20 w-fit">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{getText(exp.period)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm font-mono text-slate-400 mb-4">
                <Briefcase className="w-4 h-4 text-accent-amber" />
                <span className="text-white font-medium">{exp.company}</span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {getText(exp.description)}
              </p>

              {/* Bullet Points */}
              {exp.points && (
                <ul className="space-y-2 mt-4 pt-4 border-t border-slate-800/80">
                  {(Array.isArray(exp.points) ? exp.points : (exp.points[useLanguage().lang] || exp.points.en || [])).map(
                    (point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-400">
                        <CheckCircle2 className="w-4 h-4 text-accent-mint shrink-0 mt-0.5" />
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
