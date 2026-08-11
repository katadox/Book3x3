import React, { useState } from 'react';
import { BookOpen, Compass, Info, Sparkles, Menu, X } from 'lucide-react';

const GithubIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

interface HeaderProps {
  activeTab: 'home' | 'create' | 'explore' | 'about';
  setActiveTab: (tab: 'home' | 'create' | 'explore' | 'about') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home' as const, label: 'Home', icon: BookOpen },
    { id: 'create' as const, label: 'Create 3×3', icon: Sparkles },
    { id: 'explore' as const, label: 'Explore', icon: Compass },
    { id: 'about' as const, label: 'About & Sources', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0b0d12]/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <button
          onClick={() => setActiveTab('home')}
          className="group flex items-center gap-3 focus:outline-none"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 shadow-glow transition-all group-hover:scale-105">
            <span className="font-serif text-lg font-bold tracking-wider text-slate-950">3×3</span>
          </div>
          <div className="text-left">
            <span className="block font-serif text-xl font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
              Book3x3
            </span>
            <span className="hidden sm:block text-[10px] uppercase tracking-widest text-slate-400">
              Grid Creator
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* GitHub Repository Link */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-slate-700/60 bg-slate-900/60 px-3.5 py-1.5 text-xs font-semibold text-slate-300 shadow-sm hover:border-amber-500/40 hover:bg-slate-800 hover:text-white transition-all"
            aria-label="View source code on GitHub"
          >
            <GithubIcon className="h-4 w-4" />
            <span>GitHub</span>
          </a>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0d1117]/95 px-4 pt-2 pb-4 shadow-2xl backdrop-blur-xl animate-fade-in">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-all ${
                    isActive
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </button>
              );
            })}

            <div className="pt-3 border-t border-slate-800/80">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white"
              >
                <GithubIcon className="h-4 w-4" />
                <span>View on GitHub</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
