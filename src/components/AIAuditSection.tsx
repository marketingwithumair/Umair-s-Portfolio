import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Bot, TrendingUp, CheckCircle2, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { ThemeMode, AIAuditResult } from '../types';

interface AIAuditSectionProps {
  theme: ThemeMode;
}

export const AIAuditSection: React.FC<AIAuditSectionProps> = ({ theme }) => {
  const [storeName, setStoreName] = useState('');
  const [storeCategory, setStoreCategory] = useState('Beauty & Skincare');
  const [currentMonthlySpend, setCurrentMonthlySpend] = useState('$2,000');
  const [currentROAS, setCurrentROAS] = useState('2.2x');
  const [goal, setGoal] = useState('Scale to 5x+ ROAS and lower CPA');

  const [loading, setLoading] = useState(false);
  const [auditResult, setAuditResult] = useState<AIAuditResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRunAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/ai-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storeName,
          storeCategory,
          currentMonthlySpend,
          currentROAS,
          goal,
        }),
      });

      const data = await res.json();
      if (data.success && data.audit) {
        setAuditResult(data.audit);
      } else {
        throw new Error(data.error || 'Failed to generate audit');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Could not run automated audit. Please try again or book a direct consultation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="audit" className="py-24 relative overflow-hidden scroll-mt-20 sm:scroll-mt-24">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-sky-500/10 to-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-sky-400 bg-sky-500/10 border border-sky-500/20">
            <Bot className="w-4 h-4" />
            <span>Interactive AI Tool</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Instant E-commerce Ad Performance Audit
          </h2>

          <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            Enter your current ad metrics to receive an instant, AI-generated campaign diagnostic and scaling roadmap.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`lg:col-span-5 p-6 sm:p-8 rounded-3xl border backdrop-blur-xl ${
              theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200 shadow-md'
            }`}
          >
            <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Enter Store & Ad Details
            </h3>

            <form onSubmit={handleRunAudit} className="space-y-4">
              <div>
                <label className={`block text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                  Brand / Store Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Silk & Glow Beauty"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                    theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    Niche / Category
                  </label>
                  <select
                    value={storeCategory}
                    onChange={(e) => setStoreCategory(e.target.value)}
                    className={`w-full px-3 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                      theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value="Beauty & Skincare">Beauty & Skincare</option>
                    <option value="Apparel & Fashion">Apparel & Fashion</option>
                    <option value="Health & Supplements">Health & Supplements</option>
                    <option value="Gadgets & Electronics">Gadgets & Electronics</option>
                    <option value="Home & Lifestyle">Home & Lifestyle</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    Monthly Ad Spend
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="$2,000"
                    value={currentMonthlySpend}
                    onChange={(e) => setCurrentMonthlySpend(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                      theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    Current ROAS
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="2.2x"
                    value={currentROAS}
                    onChange={(e) => setCurrentROAS(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                      theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    Target Growth Goal
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Scale to 5x+ ROAS"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                      theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-md shadow-sky-500/20 hover:shadow-lg hover:shadow-sky-500/35 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-60 transition-all duration-300"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing Ad Data with Gemini AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate AI Performance Audit</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Audit Result Display Side */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`lg:col-span-7 p-6 sm:p-8 rounded-3xl border backdrop-blur-xl min-h-[420px] flex flex-col justify-between ${
              theme === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-white/90 border-slate-200 shadow-md'
            }`}
          >
            {auditResult ? (
              <div className="space-y-6">
                {/* Result Top Badges */}
                <div className="flex items-center justify-between border-b border-slate-700/20 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      Audit Result Ready
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    AI PROJECTION MODEL V2.6
                  </span>
                </div>

                {/* Metrics Callout */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                    <div className="text-[11px] text-emerald-400 font-bold uppercase">Projected Scaled ROAS</div>
                    <div className="text-2xl font-extrabold text-emerald-400 mt-1">{auditResult.projectedROAS}</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20">
                    <div className="text-[11px] text-sky-400 font-bold uppercase">Estimated Revenue Lift</div>
                    <div className="text-2xl font-extrabold text-sky-400 mt-1">{auditResult.estimatedRevenueLift}</div>
                  </div>
                </div>

                {/* Quick Wins Checklist */}
                <div className="space-y-2">
                  <h4 className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    Recommended Immediate Action Steps
                  </h4>
                  <div className="space-y-2">
                    {auditResult.quickWins.map((win, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs ${
                          theme === 'dark' ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{win}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Executive Summary */}
                <div className={`p-4 rounded-2xl border ${
                  theme === 'dark' ? 'bg-slate-950/80 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}>
                  <h5 className="text-xs font-bold text-sky-400 mb-1">Umair's Growth Strategy Summary</h5>
                  <p className="text-xs leading-relaxed">{auditResult.recommendedStrategy}</p>
                </div>
              </div>
            ) : (
              <div className="my-auto text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mx-auto">
                  <Bot className="w-8 h-8" />
                </div>
                <div>
                  <h4 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    Ready to Analyze Your Campaigns
                  </h4>
                  <p className={`text-xs max-w-sm mx-auto mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    Fill in your ad stats on the left and click 'Generate AI Performance Audit' to receive instant customized insights.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
