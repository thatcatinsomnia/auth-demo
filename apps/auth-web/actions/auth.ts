"use server";

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const authApi = process.env.AUTH_API!;
const homePageUrl = process.env.HOME_PAGE_URL!;
const isProduction = process.env.NODE_ENV === 'production';

if (!authApi) {
  throw new Error('env AUTH_API must be set 🚧');
}

if (!homePageUrl) {
  throw new Error('env HOME_PAGE_URL must be set 🚧');
}

async function getUserFromDB({ email, password }: { email: string, password: string }) {
  const signInApi = authApi + '/api/sign-in';

  const res = await fetch(signInApi, {
    method: 'post',
    body: JSON.stringify({
      email,
      password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.error);
  }

  return data;
};

export async function signIn(formData: FormData) {
  let user = null;

  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    user = await getUserFromDB({ email, password });

    if (user) {
      cookies().set('session', user.accessToken, {
        httpOnly: true,
        secure: isProduction
      });

      cookies().set('refresh_token', user.refreshToken, {
        httpOnly: true,
        secure: isProduction
      });
      
    }
  } catch (error) {
    return {
      error: (error as Error)?.message
    };
  } 

  // must call ouside try catch block
  // documents: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#redirecting
  redirect(homePageUrl);
}
