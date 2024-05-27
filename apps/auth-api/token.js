import jwt from 'jsonwebtoken';

export const ACCESS_TOKEN_SECRET = 'secret';
export const REFRESH_TOKEN_SECRET = 'refresh-secret';

export function generateAccessToken(payload) {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '15s' }); 
}

export function generateRefreshToken(userId) {
  return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}
