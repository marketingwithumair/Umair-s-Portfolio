import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Megaphone,
  Video,
  ShoppingBag,
  Target,
  BarChart3,
  Code,
  Server,
  TrendingUp,
  Sparkles,
  FileSearch,
  Check,
  ChevronRight,
  Layers
} from 'lucide-react';
import { ThemeMode, ServiceItem } from '../types';
import { SERVICES_DATA } from '../data/portfolioData';

interface ServicesSectionProps {
  theme: ThemeMode;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ theme }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'ads' | 'tech' | 'cro'>('all');

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Megaphone':
        return <Megaphone className="w-6 h-6 text-sky-400" />;
      case 'Video':
        return <Video className="w-6 h-6 text-sky-400" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-6 h-6 text-sky-400" />;
      case 'Target':
        return <Target className="w-6 h-6 text-sky-400" />;
      case 'BarChart3':
        return <BarChart3 className="w-6 h-6 text-sky-400" />;
      case 'Code':
        return <Code className="w-6 h-6 text-sky-400" />;
      case 'Server':
        return <Server className="w-6 h-6 text-sky-400" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-sky-400" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-sky-400" />;
      case 'FileSearch':
        return <FileSearch className="w-6 h-6 text-sky-400" />;
      default:
        return <Layers className="w-6 h-6 text-sky-400" />;
    }
  };

  const filteredServices = SERVICES_DATA.filter((s) => {
    if (activeCategory === 'ads') return ['meta-ads', 'tiktok-ads', 'lead-generation', 'creative-strategy'].includes(s.id);
    if (activeCategory === 'tech') return ['pixel-setup', 'capi-setup', 'analytics-tracking'].includes(s.id);
    if (activeCategory === 'cro') return ['shopify-growth', 'cro', 'marketing-audits'].includes(s.id);
    return true;
  });

  return (
    <section id="services" className="py-24 relative overflow-hidden scroll-mt-20 sm:scroll-mt-24">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-sky-500 bg-sky-500/10 border border-sky-500/20">
            <Layers className="w-3.5 h-3.5" />
            <span>Growth Capabilities</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Performance Marketing Services
          </h2>
          <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            Comprehensive paid media, server-side attribution, and conversion optimization solutions tailored for e-commerce growth.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: 'all', label: 'All Services (10)' },
              { id: 'ads', label: 'Paid Advertising' },
              { id: 'tech', label: 'Tracking & CAPI' },
              { id: 'cro', label: 'Shopify & CRO' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 hover:scale-105 active:scale-95 ${
                  activeCategory === tab.id
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20 scale-105'
                    : theme === 'dark'
                    ? 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* 3D Glass Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.08 }}
              className={`group relative rounded-3xl p-6 border backdrop-blur-xl transition-all duration-300 hover:-translate-y-2.5 hover:scale-[1.01] hover:shadow-2xl hover:shadow-sky-500/15 flex flex-col justify-between ${
                theme === 'dark'
                  ? 'bg-slate-900/70 border-slate-800/90 hover:border-sky-500/40 hover:bg-slate-900/90'
                  : 'bg-white/80 border-slate-200/90 hover:border-sky-300 hover:bg-white shadow-sm'
              }`}
            >
              {/* Soft 3D Glow on Hover */}
              <div className="absolute -inset-px bg-gradient-to-r from-sky-500/20 to-blue-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10" />

              <div>
                {/* Top Row Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/20 group-hover:scale-110 group-hover:bg-sky-500/20 group-hover:border-sky-500/40 transition-all duration-300">
                    {getServiceIcon(service.iconName)}
                  </div>
                </div>

                {/* Service Title */}
                <h3 className={`text-xl font-bold tracking-tight mb-2 transition-colors duration-300 group-hover:text-sky-400 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {service.title}
                </h3>

                {/* Description */}
                <p className={`text-xs leading-relaxed mb-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  {service.description}
                </p>

                {/* Checklist Features */}
                <div className="space-y-2 mb-6">
                  {service.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2">
                      <div className="p-0.5 rounded-full bg-sky-500/20 text-sky-400 mt-0.5 shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className={`text-[11px] font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Tags */}
              <div className="pt-4 border-t border-slate-700/20 flex items-center justify-between">
                <div className="flex flex-wrap gap-1 w-full">
                  {service.tags.slice(0, 3).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className={`text-[10px] px-2 py-0.5 rounded-md transition-colors duration-300 ${
                        theme === 'dark' ? 'bg-slate-800/80 text-slate-400 group-hover:text-sky-300' : 'bg-slate-100 text-slate-600 group-hover:text-sky-700'
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
