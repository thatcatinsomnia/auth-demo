import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { decodeJwt, jwtVerify } from 'jose';
import { signInUrl, authApi, accessTokenSecret } from '#/constants/contants';

type JwtData = {
  id: string;
  name: string;
  email: string;
};

export async function decrypt(token: string) {
  try {
    const { payload } = await jwtVerify<JwtData>(token, accessTokenSecret);

    return { ...payload, accessToken: token };
  } catch (error) {
    throw error;
  }
}

export async function getSession() {
  const session = cookies().get('session')?.value;

  if (!session) {
    return undefined
  }

  return await decrypt(session);
}

export function hasSession() {
  return cookies().get('session')?.value;
}

export function getUserName() {
  const session = cookies().get('session')?.value;
  
  if (!session) {
    return undefined;
  }

  const { name } = decodeJwt<JwtData>(session);

  return name;
}

export async function refreshAccessToken() {
  const refreshToken = cookies().get('refresh_token')?.value;
  
  if (!refreshToken) {
    return redirect(signInUrl);
  }

  try {
    const refreshApi = authApi + '/api/refresh';

    const res = await fetch(refreshApi, {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const { accessToken } = await res.json();

    return accessToken as string;
  } catch (error) {
    console.log('refresh access token error 😱');
    console.log(error);
  
    throw error;
  } 
} 
