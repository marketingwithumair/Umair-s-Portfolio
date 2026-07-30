import React from 'react';
import { motion } from 'motion/react';
import { Target, Award, CheckCircle2, TrendingUp, BarChart3, Layers, Zap } from 'lucide-react';
import { ThemeMode } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';

interface AboutSectionProps {
  theme: ThemeMode;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ theme }) => {
  const corePillars = [
    {
      icon: <Target className="w-6 h-6 text-sky-500" />,
      title: 'Data-Driven Precision',
      desc: 'Eliminating guesswork by letting pixel telemetry, CAPI purchase signals, and cohort analytics dictate scale.'
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-emerald-500" />,
      title: 'Profit-First ROAS',
      desc: 'Focusing exclusively on bottom-line profitability, net margins, and lowering Cost Per Acquisition (CPA).'
    },
    {
      icon: <Layers className="w-6 h-6 text-blue-500" />,
      title: 'High-Velocity Creative Hooks',
      desc: 'Scripting and testing 3-second visual hooks that stop doom-scrolling and compel impulse purchases.'
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      title: 'Full-Funnel CRO & AOV',
      desc: 'Aligning Meta/TikTok ad creative directly with Shopify post-click landing experience and bundle upsells.'
    },
  ];

  const statCounters = [
    { number: '2', label: 'Years Experience', detail: 'Dedicated Performance Marketing' },
    { number: '10x', label: 'Peak ROAS Achieved', detail: 'In 2-Year Professional Period' },
    { number: '50+', label: 'Campaigns Managed', detail: 'Meta & TikTok Ads' },
    { number: '100%', label: 'Attribution Clarity', detail: 'Server-Side CAPI & GA4' },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-sky-500 bg-sky-500/10 border border-sky-500/20">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Professional Profile</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Behind the Growth Strategies
          </h2>
          <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            Turning ad budgets into predictable, scalable revenue engines for modern e-commerce brands.
          </p>
        </motion.div>

        {/* Story & Counters Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Main Story Box */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className={`lg:col-span-7 p-6 sm:p-8 rounded-3xl border backdrop-blur-xl space-y-6 ${
              theme === 'dark'
                ? 'bg-slate-900/80 border-slate-800 shadow-xl'
                : 'bg-white/80 border-slate-200 shadow-md'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-sky-500/40 shadow-lg shadow-sky-500/10 group">
                <img
                  src={PERSONAL_INFO.photoUrl}
                  alt={`${PERSONAL_INFO.name} - Performance Marketing Specialist`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className={`text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  About Me
                </h3>
                <p className="text-xs font-semibold text-sky-500 mt-1">
                  Performance Marketing Specialist • {PERSONAL_INFO.location}
                </p>
              </div>
            </div>

            <p className={`text-base leading-relaxed font-normal ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
              {PERSONAL_INFO.aboutFull}
            </p>

            <div className="pt-4 border-t border-slate-700/30 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-sky-500 shrink-0" />
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                  Meta & TikTok Ads Specialist
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-sky-500 shrink-0" />
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                  Shopify & CRO Strategist
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-sky-500 shrink-0" />
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                  CAPI Server-Side Tracking
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-sky-500 shrink-0" />
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                  Data-Driven Budget Allocation
                </span>
              </div>
            </div>
          </motion.div>

          {/* Animated Counters 2x2 Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {statCounters.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`p-6 rounded-2xl border backdrop-blur-xl flex flex-col justify-between hover:scale-[1.04] hover:-translate-y-1 hover:border-sky-500/40 hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300 cursor-default ${
                  theme === 'dark'
                    ? 'bg-slate-900/60 border-slate-800 text-white'
                    : 'bg-white/80 border-slate-200 text-slate-900 shadow-xs'
                }`}
              >
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600 mb-1">
                    {item.number}
                  </div>
                  <div className={`text-sm font-bold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
                    {item.label}
                  </div>
                </div>
                <div className={`text-xs mt-3 font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  {item.detail}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {corePillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: idx * 0.09, ease: [0.16, 1, 0.3, 1] }}
              className={`p-6 rounded-2xl border backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1.5 hover:border-sky-500/40 hover:shadow-xl hover:shadow-sky-500/10 group cursor-default ${
                theme === 'dark'
                  ? 'bg-slate-900/50 border-slate-800'
                  : 'bg-white/60 border-slate-200 shadow-sm'
              }`}
            >
              <div className="p-3 rounded-xl bg-sky-500/10 w-fit mb-4 group-hover:scale-110 group-hover:bg-sky-500/20 transition-all duration-300">{pillar.icon}</div>
              <h4 className={`text-base font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {pillar.title}
              </h4>
              <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
