import React, { useState, useEffect, useRef } from 'react';
import { Download, X, Check, Image as ImageIcon, Sparkles, Monitor, Sun, Moon, Square, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import brandStudioJpgV1 from '../assets/images/umair_zafar_logo_1790337749688.jpg';
import brandStudioJpgV2 from '../assets/images/studio_render_v2_1790338241815.jpg';

interface LogoExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
}

type ExportVariant = 'studio-master-v2' | 'studio-master-v1' | 'dark-banner' | 'light-banner' | 'square-avatar';

export const LogoExportModal: React.FC<LogoExportModalProps> = ({
  isOpen,
  onClose,
  theme,
}) => {
  const [selectedVariant, setSelectedVariant] = useState<ExportVariant>('studio-master-v2');
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [previewDataUrl, setPreviewDataUrl] = useState<string>('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Generate canvas render for vector-perfect high-resolution export
  useEffect(() => {
    if (!isOpen) return;

    if (selectedVariant === 'studio-master-v2') {
      setPreviewDataUrl(brandStudioJpgV2);
      return;
    }

    if (selectedVariant === 'studio-master-v1') {
      setPreviewDataUrl(brandStudioJpgV1);
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (selectedVariant === 'square-avatar') {
      // 1600 x 1600 High-Res Square
      canvas.width = 1600;
      canvas.height = 1600;

      // Dark background with gradient
      const bgGrad = ctx.createRadialGradient(800, 800, 100, 800, 800, 1100);
      bgGrad.addColorStop(0, '#0f172a');
      bgGrad.addColorStop(1, '#020617');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1600, 1600);

      // Subtle cyan glow behind badge
      const glowGrad = ctx.createRadialGradient(800, 620, 50, 800, 620, 450);
      glowGrad.addColorStop(0, 'rgba(56, 189, 248, 0.25)');
      glowGrad.addColorStop(1, 'rgba(2, 6, 23, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(200, 100, 1200, 1000);

      // Draw Monogram Badge Container
      const badgeSize = 520;
      const badgeX = 800 - badgeSize / 2;
      const badgeY = 360;
      const badgeRadius = 120;

      // Badge Background
      ctx.save();
      ctx.shadowColor = 'rgba(2, 132, 199, 0.45)';
      ctx.shadowBlur = 50;
      ctx.shadowOffsetY = 20;

      const badgeBg = ctx.createLinearGradient(badgeX, badgeY, badgeX + badgeSize, badgeY + badgeSize);
      badgeBg.addColorStop(0, '#1e293b');
      badgeBg.addColorStop(1, '#090d16');
      ctx.fillStyle = badgeBg;
      roundRect(ctx, badgeX, badgeY, badgeSize, badgeSize, badgeRadius);
      ctx.fill();
      ctx.restore();

      // Badge Border
      ctx.lineWidth = 10;
      ctx.strokeStyle = '#38bdf8';
      roundRect(ctx, badgeX, badgeY, badgeSize, badgeSize, badgeRadius);
      ctx.stroke();

      // Letters U and Z
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '900 240px system-ui, -apple-system, sans-serif';

      // 'U'
      const uGrad = ctx.createLinearGradient(badgeX + 80, badgeY + 100, badgeX + 240, badgeY + 400);
      uGrad.addColorStop(0, '#38bdf8');
      uGrad.addColorStop(0.5, '#2563eb');
      uGrad.addColorStop(1, '#1d4ed8');
      ctx.fillStyle = uGrad;
      ctx.fillText('U', badgeX + 175, badgeY + badgeSize / 2 + 15);

      // 'Z'
      const zGrad = ctx.createLinearGradient(badgeX + 240, badgeY + 100, badgeX + 440, badgeY + 400);
      zGrad.addColorStop(0, '#38bdf8');
      zGrad.addColorStop(1, '#34d399');
      ctx.fillStyle = zGrad;
      ctx.fillText('Z', badgeX + 345, badgeY + badgeSize / 2 + 15);

      // Name: "Umair Zafar"
      ctx.font = '800 96px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(PERSONAL_INFO.name, 800, 1080);

      // Designation
      ctx.font = '700 42px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = '#38bdf8';
      ctx.letterSpacing = '6px';
      ctx.fillText('PERFORMANCE MARKETER', 800, 1170);

      // Sub-designation
      ctx.font = '500 32px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.letterSpacing = '3px';
      ctx.fillText('Meta Ads Expert • Shopify Growth Strategist', 800, 1240);

    } else {
      // 3000 x 1200 High-Res Horizontal Lockup Banner
      canvas.width = 3000;
      canvas.height = 1200;

      const isDark = selectedVariant === 'dark-banner';

      if (isDark) {
        // Deep modern dark background
        const bgGrad = ctx.createRadialGradient(1500, 600, 200, 1500, 600, 1800);
        bgGrad.addColorStop(0, '#0b1329');
        bgGrad.addColorStop(0.6, '#060a14');
        bgGrad.addColorStop(1, '#020617');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 3000, 1200);

        // Soft ambient blue glow behind monogram
        const glowGrad = ctx.createRadialGradient(580, 600, 80, 580, 600, 550);
        glowGrad.addColorStop(0, 'rgba(56, 189, 248, 0.22)');
        glowGrad.addColorStop(1, 'rgba(2, 6, 23, 0)');
        ctx.fillStyle = glowGrad;
        ctx.fillRect(100, 100, 1000, 1000);
      } else {
        // Crisp clean white studio background
        const bgGrad = ctx.createLinearGradient(0, 0, 3000, 1200);
        bgGrad.addColorStop(0, '#ffffff');
        bgGrad.addColorStop(1, '#f8fafc');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 3000, 1200);

        // Subtle decorative border line
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#e2e8f0';
        ctx.strokeRect(40, 40, 2920, 1120);
      }

      // Draw Monogram Badge
      const badgeSize = 520;
      const badgeX = 320;
      const badgeY = 600 - badgeSize / 2;
      const badgeRadius = 125;

      ctx.save();
      ctx.shadowColor = isDark ? 'rgba(2, 132, 199, 0.4)' : 'rgba(2, 132, 199, 0.25)';
      ctx.shadowBlur = 60;
      ctx.shadowOffsetY = 24;

      const badgeBg = ctx.createLinearGradient(badgeX, badgeY, badgeX + badgeSize, badgeY + badgeSize);
      if (isDark) {
        badgeBg.addColorStop(0, '#1e293b');
        badgeBg.addColorStop(1, '#090d16');
      } else {
        badgeBg.addColorStop(0, '#ffffff');
        badgeBg.addColorStop(1, '#f1f5f9');
      }
      ctx.fillStyle = badgeBg;
      roundRect(ctx, badgeX, badgeY, badgeSize, badgeSize, badgeRadius);
      ctx.fill();
      ctx.restore();

      // Outer Stroke
      ctx.lineWidth = 12;
      ctx.strokeStyle = isDark ? '#38bdf8' : '#0284c7';
      roundRect(ctx, badgeX, badgeY, badgeSize, badgeSize, badgeRadius);
      ctx.stroke();

      // Inner subtle border
      ctx.lineWidth = 3;
      ctx.strokeStyle = isDark ? 'rgba(56, 189, 248, 0.3)' : 'rgba(2, 132, 199, 0.2)';
      roundRect(ctx, badgeX + 24, badgeY + 24, badgeSize - 48, badgeSize - 48, badgeRadius - 16);
      ctx.stroke();

      // Monogram Letters U & Z
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '900 240px system-ui, -apple-system, sans-serif';

      // 'U'
      const uGrad = ctx.createLinearGradient(badgeX + 80, badgeY + 100, badgeX + 240, badgeY + 400);
      uGrad.addColorStop(0, '#38bdf8');
      uGrad.addColorStop(0.5, '#2563eb');
      uGrad.addColorStop(1, '#1d4ed8');
      ctx.fillStyle = uGrad;
      ctx.fillText('U', badgeX + 175, badgeY + badgeSize / 2 + 15);

      // 'Z'
      const zGrad = ctx.createLinearGradient(badgeX + 240, badgeY + 100, badgeX + 440, badgeY + 400);
      zGrad.addColorStop(0, '#38bdf8');
      zGrad.addColorStop(1, '#34d399');
      ctx.fillStyle = zGrad;
      ctx.fillText('Z', badgeX + 345, badgeY + badgeSize / 2 + 15);

      // Text Section: Name & Designation
      const textStartX = 940;

      // Name: "Umair Zafar"
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';
      ctx.font = '900 160px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = isDark ? '#ffffff' : '#0f172a';
      ctx.fillText(PERSONAL_INFO.name, textStartX, 540);

      // Primary Designation: "PERFORMANCE MARKETER"
      ctx.font = '800 64px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = isDark ? '#38bdf8' : '#0284c7';
      ctx.letterSpacing = '8px';
      ctx.fillText('PERFORMANCE MARKETER', textStartX, 660);

      // Secondary Specialty: "Meta Ads Expert • Shopify Growth Strategist"
      ctx.font = '600 48px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = isDark ? '#94a3b8' : '#475569';
      ctx.letterSpacing = '3px';
      ctx.fillText('Meta Ads Expert  |  Shopify Growth Strategist', textStartX, 750);

      // Subtle Decorative accent line under designation
      const lineGrad = ctx.createLinearGradient(textStartX, 800, textStartX + 900, 800);
      lineGrad.addColorStop(0, isDark ? '#38bdf8' : '#0284c7');
      lineGrad.addColorStop(0.5, '#2563eb');
      lineGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = lineGrad;
      ctx.fillRect(textStartX, 800, 950, 6);
    }

    const dataUrl = canvas.toDataURL('image/jpeg', 0.98);
    setPreviewDataUrl(dataUrl);
    canvasRef.current = canvas;
  }, [isOpen, selectedVariant]);

  const handleDownload = () => {
    setDownloading(true);

    try {
      const link = document.createElement('a');
      let filename = `Umair_Zafar_Brand_Logo_${selectedVariant}.jpg`;

      if (selectedVariant === 'studio-master-v2') {
        link.href = brandStudioJpgV2;
        link.download = 'Umair_Zafar_Studio_Master_V2.jpg';
      } else if (selectedVariant === 'studio-master-v1') {
        link.href = brandStudioJpgV1;
        link.download = 'Umair_Zafar_Studio_Master_V1.jpg';
      } else if (canvasRef.current) {
        link.href = canvasRef.current.toDataURL('image/jpeg', 0.98);
        link.download = filename;
      } else if (previewDataUrl) {
        link.href = previewDataUrl;
        link.download = filename;
      }

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setDownloading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-4xl rounded-2xl border shadow-2xl overflow-hidden transition-all duration-300 ${
          theme === 'dark' ? 'bg-slate-900 border-slate-700/80 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight">
                Brand Logo & Designation Exporter
              </h2>
              <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                High-Resolution JPG format ready for websites, social media, pitches, and documents
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-colors ${
              theme === 'dark' ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'
            }`}
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Variant Selector Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedVariant('studio-master-v2')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                selectedVariant === 'studio-master-v2'
                  ? 'bg-sky-500 text-white border-sky-400 shadow-md shadow-sky-500/25'
                  : theme === 'dark'
                  ? 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-slate-600'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Studio Render Master V2 (New Edition)</span>
            </button>

            <button
              onClick={() => setSelectedVariant('studio-master-v1')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                selectedVariant === 'studio-master-v1'
                  ? 'bg-sky-500 text-white border-sky-400 shadow-md shadow-sky-500/25'
                  : theme === 'dark'
                  ? 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-slate-600'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Studio Render Master V1</span>
            </button>

            <button
              onClick={() => setSelectedVariant('dark-banner')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                selectedVariant === 'dark-banner'
                  ? 'bg-sky-500 text-white border-sky-400 shadow-md shadow-sky-500/25'
                  : theme === 'dark'
                  ? 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-slate-600'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Dark Studio (3000 x 1200 px)</span>
            </button>

            <button
              onClick={() => setSelectedVariant('light-banner')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                selectedVariant === 'light-banner'
                  ? 'bg-sky-500 text-white border-sky-400 shadow-md shadow-sky-500/25'
                  : theme === 'dark'
                  ? 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-slate-600'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Light Edition (3000 x 1200 px)</span>
            </button>

            <button
              onClick={() => setSelectedVariant('square-avatar')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                selectedVariant === 'square-avatar'
                  ? 'bg-sky-500 text-white border-sky-400 shadow-md shadow-sky-500/25'
                  : theme === 'dark'
                  ? 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-slate-600'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              <Square className="w-3.5 h-3.5" />
              <span>Square Avatar (1600 x 1600 px)</span>
            </button>
          </div>

          {/* High-Resolution Live Preview Container */}
          <div
            className={`relative rounded-xl border overflow-hidden flex items-center justify-center p-4 min-h-[260px] sm:min-h-[320px] transition-colors ${
              theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-100/80 border-slate-200'
            }`}
          >
            {previewDataUrl ? (
              <img
                src={previewDataUrl}
                alt="Umair Zafar Brand Logo Lockup"
                className="max-h-[300px] w-auto max-w-full rounded-lg shadow-xl object-contain"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-slate-400 text-xs">
                <div className="w-6 h-6 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
                <span>Rendering high-resolution vector lockup...</span>
              </div>
            )}

            {/* Resolution Badge Overlay */}
            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md text-[10px] font-semibold bg-slate-950/80 text-sky-400 border border-slate-800 backdrop-blur-md">
              {selectedVariant === 'square-avatar'
                ? '1600 × 1600 px • High-Res JPEG'
                : selectedVariant === 'studio-master-v2'
                ? 'Studio Master V2 (16:9 Ultra-HD JPG)'
                : selectedVariant === 'studio-master-v1'
                ? 'Studio Master V1 (Ultra-HD JPG)'
                : '3000 × 1200 px • 300 DPI High-Res JPEG'}
            </div>
          </div>

          {/* Specs Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className={`p-3 rounded-xl border ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700/60' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[10px] uppercase font-semibold text-sky-500">Logo Mark</div>
              <div className="font-bold mt-0.5">UZ Monogram Badge</div>
              <div className={`text-[11px] mt-0.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                Cyan to Cobalt Ribbon Gradient
              </div>
            </div>

            <div className={`p-3 rounded-xl border ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700/60' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[10px] uppercase font-semibold text-sky-500">Identity Name</div>
              <div className="font-bold mt-0.5">{PERSONAL_INFO.name}</div>
              <div className={`text-[11px] mt-0.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                Bold Executive Typography
              </div>
            </div>

            <div className={`p-3 rounded-xl border ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700/60' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[10px] uppercase font-semibold text-sky-500">Designation</div>
              <div className="font-bold mt-0.5">Performance Marketer</div>
              <div className={`text-[11px] mt-0.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                Meta Ads • Shopify Growth
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t ${
          theme === 'dark' ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            Tip: You can use this image in email signatures, presentations, LinkedIn banners, and print.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-colors ${
                theme === 'dark'
                  ? 'border-slate-700 hover:bg-slate-800 text-slate-300'
                  : 'border-slate-300 hover:bg-slate-200 text-slate-700'
              }`}
            >
              Cancel
            </button>

            <button
              onClick={handleDownload}
              disabled={downloading || !previewDataUrl}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Downloaded JPG!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download High-Res JPG</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Canvas Helper: Round Rectangle
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}
