import React from 'react';
import { CURATED_EXAMPLES } from '../data/examples';
import type { Book, CustomizationSettings } from '../types/book';
import { Compass, Sparkles, ArrowRight } from 'lucide-react';

interface ExploreProps {
  onUsePresetGrid: (books: Book[], settings: Partial<CustomizationSettings>) => void;
}

export const Explore: React.FC<ExploreProps> = ({ onUsePresetGrid }) => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-300">
          <Compass className="h-3.5 w-3.5" />
          <span>Curated Reading Collections</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-white">
          Explore Featured 3×3 Grids
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Browse handcrafted reading grids across genre classics, thematic lists, and aesthetic moods. Click "Use this grid" to load any collection into your editor.
        </p>
      </div>

      {/* Preset Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CURATED_EXAMPLES.map((example) => (
          <div
            key={example.id}
            className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-amber-500/40 hover:shadow-glow"
          >
            <div className="space-y-4">
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-slate-800 px-3 py-1 text-[11px] font-semibold text-amber-400">
                  {example.category}
                </span>
                <span className="text-xs font-mono text-slate-400">9 Books</span>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                  {example.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                  {example.description}
                </p>
              </div>

              {/* 3x3 Thumbnail Grid (Natural height fit) */}
              <div className="grid grid-cols-3 gap-2 rounded-xl bg-slate-950 p-2 border border-slate-800 shadow-inner">
                {example.books.slice(0, 9).map((book, idx) => (
                  <div key={idx} className="aspect-[2/3] overflow-hidden rounded bg-slate-900 shadow">
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <button
                onClick={() => onUsePresetGrid(example.books, example.settings)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800 py-3 text-xs font-bold text-slate-100 hover:bg-amber-500 hover:text-slate-950 transition-all shadow-sm group-hover:bg-amber-500 group-hover:text-slate-950"
              >
                <Sparkles className="h-4 w-4" />
                <span>Use this grid</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
