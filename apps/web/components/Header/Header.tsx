import Link from 'next/link';
import HeaderLogo from '#/components/HeaderLogo';
import NavLink from '#/components/NavLink';
import ThemeToggle from '#/components/ThemeToggle';
import Avatar from '#/components/Avatar';
import { links } from '#/constants/links';
import { hasSession } from '#/libs/auth';

export default function Header() {

  return (
    <header className="hidden px-8 w-full h-[80px] md:flex items-center gap-6 border-b border-gray-300/60 dark:text-white dark:border-slate-300/10">
      <HeaderLogo />

      <div className={"flex flex-1 items-center justify-end gap-1"}>
        <ul className="flex text-lg">
          {links.map(link => (
            <li key={link.href}>
              <NavLink href={link.href} label={link.label} />
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />

          {hasSession() ? (
            <Avatar />
          ) : (
            <Link 
              href={process.env.SIGN_IN_URL!} 
              className="px-4 py-1 text-nowrap text-white bg-pink-500 hover:bg-pink-600 transition-colors rounded shadow">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
