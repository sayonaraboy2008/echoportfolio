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
      color: 'text-accent-mint',
      barColor: 'from-accent-mint/80 to-accent-blue/80',
      items: skillsData.frontend || [],
    },
    {
      key: 'backend',
      title: t('skills.backend'),
      icon: Server,
      color: 'text-accent-coral',
      barColor: 'from-accent-coral/80 to-accent-amber/80',
      items: skillsData.backend || [],
    },
    {
      key: 'tools',
      title: t('skills.tools'),
      icon: Wrench,
      color: 'text-accent-amber',
      barColor: 'from-accent-amber/80 to-accent-mint/80',
      items: skillsData.tools || [],
    },
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <SectionHeading
        eyebrow="$ ls ~/skills --all"
        title={t('skills.title')}
        subtitle={t('skills.subtitle')}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.key}
              className="bg-[#121721]/90 border border-slate-800/90 rounded-2xl p-6 sm:p-7 backdrop-blur-md hover:border-slate-700 transition-all shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                  <div className={`p-2.5 rounded-xl bg-slate-900 border border-slate-800 ${cat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white">
                    {cat.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {cat.items.map((skill, index) => (
                    <div key={index} className="group">
                      <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                        <span className="text-slate-300 group-hover:text-white transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-slate-400 font-semibold">{skill.level}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800/80">
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
