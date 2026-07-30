import React, { useState } from 'react';
import { X, Lock, UserCheck, TrendingUp, DollarSign, ShoppingBag, BarChart3, AlertCircle, LogOut } from 'lucide-react';
import { ThemeMode, ClientUser } from '../types';

interface ClientPortalModalProps {
  theme: ThemeMode;
  isOpen: boolean;
  onClose: () => void;
}

export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({ theme, isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [clientUser, setClientUser] = useState<ClientUser | null>(null);
  const [liveMetrics, setLiveMetrics] = useState<any>(null);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success && data.client) {
        setClientUser(data.client);
        fetchLiveMetrics();
      } else {
        throw new Error(data.error || 'Authentication failed');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = () => {
    setEmail('client@beautybrand.com');
    setPassword('demo123');
  };

  const fetchLiveMetrics = async () => {
    try {
      const res = await fetch('/api/client-metrics');
      const data = await res.json();
      if (data.success) {
        setLiveMetrics(data.metrics);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    setClientUser(null);
    setLiveMetrics(null);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border p-6 sm:p-8 ${
          theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {!clientUser ? (
          /* Login View */
          <div className="max-w-md mx-auto space-y-6 py-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mx-auto mb-3">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold tracking-tight">Client Portal Authentication</h3>
              <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                Access your real-time Meta & TikTok ad spend, revenue analytics, and campaign performance dashboard.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Client Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="client@beautybrand.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                    theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Access Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                    theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
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
                className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-md shadow-sky-500/20"
              >
                {loading ? 'Authenticating...' : 'Sign In to Client Dashboard'}
              </button>
            </form>

            <div className="pt-4 border-t border-slate-700/20 text-center space-y-2">
              <p className="text-[11px] text-slate-400">Want to test the live client portal instantly?</p>
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-sky-400 bg-sky-500/10 border border-sky-500/20 hover:bg-sky-500/20"
              >
                Auto-fill Demo Credentials (client@beautybrand.com)
              </button>
            </div>
          </div>
        ) : (
          /* Live Dashboard View */
          <div className="space-y-6">
            {/* Dashboard Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-700/20 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{clientUser.name}</h3>
                  <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Live Campaign Feed Connected
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  {clientUser.activeCampaigns} Active Campaigns
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>

            {liveMetrics && (
              <div className="space-y-6">
                {/* Metric Summary Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Revenue</div>
                    <div className="text-xl font-extrabold text-emerald-400 mt-1">
                      AED {liveMetrics.summary.totalRevenue.toLocaleString()}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Ad Spend</div>
                    <div className="text-xl font-extrabold text-sky-400 mt-1">
                      AED {liveMetrics.summary.totalSpend.toLocaleString()}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Account ROAS</div>
                    <div className="text-xl font-extrabold text-emerald-400 mt-1">
                      {liveMetrics.summary.roas}x
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">CPA / Order</div>
                    <div className="text-xl font-extrabold text-sky-400 mt-1">
                      AED {liveMetrics.summary.cpa}
                    </div>
                  </div>
                </div>

                {/* Campaigns List */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                    Active Ad Campaigns Breakdown
                  </h4>
                  <div className="space-y-2">
                    {liveMetrics.campaigns.map((c: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <div className="font-bold text-white">{c.name}</div>
                          <div className="text-[10px] text-sky-400 font-semibold">{c.platform} • Budget {c.budget}</div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div>
                            <div className="text-[10px] text-slate-400">Spend</div>
                            <div className="font-bold text-slate-200">AED {c.spend}</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-slate-400">Revenue</div>
                            <div className="font-bold text-emerald-400">AED {c.revenue}</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-slate-400">ROAS</div>
                            <div className="font-extrabold text-emerald-400">{c.roas}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
