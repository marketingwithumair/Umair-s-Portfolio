import React from 'react';
import { Download, Mail, Linkedin, Phone, ArrowUp, Sparkles } from 'lucide-react';
import { ThemeMode } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import { UzMonogram } from './UzMonogram';

interface FooterProps {
  theme: ThemeMode;
}

export const Footer: React.FC<FooterProps> = ({ theme }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer
      className={`border-t transition-colors ${
        theme === 'dark' ? 'bg-slate-950 border-slate-800/80 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 pb-8 border-b border-slate-700/20">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <UzMonogram theme={theme} size={36} />
              <span className={`font-bold tracking-tight text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {PERSONAL_INFO.name}
              </span>
            </div>

            <p className="text-xs leading-relaxed max-w-sm">
              Performance Marketing Specialist helping e-commerce brands scale profitably through Meta Ads, TikTok Ads, Shopify growth, and CAPI server-side tracking.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className={`p-2.5 rounded-xl transition-all ${
                  theme === 'dark'
                    ? 'bg-slate-800/80 text-sky-400 hover:bg-sky-500 hover:text-white border border-slate-700/60'
                    : 'bg-slate-200 text-sky-600 hover:bg-sky-500 hover:text-white border border-slate-300/80 shadow-2xs'
                }`}
                title="Email Umair"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/923171508958`}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-xl transition-all flex items-center justify-center ${
                  theme === 'dark'
                    ? 'bg-slate-800/80 text-emerald-400 hover:bg-emerald-500 hover:text-white border border-slate-700/60'
                    : 'bg-slate-200 text-emerald-600 hover:bg-emerald-500 hover:text-white border border-slate-300/80 shadow-2xs'
                }`}
                title="Chat on WhatsApp"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.762.459 3.48 1.333 5.001L2 22l5.126-1.335a9.982 9.982 0 0 0 4.886 1.319h.004c5.507 0 9.99-4.478 9.99-9.985 0-2.667-1.038-5.176-2.923-7.06A9.919 9.919 0 0 0 12.012 2zm5.82 14.331c-.246.69-1.428 1.332-1.986 1.388-.523.052-1.201.243-3.922-.876-2.884-1.185-4.722-4.14-4.868-4.332-.143-.193-1.176-1.568-1.176-2.99 0-1.422.744-2.122 1.01-2.408.266-.286.58-.358.773-.358.193 0 .386.002.553.01.18.008.419-.068.656.5.246.593.84 2.052.913 2.201.073.148.121.323.024.516-.096.193-.144.313-.288.483-.144.17-.302.38-.431.51-.144.143-.294.3-.127.587.168.286.746 1.233 1.602 1.996 1.101.98 2.03 1.285 2.316 1.428.286.143.454.12.622-.072.169-.193.722-.843.915-1.13.193-.286.386-.238.65-.143.266.095 1.687.795 1.976.938.288.143.482.215.553.334.072.12.072.69-.174 1.38z"/>
                </svg>
              </a>
              <a
                href={PERSONAL_INFO.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-xl transition-all ${
                  theme === 'dark'
                    ? 'bg-slate-800/80 text-blue-400 hover:bg-blue-600 hover:text-white border border-slate-700/60'
                    : 'bg-slate-200 text-blue-600 hover:bg-blue-600 hover:text-white border border-slate-300/80 shadow-2xs'
                }`}
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="hover:text-sky-400 transition-colors">Home</a></li>
              <li><a href="#about" onClick={(e) => scrollToSection(e, '#about')} className="hover:text-sky-400 transition-colors">About Story</a></li>
              <li><a href="#services" onClick={(e) => scrollToSection(e, '#services')} className="hover:text-sky-400 transition-colors">Services & Capabilities</a></li>
              <li><a href="#casestudy" onClick={(e) => scrollToSection(e, '#casestudy')} className="hover:text-sky-400 transition-colors">Featured Case Study (7.81x ROAS)</a></li>
              <li><a href="#experience" onClick={(e) => scrollToSection(e, '#experience')} className="hover:text-sky-400 transition-colors">Career Experience</a></li>
              <li><a href="#skills" onClick={(e) => scrollToSection(e, '#skills')} className="hover:text-sky-400 transition-colors">Skills Matrix</a></li>
              <li><a href="#contact" onClick={(e) => scrollToSection(e, '#contact')} className="hover:text-sky-400 transition-colors">Direct Contact Channels</a></li>
            </ul>
          </div>

          {/* Resources & Resume */}
          <div className="md:col-span-4 space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Direct Downloads
            </h4>

            <a
              href={PERSONAL_INFO.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all"
            >
              <Download className="w-4 h-4 text-sky-400" />
              <span>Download Umair's Resume (PDF)</span>
            </a>

            <div className="text-[11px] text-slate-500 pt-1">
              Location: Pakistan / Global E-commerce Remote
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved. Performance Marketing Portfolio.
          </div>

          <button
            onClick={scrollToTop}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              theme === 'dark'
                ? 'bg-slate-800 text-slate-200 hover:bg-sky-500 hover:text-white border border-slate-700'
                : 'bg-white text-slate-800 hover:bg-sky-500 hover:text-white border border-slate-300 shadow-sm'
            }`}
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
