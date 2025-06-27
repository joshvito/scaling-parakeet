export const sqlInjectionRequests = [
  {
    method: 'POST',
    url: '/login',
    headers: { 'content-type': 'application/json' },
    body: { username: 'admin', password: 'password123 OR 1=1' },
    query: {},
    ip: '127.0.0.1',
  },
  {
    method: 'GET',
    url: '/search',
    headers: {},
    body: {},
    query: { q: "'; DROP TABLE users; --" },
    ip: '127.0.0.1',
  },
  {
    method: 'POST',
    url: '/login',
    headers: { 'content-type': 'application/json' },
    body: { username: 'admin', password: "' OR 'x'='x" },
    query: {},
    ip: '127.0.0.1',
  },
  {
    method: 'GET',
    url: '/search',
    headers: {},
    body: {},
    query: { q: "' UNION SELECT * FROM users --" },
    ip: '127.0.0.1',
  },
];
