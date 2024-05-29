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
    <div className="mx-auto pt-52 max-w-sm">
      <SignInForm />
    </div>
  );
}