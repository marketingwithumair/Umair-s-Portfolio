import React, { useState, useEffect } from 'react';
import { Sun, Moon, Download, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeMode } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import { UzMonogram } from './UzMonogram';

interface NavbarProps {
  theme: ThemeMode;
  toggleTheme: () => void;
  onOpenClientPortal: () => void;
}

// Framer Motion variants for high-performance slow-motion mobile/tablet menu reveal
const drawerVariants = {
  closed: {
    opacity: 0,
    height: 0,
    y: -10,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
  open: {
    opacity: 1,
    height: 'auto',
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
      when: 'beforeChildren',
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
};

const navItemVariants = {
  closed: {
    opacity: 0,
    x: -16,
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] },
  },
  open: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const actionGroupVariants = {
  closed: {
    opacity: 0,
    y: 12,
    transition: { duration: 0.25 },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] },
  },
};

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  toggleTheme,
  onOpenClientPortal,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'services', 'casestudy', 'experience', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Case Study', href: '#casestudy', id: 'casestudy' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');

    setTimeout(() => {
      if (targetId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    }, 80);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? theme === 'dark'
            ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20'
            : 'bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-sm'
          : 'bg-transparent py-2'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            className="flex items-center gap-3 group cursor-pointer"
            id="nav-logo"
          >
            <UzMonogram theme={theme} size={42} className="group-hover:scale-105 transition-transform" />
            <div className="flex flex-col">
              <span className={`font-bold tracking-tight text-base sm:text-lg leading-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {PERSONAL_INFO.name}
              </span>
              <span className="text-[10px] tracking-wider font-semibold text-sky-500 uppercase">
                Performance Marketer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" id="desktop-nav">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  id={`nav-link-${link.id}`}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 relative ${
                    isActive
                      ? theme === 'dark'
                        ? 'text-sky-400 bg-sky-500/10 border border-sky-500/20'
                        : 'text-sky-600 bg-sky-50 border border-sky-200'
                      : theme === 'dark'
                      ? 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-sky-500" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden lg:flex items-center gap-2.5" id="nav-actions">
            {/* Resume Button */}
            <a
              href={PERSONAL_INFO.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="download-resume-btn"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                theme === 'dark'
                  ? 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Download className="w-3.5 h-3.5 text-sky-500" />
              <span>Resume</span>
            </a>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              id="theme-toggle-btn"
              aria-label="Toggle theme"
              className={`p-2 rounded-lg transition-all ${
                theme === 'dark'
                  ? 'bg-slate-800 text-amber-400 hover:bg-slate-700'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile & Tablet menu toggle button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'dark' ? 'bg-slate-800 text-amber-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
              aria-label="Toggle Navigation Menu"
              className={`p-2 rounded-lg transition-colors ${
                theme === 'dark' ? 'bg-slate-800 text-slate-200 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Slow-Motion Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-drawer"
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className={`lg:hidden overflow-hidden border-b px-5 pt-3 pb-6 space-y-3 shadow-2xl backdrop-blur-xl absolute top-full left-0 right-0 ${
              theme === 'dark'
                ? 'bg-slate-950/95 border-slate-800/90 text-white'
                : 'bg-white/95 border-slate-200/90 text-slate-900'
            }`}
          >
            <motion.div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <motion.a
                  key={link.id}
                  variants={navItemVariants}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeSection === link.id
                      ? 'bg-sky-500/10 text-sky-400 font-bold border border-sky-500/20'
                      : theme === 'dark'
                      ? 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              variants={actionGroupVariants}
              className="pt-3 border-t border-slate-700/30 flex flex-col gap-2.5"
            >
              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                  theme === 'dark'
                    ? 'bg-slate-900 text-slate-200 border-slate-800 hover:bg-slate-800'
                    : 'bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200'
                }`}
              >
                <Download className="w-4 h-4 text-sky-500" />
                <span>Download Resume PDF</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
