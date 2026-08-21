import React, { useEffect, useRef } from 'react';

export const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isHovering = false;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    };

    let animId;
    const updateRing = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) ${
        isHovering ? 'scale(1.6)' : 'scale(1)'
      }`;
      animId = requestAnimationFrame(updateRing);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('.cursor-pointer') ||
        target.closest('.tilt-card')
      ) {
        isHovering = true;
        ring.classList.add('border-accent-violet', 'bg-accent-violet/10');
        ring.classList.remove('border-accent-cyan/40');
      } else {
        isHovering = false;
        ring.classList.remove('border-accent-violet', 'bg-accent-violet/10');
        ring.classList.add('border-accent-cyan/40');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    updateRing();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent-cyan pointer-events-none z-50 shadow-[0_0_10px_#38bdf8] hidden md:block"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent-cyan/40 pointer-events-none z-50 transition-[border-color,background-color] duration-200 hidden md:block shadow-[0_0_15px_rgba(56,189,248,0.15)]"
        style={{ willChange: 'transform' }}
      />
    </>
  );
};
