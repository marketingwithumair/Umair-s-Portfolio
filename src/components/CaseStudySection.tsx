import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Target,
  ShieldAlert,
  BarChart2,
  CheckCircle,
  HelpCircle,
  Zap,
  Award,
  Layers,
  Sparkles,
  Eye,
  MousePointer
} from 'lucide-react';
import { ThemeMode } from '../types';
import { FEATURED_CASE_STUDY } from '../data/portfolioData';

interface CaseStudySectionProps {
  theme: ThemeMode;
}

export const CaseStudySection: React.FC<CaseStudySectionProps> = ({ theme }) => {
  const [activeTab, setActiveTab] = useState<'strategy' | 'challenge' | 'role' | 'results' | 'takeaways'>('strategy');

  const cs = FEATURED_CASE_STUDY;

  return (
    <section id="casestudy" className="py-24 relative overflow-hidden scroll-mt-20 sm:scroll-mt-24">
      {/* Glow background */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Badge & Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
            <Award className="w-4 h-4" />
            <span>Featured E-commerce Case Study</span>
          </div>

          <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            {cs.title}
          </h2>

          <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
            {cs.subtitle}
          </p>

          {/* Confidentiality Notice */}
          <div
            className={`p-3.5 rounded-2xl border text-xs leading-relaxed max-w-2xl mx-auto flex items-start gap-3 ${
              theme === 'dark'
                ? 'bg-slate-900/90 border-slate-800 text-slate-300'
                : 'bg-amber-50/80 border-amber-200 text-amber-900 shadow-xs'
            }`}
          >
            <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <span>{cs.confidentialityNotice}</span>
          </div>
        </motion.div>

        {/* Top 6 KPI Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {cs.summaryMetrics.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className={`p-5 rounded-2xl border backdrop-blur-xl flex flex-col justify-between transition-all hover:scale-[1.03] ${
                m.highlight
                  ? theme === 'dark'
                    ? 'bg-gradient-to-b from-emerald-950/60 to-slate-900/90 border-emerald-500/40 text-white shadow-lg shadow-emerald-500/10'
                    : 'bg-gradient-to-b from-emerald-50 to-white border-emerald-300 text-slate-900 shadow-sm'
                  : theme === 'dark'
                  ? 'bg-slate-900/70 border-slate-800 text-white'
                  : 'bg-white/80 border-slate-200 text-slate-900 shadow-xs'
              }`}
            >
              <div>
                <div className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase mb-1">{m.label}</div>
                <div
                  className={`text-2xl font-extrabold tracking-tight ${
                    m.highlight ? 'text-emerald-400' : theme === 'dark' ? 'text-sky-400' : 'text-sky-600'
                  }`}
                >
                  {m.value}
                </div>
              </div>
              {m.subtext && (
                <div className={`text-[10px] mt-2 font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  {m.subtext}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Full Campaign Metrics Ledger Card */}
        <div
          className={`mb-12 p-6 sm:p-8 rounded-3xl border backdrop-blur-xl ${
            theme === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-white/90 border-slate-200 shadow-md'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Full Campaign Metrics Ledger
              </h3>
              <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                Key performance metrics from the scaling campaign
              </p>
            </div>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
              theme === 'dark' ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
            }`}>
              Verified Campaign Performance
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Ad Spend', val: cs.allMetrics.adSpend, icon: <DollarSign className="w-4 h-4 text-sky-400" /> },
              { label: 'Total Revenue', val: cs.allMetrics.revenue, icon: <TrendingUp className="w-4 h-4 text-emerald-400" /> },
              { label: 'Purchases', val: cs.allMetrics.purchases, icon: <ShoppingBag className="w-4 h-4 text-sky-400" /> },
              { label: 'ROAS', val: cs.allMetrics.roas, icon: <Award className="w-4 h-4 text-emerald-400" /> },
              { label: 'CPA', val: cs.allMetrics.cpa, icon: <Target className="w-4 h-4 text-sky-400" /> },
              { label: 'CTR', val: cs.allMetrics.ctr, icon: <MousePointer className="w-4 h-4 text-amber-400" /> },
              { label: 'CPC', val: cs.allMetrics.cpc, icon: <BarChart2 className="w-4 h-4 text-sky-400" /> },
              { label: 'Reach', val: cs.allMetrics.reach, icon: <Eye className="w-4 h-4 text-slate-400" /> },
            ].map((row, rIdx) => (
              <div
                key={rIdx}
                className={`p-4 rounded-2xl border flex flex-col justify-between ${
                  theme === 'dark' ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50/80 border-slate-200/80'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {row.icon}
                  <span className={`text-xs font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{row.label}</span>
                </div>
                <span className="font-extrabold text-base text-sky-400">{row.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Strategy / Challenge / Role / Takeaways Detailed Tabs */}
        <div
          className={`p-8 rounded-3xl border backdrop-blur-xl ${
            theme === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-white/90 border-slate-200 shadow-xl'
          }`}
        >
          {/* Tab Selection Row */}
          <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-slate-700/30 mb-6">
            {[
              { id: 'strategy', label: 'Scaling Strategy' },
              { id: 'challenge', label: 'Challenge & Gaps' },
              { id: 'role', label: 'Umair\'s Direct Role' },
              { id: 'results', label: 'Verified Results' },
              { id: 'takeaways', label: 'Key Takeaways' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === t.id
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/20'
                    : theme === 'dark'
                    ? 'bg-slate-800/60 text-slate-400 hover:text-white'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Active Tab Content */}
          <div className="space-y-4">
            {activeTab === 'strategy' && (
              <div className="space-y-4">
                <h4 className={`text-xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  Strategic Framework Executed
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cs.strategy.map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border flex items-start gap-3 ${
                        theme === 'dark' ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400 shrink-0 font-bold text-xs mt-0.5">
                        0{idx + 1}
                      </div>
                      <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'challenge' && (
              <div className="space-y-4">
                <h4 className={`text-xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  Initial Obstacles & Baseline Gaps
                </h4>
                <div className="space-y-3">
                  {cs.challenge.map((ch, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border flex items-start gap-3 ${
                        theme === 'dark' ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <HelpCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                        {ch}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'role' && (
              <div className="space-y-4">
                <h4 className={`text-xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  Specific Execution Responsibilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {cs.role.map((r, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border flex items-center gap-3 ${
                        theme === 'dark' ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <CheckCircle className="w-4 h-4 text-sky-500 shrink-0" />
                      <span className={`text-xs font-semibold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
                        {r}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'results' && (
              <div className="space-y-4">
                <h4 className={`text-xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  Measurable Business Outcomes
                </h4>
                <div className="space-y-3">
                  {cs.results.map((res, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border flex items-start gap-3 ${
                        theme === 'dark' ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-emerald-50/80 border-emerald-200'
                      }`}
                    >
                      <TrendingUp className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <p className={`text-xs leading-relaxed font-semibold ${theme === 'dark' ? 'text-emerald-300' : 'text-emerald-900'}`}>
                        {res}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'takeaways' && (
              <div className="space-y-4">
                <h4 className={`text-xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  Actionable Insights for Other Brands
                </h4>
                <div className="space-y-3">
                  {cs.keyTakeaways.map((tk, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border flex items-start gap-3 ${
                        theme === 'dark' ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <Zap className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                      <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                        {tk}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
