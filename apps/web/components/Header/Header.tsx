import Link from 'next/link';
import HeaderLogo from '#/components/HeaderLogo';
import NavLink from '#/components/NavLink';
import ThemeToggle from '#/components/ThemeToggle';
import Avatar from '#/components/Avatar';
import { links } from '#/constants/links';
import { hasSession } from '#/libs/auth';

export default async function Header() {
  return (
    <header className="hidden px-8 w-full h-[80px] md:flex items-center gap-6 dark:text-white border-b border-slate-300/10">
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
            <Link href={process.env.SIGN_IN_URL!} className="px-4 py-1 text-nowrap border hover:bg-pink-500 transition-colors rounded">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
