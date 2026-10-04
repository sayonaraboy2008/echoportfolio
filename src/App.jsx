import React, { useState, useEffect } from 'react';
import { DataProvider, useData } from './context/DataContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { PageLoader } from './components/layout/PageLoader';
import { BackgroundGlows } from './components/layout/BackgroundGlows';
import { HeroSection } from './components/home/HeroSection';
import { AboutSection } from './components/home/AboutSection';
import { SkillsSection } from './components/home/SkillsSection';
import { ProjectsSection } from './components/home/ProjectsSection';
import { ExperienceSection } from './components/home/ExperienceSection';
import { TerminalSection } from './components/home/TerminalSection';
import { ContactSection } from './components/home/ContactSection';
import { AdminModal } from './components/admin/AdminModal';
import { Toast } from './components/ui/Toast';
import { ArrowUp } from 'lucide-react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-40 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-accent-cyan hover:bg-slate-800 transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
};

const SectionTracker = () => {
  const { trackSectionView } = useData();

  useEffect(() => {
    if (!trackSectionView) return;

    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            trackSectionView(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, [trackSectionView]);

  return null;
};

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

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

  // Ensure refresh stays at top if no hash in URL
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, []);

  return (
    <ThemeProvider>
      <DataProvider>
        <LanguageProvider>
          {/* Page Loader */}
          <PageLoader />

          <div className="relative min-h-screen bg-slate-50 dark:bg-[#060913] text-slate-800 dark:text-slate-200 font-sans antialiased selection:bg-accent-cyan/30 selection:text-white transition-colors duration-300">
            {/* Automatic Visitor Section Observer */}
            <SectionTracker />

            {/* Ambient Background Glow */}
            <BackgroundGlows />

            {/* Toast Notifications */}
            <Toast />

            {/* Header Navbar */}
            <Navbar />

            {/* Main Portfolio Sections */}
            <main className="relative z-10 space-y-12 sm:space-y-16">
              <HeroSection />
              <AboutSection />
              <ProjectsSection />
              <SkillsSection />
              <ExperienceSection />
              <TerminalSection onOpenAdmin={() => setIsAdminOpen(true)} />
              <ContactSection />
            </main>

            {/* Scroll to Top */}
            <ScrollToTopButton />

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
    </ThemeProvider>
  );
}
