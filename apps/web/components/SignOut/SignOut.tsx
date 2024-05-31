'use client';

import { signOut } from '#/actions/signOut';

export default function SignOut() {
  const handleSignOut = () => {
    signOut();
  };

  return (
    <button className="px-6 py-3 w-full md:w-36 bg-pink-600 transition-colors rounded hover:bg-pink-700" onClick={handleSignOut}>Sign out</button>
  );
}
