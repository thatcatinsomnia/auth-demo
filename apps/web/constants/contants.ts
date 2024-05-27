export const accessTokenSecret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET!);
export const signInUrl = process.env.SIGN_IN_URL!;
export const authApi = process.env.AUTH_API!;
export const isProduction = process.env.NODE_ENV === 'production';
export const REFRESH_THRESHOLD = 10 * 1000;

if (!accessTokenSecret) {
  throw new Error('env ACCESS_TOKEN_SECRET must be set 🚧');
}

if (!signInUrl) {
  throw new Error('env SIGN_IN_URL must be set 🚧');
}

if (!authApi) {
  throw new Error('env AUTH_API must be set 🚧');
}
