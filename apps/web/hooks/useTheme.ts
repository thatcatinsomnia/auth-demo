import { useState, useEffect } from 'react';

export default function useTheme() {
  const [preferDark, setPreferDark] = useState<boolean>(false);

  useEffect(() => {
    setPreferDark(window.__preferDark);
  }, []);

  const toggleTheme = () => {
    const nextPreferDark = !preferDark;

    if (nextPreferDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    window.localStorage.setItem('preferDark', String(nextPreferDark));
    setPreferDark(nextPreferDark);
  };

  return {
    preferDark,
    toggleTheme
  };
}
