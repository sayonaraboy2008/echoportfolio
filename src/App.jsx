import React, { useState, useEffect } from 'react';
import { DataProvider } from './context/DataContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CustomCursor } from './components/layout/CustomCursor';
import { BackgroundGlows } from './components/layout/BackgroundGlows';
import { ParticleBackground } from './components/home/ParticleBackground';
import { HeroSection } from './components/home/HeroSection';
import { AboutSection } from './components/home/AboutSection';
import { SkillsSection } from './components/home/SkillsSection';
import { ProjectsSection } from './components/home/ProjectsSection';
import { ExperienceSection } from './components/home/ExperienceSection';
import { TerminalSection } from './components/home/TerminalSection';
import { ContactSection } from './components/home/ContactSection';
import { AdminModal } from './components/admin/AdminModal';
import { Toast } from './components/ui/Toast';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const handleOpenAdmin = (authenticated = false) => {
    setIsAdminAuthenticated(authenticated);
    setIsAdminOpen(true);
  };

  // Secret keyboard shortcut (Ctrl + Shift + A) to open Admin Panel
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Ensure refresh stays at the top if no hash is present in URL
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, []);

  return (
    <DataProvider>
      <LanguageProvider>
        <div className="relative min-h-screen bg-[#0a0d14] text-slate-200 selection:bg-accent-mint/30 selection:text-white font-sans antialiased overflow-hidden">
          {/* Custom Interactive Glowing Neon Cursor */}
          <CustomCursor />

          {/* Ambient Cyber Grid & Floating Glowing Neon Orbs */}
          <BackgroundGlows />

          {/* Three.js 3D Undulating Wave Terrain & Floating Starfield */}
          <ParticleBackground />

          {/* Toast Notification Container */}
          <Toast />

          {/* Navigation Bar */}
          <Navbar />

          {/* Main Portfolio Sections */}
          <main className="relative z-10 space-y-16">
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ExperienceSection />
            <TerminalSection onOpenAdmin={handleOpenAdmin} />
            <ContactSection />
          </main>

          {/* Footer */}
          <Footer />

          {/* Admin Control Panel Modal */}
          <AdminModal
            isOpen={isAdminOpen}
            isAuthenticated={isAdminAuthenticated}
            onClose={() => setIsAdminOpen(false)}
          />
        </div>
      </LanguageProvider>
    </DataProvider>
  );
}
