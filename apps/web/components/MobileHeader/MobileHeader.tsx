"use client";

import { useState } from 'react';
import { IconMenu, IconX, IconMoon } from "@tabler/icons-react";
import HeaderLogo from '#/components/HeaderLogo';
import MobileNavLink from '#/components/MobileNavLink';
import ThemeToggle from '#/components/ThemeToggle';
import { links } from '#/constants/links';

export default function MobileNav() {
  const [opened, toggle] = useState(false);

  return (
    <header className="md:hidden px-6 w-full h-[80px] flex items-center justify-between gap-6 dark:text-white border-b border-slate-300/10">
      <HeaderLogo />

      {opened && (
        <div className="flex items-center justify-center fixed inset-0 bg-pink-500 md:hidden">
          <button className="size-10 grid place-items-center absolute top-6 right-6 hover:bg-white/10 transition-colors" onClick={() => toggle(false)}><IconX /></button>

          <div className="absolute top-6 left-6">
            <ThemeToggle />
          </div>

          <ul className="w-full flex flex-col gap-1">
            {links.map(link => (
              <li key={link.href}>
                <MobileNavLink label={link.label} href={link.href} onClick={() => toggle(false)} />
              </li>
            ))}
          </ul>
        </div>
      )}
      <button className="size-10 grid place-items-center hover:bg-white/10 transitino-colors rounded" onClick={() => toggle(true)}><IconMenu /></button>
    </header>
  );
}