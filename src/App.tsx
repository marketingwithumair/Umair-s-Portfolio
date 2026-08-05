import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'motion/react';
import { ThemeMode } from './types';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { Footer } from './components/Footer';

// Code-split heavy below-the-fold components using React.lazy for faster initial page load
const CaseStudySection = React.lazy(() =>
  import('./components/CaseStudySection').then((m) => ({ default: m.CaseStudySection }))
);
const ExperienceTimeline = React.lazy(() =>
  import('./components/ExperienceTimeline').then((m) => ({ default: m.ExperienceTimeline }))
);
const SkillsSection = React.lazy(() =>
  import('./components/SkillsSection').then((m) => ({ default: m.SkillsSection }))
);
const AIAuditSection = React.lazy(() =>
  import('./components/AIAuditSection').then((m) => ({ default: m.AIAuditSection }))
);
const ContactSection = React.lazy(() =>
  import('./components/ContactSection').then((m) => ({ default: m.ContactSection }))
);
const ClientPortalModal = React.lazy(() =>
  import('./components/ClientPortalModal').then((m) => ({ default: m.ClientPortalModal }))
);

const sectionEntranceVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('umair_portfolio_theme');
    return (saved as ThemeMode) || 'dark';
  });

  const [clientPortalOpen, setClientPortalOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScrollProgress = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
            setScrollProgress((prev) => (Math.abs(prev - progress) > 0.5 ? progress : prev));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScrollProgress, { passive: true });
    handleScrollProgress();

    return () => window.removeEventListener('scroll', handleScrollProgress);
  }, []);

  useEffect(() => {
    localStorage.setItem('umair_portfolio_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const scrollToWork = () => {
    document.getElementById('casestudy')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans selection:bg-sky-500 selection:text-white ${
        theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Website Preloader */}
      <Preloader theme={theme} />

      {/* Animated Custom Cursor Effect */}
      <CustomCursor theme={theme} />

      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-slate-800/10 dark:bg-slate-200/10 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-sky-400 via-blue-500 to-emerald-400 transition-all duration-150 ease-out shadow-[0_0_10px_rgba(56,189,248,0.7)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Sticky Header Navigation */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenClientPortal={() => setClientPortalOpen(true)}
      />

      {/* Hero Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={sectionEntranceVariants}
      >
        <HeroSection
          theme={theme}
          onViewWork={scrollToWork}
        />
      </motion.div>

      {/* About Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={sectionEntranceVariants}
      >
        <AboutSection theme={theme} />
      </motion.div>

      {/* Services Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={sectionEntranceVariants}
      >
        <ServicesSection theme={theme} />
      </motion.div>

      {/* Below-the-fold sections wrapped in Suspense for async loading */}
      <Suspense fallback={<div className="min-h-[200px]" />}>
        {/* Featured Case Study Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={sectionEntranceVariants}
        >
          <CaseStudySection theme={theme} />
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={sectionEntranceVariants}
        >
          <ExperienceTimeline theme={theme} />
        </motion.div>

        {/* Skills Matrix */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={sectionEntranceVariants}
        >
          <SkillsSection theme={theme} />
        </motion.div>

        {/* AI Ad Performance Audit Tool */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={sectionEntranceVariants}
        >
          <AIAuditSection theme={theme} />
        </motion.div>

        {/* Direct Communication Channels Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={sectionEntranceVariants}
        >
          <ContactSection theme={theme} />
        </motion.div>
      </Suspense>

      {/* Footer */}
      <Footer theme={theme} />

      {/* Modals with Suspense */}
      <Suspense fallback={null}>
        {clientPortalOpen && (
          <ClientPortalModal
            theme={theme}
            isOpen={clientPortalOpen}
            onClose={() => setClientPortalOpen(false)}
          />
        )}
      </Suspense>
    </div>
  );
}
