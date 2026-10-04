import React from 'react';

export const SectionHeading = ({ eyebrow, title, subtitle, centered = false }) => {
  const cleanEyebrow = eyebrow ? eyebrow.replace(/[\[\]]/g, '').trim() : '';

  return (
    <div className={`mb-8 sm:mb-10 ${centered ? 'text-center' : ''}`}>
      {cleanEyebrow && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-mono font-bold text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/25 mb-3 tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
          <span>{cleanEyebrow}</span>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl font-sans leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
