"use client";

import { IconSun, IconMoon } from '@tabler/icons-react';

export default function ThemeToggle() {
  const isDarkMode = true;

  return (
    <button className="size-10 md:size-12 hover:dark:bg-white/10 rounded grid place-items-center transition-colors">
      {isDarkMode ? <IconMoon /> : <IconSun />}
    </button>
  );
}
