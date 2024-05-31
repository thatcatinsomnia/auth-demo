import Link from 'next/link';
import { IconAlien } from '@tabler/icons-react';
import { hasSession } from "#/libs/auth";

export default function Avatar() {
    return (
      <Link href="/profile" className="size-12 hover:dark:bg-white/10 rounded grid place-items-center transition-colors">
        <IconAlien />
      </Link>
    )
}