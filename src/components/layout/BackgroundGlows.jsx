import React from 'react';

export const BackgroundGlows = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Cyber Grid Subtle Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #64ffda 1px, transparent 1px),
            linear-gradient(to bottom, #64ffda 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Floating Animated Ambient Glow Orbs */}
      <div className="absolute top-[10%] left-[15%] w-96 h-96 rounded-full bg-accent-mint/10 blur-[120px] animate-pulse-slow" />
      <div className="absolute top-[35%] right-[10%] w-[450px] h-[450px] rounded-full bg-accent-coral/10 blur-[140px] animate-float" />
      <div className="absolute top-[65%] left-[5%] w-[400px] h-[400px] rounded-full bg-accent-amber/10 blur-[130px] animate-pulse-slow" />
      <div className="absolute top-[85%] right-[15%] w-96 h-96 rounded-full bg-accent-blue/10 blur-[120px] animate-float" />
    </div>
  );
};
