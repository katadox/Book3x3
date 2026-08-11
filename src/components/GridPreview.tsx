import React from 'react';
import type { Book, CustomizationSettings } from '../types/book';

interface GridPreviewProps {
  books: (Book | null)[];
  settings: CustomizationSettings;
}

export const GridPreview: React.FC<GridPreviewProps> = ({ books, settings }) => {
  const {
    layoutStyle,
    backgroundMode,
    customBackgroundColor,
    gridSpacing,
    borderRadius,
    showTitle,
    showAuthor,
    showYear,
    customTitle,
    fontFamily,
  } = settings;

  const isSeamlessNone = gridSpacing === 'none';

  const getBackgroundStyle = () => {
    if (backgroundMode === 'custom' && customBackgroundColor) {
      return { backgroundColor: customBackgroundColor };
    }
    switch (backgroundMode) {
      case 'light':
        return { backgroundColor: '#f8fafc' };
      case 'light-gradient':
        return { backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)' };
      case 'dark-gradient':
        return { backgroundImage: 'linear-gradient(135deg, #0f172a 0%, #0b0d12 50%, #1e1b4b 100%)' };
      case 'sunset':
        return { backgroundImage: 'linear-gradient(135deg, #1c1917 0%, #451a03 50%, #0f172a 100%)' };
      case 'dark':
      default:
        return { backgroundColor: '#0b0d12' };
    }
  };

  const getFontClass = () => {
    switch (fontFamily) {
      case 'sans':
        return 'font-sans';
      case 'display':
        return 'font-display';
      case 'mono':
        return 'font-mono';
      case 'serif':
      default:
        return 'font-serif';
    }
  };

  const getGapClass = () => {
    switch (gridSpacing) {
      case 'none':
        return 'gap-0';
      case 'small':
        return 'gap-2 sm:gap-3';
      case 'large':
        return 'gap-5 sm:gap-6';
      case 'medium':
      default:
        return 'gap-3 sm:gap-4';
    }
  };

  const getRadiusClass = () => {
    if (isSeamlessNone) return 'rounded-none';
    switch (borderRadius) {
      case 'none':
        return 'rounded-none';
      case 'small':
        return 'rounded-sm sm:rounded-md';
      case 'large':
        return 'rounded-xl sm:rounded-2xl';
      case 'medium':
      default:
        return 'rounded-lg sm:rounded-xl';
    }
  };

  const isLight = backgroundMode === 'light' || backgroundMode === 'light-gradient';
  const hasTitle = Boolean(customTitle.trim());

  return (
    <div
      className={`relative mx-auto w-full max-w-2xl overflow-hidden shadow-2xl transition-all ${
        isSeamlessNone
          ? 'rounded-none border-0 p-0'
          : 'rounded-2xl border border-slate-800 p-4 sm:p-6'
      }`}
      style={getBackgroundStyle()}
    >
      {/* Custom Header Title */}
      {hasTitle && (
        <div className="pt-4 pb-3 text-center space-y-1">
          <h2 className={`text-xl sm:text-2xl font-bold tracking-tight uppercase ${getFontClass()} ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            {customTitle}
          </h2>
          <div className="mx-auto h-0.5 w-16 bg-amber-500 rounded-full" />
        </div>
      )}

      {/* 3x3 Preview Grid */}
      <div className={`grid grid-cols-3 ${getGapClass()} ${isSeamlessNone ? 'p-0' : 'p-1 mb-4'}`}>
        {books.map((book, idx) => (
          <div
            key={idx}
            className={`group relative aspect-[2/3] overflow-hidden ${getRadiusClass()} ${
              isLight ? 'bg-slate-200' : 'bg-slate-900'
            } ${
              layoutStyle === 'poster' ? 'ring-2 ring-white/20 ring-offset-2 ring-offset-slate-900' : ''
            } shadow-book`}
            title={book ? book.title : undefined}
          >
            {book ? (
              <>
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />

                {/* Information Overlay */}
                {(showTitle || showAuthor || showYear) && layoutStyle !== 'minimal' && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-2 sm:p-3 text-center text-white space-y-0.5 overflow-hidden">
                    {showTitle && (
                      <h4 className="font-serif text-[10px] sm:text-xs font-bold line-clamp-2 leading-tight text-white truncate">
                        {book.title}
                      </h4>
                    )}
                    {showAuthor && (
                      <p className="text-[9px] sm:text-[10px] font-medium text-amber-400 truncate">
                        {book.author}
                      </p>
                    )}
                    {showYear && book.firstPublishYear && (
                      <span className="font-mono text-[8px] sm:text-[9px] text-slate-400 block truncate">
                        {book.firstPublishYear}
                      </span>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="flex h-full w-full items-center justify-center p-2 text-center text-[10px] font-medium text-slate-500 border border-dashed border-slate-700/50">
                Empty Slot {idx + 1}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Watermark branding footer (omitted when gridSpacing === 'none' for pure seamless collage) */}
      {!isSeamlessNone && (
        <div className="pt-2 border-t border-slate-800/40 flex items-center justify-between text-[11px] px-1 font-sans">
          <span className={isLight ? 'text-slate-600 font-medium' : 'text-slate-400 font-medium'}>
            9 Books Grid
          </span>
          <span className={`font-semibold tracking-wider ${isLight ? 'text-slate-800' : 'text-amber-400/90'}`}>
            Created with Book3x3
          </span>
        </div>
      )}
    </div>
  );
};
