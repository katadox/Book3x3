import React from 'react';
import { Info, BookOpen, ExternalLink, ShieldCheck, Sparkles, Move, Palette, Download } from 'lucide-react';

const GithubIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

export const About: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-slate-300">
      
      {/* Header */}
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-300">
          <Info className="h-3.5 w-3.5" />
          <span>About Book3x3</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-white">
          Turn your reading list into a 3×3.
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Book3x3 is a free, open-source web application for creating and sharing beautiful 3×3 book cover grids.
        </p>
      </div>

      {/* How It Works Section */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 space-y-6 backdrop-blur-xl shadow-2xl">
        <h2 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-amber-400" />
          <span>How It Works</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          <div className="flex gap-4 items-start p-4 rounded-xl bg-slate-950/60 border border-slate-800/60">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 font-bold">1</div>
            <div>
              <h3 className="font-bold text-white mb-1 flex items-center gap-1.5"><BookOpen className="h-4 w-4 text-amber-400" /> Search</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Search millions of books by title, author, or ISBN powered by Open Library's Search API.</p>
            </div>
          </div>

          <div className="flex gap-4 items-start p-4 rounded-xl bg-slate-950/60 border border-slate-800/60">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 font-bold">2</div>
            <div>
              <h3 className="font-bold text-white mb-1 flex items-center gap-1.5"><Move className="h-4 w-4 text-indigo-400" /> Arrange</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Drag and drop nine selected books into any position, or use mobile touch reordering controls.</p>
            </div>
          </div>

          <div className="flex gap-4 items-start p-4 rounded-xl bg-slate-950/60 border border-slate-800/60">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-pink-500/10 text-pink-400 font-bold">3</div>
            <div>
              <h3 className="font-bold text-white mb-1 flex items-center gap-1.5"><Palette className="h-4 w-4 text-pink-400" /> Customize</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Adjust layout styles, backgrounds, typography, custom titles, spacing, corner radius, and Auto Theme.</p>
            </div>
          </div>

          <div className="flex gap-4 items-start p-4 rounded-xl bg-slate-950/60 border border-slate-800/60">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 font-bold">4</div>
            <div>
              <h3 className="font-bold text-white mb-1 flex items-center gap-1.5"><Download className="h-4 w-4 text-emerald-400" /> Share</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Export high-resolution PNG or JPG images directly in your browser at 1080p or 2K quality.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sources & Attribution Section */}
      <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-slate-900 to-amber-950/20 p-6 sm:p-8 space-y-4 shadow-2xl">
        <div className="flex items-center gap-3 text-amber-400">
          <ShieldCheck className="h-7 w-7" />
          <h2 className="font-serif text-2xl font-bold text-white">Sources & Copyright Attribution</h2>
        </div>

        <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
          <p>
            Book metadata and cover images are retrieved from{' '}
            <a
              href="https://openlibrary.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 font-semibold hover:underline inline-flex items-center gap-1"
            >
              Open Library <ExternalLink className="h-3.5 w-3.5 inline" />
            </a>
            .
          </p>

          <blockquote className="rounded-xl border-l-4 border-amber-500 bg-slate-950/80 p-4 text-xs font-mono text-slate-300 leading-relaxed">
            "Book metadata and cover images are retrieved from Open Library. Cover images are displayed from Open Library's hosted Covers API and are not bundled or redistributed with this project. Book3x3 does not claim ownership of the cover artwork."
          </blockquote>

          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-400">
            <li>No book cover image files are stored in or bundled with this application repository.</li>
            <li>All cover images are rendered on demand directly from Open Library's CDN endpoint (<code className="text-amber-300">covers.openlibrary.org</code>).</li>
            <li>Book3x3 does not assert ownership of any third-party cover artwork. Users should respect applicable copyright laws and provider terms of service.</li>
          </ul>
        </div>
      </div>

      {/* GitHub Open Source & License */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-xl">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-serif text-xl font-bold text-white">100% Free & Open Source</h3>
          <p className="text-xs text-slate-400">
            Licensed under the MIT License. Contributions and feedback are welcome!
          </p>
        </div>

        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 text-sm font-bold text-slate-950 shadow-glow hover:from-amber-400 hover:to-amber-500 transition-all shrink-0"
        >
          <GithubIcon className="h-5 w-5" />
          <span>Star on GitHub</span>
        </a>
      </div>
    </div>
  );
};
