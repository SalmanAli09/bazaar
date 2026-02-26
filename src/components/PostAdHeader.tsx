"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function PostAdHeader() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
    
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-8 flex-1">
          <Link href="/" className="text-primary text-2xl font-bold tracking-tight">
            Bazaar
          </Link>
          <div className="hidden md:flex flex-1 max-w-xl relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
              <span className="material-symbols-outlined text-sm">search</span>
            </span>
            <input
              className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-full text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              placeholder="Search for anything..."
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-lg">location_on</span>
            All Cities
          </button>
          <button className="bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-opacity-90 transition-all shadow-sm">
            Sign In
          </button>
          <button 
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            <span className="material-symbols-outlined dark:hidden">dark_mode</span>
            <span className="material-symbols-outlined hidden dark:block">light_mode</span>
          </button>
        </div>
      </div>
    </header>
  );
}
