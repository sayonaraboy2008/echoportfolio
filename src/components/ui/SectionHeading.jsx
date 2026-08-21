import React from 'react';

export const SectionHeading = ({ eyebrow, title, subtitle, centered = false }) => {
  return (
    <div className={`mb-8 sm:mb-10 ${centered ? 'text-center' : ''}`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-medium text-sky-700 dark:text-accent-cyan bg-sky-100/80 dark:bg-accent-cyan/10 border border-sky-200 dark:border-accent-cyan/20 mb-3 tracking-wide">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl font-sans">
          {subtitle}
        </p>
      )}
    </div>
  );
};
