import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Create } from './pages/Create';
import { Explore } from './pages/Explore';
import { About } from './pages/About';
import type { Book, CustomizationSettings, GridState } from './types/book';
import { loadGridState, saveGridState, DEFAULT_SETTINGS, EMPTY_BOOKS } from './utils/storage';

export function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'create' | 'explore' | 'about'>('home');
  const [gridState, setGridState] = useState<GridState>(() => loadGridState());

  // Save state to LocalStorage whenever books or settings update
  useEffect(() => {
    saveGridState(gridState);
  }, [gridState]);

  const handleUpdateBooks = (books: (Book | null)[]) => {
    setGridState((prev) => ({
      ...prev,
      books,
    }));
  };

  const handleUpdateSettings = (settings: CustomizationSettings) => {
    setGridState((prev) => ({
      ...prev,
      settings,
    }));
  };

  const handleNavigateTab = (tab: 'home' | 'create' | 'explore' | 'about') => {
    if (tab === 'create') {
      // Clean 9 empty slots on fresh Create navigation unless coming from Explore preset
      setGridState({
        books: [...EMPTY_BOOKS],
        settings: { ...DEFAULT_SETTINGS },
      });
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUsePresetGrid = (books: Book[], settings: Partial<CustomizationSettings>) => {
    const fullBooks = books.slice(0, 9).concat(Array(Math.max(0, 9 - books.length)).fill(null));
    setGridState((prev) => ({
      books: fullBooks,
      settings: {
        ...prev.settings,
        ...settings,
      },
    }));
    setActiveTab('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#0b0d12] text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Top Header Navigation */}
      <Header activeTab={activeTab} setActiveTab={handleNavigateTab} />

      {/* Main Content Pages */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <Home
            onStartCreate={() => handleNavigateTab('create')}
            onExplore={() => handleNavigateTab('explore')}
          />
        )}

        {activeTab === 'create' && (
          <Create
            books={gridState.books}
            settings={gridState.settings}
            onUpdateBooks={handleUpdateBooks}
            onUpdateSettings={handleUpdateSettings}
          />
        )}

        {activeTab === 'explore' && (
          <Explore onUsePresetGrid={handleUsePresetGrid} />
        )}

        {activeTab === 'about' && (
          <About />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigateTab={handleNavigateTab} />
    </div>
  );
}

export default App;
