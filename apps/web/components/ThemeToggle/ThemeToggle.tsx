"use client";

import { IconSun, IconMoon } from '@tabler/icons-react';

export default function ThemeToggle() {
  const isDarkMode = true;

  return (
      <button className="size-12 hover:dark:bg-white/5 rounded grid place-items-center">
        {isDarkMode ? <IconMoon /> : <IconSun />}
      </button>
  );
}
