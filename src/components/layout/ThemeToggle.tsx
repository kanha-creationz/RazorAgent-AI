'use client';
import React, { useEffect, useState } from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';

export function ThemeToggle() {
  const [pref, setPref] = useState<'light' | 'dark' | 'system'>('dark');

  const applyTheme = (mode: 'light' | 'dark' | 'system') => {
    let effective = mode;
    if (mode === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      effective = isDark ? 'dark' : 'light';
    }

    document.documentElement.setAttribute('data-theme', effective);
    if (effective === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  };

  useEffect(() => {
    const saved = (localStorage.getItem('razoragent_theme_pref') as 'light' | 'dark' | 'system') || 'dark';
    setPref(saved);
    applyTheme(saved);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const current = localStorage.getItem('razoragent_theme_pref');
      if (current === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleSelect = (mode: 'light' | 'dark' | 'system') => {
    setPref(mode);
    localStorage.setItem('razoragent_theme_pref', mode);
    applyTheme(mode);
  };

  return (
    <div className="inline-flex items-center p-1 rounded-xl glass-panel border border-blue-500/20 text-xs font-mono">
      <button
        onClick={() => handleSelect('light')}
        title="Light Mode"
        className={`px-2 py-1 rounded-lg transition-all flex items-center space-x-1 ${
          pref === 'light'
            ? 'bg-blue-600 text-white font-semibold shadow-sm'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        <Sun className="w-3.5 h-3.5" />
        <span className="hidden sm:inline text-[10px]">Light</span>
      </button>

      <button
        onClick={() => handleSelect('dark')}
        title="Dark Mode"
        className={`px-2 py-1 rounded-lg transition-all flex items-center space-x-1 ${
          pref === 'dark'
            ? 'bg-blue-600 text-white font-semibold shadow-sm'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        <Moon className="w-3.5 h-3.5" />
        <span className="hidden sm:inline text-[10px]">Dark</span>
      </button>

      <button
        onClick={() => handleSelect('system')}
        title="Device/System Preference"
        className={`px-2 py-1 rounded-lg transition-all flex items-center space-x-1 ${
          pref === 'system'
            ? 'bg-blue-600 text-white font-semibold shadow-sm'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        <Laptop className="w-3.5 h-3.5" />
        <span className="hidden sm:inline text-[10px]">System</span>
      </button>
    </div>
  );
}
