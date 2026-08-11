import React from 'react';
import type { Book } from '../types/book';
import { Plus, Check, Info } from 'lucide-react';
import { createCoverPlaceholder } from '../services/openLibrary';

interface BookCardProps {
  book: Book;
  isAdded: boolean;
  canAdd: boolean;
  onAddBook: (book: Book) => void;
  onSelectDetails: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  isAdded,
  canAdd,
  onAddBook,
  onSelectDetails,
}) => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900/70 p-3 backdrop-blur-md transition-all duration-300 hover:border-amber-500/40 hover:bg-slate-900/90 hover:shadow-lg">
      
      {/* Cover Image */}
      <div
        onClick={() => onSelectDetails(book)}
        className="relative cursor-pointer aspect-[2/3] w-full overflow-hidden rounded-lg bg-slate-950 border border-slate-800/80 shadow-md"
        title={`View details for ${book.title}`}
      >
        <img
          src={book.coverUrl}
          alt={book.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = createCoverPlaceholder(book.title, book.author);
          }}
        />

        {/* Hover info badge */}
        <div className="absolute top-2 right-2 rounded-full bg-slate-950/80 p-1.5 text-slate-300 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
          <Info className="h-3.5 w-3.5" />
        </div>
      </div>

      {/* Book Information */}
      <div className="mt-3 flex flex-1 flex-col justify-between space-y-2">
        <div onClick={() => onSelectDetails(book)} className="cursor-pointer" title={book.title}>
          <h4 className="font-serif text-sm font-bold text-white leading-snug group-hover:text-amber-400 transition-colors break-words">
            {book.title}
          </h4>
          <p className="text-xs font-medium text-slate-400 line-clamp-2 mt-1">{book.author}</p>
          {book.firstPublishYear && (
            <span className="text-[10px] text-slate-400 font-mono block mt-1">
              {book.firstPublishYear}
            </span>
          )}
        </div>

        {/* Add / Added Button */}
        {isAdded ? (
          <button
            disabled
            className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 py-1.5 text-xs font-semibold text-amber-300 cursor-default"
          >
            <Check className="h-3.5 w-3.5" />
            <span>Added</span>
          </button>
        ) : (
          <button
            disabled={!canAdd}
            onClick={() => onAddBook(book)}
            className={`flex w-full items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-bold transition-all ${
              canAdd
                ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-sm active:scale-95'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <Plus className="h-3.5 w-3.5" />
            <span>{canAdd ? 'Add to 3×3' : 'Grid Full'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
