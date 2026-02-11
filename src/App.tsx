import { PaletteGenerator } from './components/palette-generator/PaletteGenerator';
import { Toaster } from 'sonner@2.0.3';
import { useState, useEffect } from 'react';

export default function App() {
  const [themeSource, setThemeSource] = useState<'system' | 'manual'>(() => {
    return localStorage.getItem('lumina_theme') ? 'manual' : 'system';
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('lumina_theme');
    if (saved) return saved === 'dark';
    // Default to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Listen for system theme changes when in system mode
  useEffect(() => {
    if (themeSource !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [themeSource]);

  // Persist manual choice
  useEffect(() => {
    if (themeSource === 'manual') {
      localStorage.setItem('lumina_theme', isDarkMode ? 'dark' : 'light');
    }
  }, [isDarkMode, themeSource]);

  const toggleDarkMode = () => {
    setThemeSource('manual');
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <PaletteGenerator isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <Toaster />
    </div>
  );
}