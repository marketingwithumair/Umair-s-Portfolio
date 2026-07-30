import React, { useState, useEffect } from 'react';
import { ExternalLink, ArrowDown, Calendar, TrendingUp, ShieldCheck, Sparkles, Award, DollarSign, ChevronDown } from 'lucide-react';
import { ThemeMode } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Interactive3DCanvas } from './3d/Interactive3DCanvas';

interface HeroSectionProps {
  theme: ThemeMode;
  onViewWork: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ theme, onViewWork }) => {
  // Animated Typing Effect state
  const [typedText, setTypedText] = useState('');
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentHeadline = PERSONAL_INFO.typingHeadlines[headlineIndex];
    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && typedText === currentHeadline) {
      speed = 2200; // Pause at full word
    } else if (isDeleting && typedText === '') {
      setIsDeleting(false);
      setHeadlineIndex((prev) => (prev + 1) % PERSONAL_INFO.typingHeadlines.length);
      speed = 400;
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(currentHeadline.substring(0, typedText.length + 1));
        if (typedText === currentHeadline) {
          setIsDeleting(true);
        }
      } else {
        setTypedText(currentHeadline.substring(0, typedText.length - 1));
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, headlineIndex]);

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden scroll-mt-20 sm:scroll-mt-24">
      {/* Interactive 3D WebGL Background Canvas */}
      <Interactive3DCanvas theme={theme} interactiveObjectType="all" />

      {/* Decorative Gradient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-sky-500/10 to-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Status Badge */}
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border shadow-sm ${
                theme === 'dark'
                  ? 'bg-slate-900/80 border-sky-500/30 text-sky-300'
                  : 'bg-white/80 border-sky-200 text-sky-700'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for New E-commerce Growth Accounts</span>
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h1
                id="hero-title"
                className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}
              >
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">{PERSONAL_INFO.name}</span>
              </h1>

              {/* Typing Effect Subtitle */}
              <div className="h-10 sm:h-12 flex items-center">
                <span className="text-lg sm:text-2xl font-bold text-sky-500 tracking-tight">
                  {typedText}
                  <span className="inline-block w-0.5 h-6 bg-sky-500 ml-1 animate-pulse" />
                </span>
              </div>
            </div>

            {/* Static Headline */}
            <p className={`text-base sm:text-lg font-medium leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
              <strong>Performance Marketer | Meta & TikTok Ads Expert | Shopify Growth Strategist</strong>
            </p>

            {/* Professional Introduction Paragraph */}
            <p className={`text-sm sm:text-base leading-relaxed max-w-2xl ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              {PERSONAL_INFO.shortBio}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="https://drive.google.com/drive/folders/1v8s3oDMKl-7f4akJbbcgy7Aqpe9cM1QJ?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                id="hero-view-work-btn"
                data-cursor-text="Drive"
                className="group flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
              >
                <span>My Past Work</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </a>

              <a
                href="#casestudy"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('casestudy');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  } else {
                    onViewWork();
                  }
                }}
                id="hero-case-study-btn"
                data-cursor-text="Case Study"
                className={`group flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold border transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] ${
                  theme === 'dark'
                    ? 'border-sky-500/40 text-sky-400 bg-sky-950/30 hover:bg-sky-500/10 hover:border-sky-400 shadow-lg shadow-sky-500/10'
                    : 'border-sky-600/40 text-sky-700 bg-sky-50 hover:bg-sky-100 hover:border-sky-600 shadow-xs'
                }`}
              >
                <span>Case Study</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
              </a>
            </div>

            {/* Metric Pills Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 w-full max-w-2xl border-t border-slate-700/20">
              {PERSONAL_INFO.keyStats.map((stat, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border backdrop-blur-md transition-all duration-300 hover:scale-[1.04] hover:-translate-y-1 hover:border-sky-500/40 hover:shadow-lg hover:shadow-sky-500/10 cursor-default ${
                    theme === 'dark' ? 'bg-slate-900/60 border-slate-800/80' : 'bg-white/60 border-slate-200/80 shadow-xs'
                  }`}
                >
                  <div className="text-xl font-extrabold text-sky-500 tracking-tight">{stat.value}</div>
                  <div className={`text-[11px] font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Portrait Column with Floating Interactive 3D KPI Badges */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative group max-w-md w-full">
              {/* Outer Decorative Gradient Ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 rounded-3xl blur-md opacity-70 group-hover:opacity-100 transition duration-500 animate-pulse" />

              {/* Card Glass Frame */}
              <div
                className={`relative rounded-3xl overflow-hidden border backdrop-blur-xl p-3 transition-all duration-500 group-hover:border-sky-500/40 ${
                  theme === 'dark' ? 'bg-slate-950/90 border-slate-800' : 'bg-white/90 border-slate-200 shadow-xl'
                }`}
              >
                {/* Umair Zafar Portrait Photo */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-900">
                  <img
                    src={PERSONAL_INFO.photoUrl}
                    alt="Umair Zafar - Performance Marketing Specialist"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {/* Bottom Portrait Tag */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-white flex items-center justify-between transition-all duration-300 group-hover:border-sky-500/40">
                    <div>
                      <h3 className="font-bold text-sm">{PERSONAL_INFO.name}</h3>
                      <p className="text-[11px] text-sky-400 font-medium">Meta & TikTok Ads Strategist</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating KPI Badge 1: Peak ROAS (Top Right) */}
              <div
                className={`absolute -top-4 -right-4 sm:-right-6 p-3 rounded-2xl border backdrop-blur-xl shadow-xl flex items-center gap-3 animate-bounce-slow transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/20 cursor-pointer ${
                  theme === 'dark' ? 'bg-slate-900/95 border-sky-500/40 text-white' : 'bg-white/95 border-sky-200 text-slate-900'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">Peak Performance</div>
                  <div className="text-base font-extrabold text-emerald-400">10x ROAS</div>
                </div>
              </div>

              {/* Floating KPI Badge 2: Revenue Generated (Bottom Left) - Moved down so name is clearly visible */}
              <div
                className={`absolute -bottom-12 -left-4 sm:-left-6 p-3.5 rounded-2xl border backdrop-blur-xl shadow-xl flex items-center gap-3 z-20 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-500/20 cursor-pointer ${
                  theme === 'dark' ? 'bg-slate-900/95 border-blue-500/40 text-white' : 'bg-white/95 border-blue-200 text-slate-900'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">Campaign Result</div>
                  <div className="text-base font-extrabold text-sky-400">AED 15,960 Revenue</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="pt-16 flex justify-center">
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`flex flex-col items-center gap-2 text-xs font-semibold transition-colors ${
              theme === 'dark' ? 'text-slate-400 hover:text-sky-400' : 'text-slate-500 hover:text-sky-600'
            }`}
          >
            <span>Scroll to Explore</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-sky-500" />
          </a>
        </div>
      </div>
    </section>
  );
};
