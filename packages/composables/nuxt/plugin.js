import { integrationPlugin } from '@vue-storefront/magento-theme/helpers/integrationPlugin'
import { mapConfigToSetupObject } from '@vue-storefront/magento/nuxt/helpers';
import defaultConfig from '@vue-storefront/magento/nuxt/defaultConfig';
import cookie from '@vue-storefront/magento/nuxt/cookie';

const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>');

// TODO should be moved to THEME and expose consistent cookie management API
export default integrationPlugin(({ app, res, req, integration }) => {
  const cartCookieName = moduleOptions.cookies?.cartCookieName || defaultConfig.cookies.cartCookieName;
  const customerCookieName = moduleOptions.cookies?.customerCookieName || defaultConfig.cookies.customerCookieName;
  const storeCookieName = moduleOptions.cookies?.storeCookieName || defaultConfig.cookies.storeCookieName;
  const currencyCookieName = moduleOptions.cookies?.currencyCookieName || defaultConfig.cookies.currencyCookieName;
  const localeCookieName = moduleOptions.cookies?.localeCookieName || defaultConfig.cookies.localeCookieName;
  const countryCookieName = moduleOptions.cookies?.countryCookieName || defaultConfig.cookies.countryCookieName;

  const {
    setCookie,
    removeCookie,
    getCookies,
  } = cookie(req, res);

  const getCartId = () => getCookies(cartCookieName);

  const setCartId = (id) => !id ? removeCookie(cartCookieName) : setCookie(cartCookieName, id);

  const getCustomerToken = () => getCookies(customerCookieName);

  const setCustomerToken = (token) => !token ? removeCookie(customerCookieName) : setCookie(customerCookieName, token);

  const getStore = () => getCookies(storeCookieName);

  const setStore = (id) => !id ? removeCookie(storeCookieName) : setCookie(storeCookieName, id);

  const getCurrency = () => getCookies(currencyCookieName);

  const setCurrency = (id) => !id ? removeCookie(currencyCookieName) : setCookie(currencyCookieName, id);

  const getLocale = () => getCookies(localeCookieName);

  const setLocale = (id) => !id ? removeCookie(localeCookieName) : setCookie(localeCookieName, id);

  const getCountry = () => getCookies(countryCookieName);

  const setCountry = id =>  !id ? removeCookie(countryCookieName) : setCookie(countryCookieName, id);

  const settings = mapConfigToSetupObject({
    moduleOptions,
    app,
    additionalProperties: {
      state: {
        //Cart
        getCartId,
        setCartId,
        // Customer
        getCustomerToken,
        setCustomerToken,
        // Store
        getStore,
        setStore,
        getCurrency,
        setCurrency,
        getLocale,
        setLocale,
        getCountry,
        setCountry,
      },
    }
  });

  integration.configure('magento', settings);
});
