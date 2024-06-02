'use client';

import { useState } from 'react';
import Link from 'next/link';
import { IconMenu, IconX } from '@tabler/icons-react';
import MobileNavLink from '#/components/MobileNavLink';
import ThemeToggle from '#/components/ThemeToggle';
import { links } from '#/constants/links';

export default function MobileHamburger({ username }: { username?: string }) {
  const [opened, setOpened] = useState(false);

  return (
    <div>
      <button className="size-10 grid place-items-center hover:bg-pink-100 dark:hover:bg-white/10 transitino-colors rounded" onClick={() => setOpened(true)}>
        <IconMenu />
      </button>

      {opened && (
        <div className="fixed inset-0 bg-pink-200 dark:bg-pink-500 md:hidden">
          <div className="p-6 w-full flex items-center justify-between">
            <ThemeToggle />
            <button className="size-10 grid place-items-center top-6 right-6 hover:bg-pink-100 dark:hover:bg-white/10 transition-colors rounded" onClick={() => setOpened(false)}><IconX /></button>
          </div>

          <p className="mb-10 pt-20 pb-10 text-2xl text-center border-b border-slate-100/20">
            Welcome, <span className="text-slate-500 dark:text-slate-700">{username || 'Guest'}</span>
          </p>

          <ul className="w-full flex flex-col gap-1">
            {links.map(link => (
              <li key={link.href}>
                <MobileNavLink label={link.label} href={link.href} onClick={() => setOpened(false)} />
              </li>
            ))}
          </ul>

          <p>{username ? 'Sign Out' : 'Sign In'}</p>
        </div>
      )}
    </div>
  );
}