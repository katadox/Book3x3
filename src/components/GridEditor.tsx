import React, { useState } from 'react';
import type { Book } from '../types/book';
import { GridCell } from './GridCell';
import { MobileMoveModal } from './MobileMoveModal';
import { Shuffle, Sparkles, Trash2, LayoutGrid, AlertCircle } from 'lucide-react';

interface GridEditorProps {
  books: (Book | null)[];
  targetSlot?: number | null;
  onRemoveBook: (index: number) => void;
  onSwapSlots: (fromIndex: number, toIndex: number) => void;
  onSelectSlot: (index: number) => void;
  onShuffle: () => void;
  onSurpriseMe: () => void;
  onClearGrid: () => void;
}

export const GridEditor: React.FC<GridEditorProps> = ({
  books,
  targetSlot = null,
  onRemoveBook,
  onSwapSlots,
  onSelectSlot,
  onShuffle,
  onSurpriseMe,
  onClearGrid,
}) => {
  const [mobileMoveIndex, setMobileMoveIndex] = useState<number | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const activeCount = books.filter((b) => b !== null).length;
  const isComplete = activeCount === 9;
  const remainingNeeded = 9 - activeCount;

  const handleDropSlot = (targetIndex: number) => {
    if (draggedIndex !== null && draggedIndex !== targetIndex) {
      onSwapSlots(draggedIndex, targetIndex);
    }
    setDraggedIndex(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Status Bar Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl font-bold font-serif ${
            isComplete ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
          }`}>
            <LayoutGrid className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-white">
              {isComplete ? '9 / 9 Books Selected' : `${activeCount} / 9 Books Selected`}
            </h3>
            <p className="text-xs text-slate-400">
              {isComplete
                ? 'Your 3×3 grid is complete! Customize and export your image.'
                : `Add ${remainingNeeded} more book${remainingNeeded === 1 ? '' : 's'} to complete your 3×3.`}
            </p>
          </div>
        </div>

        {/* Quick Toolbar Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Shuffle */}
          <button
            onClick={onShuffle}
            disabled={activeCount < 2}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:border-amber-500/40 hover:bg-slate-700 active:scale-[0.96] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150"
            title="Randomly rearrange selected books"
          >
            <Shuffle className="h-3.5 w-3.5 text-amber-400" />
            <span>Shuffle</span>
          </button>

          {/* Surprise Me */}
          <button
            onClick={onSurpriseMe}
            className="flex items-center gap-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20 active:scale-[0.96] transition-all duration-150"
            title="Load a surprise demonstration book grid"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Surprise Me</span>
          </button>

          {/* Clear Grid */}
          <button
            onClick={() => setShowClearConfirm(true)}
            disabled={activeCount === 0}
            className="flex items-center gap-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 active:scale-[0.96] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150"
            title="Clear all books from grid"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>
      </div>

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-4 animate-modal-enter">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertCircle className="h-6 w-6" />
              <h4 className="font-serif text-lg font-bold text-white">Clear 3×3 Grid?</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to remove all books from your current grid? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 active:scale-[0.96] transition-all duration-150"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onClearGrid();
                  setShowClearConfirm(false);
                }}
                className="rounded-lg bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-500 active:scale-[0.96] transition-all duration-150"
              >
                Yes, Clear Grid
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3x3 Interactive Grid Cells Container (Encloses 2:3 aspect ratio cards cleanly) */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 rounded-2xl border border-slate-800/80 bg-slate-950 p-3 sm:p-4 shadow-2xl">
        {books.map((book, idx) => (
          <GridCell
            key={idx}
            index={idx}
            book={book}
            isTargeted={targetSlot === idx}
            onRemove={onRemoveBook}
            onSelectSlot={onSelectSlot}
            onOpenMobileMove={(i) => setMobileMoveIndex(i)}
            onDragStartSlot={(i) => setDraggedIndex(i)}
            onDropSlot={handleDropSlot}
          />
        ))}
      </div>

      {/* Touch Mobile Reordering Modal */}
      {mobileMoveIndex !== null && (
        <MobileMoveModal
          sourceIndex={mobileMoveIndex}
          books={books}
          onClose={() => setMobileMoveIndex(null)}
          onSwapSlots={onSwapSlots}
          onRemoveBook={onRemoveBook}
        />
      )}
    </div>
  );
};
