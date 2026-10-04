import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { SectionHeading } from '../ui/SectionHeading';
import { Code2, Server, Wrench } from 'lucide-react';

export const SkillsSection = () => {
  const { t } = useLanguage();
  const { data } = useData();

  const skillsData = data.skills || {
    frontend: [],
    backend: [],
    tools: [],
  };

  const categories = [
    {
      key: 'frontend',
      title: t('skills.frontend'),
      icon: Code2,
      accentColor: 'text-accent-cyan border-accent-cyan/30 bg-accent-cyan/10',
      items: skillsData.frontend || [],
    },
    {
      key: 'backend',
      title: t('skills.backend'),
      icon: Server,
      accentColor: 'text-accent-violet border-accent-violet/30 bg-accent-violet/10',
      items: skillsData.backend || [],
    },
    {
      key: 'tools',
      title: t('skills.tools'),
      icon: Wrench,
      accentColor: 'text-emerald-500 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
      items: skillsData.tools || [],
    },
  ];

  return (
    <section id="skills" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
      <SectionHeading
        eyebrow="[ STACK & SKILLS ]"
        title={t('skills.title')}
        subtitle={t('skills.subtitle')}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.key}
              className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/90 rounded-2xl p-6 backdrop-blur-md hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-md dark:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-200 dark:border-slate-800/80">
                  <div className={`p-2.5 rounded-xl border ${cat.accentColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
                    {cat.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.items.map((skill, index) => (
                    <div
                      key={index}
                      className="px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/90 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-700 transition-all shadow-sm flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
