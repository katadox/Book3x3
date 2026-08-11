import React, { useState } from 'react';
import type { Book, CustomizationSettings } from '../types/book';
import { exportGridToCanvas } from '../utils/exportGrid';
import confetti from 'canvas-confetti';
import { Download, Share2, Copy, Check, Loader2, AlertCircle } from 'lucide-react';

interface ExportControlsProps {
  books: (Book | null)[];
  settings: CustomizationSettings;
  onChangeSettings: (updated: Partial<CustomizationSettings>) => void;
}

export const ExportControls: React.FC<ExportControlsProps> = ({
  books,
  settings,
  onChangeSettings,
}) => {
  const [format, setFormat] = useState<'png' | 'jpeg'>('png');
  const [isExporting, setIsExporting] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const activeCount = books.filter((b) => b !== null).length;
  const isGridEmpty = activeCount === 0;

  const handleDownload = async () => {
    setIsExporting(true);
    setErrorMsg(null);

    try {
      const targetSize = settings.resolution === '2048' ? 2048 : 1080;
      const canvas = await exportGridToCanvas(books, settings, targetSize);
      const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';

      const safeTitle = settings.customTitle
        ? settings.customTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')
        : 'book3x3';
      
      const fileName = `${safeTitle}_${targetSize}x${targetSize}.${format === 'jpeg' ? 'jpg' : 'png'}`;

      // Convert canvas to Blob URL to bypass browser base64 Data URI length limits (especially for 2K)
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setErrorMsg('Could not create image blob for export.');
            setIsExporting(false);
            return;
          }

          const blobUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = fileName;
          link.href = blobUrl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // Clean up Object URL after download starts
          setTimeout(() => URL.revokeObjectURL(blobUrl), 30000);

          try {
            confetti({
              particleCount: 60,
              spread: 70,
              origin: { y: 0.7 },
              colors: ['#dfa649', '#6366f1', '#ec4899', '#10b981'],
            });
          } catch {
            // Optional confetti
          }

          setIsExporting(false);
        },
        mimeType,
        0.95
      );
    } catch (err: any) {
      console.error('Export error:', err);
      setErrorMsg('Could not render image export. Please try again.');
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        const targetSize = 1080;
        const canvas = await exportGridToCanvas(books, settings, targetSize);
        canvas.toBlob(async (blob) => {
          if (!blob) return;
          const file = new File([blob], 'my_book3x3.png', { type: 'image/png' });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: settings.customTitle || 'Book3x3 Grid',
              text: 'Check out my 3×3 reading list grid created with Book3x3!',
              files: [file],
            });
          } else {
            await navigator.share({
              title: 'Book3x3 Grid',
              text: 'Check out my 3×3 reading list grid!',
              url: window.location.href,
            });
          }
        }, 'image/png');
      } catch {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="space-y-5 rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-2xl backdrop-blur-xl">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Download className="h-5 w-5 text-amber-400" />
          <h3 className="font-serif text-lg font-bold text-white">Export & Share</h3>
        </div>
        <span className="text-xs text-slate-400 font-mono">
          {settings.resolution} × {settings.resolution} px
        </span>
      </div>

      {activeCount < 9 && !isGridEmpty && (
        <div className="flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-300">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>Tip: Add all 9 books to fill your grid before exporting! ({activeCount}/9 selected)</span>
        </div>
      )}

      {errorMsg && (
        <div className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Resolution & Format Pickers */}
      <div className="grid grid-cols-2 gap-3">
        
        {/* Resolution */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Resolution</label>
          <div className="grid grid-cols-2 gap-1 rounded-xl bg-slate-950 p-1 border border-slate-800">
            <button
              onClick={() => onChangeSettings({ resolution: '1080' })}
              className={`rounded-lg py-1.5 text-xs font-bold transition-all ${
                settings.resolution === '1080' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              1080p
            </button>
            <button
              onClick={() => onChangeSettings({ resolution: '2048' })}
              className={`rounded-lg py-1.5 text-xs font-bold transition-all ${
                settings.resolution === '2048' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              2K (2048)
            </button>
          </div>
        </div>

        {/* Format */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">File Format</label>
          <div className="grid grid-cols-2 gap-1 rounded-xl bg-slate-950 p-1 border border-slate-800">
            <button
              onClick={() => setFormat('png')}
              className={`rounded-lg py-1.5 text-xs font-bold transition-all ${
                format === 'png' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              PNG
            </button>
            <button
              onClick={() => setFormat('jpeg')}
              className={`rounded-lg py-1.5 text-xs font-bold transition-all ${
                format === 'jpeg' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              JPG
            </button>
          </div>
        </div>
      </div>

      {/* Main Download CTA */}
      <button
        disabled={isExporting}
        onClick={handleDownload}
        className={`flex w-full items-center justify-center gap-3 rounded-xl py-3.5 px-4 text-sm font-extrabold transition-all shadow-glow ${
          !isExporting
            ? 'bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-slate-950 hover:shadow-glow-lg hover:scale-[1.01] active:scale-[0.99]'
            : 'bg-slate-800 text-slate-500 cursor-not-allowed shadow-none'
        }`}
      >
        {isExporting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Generating High-Res {settings.resolution}×{settings.resolution} Image...</span>
          </>
        ) : (
          <>
            <Download className="h-5 w-5" />
            <span>Download {format.toUpperCase()} ({settings.resolution}×{settings.resolution})</span>
          </>
        )}
      </button>

      {/* Secondary Share Button */}
      <div className="flex gap-2">
        <button
          onClick={handleShare}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 py-2.5 px-4 text-xs font-semibold text-slate-200 hover:border-amber-500/40 hover:bg-slate-700 transition-all"
        >
          <Share2 className="h-4 w-4 text-amber-400" />
          <span>Share 3×3 Grid</span>
        </button>

        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:border-amber-500/40 hover:bg-slate-700 transition-all"
        >
          {copiedLink ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4 text-slate-400" />}
          <span>{copiedLink ? 'Copied Link!' : 'Copy Link'}</span>
        </button>
      </div>
    </div>
  );
};
