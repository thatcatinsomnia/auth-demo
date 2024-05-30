"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

export type NavLinkType = {
  label: string;
  href: string;
};

export default function NavLink({ label, href }: { label: NavLinkType['label'], href: NavLinkType['href'] }) {
  const current = usePathname();

  return (
    <Link 
      href={href} 
      className={twMerge(
        `w-56 px-6 py-3 block rounded text-nowrap text-center ${current === href ? 'text-pink-500': 'dark:hover:bg-white/5'}`,
        "md:w-auto md:px-3 md:py-1"
    )}>
      {label}
    </Link>
  );
}
