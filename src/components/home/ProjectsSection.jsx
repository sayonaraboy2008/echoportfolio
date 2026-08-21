import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { SectionHeading } from '../ui/SectionHeading';
import { ProjectModal } from './ProjectModal';
import { GithubIcon } from '../ui/SocialIcon';
import { ExternalLink, Search, Eye, Sparkles, Filter } from 'lucide-react';

export const ProjectsSection = () => {
  const { t, getText } = useLanguage();
  const { data } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = data.projects || [];

  // Extract all unique tags
  const allTags = useMemo(() => {
    const set = new Set();
    projects.forEach((p) => {
      (p.tags || []).forEach((t) => set.add(t));
    });
    return Array.from(set);
  }, [projects]);

  // Filter projects based on search and tag
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const titleMatch = project.title?.toLowerCase().includes(searchQuery.toLowerCase());
      const descMatch = getText(project.description)?.toLowerCase().includes(searchQuery.toLowerCase());
      const tagMatch = (project.tags || []).some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesSearch = titleMatch || descMatch || tagMatch;

      if (!matchesSearch) return false;

      if (selectedTag === 'ALL') return true;
      if (selectedTag === 'FEATURED') return !!project.featured || project.badge === 'Featured';
      return (project.tags || []).includes(selectedTag);
    });
  }, [projects, searchQuery, selectedTag, getText]);

  return (
    <section id="projects" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <SectionHeading
        eyebrow="[ FEATURED PORTFOLIO ]"
        title={t('projects.title')}
        subtitle={t('projects.subtitle')}
      />

      {/* Filter and Search Bar */}
      <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-3.5">
        {/* Tag Filters */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 custom-scrollbar">
          <button
            onClick={() => setSelectedTag('ALL')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold whitespace-nowrap transition-all cursor-pointer hover:-translate-y-0.5 active:scale-95 ${
              selectedTag === 'ALL'
                ? 'bg-accent-cyan text-slate-950 shadow-md shadow-accent-cyan/20 font-bold'
                : 'bg-slate-100 dark:bg-[#0c1017] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
            }`}
          >
            {t('projects.all')}
          </button>
          <button
            onClick={() => setSelectedTag('FEATURED')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer hover:-translate-y-0.5 active:scale-95 ${
              selectedTag === 'FEATURED'
                ? 'bg-accent-violet text-white shadow-md shadow-accent-violet/20 font-bold'
                : 'bg-slate-100 dark:bg-[#0c1017] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>{t('projects.featuredOnly')}</span>
          </button>

          {allTags.slice(0, 5).map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all cursor-pointer hover:-translate-y-0.5 active:scale-95 ${
                selectedTag === tag
                  ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/60 font-semibold shadow-sm'
                  : 'bg-slate-100 dark:bg-[#0c1017] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('projects.searchPlaceholder')}
            className="w-full bg-slate-100 dark:bg-[#0c1017] border border-slate-200 dark:border-slate-800 focus:border-accent-cyan rounded-xl pl-9 pr-3.5 py-2 text-xs font-mono text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="bg-white/60 dark:bg-[#0c1017]/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-10 text-center">
          <p className="text-slate-500 dark:text-slate-400 font-mono text-xs sm:text-sm">{t('projects.noProjects')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredProjects.map((project) => (
            <div
              key={project.id || project.title}
              className="group bg-white/90 dark:bg-[#0c1017]/90 border border-slate-200 dark:border-slate-800/90 hover:border-accent-cyan/40 rounded-2xl overflow-hidden backdrop-blur-md transition-all duration-300 hover:-translate-y-1 shadow-lg dark:shadow-xl flex flex-col"
            >
              {/* Project Image & Badge */}
              <div 
                className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-[#05070c] cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <img
                  src={project.image || 'https://picsum.photos/seed/project/600/400'}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'https://picsum.photos/seed/fallback-img/600/400';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0c1017] via-transparent to-transparent opacity-60 dark:opacity-80" />

                {project.badge && (
                  <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-white/90 dark:bg-[#05070c]/80 text-accent-cyan border border-accent-cyan/30 shadow-md">
                    {project.badge}
                  </span>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(project);
                  }}
                  className="absolute bottom-3 right-3 p-2 rounded-lg bg-black/60 hover:bg-black/90 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  title={t('projects.viewDetails')}
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3
                    onClick={() => setSelectedProject(project)}
                    className="text-lg font-heading font-bold text-slate-900 dark:text-white hover:text-accent-cyan dark:hover:text-accent-cyan cursor-pointer transition-colors mb-2"
                  >
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {getText(project.description)}
                  </p>
                </div>

                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {(project.tags || []).slice(0, 4).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-100 dark:bg-[#05070c] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions Links */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-200/80 dark:border-slate-800/80 text-xs font-mono">
                    {project.liveUrl || project.demoUrl ? (
                      <a
                        href={project.liveUrl || project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-accent-cyan hover:underline font-medium cursor-pointer"
                      >
                        <span>{t('projects.liveDemo')}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-slate-400 dark:text-slate-600">{t('projects.noLiveDemo')}</span>
                    )}

                    {(project.githubUrl || project.codeUrl) && (
                      <a
                        href={project.githubUrl || project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
