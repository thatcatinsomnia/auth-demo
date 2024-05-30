"use client";

import { useFormStatus, useFormState } from "react-dom";
import { signIn } from '#/actions/signInAction';
import { redirect } from "next/navigation";
import { IconLoader2 } from '@tabler/icons-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button 
      className={`px-3 py-2 mt-10 text-center text-white bg-gray-700 transition-colors duration-200 hover:bg-gray-800 rounded ${pending ? 'opacity-30 cursor-auto pointer-events-none' : ''}`}
      aria-disabled={pending}
    >
      {pending ? <IconLoader2 className="mx-auto animate-spin" /> : 'Sign in'}
    </button>
  );
}

export default function SignInForm() {
  const [state, formAction] = useFormState(signIn, { 
    isSuccess: false,
    isError: false, 
    error: undefined
  });

  if (state.isSuccess) {
    return redirect(process.env.HOME_PAGE_URL!);
  }

  return (
    <>
      {state.isError && (
        <p className="mb-4 p-6 text-center text-white bg-rose-600 rounded shadow">{state.error}</p>
      )}

      <form
        className="px-8 pb-8 flex flex-col bg-gray-900 rounded shadow"
        action={formAction}
      >
        <h2 className="py-10 text-white text-center text-4xl tracking-wide">Sign In</h2>

        <label className="mb-4">
          <span className="mb-0.5 block text-white">Email:</span>
          <input className="px-2 h-[36px] w-full text-slate-600 rounded" type="email" name="email" />
        </label>

        <label>
          <span className="mb-0.5 block text-white">Password:</span>
          <input className="px-2 h-[36px] w-full text-slate-600 rounded" type="password" name="password" />
        </label>

        <SubmitButton />
      </form>
    </>
  );
}