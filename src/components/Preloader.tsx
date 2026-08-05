import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeMode } from '../types';
import { UzMonogram } from './UzMonogram';

interface PreloaderProps {
  theme: ThemeMode;
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ theme, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('Initializing Growth Engine...');
  const isFinishedRef = useRef(false);

  // Helper to safely unlock body scroll and trigger completion callback
  const finishLoading = () => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;
    setProgress(100);
    setStatusMessage('Ready for Growth');

    setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = '';
      if (onComplete) {
        onComplete();
      }
    }, 300);
  };

  useEffect(() => {
    // Lock body scroll during preloader display
    document.body.style.overflow = 'hidden';

    const duration = 1600; // 1.6s smooth duration
    const startTime = performance.now();
    let animationFrameId: number;

    const updateProgress = (currentTime: number) => {
      if (isFinishedRef.current) return;

      const elapsed = currentTime - startTime;
      const calcProgress = Math.min(100, Math.max(0, (elapsed / duration) * 100));

      setProgress(calcProgress);

      if (calcProgress < 30) {
        setStatusMessage('Initializing Growth Engine...');
      } else if (calcProgress < 65) {
        setStatusMessage('Loading Performance Datasets...');
      } else if (calcProgress < 95) {
        setStatusMessage('Optimizing Ad Metrics...');
      } else {
        setStatusMessage('Ready for Growth');
      }

      if (calcProgress >= 100) {
        finishLoading();
      } else {
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    // Absolute fallback timer to ensure preloader NEVER gets stuck under any browser state
    const fallbackTimer = setTimeout(() => {
      finishLoading();
    }, 2000);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(fallbackTimer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = '';
      }}
    >
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1, y: '0%' }}
          exit={{
            y: '-100%',
            opacity: 0.95,
            transition: {
              duration: 0.7,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          onClick={finishLoading}
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-between p-8 sm:p-12 select-none overflow-hidden cursor-pointer ${
            theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-900 text-slate-100'
          }`}
        >
          {/* Ambient Lighting Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/15 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[90px]" />
            <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.07]" />
          </div>

          {/* Top Brand Tag */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative z-10 flex items-center space-x-2 text-xs font-semibold tracking-[0.25em] text-slate-400 uppercase pt-4"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span>Umair Zafar Portfolio</span>
          </motion.div>

          {/* Center Showcase: Monogram & Visual Rings */}
          <div className="relative z-10 flex flex-col items-center justify-center space-y-8 my-auto">
            {/* Monogram Wrapper with Rotating Ambient Rings */}
            <div className="relative flex items-center justify-center p-6">
              {/* Outer Rotating Dashed Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-dashed border-sky-400/30"
              />

              {/* Inner Counter-Rotating Gradient Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-2 rounded-full border border-sky-500/20 border-t-sky-400 border-r-emerald-400/80"
              />

              {/* Pulse Glow Behind Monogram */}
              <motion.div
                animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-3 rounded-2xl bg-gradient-to-tr from-sky-500/30 to-emerald-500/30 blur-md"
              />

              {/* Central Monogram */}
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 shadow-2xl shadow-sky-500/20"
              >
                <UzMonogram size={96} theme="dark" showSubtitle={false} />
              </motion.div>
            </div>

            {/* Name & Title */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center space-y-2"
            >
              <h1 className="text-2xl sm:text-3xl font-black tracking-[0.25em] bg-gradient-to-r from-sky-300 via-sky-400 to-emerald-300 bg-clip-text text-transparent uppercase">
                Umair Zafar
              </h1>
              <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-slate-400 uppercase">
                Performance Marketing Specialist
              </p>
            </motion.div>
          </div>

          {/* Bottom Progress Bar & Percentage */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative z-10 w-full max-w-xs sm:max-w-sm space-y-3 pb-4"
          >
            <div className="flex justify-between items-center text-xs font-semibold tracking-wider text-slate-400">
              <span className="text-sky-400/90 font-mono transition-all duration-300">
                {statusMessage}
              </span>
              <span className="font-mono text-slate-200 tabular-nums">
                {Math.round(progress)}%
              </span>
            </div>

            {/* Progress Track */}
            <div className="h-1.5 w-full bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-slate-700/50 shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-sky-400 via-blue-500 to-emerald-400 rounded-full shadow-[0_0_12px_rgba(56,189,248,0.8)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
