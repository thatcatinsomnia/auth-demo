import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import * as jose from 'jose';
import { accessTokenSecret, signInUrl, isProduction } from './constants/contants';
import { decrypt, refreshAccessToken } from './libs/auth';

// https://github.com/vercel/next.js/discussions/49843#discussioncomment-7904278
export async function middleware(req: Request) {
  const cookieStore = cookies();

  try {
    const session = cookieStore.get('session')?.value;
    
    if (!session) {
      return NextResponse.redirect(new URL(signInUrl));
    }

    await decrypt(session);

    const response = NextResponse.next();

    return response;
  } catch(error) {
    const response = NextResponse.next();

    if (error instanceof jose.errors.JWTExpired) {
      console.log('token expired 👀');
      const accessToken = await refreshAccessToken();

      response.cookies.set('session', accessToken, {
        httpOnly: true,
        secure: isProduction
      });

    } else {
      console.log('something error in middleware 😭');
      console.log(error)
    }

    return response;
  }
}

export const config = {
  matcher: ['/me']
};
