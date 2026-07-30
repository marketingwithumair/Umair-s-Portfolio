import React, { useState } from 'react';
import { Mail, MessageCircle, Linkedin, MapPin, Copy, Check, ExternalLink, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { ThemeMode } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactSectionProps {
  theme: ThemeMode;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ theme }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const whatsappUrl = `https://wa.me/923171508958?text=${encodeURIComponent(
    'Hi Umair, I came across your portfolio and would love to discuss a growth strategy project.'
  )}`;

  const contactChannels = [
    {
      id: 'email',
      title: 'Direct Email',
      subtitle: 'Fastest response within 24 hours',
      value: PERSONAL_INFO.email,
      href: `mailto:${PERSONAL_INFO.email}`,
      icon: <Mail className="w-6 h-6 text-sky-400" />,
      actionText: 'Send Email',
      isCopyable: true,
      copyValue: PERSONAL_INFO.email,
      badge: 'Primary Contact',
      accentColor: 'from-sky-500/20 via-blue-500/10 to-transparent',
      borderColor: 'border-sky-500/30 hover:border-sky-500/60',
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp Business',
      subtitle: 'Instant chat & quick inquiries',
      value: PERSONAL_INFO.phone,
      href: whatsappUrl,
      icon: <MessageCircle className="w-6 h-6 text-emerald-400" />,
      actionText: 'Chat on WhatsApp',
      isCopyable: true,
      copyValue: PERSONAL_INFO.phone,
      badge: 'Quick Chat',
      accentColor: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      borderColor: 'border-emerald-500/30 hover:border-emerald-500/60',
    },
    {
      id: 'linkedin',
      title: 'LinkedIn Network',
      subtitle: 'Professional profile & case studies',
      value: 'linkedin.com/in/marketingwithumair',
      href: PERSONAL_INFO.linkedIn,
      icon: <Linkedin className="w-6 h-6 text-blue-400" />,
      actionText: 'Connect on LinkedIn',
      isCopyable: false,
      badge: 'Professional',
      accentColor: 'from-blue-500/20 via-indigo-500/10 to-transparent',
      borderColor: 'border-blue-500/30 hover:border-blue-500/60',
    },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden scroll-mt-20 sm:scroll-mt-24">
      {/* Ambient Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Globe className="w-3.5 h-3.5" />
            <span>Direct Communication Channel</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Let's Connect & Build Your <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">Growth Strategy</span>
          </h2>

          <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            Reach out directly through Email, WhatsApp, or LinkedIn for performance ad account reviews, e-commerce scaling, or marketing inquiries.
          </p>
        </motion.div>

        {/* Direct Channels Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {contactChannels.map((channel, idx) => (
            <motion.div
              key={channel.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`group relative rounded-2xl p-6 sm:p-8 border backdrop-blur-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 ${channel.borderColor} ${
                theme === 'dark'
                  ? 'bg-slate-900/60 hover:bg-slate-900/90 shadow-xl shadow-black/30'
                  : 'bg-white/80 hover:bg-white shadow-lg shadow-slate-200/50'
              }`}
            >
              {/* Subtle top background gradient glow */}
              <div className={`absolute top-0 left-0 right-0 h-28 bg-gradient-to-b ${channel.accentColor} rounded-t-2xl pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity`} />

              <div>
                {/* Header row: Icon & Badge */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className={`p-3.5 rounded-xl border ${
                    theme === 'dark' ? 'bg-slate-800/80 border-slate-700/80' : 'bg-slate-100 border-slate-200'
                  }`}>
                    {channel.icon}
                  </div>

                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                    theme === 'dark'
                      ? 'bg-slate-800/60 text-slate-300 border-slate-700'
                      : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}>
                    {channel.badge}
                  </span>
                </div>

                {/* Channel Title & Info */}
                <div className="space-y-2 relative z-10 mb-6">
                  <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {channel.title}
                  </h3>
                  <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    {channel.subtitle}
                  </p>

                  <div className={`mt-3 p-3.5 rounded-xl border font-sans font-semibold text-sm tracking-wide break-all flex items-center justify-between gap-2 ${
                    theme === 'dark' ? 'bg-slate-950/80 border-slate-800 text-sky-300' : 'bg-slate-50 border-slate-200/90 text-sky-800'
                  }`}>
                    <span className="truncate">{channel.value}</span>
                    {channel.isCopyable && (
                      <button
                        onClick={() => copyToClipboard(channel.copyValue, channel.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          copiedKey === channel.id
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : theme === 'dark'
                            ? 'hover:bg-slate-800 text-slate-400 hover:text-white'
                            : 'hover:bg-slate-200 text-slate-500 hover:text-slate-900'
                        }`}
                        title="Copy to clipboard"
                      >
                        {copiedKey === channel.id ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="relative z-10 pt-4 border-t border-slate-700/20 flex flex-col gap-2">
                <a
                  href={channel.href}
                  target={channel.id === 'email' ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 border shadow-sm ${
                    channel.id === 'email'
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white border-sky-400/30 hover:shadow-sky-500/20'
                      : channel.id === 'whatsapp'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white border-emerald-400/30 hover:shadow-emerald-500/20'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white border-blue-400/30 hover:shadow-blue-500/20'
                  }`}
                >
                  <span>{channel.actionText}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Location & Remote Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`rounded-2xl p-6 border backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left ${
            theme === 'dark'
              ? 'bg-slate-900/40 border-slate-800/80 text-slate-300'
              : 'bg-white/70 border-slate-200 text-slate-700 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl border ${
              theme === 'dark' ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-100 border-slate-200'
            }`}>
              <MapPin className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <h4 className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Location & Availability
              </h4>
              <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                Based in {PERSONAL_INFO.location} — Open for remote consultations & global e-commerce client partnerships.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-400">Available for New Projects</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
