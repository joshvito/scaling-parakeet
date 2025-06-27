export const okRequests = [
  {
    method: 'GET',
    url: '/home',
    headers: {},
    body: {},
    query: {},
    ip: '127.0.0.1',
  },
  {
    method: 'POST',
    url: '/login',
    headers: { 'content-type': 'application/json' },
    body: { username: 'user', password: 'securePassword123' },
    query: {},
    ip: '127.0.0.2',
  },
  {
    method: 'POST',
    url: '/comment',
    headers: { 'content-type': 'application/json' },
    body: { comment: 'This is a safe and clean comment!' },
    query: {},
    ip: '127.0.0.3',
  },
];
