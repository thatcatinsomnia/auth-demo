import { cookies } from 'next/headers';
import * as jose from 'jose';

type JwtData = {
  id: string;
  name: string;
  email: string;
};

export async function getSession() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  if (!accessToken) {
    return null;
  }

  const { id, name, email } = jose.decodeJwt<JwtData>(accessToken);

  return { id, name, email, accessToken };
}
