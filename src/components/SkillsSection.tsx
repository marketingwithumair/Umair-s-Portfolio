import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Megaphone, ShoppingBag, Sparkles, BarChart2, Check, Search } from 'lucide-react';
import { ThemeMode } from '../types';
import { SKILL_CATEGORIES } from '../data/portfolioData';

interface SkillsSectionProps {
  theme: ThemeMode;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ theme }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Megaphone':
        return <Megaphone className="w-5 h-5 text-sky-400" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-5 h-5 text-sky-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-sky-400" />;
      case 'BarChart2':
        return <BarChart2 className="w-5 h-5 text-sky-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-sky-400" />;
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-sky-500 bg-sky-500/10 border border-sky-500/20">
            <Sparkles className="w-4 h-4" />
            <span>Technical Mastery</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Skills & Competency Matrix
          </h2>

          <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            Tested proficiency across digital advertising platforms, e-commerce growth tools, and server attribution infrastructure.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto pt-2">
            <div className={`relative flex items-center rounded-2xl border px-3.5 py-2.5 ${
              theme === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input
                type="text"
                placeholder="Search skills (e.g. Meta Ads, CAPI, CRO, Shopify)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full bg-transparent text-xs focus:outline-none ${
                  theme === 'dark' ? 'text-white placeholder-slate-500' : 'text-slate-900 placeholder-slate-400'
                }`}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-xs text-slate-400 hover:text-white px-1"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SKILL_CATEGORIES.map((cat, cIdx) => {
            const filteredSkills = cat.skills.filter((s) =>
              s.name.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (searchTerm && filteredSkills.length === 0) return null;

            return (
              <motion.div
                key={cIdx}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: cIdx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`p-6 sm:p-8 rounded-3xl border backdrop-blur-xl transition-all duration-300 hover:scale-[1.01] hover:-translate-y-1 hover:border-sky-500/40 hover:shadow-xl hover:shadow-sky-500/10 group ${
                  theme === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-white/90 border-slate-200 shadow-md'
                }`}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-700/20">
                  <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/20 group-hover:scale-110 group-hover:bg-sky-500/20 group-hover:border-sky-500/40 transition-all duration-300">
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      {cat.title}
                    </h3>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {cat.skills.length} Specialized Capabilities
                    </span>
                  </div>
                </div>

                {/* Skill Items List */}
                <div className="space-y-5">
                  {filteredSkills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className={theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}>
                          {skill.name}
                        </span>

                        <div className="flex items-center gap-2">
                          {skill.badgeText && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                              {skill.badgeText}
                            </span>
                          )}
                          <span className="text-sky-500 font-extrabold">{skill.level}%</span>
                        </div>
                      </div>

                      {/* Animated Progress Ring / Bar */}
                      <div className={`w-full h-2 rounded-full overflow-hidden ${
                        theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'
                      }`}>
                        <div
                          className="h-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
