import React from 'react';
import type { CustomizationSettings, LayoutStyle, BackgroundMode, GridSpacing, BorderRadius, FontFamily } from '../types/book';
import { Palette, Type, Sliders, Layout, Eye } from 'lucide-react';

interface CustomizationPanelProps {
  settings: CustomizationSettings;
  onChangeSettings: (updated: Partial<CustomizationSettings>) => void;
}

export const CustomizationPanel: React.FC<CustomizationPanelProps> = ({
  settings,
  onChangeSettings,
}) => {
  const LAYOUT_OPTIONS: { id: LayoutStyle; label: string; desc: string }[] = [
    { id: 'classic', label: 'Classic', desc: 'Balanced card frames with subtle shadows' },
    { id: 'minimal', label: 'Minimal', desc: 'Clean, borderless emphasis on book covers' },
    { id: 'cinematic', label: 'Cinematic', desc: 'Dramatic dark gradients and glowing accents' },
    { id: 'library', label: 'Library', desc: 'Classic bookstore aesthetic with spine shadows' },
    { id: 'poster', label: 'Poster', desc: 'Editorial art poster frame layout' },
  ];

  const BACKGROUND_OPTIONS: { id: BackgroundMode; label: string }[] = [
    { id: 'dark-gradient', label: 'Dark Gradient' },
    { id: 'dark', label: 'Solid Dark' },
    { id: 'sunset', label: 'Warm Sunset' },
    { id: 'light-gradient', label: 'Light Gradient' },
    { id: 'light', label: 'Solid Light' },
    { id: 'custom', label: 'Custom Color' },
  ];

  const FONT_OPTIONS: { id: FontFamily; label: string; fontClass: string }[] = [
    { id: 'serif', label: 'Playfair Serif', fontClass: 'font-serif' },
    { id: 'sans', label: 'Outfit Sans', fontClass: 'font-sans' },
    { id: 'display', label: 'Cinzel Display', fontClass: 'font-display' },
    { id: 'mono', label: 'JetBrains Mono', fontClass: 'font-mono' },
  ];

  const SPACING_OPTIONS: { id: GridSpacing; label: string }[] = [
    { id: 'none', label: 'None' },
    { id: 'small', label: 'Small' },
    { id: 'medium', label: 'Medium' },
    { id: 'large', label: 'Large' },
  ];

  const RADIUS_OPTIONS: { id: BorderRadius; label: string }[] = [
    { id: 'none', label: 'Square' },
    { id: 'small', label: 'Small' },
    { id: 'medium', label: 'Rounded' },
    { id: 'large', label: 'Full Round' },
  ];

  return (
    <div className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-2xl backdrop-blur-xl">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-amber-400" />
          <h3 className="font-serif text-lg font-bold text-white">Customization</h3>
        </div>
      </div>

      {/* 1. Custom Title Input */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Type className="h-4 w-4 text-amber-400" />
          <span>Grid Title</span>
        </label>
        <input
          type="text"
          value={settings.customTitle}
          onChange={(e) => onChangeSettings({ customTitle: e.target.value })}
          placeholder="e.g. My Favorite Books"
          className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
      </div>

      {/* 2. Layout Preset Selection */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Layout className="h-4 w-4 text-amber-400" />
          <span>Layout Preset</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {LAYOUT_OPTIONS.map((layout) => (
            <button
              key={layout.id}
              onClick={() => onChangeSettings({ layoutStyle: layout.id })}
              className={`rounded-xl border p-2.5 text-left active:scale-[0.97] transition-all duration-150 ${
                settings.layoutStyle === layout.id
                  ? 'border-amber-500 bg-amber-500/10 text-amber-300 shadow-sm'
                  : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50'
              }`}
            >
              <span className="block text-xs font-bold">{layout.label}</span>
              <span className="block text-[10px] text-slate-400 line-clamp-1 mt-0.5">{layout.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Background Settings */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Palette className="h-4 w-4 text-amber-400" />
          <span>Background</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {BACKGROUND_OPTIONS.map((bg) => (
            <button
              key={bg.id}
              onClick={() => onChangeSettings({ backgroundMode: bg.id })}
              className={`rounded-xl border py-2 px-2 text-center text-xs font-medium active:scale-[0.97] transition-all duration-150 ${
                settings.backgroundMode === bg.id
                  ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                  : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50'
              }`}
            >
              {bg.label}
            </button>
          ))}
        </div>

        {/* Custom Color Picker input */}
        {settings.backgroundMode === 'custom' && (
          <div className="mt-3 flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950 p-2.5">
            <input
              type="color"
              value={settings.customBackgroundColor}
              onChange={(e) => onChangeSettings({ customBackgroundColor: e.target.value })}
              className="h-8 w-12 cursor-pointer rounded border-0 bg-transparent"
            />
            <span className="font-mono text-xs text-slate-300 uppercase">{settings.customBackgroundColor}</span>
          </div>
        )}
      </div>

      {/* 4. Typography Choice */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Type className="h-4 w-4 text-amber-400" />
          <span>Typography Font</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {FONT_OPTIONS.map((font) => (
            <button
              key={font.id}
              onClick={() => onChangeSettings({ fontFamily: font.id })}
              className={`rounded-xl border py-2.5 px-3 text-left active:scale-[0.97] transition-all duration-150 ${
                settings.fontFamily === font.id
                  ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                  : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
              }`}
            >
              <span className={`text-sm font-semibold block ${font.fontClass}`}>{font.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 5. Grid Spacing & Border Radius */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Spacing */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sliders className="h-4 w-4 text-amber-400" />
            <span>Grid Spacing</span>
          </label>
          <div className="grid grid-cols-4 gap-1">
            {SPACING_OPTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => onChangeSettings({ gridSpacing: s.id })}
                className={`rounded-lg border py-1.5 text-center text-xs font-medium active:scale-[0.96] transition-all duration-150 ${
                  settings.gridSpacing === s.id
                    ? 'border-amber-500 bg-amber-500/20 text-amber-300 font-bold'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {settings.gridSpacing === 'none' && (
            <p className="text-[11px] text-amber-300/90 bg-amber-500/10 border border-amber-500/20 rounded-lg p-2 leading-tight mt-1">
              ✨ <strong>Seamless Collage Mode:</strong> Spacing set to None creates a full-bleed 3×3 grid without gaps, outer margins, or watermark (like classic anime 3×3s).
            </p>
          )}
        </div>

        {/* Radius */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sliders className="h-4 w-4 text-amber-400" />
            <span>Card Radius</span>
          </label>
          <div className="grid grid-cols-4 gap-1">
            {RADIUS_OPTIONS.map((r) => (
              <button
                key={r.id}
                onClick={() => onChangeSettings({ borderRadius: r.id })}
                className={`rounded-lg border py-1.5 text-center text-xs font-medium active:scale-[0.96] transition-all duration-150 ${
                  settings.borderRadius === r.id
                    ? 'border-amber-500 bg-amber-500/20 text-amber-300 font-bold'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Display Information Toggles */}
      <div className="space-y-2 pt-2 border-t border-slate-800">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
          <Eye className="h-4 w-4 text-amber-400" />
          <span>Book Information Overlay</span>
        </label>

        <div className="space-y-2">
          <label className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-2.5 cursor-pointer hover:bg-slate-800/40">
            <span className="text-xs font-medium text-slate-200">Show Book Title</span>
            <input
              type="checkbox"
              checked={settings.showTitle}
              onChange={(e) => onChangeSettings({ showTitle: e.target.checked })}
              className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-500"
            />
          </label>

          <label className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-2.5 cursor-pointer hover:bg-slate-800/40">
            <span className="text-xs font-medium text-slate-200">Show Author Name</span>
            <input
              type="checkbox"
              checked={settings.showAuthor}
              onChange={(e) => onChangeSettings({ showAuthor: e.target.checked })}
              className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-500"
            />
          </label>

          <label className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-2.5 cursor-pointer hover:bg-slate-800/40">
            <span className="text-xs font-medium text-slate-200">Show Publication Year</span>
            <input
              type="checkbox"
              checked={settings.showYear}
              onChange={(e) => onChangeSettings({ showYear: e.target.checked })}
              className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-500"
            />
          </label>
        </div>
      </div>
    </div>
  );
};
