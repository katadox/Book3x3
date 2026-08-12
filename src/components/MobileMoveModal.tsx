import React from 'react';
import type { Book } from '../types/book';
import { X, ArrowRightLeft, Trash2 } from 'lucide-react';

interface MobileMoveModalProps {
  sourceIndex: number;
  books: (Book | null)[];
  onClose: () => void;
  onSwapSlots: (fromIndex: number, toIndex: number) => void;
  onRemoveBook: (index: number) => void;
}

export const MobileMoveModal: React.FC<MobileMoveModalProps> = ({
  sourceIndex,
  books,
  onClose,
  onSwapSlots,
  onRemoveBook,
}) => {
  const currentBook = books[sourceIndex];
  if (!currentBook) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md animate-fade-in md:hidden">
      <div className="relative w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-2xl animate-modal-enter">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="h-5 w-5 text-amber-400" />
            <h3 className="font-serif text-lg font-bold text-white">Move / Swap Book</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-slate-400 hover:bg-slate-800 hover:text-white active:scale-[0.95] transition-all duration-150"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Selected Book Preview */}
        <div className="flex items-center gap-3 rounded-xl bg-slate-950 p-3 border border-slate-800/80 mb-4">
          <div className="h-14 w-10 overflow-hidden rounded bg-slate-900 flex-shrink-0">
            <img src={currentBook.coverUrl} alt={currentBook.title} className="h-full w-full object-cover" />
          </div>
          <div className="overflow-hidden">
            <span className="text-xs font-semibold text-amber-400 block">Position #{sourceIndex + 1}</span>
            <h4 className="font-serif text-sm font-bold text-white truncate">{currentBook.title}</h4>
            <p className="text-xs text-slate-400 truncate">{currentBook.author}</p>
          </div>
        </div>

        {/* Select Destination Slot */}
        <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
          Select Target Destination:
        </p>

        <div className="grid grid-cols-3 gap-2.5 mb-5">
          {books.map((b, idx) => {
            const isSelf = idx === sourceIndex;
            return (
              <button
                key={idx}
                disabled={isSelf}
                onClick={() => {
                  onSwapSlots(sourceIndex, idx);
                  onClose();
                }}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-semibold transition-all duration-150 active:scale-[0.96] ${
                  isSelf
                    ? 'border-amber-500/50 bg-amber-500/10 text-amber-300 cursor-not-allowed opacity-60'
                    : b
                    ? 'border-slate-800 bg-slate-800/60 text-slate-200 hover:border-amber-500/40 hover:bg-slate-800'
                    : 'border-dashed border-slate-700 bg-slate-950 text-slate-400 hover:border-amber-500/40'
                }`}
              >
                <span>Slot {idx + 1}</span>
                <span className="text-[10px] font-normal text-slate-400 truncate max-w-full">
                  {isSelf ? '(Current)' : b ? b.title : 'Empty'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Remove Button */}
        <button
          onClick={() => {
            onRemoveBook(sourceIndex);
            onClose();
          }}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 py-2.5 text-xs font-bold text-rose-300 hover:bg-rose-500/20 active:scale-[0.96] transition-all duration-150"
        >
          <Trash2 className="h-4 w-4" />
          <span>Remove Book from Grid</span>
        </button>
      </div>
    </div>
  );
};
