import React from 'react';

export const BackgroundGlows = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Cyber Grid Subtle Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #38bdf8 1px, transparent 1px),
            linear-gradient(to bottom, #38bdf8 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Floating Animated Ambient Glow Orbs */}
      <div className="absolute top-[8%] left-[20%] w-[500px] h-[500px] rounded-full bg-accent-cyan/10 blur-[150px] animate-pulse-slow" />
      <div className="absolute top-[40%] right-[12%] w-[550px] h-[550px] rounded-full bg-accent-violet/10 blur-[160px] animate-float" />
      <div className="absolute top-[75%] left-[10%] w-[450px] h-[450px] rounded-full bg-accent-cyan/8 blur-[140px] animate-pulse-slow" />
    </div>
  );
};
