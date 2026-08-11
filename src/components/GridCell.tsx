import React, { useState } from 'react';
import type { Book } from '../types/book';
import { Plus, Trash2, ArrowRightLeft, Move } from 'lucide-react';

interface GridCellProps {
  index: number;
  book: Book | null;
  onRemove: (index: number) => void;
  onSelectSlot: (index: number) => void;
  onOpenMobileMove: (index: number) => void;
  onDragStartSlot: (index: number) => void;
  onDropSlot: (targetIndex: number) => void;
}

export const GridCell: React.FC<GridCellProps> = ({
  index,
  book,
  onRemove,
  onSelectSlot,
  onOpenMobileMove,
  onDragStartSlot,
  onDropSlot,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', String(index));
    e.dataTransfer.effectAllowed = 'move';
    onDragStartSlot(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    onDropSlot(index);
  };

  if (!book) {
    return (
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => onSelectSlot(index)}
        className={`group relative flex cursor-pointer aspect-[2/3] w-full flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all duration-300 ${
          isDragOver
            ? 'border-amber-400 bg-amber-500/10 scale-105'
            : 'border-slate-800 bg-slate-900/40 hover:border-amber-500/50 hover:bg-slate-900/80 hover:shadow-lg'
        }`}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800/80 text-amber-400 group-hover:scale-110 transition-transform">
          <Plus className="h-5 w-5" />
        </div>
        <span className="mt-2 text-xs font-semibold text-slate-300 group-hover:text-amber-300">
          + Add book
        </span>
        <span className="text-[10px] text-slate-400">Slot {index + 1}</span>
      </div>
    );
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`group relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-slate-950 border transition-all duration-300 ${
        isDragOver
          ? 'border-amber-400 ring-2 ring-amber-400/50 scale-105 z-30'
          : 'border-slate-800 shadow-book hover:shadow-2xl hover:border-amber-500/40'
      }`}
      title={book.title}
    >
      {/* Book Cover Image */}
      <img
        src={book.coverUrl}
        alt={book.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        onError={(e) => {
          (e.target as HTMLImageElement).src = book.coverUrl;
        }}
      />

      {/* Desktop Drag Handle & Slot Badge */}
      <div className="absolute top-2 left-2 z-10 flex items-center gap-1 rounded-md bg-slate-950/80 px-2 py-0.5 text-[10px] font-mono font-bold text-amber-300 backdrop-blur-md border border-slate-800/80">
        <Move className="h-3 w-3 hidden sm:inline" />
        <span>#{index + 1}</span>
      </div>

      {/* Hover Control Overlay (Desktop) */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between bg-slate-950/85 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-250 backdrop-blur-sm">
        <div className="text-center space-y-0.5 pt-2" title={book.title}>
          <h4 className="font-serif text-xs font-bold text-white line-clamp-3 leading-snug">{book.title}</h4>
          <p className="text-[10px] text-amber-400 line-clamp-1 mt-0.5">{book.author}</p>
        </div>

        <div className="space-y-1.5 pb-1">
          {/* Replace Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectSlot(index);
            }}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-amber-500 py-1.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors shadow-sm"
          >
            <ArrowRightLeft className="h-3.5 w-3.5" />
            <span>Replace</span>
          </button>

          {/* Mobile Move Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenMobileMove(index);
            }}
            className="flex sm:hidden w-full items-center justify-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 py-1.5 text-xs font-semibold text-slate-200"
          >
            <Move className="h-3.5 w-3.5" />
            <span>Move</span>
          </button>

          {/* Remove Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(index);
            }}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 py-1.5 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};
