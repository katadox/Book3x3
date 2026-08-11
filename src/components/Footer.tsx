import React from 'react';
import { ExternalLink, Heart, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: 'home' | 'create' | 'explore' | 'about') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#07090e] py-12 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          
          {/* Col 1: Brand */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-500 font-serif text-xs font-bold text-slate-950">
                3×3
              </div>
              <span className="font-serif text-lg font-bold text-white">Book3x3</span>
            </div>
            <p className="max-w-md text-sm text-slate-400 leading-relaxed">
              Turn your reading list into a 3×3. Pick nine books, arrange them your way, customize the design, and export a high-resolution grid worth sharing.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400/90 pt-1">
              <ShieldCheck className="h-4 w-4" />
              <span>Open-Source & Client-Side Only — No Ads or Account Required</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Navigation</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigateTab('home')} className="hover:text-amber-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('create')} className="hover:text-amber-400 transition-colors">
                  3×3 Creator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('explore')} className="hover:text-amber-400 transition-colors">
                  Explore Grids
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('about')} className="hover:text-amber-400 transition-colors">
                  About & Sources
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Data Source & Attribution */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Data Source</h4>
            <p className="mt-3 text-xs text-slate-400 leading-relaxed">
              Book metadata and cover images are retrieved from{' '}
              <a
                href="https://openlibrary.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:underline inline-flex items-center gap-1"
              >
                Open Library <ExternalLink className="h-3 w-3 inline" />
              </a>
              . Cover images are displayed from Open Library's hosted Covers API and are not bundled or redistributed with this project. Book3x3 does not claim ownership of cover artwork.
            </p>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-10 border-t border-slate-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Book3x3. Open-source under the MIT License.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for book lovers worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
