import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import * as jose from 'jose';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const SIGN_IN_URL = process.env.SIGN_IN_URL!;
const isProduction = process.env.NODE_ENV === 'production';

const REFRESH_THRESHOLD = 10 * 1000;

// https://github.com/vercel/next.js/discussions/49843#discussioncomment-7904278
export async function middleware(req: Request) {
  const response = NextResponse.next();
  const cookieStore = cookies();

  try {
    const accessToken = cookieStore.get('access_token')?.value;
    
    if (!accessToken) {
      return NextResponse.redirect(SIGN_IN_URL);
    }

    await jose.jwtVerify(accessToken, new TextEncoder().encode(ACCESS_TOKEN_SECRET));
  } catch(error) {
    if (error instanceof jose.errors.JWTExpired) {
      const accessToken = await refreshAccessToken();

      response.cookies.set('access_token', accessToken, {
        httpOnly: true,
        secure: isProduction
      });
    } else {
      console.log('middleware error 😭');
      console.log(error)
    }
  } finally {
    return response;
  }
}

async function refreshAccessToken() {
    const refreshToken = cookies().get('refresh_token')?.value;
    
    if (!refreshToken) {
      return NextResponse.redirect(SIGN_IN_URL);
    }

    try {
      const REFRESH_API = process.env.AUTH_API + '/refresh';

      const res = await fetch(REFRESH_API, {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const { accessToken } = await res.json();

      return accessToken;
    } catch (error) {
      console.log('refresh access token error 😱');
      console.log(error);
    
      return null;
    }
}

export const config = {
  matcher: ['/me']
};
