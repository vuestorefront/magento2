import http from 'k6/http';

export const setDefaultCookies = (url) => {
  const jar = http.cookieJar();
  jar.set(url, 'vsf-store', 'default');
  jar.set(url, 'vsf-locale', 'default');
  jar.set(url, 'vsf-currency', 'USD');
};
