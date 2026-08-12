import React, { useState, useEffect, useRef } from 'react';
import type { Book } from '../types/book';
import { searchBooks } from '../services/openLibrary';
import { BookCard } from './BookCard';
import { BookDetails } from './BookDetails';
import { Search, Loader2, RefreshCw, BookOpen, AlertCircle } from 'lucide-react';

interface BookSearchProps {
  selectedBooks: (Book | null)[];
  targetSlot?: number | null;
  onClearTargetSlot?: () => void;
  onAddBook: (book: Book) => void;
}

export const BookSearch: React.FC<BookSearchProps> = ({
  selectedBooks,
  targetSlot = null,
  onClearTargetSlot,
  onAddBook,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDetailsBook, setSelectedDetailsBook] = useState<Book | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCount = selectedBooks.filter((b) => b !== null).length;
  const canAddMore = activeCount < 9;

  // Preset search tags
  const QUICK_SUGGESTIONS = ['The Hobbit', 'Dune', '1984', 'Pride and Prejudice', 'Neuromancer', 'Frankenstein'];

  // Scroll into view & focus search input when a slot is targeted
  useEffect(() => {
    if (targetSlot !== null && targetSlot !== undefined) {
      containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [targetSlot]);

  useEffect(() => {
    const trimmed = query.trim();

    if (!trimmed) {
      setResults([]);
      setLoading(false);
      setError(null);
      setHasSearched(false);
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    const timer = setTimeout(async () => {
      try {
        const books = await searchBooks(trimmed, controller.signal);
        setResults(books);
        setHasSearched(true);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError('Could not fetch books from Open Library. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  const handleRetry = () => {
    if (query.trim()) {
      const q = query;
      setQuery('');
      setTimeout(() => setQuery(q), 50);
    }
  };

  const isBookSelected = (book: Book) => {
    return selectedBooks.some((b) => b !== null && (b.id === book.id || (b.isbn && b.isbn === book.isbn)));
  };

  return (
    <div ref={containerRef} className="space-y-6 scroll-mt-24">
      
      {/* Header & Status Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-amber-400" />
            <span>Find Books</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Search Open Library by title, author, or ISBN.
          </p>
        </div>

        {/* Selected Count Badge */}
        <div className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
          activeCount === 9
            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
            : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
        }`}>
          <span>{activeCount} / 9 selected</span>
        </div>
      </div>

      {/* Targeted Slot Active Banner */}
      {targetSlot !== null && targetSlot !== undefined && (
        <div className="flex items-center justify-between rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-2.5 text-xs font-bold text-amber-300 shadow-sm animate-modal-enter">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 rounded-full bg-amber-400 animate-ping" />
            <span>Targeting Slot #{targetSlot + 1} — Search and pick a book for this slot</span>
          </div>
          {onClearTargetSlot && (
            <button
              onClick={onClearTargetSlot}
              className="rounded-lg bg-slate-800 px-2.5 py-1 text-[11px] font-semibold text-slate-300 hover:bg-slate-700 active:scale-[0.96] transition-all duration-150"
            >
              Cancel
            </button>
          )}
        </div>
      )}

      {/* Search Input Bar */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
          <Search className="h-5 w-5" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books, authors, or ISBN..."
          className={`w-full rounded-xl border bg-slate-900/90 pl-11 pr-10 py-3 text-sm text-white placeholder-slate-400 shadow-inner focus:outline-none transition-all duration-150 ${
            targetSlot !== null && targetSlot !== undefined
              ? 'border-amber-400 ring-2 ring-amber-400/50 shadow-glow'
              : 'border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500'
          }`}
        />

        {loading && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-amber-400">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        )}
      </div>

      {/* Quick Suggestions Tags */}
      {!query && (
        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Popular Queries:</span>
          <div className="flex flex-wrap gap-2">
            {QUICK_SUGGESTIONS.map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="rounded-lg border border-slate-800/80 bg-slate-900/60 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-amber-500/40 hover:bg-slate-800 hover:text-white active:scale-[0.96] transition-all duration-150"
              >
                + {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex items-center justify-between rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={handleRetry}
            className="flex items-center gap-1.5 rounded-lg bg-rose-500/20 px-3 py-1.5 text-xs font-semibold text-rose-200 hover:bg-rose-500/30"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Retry</span>
          </button>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && results.length === 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-xl border border-slate-800 bg-slate-900/40 p-3 space-y-3">
              <div className="aspect-[2/3] w-full rounded-lg bg-slate-800/60" />
              <div className="h-4 w-3/4 rounded bg-slate-800/60" />
              <div className="h-3 w-1/2 rounded bg-slate-800/60" />
              <div className="h-8 w-full rounded-lg bg-slate-800/60" />
            </div>
          ))}
        </div>
      )}

      {/* No Results Message */}
      {hasSearched && !loading && !error && results.length === 0 && (
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 py-12 text-center text-slate-400 space-y-2">
          <BookOpen className="mx-auto h-10 w-10 text-slate-600 mb-2" />
          <p className="font-serif text-base font-semibold text-slate-300">No books found for "{query}"</p>
          <p className="text-xs text-slate-400">Try searching for an exact title, author name, or 13-digit ISBN.</p>
        </div>
      )}

      {/* Results Grid */}
      {results.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Found {results.length} results</span>
            <span>Click cover for full details</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {results.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                isAdded={isBookSelected(book)}
                canAdd={canAddMore}
                onAddBook={onAddBook}
                onSelectDetails={setSelectedDetailsBook}
              />
            ))}
          </div>
        </div>
      )}

      {/* Details Modal */}
      {selectedDetailsBook && (
        <BookDetails
          book={selectedDetailsBook}
          onClose={() => setSelectedDetailsBook(null)}
          onAddBook={onAddBook}
          isAdded={isBookSelected(selectedDetailsBook)}
          canAdd={canAddMore}
        />
      )}
    </div>
  );
};
