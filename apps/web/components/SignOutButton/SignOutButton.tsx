'use client';

import { signOut } from '#/actions/signOut';
import { IconLogout2 } from '@tabler/icons-react';
import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export default function SignOutButton({ 
  className
}: {
  className?: HTMLAttributes<HTMLButtonElement>['className']
}) {
  const handleSignOut = () => {
    signOut();
  };

  return (
    <button 
      className={twMerge(
        'px-4 py-3 w-full flex items-center justify-center gap-2 text-white bg-pink-600 transition-colors rounded hover:bg-pink-700',
         className
      )}
      onClick={handleSignOut}
    >
      <IconLogout2 size={20} />
      <span>Sign out</span>
    </button>
  );
}
