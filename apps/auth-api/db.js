
export const users = [
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

export function getUserByEmail(email) {
  return users.find(user => user.email === email);
}

export function getUserById(id) {
  return users.find(user => user.id === id);
}

export const invalidRefreshTokens = [];
