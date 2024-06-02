"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

export default function MobileNavLink({ href, label, onClick }: { 
  href: string; 
  label: string, 
  onClick: () => void
}) {
  const current = usePathname();

  return (
    <Link 
      className={twMerge(
        "py-5 block text-center text-lg transition-colors",
        current === href ? "text-white bg-pink-500 dark:bg-slate-800 font-medium" : "hover:bg-pink-300/50 dark:hover:bg-white/10"
      )}
      href={href}
      onClick={onClick}
    >
      {label}
    </Link>
  );
}
