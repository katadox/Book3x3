import React from 'react';
import type { Book } from '../types/book';
import { X, ExternalLink, Plus, Check, Calendar, Hash, User } from 'lucide-react';

interface BookDetailsProps {
  book: Book | null;
  onClose: () => void;
  onAddBook: (book: Book) => void;
  isAdded: boolean;
  canAdd: boolean;
}

export const BookDetails: React.FC<BookDetailsProps> = ({
  book,
  onClose,
  onAddBook,
  isAdded,
  canAdd,
}) => {
  if (!book) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl animate-modal-enter">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white active:scale-[0.95] transition-all duration-150"
          aria-label="Close details modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
          
          {/* Cover Image */}
          <div className="sm:col-span-5 mx-auto w-full max-w-[180px]">
            <div className="aspect-[2/3] overflow-hidden rounded-xl bg-slate-950 border border-slate-800 shadow-xl">
              <img
                src={book.coverUrl}
                alt={book.title}
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = book.coverUrl;
                }}
              />
            </div>
          </div>

          {/* Book Metadata */}
          <div className="sm:col-span-7 space-y-4 text-left">
            <div>
              <h3 className="font-serif text-2xl font-bold text-white leading-tight">{book.title}</h3>
              <div className="mt-1 flex items-center gap-2 text-sm font-medium text-amber-400">
                <User className="h-4 w-4" />
                <span>{book.author}</span>
              </div>
            </div>

            <div className="space-y-2 border-t border-slate-800/80 pt-3 text-xs text-slate-300">
              {book.firstPublishYear && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-slate-500" />
                  <span>First Published: <strong className="text-slate-200">{book.firstPublishYear}</strong></span>
                </div>
              )}

              {book.isbn && (
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-slate-500" />
                  <span>ISBN: <strong className="font-mono text-slate-200">{book.isbn}</strong></span>
                </div>
              )}

              {book.openLibraryUrl && (
                <div className="pt-1">
                  <a
                    href={book.openLibraryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 hover:underline"
                  >
                    <span>View on Open Library</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-4 flex items-center gap-3">
              {isAdded ? (
                <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500/20 border border-amber-500/40 px-4 py-2.5 text-sm font-semibold text-amber-300">
                  <Check className="h-4 w-4" />
                  <span>Already Added to Grid</span>
                </div>
              ) : (
                <button
                  disabled={!canAdd}
                  onClick={() => {
                    onAddBook(book);
                    onClose();
                  }}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-150 ${
                    canAdd
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500 shadow-glow active:scale-[0.97]'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Plus className="h-4 w-4" />
                  <span>{canAdd ? 'Add to 3×3 Grid' : 'Grid is Full (9/9)'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
