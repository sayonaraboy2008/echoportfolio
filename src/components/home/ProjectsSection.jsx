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
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <SectionHeading
        eyebrow="$ ls ~/projects --featured"
        title={t('projects.title')}
        subtitle={t('projects.subtitle')}
      />

      {/* Filter and Search Bar */}
      <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Tag Filters */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 custom-scrollbar">
          <button
            onClick={() => setSelectedTag('ALL')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold whitespace-nowrap transition-all ${
              selectedTag === 'ALL'
                ? 'bg-accent-mint text-slate-950 shadow-md shadow-accent-mint/20'
                : 'bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {t('projects.all')}
          </button>
          <button
            onClick={() => setSelectedTag('FEATURED')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
              selectedTag === 'FEATURED'
                ? 'bg-accent-coral text-slate-950 shadow-md shadow-accent-coral/20'
                : 'bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>{t('projects.featuredOnly')}</span>
          </button>

          {allTags.slice(0, 5).map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all ${
                selectedTag === tag
                  ? 'bg-slate-700 text-white border border-accent-mint/50'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('projects.searchPlaceholder')}
            className="w-full bg-[#121721] border border-slate-800 focus:border-accent-mint/60 rounded-xl pl-9 pr-4 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="bg-[#121721]/60 border border-slate-800 rounded-2xl p-12 text-center">
          <p className="text-slate-400 font-mono text-sm">{t('projects.noProjects')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProjects.map((project) => (
            <div
              key={project.id || project.title}
              className="group bg-[#121721]/90 border border-slate-800/90 hover:border-accent-mint/40 rounded-2xl overflow-hidden backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col"
            >
              {/* Project Image & Badge */}
              <div 
                className="relative aspect-video overflow-hidden bg-slate-950 cursor-pointer"
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#121721] via-transparent to-transparent opacity-80" />

                {project.badge && (
                  <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-950/80 text-accent-mint border border-accent-mint/30 shadow-md">
                    {project.badge}
                  </span>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(project);
                  }}
                  className="absolute bottom-3 right-3 p-2 rounded-lg bg-black/60 hover:bg-black/90 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  title={t('projects.viewDetails')}
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3
                    onClick={() => setSelectedProject(project)}
                    className="text-xl font-heading font-bold text-white hover:text-accent-mint cursor-pointer transition-colors mb-2"
                  >
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {getText(project.description)}
                  </p>
                </div>

                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {(project.tags || []).slice(0, 4).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions Links */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs font-mono">
                    {project.codeUrl ? (
                      <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                      </a>
                    ) : <span />}

                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-mint hover:text-white font-semibold flex items-center gap-1 transition-colors"
                      >
                        <span>Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
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
