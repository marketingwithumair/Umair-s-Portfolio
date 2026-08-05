import React, { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import { ThemeMode } from '../types';

interface CustomCursorProps {
  theme: ThemeMode;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ theme }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Exact raw mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth, fluid spring physics for outer halo ring
  const haloSpringConfig = { stiffness: 320, damping: 26, mass: 0.4 };
  const haloX = useSpring(mouseX, haloSpringConfig);
  const haloY = useSpring(mouseY, haloSpringConfig);

  // Detect touch devices to avoid custom cursor on mobile
  useEffect(() => {
    const checkTouch = () => {
      const hasTouch =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches;
      setIsTouchDevice(hasTouch);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Throttle DOM element check using requestAnimationFrame
      window.requestAnimationFrame(() => {
        const target = e.target as HTMLElement | null;
        if (target) {
          const interactiveEl = target.closest(
            'a, button, input, textarea, select, [role="button"], .cursor-pointer, [data-cursor]'
          ) as HTMLElement | null;

          if (interactiveEl) {
            const customText = interactiveEl.getAttribute('data-cursor-text') || null;
            setIsHovered((prev) => (prev !== true ? true : prev));
            setCursorLabel((prev) => (prev !== customText ? customText : prev));
          } else {
            setIsHovered((prev) => (prev !== false ? false : prev));
            setCursorLabel((prev) => (prev !== null ? null : prev));
          }
        }
      });
    },
    [isVisible, mouseX, mouseY]
  );

  const handleMouseDown = useCallback(() => setIsClicked(true), []);
  const handleMouseUp = useCallback(() => setIsClicked(false), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);
  const handleMouseEnter = useCallback(() => setIsVisible(true), []);

  useEffect(() => {
    if (isTouchDevice) return;

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isTouchDevice, handleMouseMove, handleMouseDown, handleMouseUp, handleMouseLeave, handleMouseEnter]);

  if (isTouchDevice || !isVisible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Executive Smooth Halo Ring */}
      <motion.div
        className={`fixed pointer-events-none flex items-center justify-center rounded-full transition-colors duration-300 -translate-x-1/2 -translate-y-1/2 border ${
          isHovered
            ? theme === 'dark'
              ? 'bg-sky-500/10 border-sky-400'
              : 'bg-sky-500/15 border-sky-600'
            : theme === 'dark'
            ? 'bg-slate-900/20 border-slate-700/60'
            : 'bg-white/30 border-slate-400/50'
        }`}
        style={{
          x: haloX,
          y: haloY,
        }}
        animate={{
          width: isHovered ? (cursorLabel ? 68 : 52) : isClicked ? 20 : 32,
          height: isHovered ? (cursorLabel ? 68 : 52) : isClicked ? 20 : 32,
          scale: isClicked ? 0.8 : 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        <AnimatePresence>
          {cursorLabel && (
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              className={`text-[9px] font-bold tracking-widest uppercase ${
                theme === 'dark' ? 'text-sky-300' : 'text-sky-900'
              }`}
            >
              {cursorLabel}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Core Precision Micro-Dot */}
      <motion.div
        className={`fixed pointer-events-none rounded-full -translate-x-1/2 -translate-y-1/2 ${
          isHovered
            ? 'bg-emerald-400'
            : theme === 'dark'
            ? 'bg-sky-400'
            : 'bg-slate-900'
        }`}
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          width: isHovered ? 6 : isClicked ? 10 : 4,
          height: isHovered ? 6 : isClicked ? 10 : 4,
          opacity: isHovered && cursorLabel ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 700, damping: 32 }}
      />
    </div>
  );
};
