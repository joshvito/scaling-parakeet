export const bruteRequests = Array.from({ length: 6 }).map((_, i) => ({
  method: 'POST',
  url: '/login',
  headers: { 'content-type': 'application/json' },
  body: { username: 'admin', password: `wrongpass${i + 1}` },
  query: {},
  ip: '192.168.1.100',
}));
