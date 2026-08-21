import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { SectionHeading } from '../ui/SectionHeading';
import { Code, Server, Wrench } from 'lucide-react';

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
      icon: Code,
      color: 'text-accent-cyan',
      barColor: 'from-accent-cyan to-accent-blue',
      items: skillsData.frontend || [],
    },
    {
      key: 'backend',
      title: t('skills.backend'),
      icon: Server,
      color: 'text-accent-violet',
      barColor: 'from-accent-violet to-purple-500',
      items: skillsData.backend || [],
    },
    {
      key: 'tools',
      title: t('skills.tools'),
      icon: Wrench,
      color: 'text-accent-cyan',
      barColor: 'from-emerald-400 to-accent-cyan',
      items: skillsData.tools || [],
    },
  ];

  return (
    <section id="skills" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <SectionHeading
        eyebrow="[ SKILLS & EXPERTISE ]"
        title={t('skills.title')}
        subtitle={t('skills.subtitle')}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.key}
              className="bg-white/90 dark:bg-[#0c1017]/90 border border-slate-200 dark:border-slate-800/90 rounded-2xl p-6 backdrop-blur-md hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-lg dark:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div className={`p-2 rounded-xl bg-slate-100 dark:bg-[#131926] border border-slate-200 dark:border-slate-800 ${cat.color}`}>
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
                    {cat.title}
                  </h3>
                </div>

                <div className="space-y-3.5">
                  {cat.items.map((skill, index) => (
                    <div key={index} className="group">
                      <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                        <span className="text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-slate-500 dark:text-slate-400 font-semibold">{skill.level}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-[#05070c] rounded-full overflow-hidden border border-slate-200 dark:border-slate-800/80">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${cat.barColor} transition-all duration-1000 group-hover:brightness-125`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
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
