import React from 'react';
import { Sparkles, Compass, Search, Move, Palette, Download, ArrowRight, BookOpen } from 'lucide-react';
import { CURATED_EXAMPLES } from '../data/examples';

interface HeroProps {
  onStartCreate: () => void;
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartCreate, onExplore }) => {
  const demoBooks = CURATED_EXAMPLES[0].books.slice(0, 9);

  return (
    <div className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-indigo-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid Layout: Hero Copy + Interactive 3x3 Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-300 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Turn your reading list into a 3×3</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Your books. <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                Your 3×3.
              </span>
            </h1>

            <p className="max-w-xl mx-auto lg:mx-0 text-lg text-slate-300 leading-relaxed">
              Pick nine books, arrange them your way, and create a grid worth sharing. Perfect for reading wraps, favorite shelfies, and aesthetic book recs.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onStartCreate}
                className="w-full sm:w-auto flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 px-7 py-3.5 text-base font-bold text-slate-950 shadow-glow hover:shadow-glow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Sparkles className="h-5 w-5" />
                <span>Create a 3×3</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={onExplore}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/80 px-6 py-3.5 text-base font-semibold text-slate-200 hover:border-slate-500 hover:bg-slate-800 transition-all"
              >
                <Compass className="h-5 w-5 text-amber-400" />
                <span>Explore Example Grids</span>
              </button>
            </div>

            {/* Minor highlights */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-amber-400" />
                <span>Open Library Search</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Download className="h-4 w-4 text-amber-400" />
                <span>1080p & 2K Image Export</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Palette className="h-4 w-4 text-amber-400" />
                <span>Custom Themes & Gradients</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Grid Showcase */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Decorative Card Frame */}
              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/90 p-4 sm:p-6 shadow-2xl backdrop-blur-xl transition-all hover:border-amber-500/30">
                <div className="mb-4 text-center">
                  <span className="font-serif text-sm font-semibold tracking-wider text-amber-300 uppercase">
                    My Favorite Books
                  </span>
                  <div className="mx-auto mt-1 h-0.5 w-12 bg-amber-500/50 rounded-full" />
                </div>

                {/* 3x3 Cover Grid Mockup (Encloses 2:3 cards cleanly) */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 rounded-xl bg-slate-950 p-2 sm:p-3 border border-slate-800/60 shadow-inner">
                  {demoBooks.map((book, idx) => (
                    <div
                      key={book.id || idx}
                      className="group relative aspect-[2/3] overflow-hidden rounded-lg bg-slate-900 shadow-md transition-all duration-300 hover:scale-105 hover:z-20 hover:shadow-xl"
                    >
                      <img
                        src={book.coverUrl}
                        alt={book.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-end text-center">
                        <span className="font-serif text-[10px] font-bold text-white line-clamp-1">{book.title}</span>
                        <span className="text-[8px] text-amber-300 line-clamp-1">{book.author}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 px-1">
                  <span className="font-mono text-slate-400">9 / 9 books</span>
                  <span className="font-sans text-amber-400/90 font-medium">Created with Book3x3</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Section Cards */}
        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-800/70 bg-slate-900/50 p-6 backdrop-blur-md transition-all hover:border-amber-500/30 hover:bg-slate-900/80">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 mb-4">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white mb-2">Search</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Find millions of books instantly using title, author, or ISBN via Open Library's API.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800/70 bg-slate-900/50 p-6 backdrop-blur-md transition-all hover:border-amber-500/30 hover:bg-slate-900/80">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 mb-4">
              <Move className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white mb-2">Arrange</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Drag and drop your nine books into any order, or use touch-friendly reordering controls.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800/70 bg-slate-900/50 p-6 backdrop-blur-md transition-all hover:border-amber-500/30 hover:bg-slate-900/80">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/10 text-pink-400 mb-4">
              <Palette className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white mb-2">Customize</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Tailor layout styles, background gradients, typography, spacing, and titles.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800/70 bg-slate-900/50 p-6 backdrop-blur-md transition-all hover:border-amber-500/30 hover:bg-slate-900/80">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 mb-4">
              <Download className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white mb-2">Share</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Export your finished composition as a high-resolution PNG or JPG image ready for social sharing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
