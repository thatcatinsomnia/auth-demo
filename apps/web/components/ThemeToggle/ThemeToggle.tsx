'use client';

import { IconSun, IconMoon } from '@tabler/icons-react';
import { useTheme } from '#/context/ThemeContext';

export default function ThemeToggle() {
  const { preferDark, toggleTheme } = useTheme();

  return (
    <button
      className="size-10 md:size-12 hover:bg-pink-100 dark:hover:bg-white/10 rounded grid place-items-center transition-colors" 
      onClick={toggleTheme}
    >
      <IconMoon className="hidden dark:block" /> 
      <IconSun className="block dark:hidden" />
    </button>
  );
}
