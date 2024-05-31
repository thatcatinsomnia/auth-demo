import HeaderLogo from '#/components/HeaderLogo';
import MobileHamburger from '#/components/MobileHamburger';
import { getUserName } from '#/libs/auth';

export default async function MobileHeader() {
  const username = getUserName();

  return (
    <header className="md:hidden px-6 w-full h-[80px] flex items-center justify-between gap-6 dark:text-white border-b border-slate-300/10">
      <HeaderLogo />

      <MobileHamburger username={username} />
    </header>
  );
}