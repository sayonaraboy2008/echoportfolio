import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { SectionHeading } from '../ui/SectionHeading';
import { Briefcase, GraduationCap, Calendar, CheckCircle2, Award } from 'lucide-react';

export const ExperienceSection = () => {
  const { t, getText, lang } = useLanguage();
  const { data } = useData();

  const [activeTab, setActiveTab] = useState('experience');

  const experiences = data.experience || [];
  const educationList = data.education || [];

  return (
    <section id="experience" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10">
      <SectionHeading
        eyebrow="[ CAREER & ACADEMICS ]"
        title={lang === 'uz' ? "Tajriba & Ta'lim" : "Experience & Education"}
        subtitle={lang === 'uz' ? "Professional faoliyat, ish tajribam hamda akademik ta'lim maskanlarim" : "My professional career trajectory, mentorship and academic background"}
      />

      {/* Tab Switcher */}
      <div className="flex items-center justify-center mb-10">
        <div className="inline-flex p-1.5 rounded-2xl bg-white dark:bg-[#0c1017]/90 border border-slate-200 dark:border-slate-800/90 backdrop-blur-md shadow-md dark:shadow-inner">
          <button
            onClick={() => setActiveTab('experience')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'experience'
                ? 'bg-accent-cyan text-slate-950 shadow-md shadow-accent-cyan/20 scale-[1.02]'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>{lang === 'uz' ? 'Ish & Mentorlik' : 'Work Experience'}</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-md text-[10px] bg-slate-900/10 dark:bg-white/10 font-bold">
              {experiences.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('education')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'education'
                ? 'bg-accent-cyan text-slate-950 shadow-md shadow-accent-cyan/20 scale-[1.02]'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>{lang === 'uz' ? "Ta'lim & Akademik" : 'Education & Degrees'}</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-md text-[10px] bg-slate-900/10 dark:bg-white/10 font-bold">
              {educationList.length}
            </span>
          </button>
        </div>
      </div>

      {/* Tab 1: Work Experience */}
      {activeTab === 'experience' && (
        <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-300 dark:border-slate-800/80 space-y-8 sm:space-y-9 animate-fade-in">
          {experiences.map((exp, idx) => (
            <div key={exp.id || idx} className="relative group">
              {/* Timeline Marker */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-slate-50 dark:bg-[#090d16] border-2 border-accent-cyan flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-accent-cyan" />
              </div>

              {/* Experience Card */}
              <div className="bg-white dark:bg-[#0b0f19]/90 border border-slate-200 dark:border-slate-800/90 hover:border-accent-cyan/40 rounded-2xl p-5 sm:p-6 backdrop-blur-md transition-all shadow-md dark:shadow-xl group-hover:shadow-accent-cyan/5">
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
                    {(Array.isArray(exp.points) ? exp.points : (exp.points[lang] || exp.points.en || [])).map(
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
      )}

      {/* Tab 2: Academic Education */}
      {activeTab === 'education' && (
        <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-300 dark:border-slate-800/80 space-y-8 sm:space-y-9 animate-fade-in">
          {educationList.map((edu, idx) => (
            <div key={edu.id || idx} className="relative group">
              {/* Timeline Marker */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-slate-50 dark:bg-[#090d16] border-2 border-emerald-500 dark:border-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
              </div>

              {/* Education Card */}
              <div className="bg-white dark:bg-[#0b0f19]/90 border border-slate-200 dark:border-slate-800/90 hover:border-emerald-500/40 rounded-2xl p-5 sm:p-6 backdrop-blur-md transition-all shadow-md dark:shadow-xl group-hover:shadow-emerald-500/5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                  <h3 className="text-lg sm:text-xl font-heading font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                    <span>{edu.institution}</span>
                  </h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 w-fit">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{getText(edu.period)}</span>
                    </div>

                    {edu.status === 'ongoing' ? (
                      <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/40 font-semibold animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>{lang === 'uz' ? "Hozirda o'qimoqda" : "Currently Studying"}</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{lang === 'uz' ? "Bitirgan" : "Graduated"}</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-slate-600 dark:text-slate-400 mb-3.5">
                  <Award className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                  <span className="text-slate-900 dark:text-slate-200 font-semibold">{getText(edu.degree)}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {getText(edu.description)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
