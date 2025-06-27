export const xssRequests = [
  {
    method: 'POST',
    url: '/comment',
    headers: { 'content-type': 'application/json' },
    body: { comment: '<script>alert("lskywacker was here;")</script>' },
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
  {
    method: 'GET',
    url: '/search',
    headers: {},
    body: {},
    query: {
      q: "javascript&#58document;cookieStore.get('super_secret_cookie'&#41;.then((e&#41; => {document.getElementsByClassName('v-text-field__slot'&#41;[1].childNodes[1].value=`${e.name} = ${e.value}`;document.getElementsByClassName('v-text-field__slot'&#41;[1].childNodes[1].dispatchEvent(new Event('input'&#41;&#41;;document.getElementsByClassName('v-text-field__slot'&#41;[1].nextElementSibling.childNodes[0].click(&#41;}&#41;",
    },
    ip: '127.0.0.1',
  },
];
