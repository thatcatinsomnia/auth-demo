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

type FormState = {
  isSuccess: boolean;
  isError: boolean;
  error?: string;
};

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

export async function signIn(prevState: FormState, formData: FormData) {
  let user = null;

  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    user = await getUserFromDB({ email, password });

    if (!user) {
      throw new Error('Eamil or password not correct');
    }

    cookies().set('session', user.accessToken, {
      httpOnly: true,
      secure: isProduction
    });

    cookies().set('refresh_token', user.refreshToken, {
      httpOnly: true,
      secure: isProduction
    });

    return { 
      isSuccess: true,
      isError: false,
      error: undefined
    };
  } catch (error) {
    return {
      isSuccess: false,
      isError: true,
      error: (error as Error)?.message
    };
  } 
}
