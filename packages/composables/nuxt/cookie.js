import CookieUniversal from 'cookie-universal';

const baseSetCookieOptions = {
  sameSite: 'lax',
  path: '/',
};

const isBrowser = () => typeof window !== 'undefined';

export default (req, res) => {
  const cookie = isBrowser() ? CookieUniversal() : CookieUniversal(req, res);

  const setCookie = (id, data, options = {}) => {
    cookie.set(id, data, {
      ...baseSetCookieOptions,
      ...options,
    });
  };

  const removeCookie = (id, options = {}) => {
    cookie.remove(id, {
      ...baseSetCookieOptions,
      ...options,
    });
  };

  const getCookies = (id, options = {}) => cookie.get(id, {
    ...options,
  });

  return {
    setCookie,
    removeCookie,
    getCookies,
  };
};
