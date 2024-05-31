import { NextRequest, NextResponse } from 'next/server';
import { ResponseCookies, RequestCookies } from 'next/dist/server/web/spec-extension/cookies';
import { cookies } from 'next/headers';
import * as jose from 'jose';
import { signInUrl, isProduction } from './constants/contants';
import { decrypt, refreshAccessToken } from './libs/auth';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const cookieStore = cookies();

  try {
    const session = cookieStore.get('session')?.value;
    
    if (!session) {
      return NextResponse.redirect(new URL(signInUrl));
    }

    await decrypt(session);

    return res;
  } catch(error) {
    if (error instanceof jose.errors.JWTExpired) {
      const accessToken = await refreshAccessToken();

      res.cookies.set('session', accessToken, {
        httpOnly: true,
        secure: isProduction
      });

      applySetCookie(req, res);
    } else {
      console.log('something error in middleware 😭');
      console.log(error)
    }

    return res;
  }
}

// RSC and Middlware read cookies from request not response, cookies().set() function is set cookies on response
// when Middleware set cookies, RSC still on the same request/response cycle, cookies won't update before response send back to client
// we need manyally copy new cookies to the request
// references issue: https://github.com/vercel/next.js/issues/49442#issuecomment-1679807704
// NOTE: this will be fixed in v15
// https://github.com/vercel/next.js/pull/65008
function applySetCookie(req: Request, res: NextResponse) {
  // parse the outgoing Set-Cookie header
  const setCookies = new ResponseCookies(res.headers);

  // build a new Cookie header for the request
  const newRequestHeaders = new Headers(req.headers);
  const newRequestCookies = new RequestCookies(newRequestHeaders);

  setCookies.getAll().forEach(cookie => {
    newRequestCookies.set(cookie.name, cookie.value);
  });

  // set "request header overrides" on the outgoing response
  NextResponse.next({
    request: {
      headers: newRequestHeaders
    }
  }).headers.forEach((value, key) => {
    if (key === 'x-middleware-override-headers' || key.startsWith('x-middleware-request-')) {
      res.headers.set(key, value);
    }
  });
}

export const config = {
  matcher: ['/profile']
};
