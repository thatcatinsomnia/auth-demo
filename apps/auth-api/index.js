import express from 'express';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';

import { generateAccessToken, generateRefreshToken, REFRESH_TOKEN_SECRET } from './token.js';
import { getUserByEmail, getUserById, invalidRefreshTokens } from './db.js';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('auth api')
});

app.post('/api/sign-in', async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required !!' });
  }

  const found = getUserByEmail(email);

  if (!found) {
    return res.status(404).json({
      error: 'user not exist'
    });
  }

  if (found.password !== password) {
    return res.status(401).json({
      error: 'password is incorrect'
    });
  }

  const accessToken = generateAccessToken({ 
    id: found.id,
    name: found.name,
    email: found.email
  });

  const refreshToken = generateRefreshToken(found.id);

  return res.status(200).json({
    accessToken,
    refreshToken
  });
});

app.post('/api/refresh', async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(422).json({ error: 'Refresh token is required !!' });
  }

  if (invalidRefreshTokens.includes(refreshToken)) {
    return res.status(401).json({ error: 'unauthorized' });
  }  

  if (!jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)) {
    return res.status(401).json({ error: 'token invalid or expired' });
  }

  const { userId }  = jwt.decode(refreshToken, REFRESH_TOKEN_SECRET);

  const user = getUserById(userId);

  if (!user) {
    return res.status(404).json({ error: 'user not found' });
  }

  const { password, ...payload } = user;

  const accessToken = generateAccessToken(payload);

  return res.status(200).json({ accessToken });
});

const PORT = 3333;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
