'use client';

import { type ReactNode, useState, useEffect, createContext, useContext } from 'react';

type ThemeContext = {
  preferDark: boolean;
  toggleTheme: () => void;
} | undefined;

const ThemeContext = createContext<ThemeContext>(undefined);

export function ThemeProvider({ children }: {
  children: ReactNode
}) {
  const [preferDark, setPreferDark] = useState(false);
  
  useEffect(() => {
    setPreferDark(window.__preferDark);
  }, []);

  const toggleTheme = () => {
    const el = document.documentElement;
    const nextPreferDark = !preferDark;

    if (nextPreferDark) {
      window.__preferDark = true;
      el.classList.add('dark');
    } else {
      window.__preferDark = false;
      el.classList.remove('dark');
    }

    localStorage.setItem('preferDark', String(nextPreferDark));

    setPreferDark(nextPreferDark);
  };

  return (
    <ThemeContext.Provider value={{ preferDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('Theme Context must used with Provider');
  }

  return context;
}
