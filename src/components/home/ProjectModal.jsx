import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Modal } from '../ui/Modal';
import { GithubIcon } from '../ui/SocialIcon';
import { ExternalLink, Tag, Eye } from 'lucide-react';

export const ProjectModal = ({ project, isOpen, onClose }) => {
  const { t, getText } = useLanguage();

  if (!project) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={project.title} maxWidth="max-w-4xl">
      <div className="space-y-6">
        {/* Project Image */}
        <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 aspect-video max-h-[360px] w-full">
          <img
            src={project.image || 'https://picsum.photos/seed/project/800/500'}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://picsum.photos/seed/fallback-img/800/500';
            }}
          />
          {project.badge && (
            <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-black/70 backdrop-blur-md text-accent-mint border border-accent-mint/30">
              {project.badge}
            </span>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {(project.tags || []).map((tag, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300"
            >
              <Tag className="w-3 h-3 text-accent-mint" />
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800/80">
          <h4 className="text-sm font-mono text-slate-400 mb-2 uppercase tracking-wider">About this project</h4>
          <p className="text-base text-slate-200 leading-relaxed font-sans">
            {getText(project.description)}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-800">
          {project.codeUrl && (
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl font-mono text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 hover:border-slate-500 transition-all flex items-center gap-2"
            >
              <GithubIcon className="w-4 h-4" />
              <span>{t('projects.sourceCode')}</span>
            </a>
          )}

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl font-mono text-xs font-bold bg-accent-mint text-slate-950 hover:bg-[#72ffe0] transition-all shadow-md shadow-accent-mint/20 flex items-center gap-2"
            >
              <span>{t('projects.liveDemo')}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </Modal>
  );
};
