import Link from 'next/link';
import { IconAlien } from '@tabler/icons-react';
import { hasSession } from "#/libs/auth";

export default function User() {
  return hasSession() ? (
    <button className="size-12 hover:dark:bg-white/10 rounded grid place-items-center transition-colors">
      <IconAlien />
    </button>
  ) : (
    <Link href={process.env.SIGN_IN_URL!} className="px-4 py-1 text-lg text-nowrap border border-slate-300/60 hover:bg-pink-600 transition-colors rounded">Sign-In</Link>
  );
}