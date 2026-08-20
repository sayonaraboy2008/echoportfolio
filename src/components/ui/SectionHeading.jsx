import React from 'react';

export const SectionHeading = ({ eyebrow, title, subtitle, centered = false }) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      {eyebrow && (
        <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-medium text-accent-mint bg-accent-mint/10 border border-accent-mint/20 mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-white tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base sm:text-lg text-slate-400 max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};
