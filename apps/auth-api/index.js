import express from 'express';

import { generateAccessToken, generateRefreshToken } from './token.js';

const users = [
  {
    id: 1,
    email: 'foo@example.com',
    name: 'foo',
    password: '1234'
  },
  {
    id: 2,
    email: 'bar@example.com',
    name: 'bar',
    password: '1234'
  },
  {
    id: 3,
    email: '1234@example.com',
    name: '1234',
    password: '1234'
  }
];

const app = express();

app.use(express.json());

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('auth api')
});

const PORT = 3333;

app.post('/sign-in', async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required !!' });
  }

  const found = users.find(user => user.email === email);

  if (!found) {
    return res.status(404).json({
      message: 'user not exist'
    });
  }

  if (found.password !== password) {
    return res.status(401).json({
      message: 'password is incorrect'
    });
  }

  const accessToken = generateAccessToken({ 
    id: found.id,
    name: found.name,
    email: found.email
  });

  const refreshToken = generateRefreshToken(found.id);

  return res.json({
    userId: found.id,
    name: found.name,
    email: found.email,
    accessToken,
    refreshToken
  });
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
