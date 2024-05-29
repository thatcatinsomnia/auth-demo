import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import SignInForm from "#/components/SignInForm";

function hasSession() {
  return cookies().has('session'); 
}

export default function SignIn() {
  if (hasSession()) {
    return redirect(process.env.HOME_PAGE_URL!);
  }

  return (
    <div className="mt-36 px-6 mx-auto max-w-[420px]">
      <SignInForm />
    </div>
  );
}