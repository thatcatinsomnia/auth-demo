import NavLink, { type NavLinkType } from '#/components/NavLink';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { twMerge } from 'tailwind-merge';
import User from '#/components/User';

const links: NavLinkType[] = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'Products',
    href: '/products'
  },
  {
    label: 'Activities',
    href: '/activites'
  }
];

export default function Navbar() {
  return (
    <div className={twMerge(
      "fixed inset-0 bg-neutral-800 flex flex-col items-center justify-center",
      "md:static md:bg-transparent md:flex-row md:flex-1 md:justify-end md:gap-1"
    )}>
      <ul className={twMerge(
        "flex flex-col text-3xl gap-4",
        "md:flex-row md:text-lg"
      )}>
        {links.map(link => (
          <li key={link.href}>
            <NavLink href={link.href} label={link.label} />
          </li>
        ))}
      </ul>

      <ThemeToggle />

      <User />
    </div>
  );
}
