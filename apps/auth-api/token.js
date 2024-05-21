import jwt from 'jsonwebtoken';

export function generateAccessToken(payload) {
  const secret = 'secret';

  return jwt.sign(payload, secret, { expiresIn: '15m' }); 
}

export function generateRefreshToken(userId) {
  const secret = 'refresh-secret';

  return jwt.sign({ userId }, secret, { expiresIn: '7d' });
}
