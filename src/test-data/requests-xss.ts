export const xssRequests = [
  {
    method: 'POST',
    url: '/comment',
    headers: { 'content-type': 'application/json' },
    body: { comment: '<script>alert("xss")</script>' },
    query: {},
    ip: '127.0.0.1',
  },
  {
    method: 'POST',
    url: '/submit',
    headers: { 'content-type': 'application/json' },
    body: { name: 'user', bio: '<img src=x onerror=alert(1)>' },
    query: {},
    ip: '127.0.0.1',
  },
  {
    method: 'GET',
    url: '/profile',
    headers: {},
    body: {},
    query: { bio: '<script>evil()</script>' },
    ip: '127.0.0.1',
  },
  {
    method: 'POST',
    url: '/input',
    headers: { 'content-type': 'application/json' },
    body: { input: '<div onload=alert(1)>test</div>' },
    query: {},
    ip: '127.0.0.1',
  },
];