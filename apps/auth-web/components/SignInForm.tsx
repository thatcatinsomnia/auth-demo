"use client";

import { useState } from 'react';
import { signIn } from '#/actions/auth';

export default function SignInForm() {
  const [error, setError] = useState<string | null>(null);

  const formAction = async (formData: FormData) => {
    // check issue to fix form action error in DOM
    // https://github.com/vercel/next.js/discussions/56234#discussioncomment-8101205
    setError(null);

    const { error } = await signIn(formData);
    
    if (error) {
      setError(error);
    }
  };

  return (
    <>
      {error && (
        <p className="mb-4 p-6 text-center text-white bg-red-500 rounded shadow">{error}</p>
      )}

      <form
        className="px-10 pb-10 flex flex-col bg-slate-900 rounded shadow"
        action={formAction}
      >
        <h2 className="py-12 text-white text-center text-4xl tracking-wide">Sign In</h2>

        <label className="mb-4">
          <span className="mb-0.5 block text-white text-xl">Email:</span>
          <input className="px-2 py-2 w-full text-slate-600 text-lg rounded" type="email" name="email" />
        </label>

        <label>
          <span className="mb-0.5 block text-white text-xl">Password:</span>
          <input className="px-2 py-2 w-full text-slate-600 text-lg rounded" type="password" name="password" />
        </label>

        <button className="px-3 py-2 mt-10 text-lg text-white bg-gray-700 hover:bg-gray-800 rounded">Sign in</button>
      </form>
    </>
  );
}