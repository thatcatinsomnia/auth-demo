import Link from 'next/link';
import Navbar from '../Navbar/Navbar';


export default async function Header() {
  return (
    <header className="px-4 w-full h-[80px] flex items-center gap-6 dark:text-white border-b border-slate-300/10">
      <Link href="/" className="text-2xl font-bold tracking-wider">WEB</Link>
      <Navbar />
    </header>
  );
}
