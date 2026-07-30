import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Award } from 'lucide-react';
import { ThemeMode } from '../types';
import { TIMELINE_DATA } from '../data/portfolioData';

interface ExperienceTimelineProps {
  theme: ThemeMode;
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ theme }) => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-sky-500 bg-sky-500/10 border border-sky-500/20">
            <Briefcase className="w-4 h-4" />
            <span>Career Journey</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Professional Experience Timeline
          </h2>

          <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            A track record of managing high-budget campaigns, streamlining e-commerce operations, and driving growth.
          </p>
        </motion.div>

        {/* Vertical Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Middle Line */}
          <div
            className={`absolute top-0 bottom-0 left-4 sm:left-1/2 -translate-x-1/2 w-0.5 ${
              theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'
            }`}
          />

          <div className="space-y-8 sm:space-y-12">
            {TIMELINE_DATA.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex flex-col sm:flex-row items-start"
                >
                  {/* Timeline Node Badge */}
                  <div
                    className={`absolute left-4 sm:left-1/2 -translate-x-1/2 top-1.5 sm:top-2 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-bold text-xs border z-20 shadow-md ${
                      item.isCurrent
                        ? 'bg-sky-500 text-white border-sky-300 ring-4 ring-sky-500/20'
                        : theme === 'dark'
                        ? 'bg-slate-900 text-slate-300 border-slate-700'
                        : 'bg-white text-slate-700 border-slate-300'
                    }`}
                  >
                    0{idx + 1}
                  </div>

                  {/* Card Container */}
                  <div
                    className={`pl-10 sm:pl-0 ml-0 sm:ml-0 w-full sm:w-1/2 ${
                      isEven ? 'sm:pr-10 sm:text-left' : 'sm:pl-10 sm:ml-auto'
                    }`}
                  >
                    <div
                      className={`group p-4 sm:p-6 rounded-2xl sm:rounded-3xl border backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1.5 hover:shadow-xl hover:shadow-sky-500/10 ${
                        theme === 'dark'
                          ? 'bg-slate-900/80 border-slate-800 hover:border-sky-500/40'
                          : 'bg-white/90 border-slate-200 hover:border-sky-300 shadow-md'
                      }`}
                    >
                      {/* Company Name & Role Header */}
                      <div className="space-y-1.5 mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                            {item.company}
                          </span>
                          {item.isCurrent && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              CURRENT ROLE
                            </span>
                          )}
                        </div>

                        <h3 className={`text-base sm:text-lg font-extrabold leading-snug ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                          {item.role}
                        </h3>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 pt-0.5">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                            <span>{item.period}</span>
                          </div>
                          {item.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                              <span>{item.location}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Responsibilities */}
                      <div className="space-y-2 mb-4 text-left">
                        <h4 className={`text-[11px] sm:text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                          Key Responsibilities
                        </h4>
                        <ul className="space-y-1.5">
                          {item.responsibilities.map((resp, rIdx) => (
                            <li key={rIdx} className="flex items-start gap-2 text-xs leading-normal">
                              <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                              <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Key Achievements */}
                      <div className="space-y-2 mb-4 text-left pt-3 border-t border-slate-700/20">
                        <h4 className={`text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1`}>
                          <Award className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>Key Achievements</span>
                        </h4>
                        <ul className="space-y-1">
                          {item.achievements.map((ach, aIdx) => (
                            <li key={aIdx} className={`text-xs font-semibold leading-normal ${theme === 'dark' ? 'text-emerald-300' : 'text-emerald-800'}`}>
                              • {ach}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Skill Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className={`text-[10px] px-2.5 py-1 rounded-md font-medium ${
                              theme === 'dark' ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
