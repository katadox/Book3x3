import React, { useState } from 'react';
import type { Book, CustomizationSettings } from '../types/book';
import { BookSearch } from '../components/BookSearch';
import { GridEditor } from '../components/GridEditor';
import { CustomizationPanel } from '../components/CustomizationPanel';
import { GridPreview } from '../components/GridPreview';
import { ExportControls } from '../components/ExportControls';
import { CURATED_EXAMPLES } from '../data/examples';
import { Eye, SlidersHorizontal, Sparkles } from 'lucide-react';

interface CreateProps {
  books: (Book | null)[];
  settings: CustomizationSettings;
  onUpdateBooks: (books: (Book | null)[]) => void;
  onUpdateSettings: (settings: CustomizationSettings) => void;
}

export const Create: React.FC<CreateProps> = ({
  books,
  settings,
  onUpdateBooks,
  onUpdateSettings,
}) => {
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [targetSlot, setTargetSlot] = useState<number | null>(null);

  const handleAddBook = (book: Book) => {
    const updated = [...books];
    if (targetSlot !== null && targetSlot >= 0 && targetSlot < 9) {
      updated[targetSlot] = book;
      setTargetSlot(null);
    } else {
      const emptyIdx = updated.findIndex((b) => b === null);
      if (emptyIdx !== -1) {
        updated[emptyIdx] = book;
      }
    }
    onUpdateBooks(updated);
  };

  const handleRemoveBook = (index: number) => {
    const updated = [...books];
    updated[index] = null;
    onUpdateBooks(updated);
  };

  const handleSwapSlots = (fromIndex: number, toIndex: number) => {
    const updated = [...books];
    const temp = updated[fromIndex];
    updated[fromIndex] = updated[toIndex];
    updated[toIndex] = temp;
    onUpdateBooks(updated);
  };

  const handleShuffle = () => {
    const activeBooks = books.filter((b) => b !== null);
    if (activeBooks.length < 2) return;

    for (let i = activeBooks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [activeBooks[i], activeBooks[j]] = [activeBooks[j], activeBooks[i]];
    }

    const updated = Array(9).fill(null);
    activeBooks.forEach((b, idx) => {
      updated[idx] = b;
    });

    onUpdateBooks(updated);
  };

  const handleSurpriseMe = () => {
    const randomSet = CURATED_EXAMPLES[Math.floor(Math.random() * CURATED_EXAMPLES.length)];
    onUpdateBooks(randomSet.books.slice(0, 9));
    onUpdateSettings({
      ...settings,
      ...randomSet.settings,
    });
  };

  const handleClearGrid = () => {
    onUpdateBooks(Array(9).fill(null));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Title & View Switcher on Mobile */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="font-serif text-3xl font-extrabold text-white flex items-center gap-2.5">
            <Sparkles className="h-7 w-7 text-amber-400" />
            <span>3×3 Creator Workbench</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Search Open Library, arrange 9 books, customize your theme, and export.
          </p>
        </div>

        {/* Mobile View Switcher */}
        <div className="flex md:hidden rounded-xl bg-slate-900 p-1 border border-slate-800">
          <button
            onClick={() => setActiveTab('editor')}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-xs font-bold transition-all ${
              activeTab === 'editor' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400'
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Editor</span>
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-xs font-bold transition-all ${
              activeTab === 'preview' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400'
            }`}
          >
            <Eye className="h-4 w-4" />
            <span>Preview & Export</span>
          </button>
        </div>
      </div>

      {/* Main Grid Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Search & 3x3 Editor (7 cols) */}
        <div className={`lg:col-span-7 space-y-8 ${activeTab === 'preview' ? 'hidden md:block' : 'block'}`}>
          
          {/* Search Panel */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-xl shadow-2xl">
            <BookSearch
              selectedBooks={books}
              onAddBook={handleAddBook}
            />
          </div>

          {/* Interactive 3x3 Grid Editor */}
          <GridEditor
            books={books}
            onRemoveBook={handleRemoveBook}
            onSwapSlots={handleSwapSlots}
            onSelectSlot={(slot) => setTargetSlot(slot)}
            onShuffle={handleShuffle}
            onSurpriseMe={handleSurpriseMe}
            onClearGrid={handleClearGrid}
          />
        </div>

        {/* Right Column: Customization & Preview & Export (5 cols) */}
        <div className={`lg:col-span-5 space-y-8 ${activeTab === 'editor' ? 'hidden md:block' : 'block'}`}>
          
          {/* Live Preview Card */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
              <Eye className="h-5 w-5 text-amber-400" />
              <span>Live Image Preview</span>
            </h3>
            <GridPreview books={books} settings={settings} />
          </div>

          {/* Export Controls */}
          <ExportControls
            books={books}
            settings={settings}
            onChangeSettings={(up) => onUpdateSettings({ ...settings, ...up })}
          />

          {/* Customization Panel */}
          <CustomizationPanel
            settings={settings}
            onChangeSettings={(up) => onUpdateSettings({ ...settings, ...up })}
          />
        </div>
      </div>
    </div>
  );
};
