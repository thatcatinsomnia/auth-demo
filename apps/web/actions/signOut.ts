"use server";

import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";

export async function signOut() {
  const cookieStore = cookies();
  cookieStore.delete('session');
  cookieStore.delete('refresh_token');

  return redirect('/', RedirectType.replace);
}
