// app/hooks/use-theme.ts
import { useEffect, useState } from 'react';

const THEME_KEY = 'rebalance-theme';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY) as Theme | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle('dark-theme', saved === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        setTheme('dark');
        document.documentElement.classList.add('dark-theme');
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
    document.documentElement.classList.toggle('dark-theme', newTheme === 'dark');
  };

  return { theme, toggleTheme };
}