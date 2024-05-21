"use client";

import { useState } from 'react';
import { RedirectType, redirect } from 'next/navigation';
import signIn from '#/actions/auth';

export default function SignInForm() {
  const [error, setError] = useState(null);

  const formAction = async (formData: FormData) => {
    setError(null);

    const { error } = await signIn(formData);
    
    if (error) {
      setError(error);
    }

    redirect('/', RedirectType.replace);
  };

  return (
    <>
      {error && (
        <p className="mb-4 p-6 text-center text-white bg-red-500 rounded shadow">{error}</p>
      )}

      <form
        className="px-6 py-8 flex flex-col bg-slate-900 rounded shadow"
        action={formAction}
      >
        <label className="mb-2">
          <span className="mb-0.5 block text-white text-xl">Email:</span>
          <input className="px-2 py-2 w-full text-slate-600 text-lg rounded" type="email" name="email" />
        </label>

        <label>
          <span className="mb-0.5 block text-white text-xl">Password:</span>
          <input className="px-2 py-2 w-full text-slate-600 text-lg rounded" type="password" name="password" />
        </label>

        <button className="px-3 py-2 mt-10 text-white bg-gray-700 hover:bg-gray-800 rounded">Sign In</button>
      </form>
    </>
  );
}