import { integrationPlugin } from '~/helpers/integrationPlugin';
import { mapConfigToSetupObject } from '~/modules/magento/helpers';
import { defaultConfig } from '~/modules/magento/defaultConfig';

const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>');

// TODO should be moved to THEME and expose consistent cookie management API
export default integrationPlugin((plugin) => {
  const cartCookieName : string = moduleOptions.cookies?.cartCookieName || defaultConfig.cookies.cartCookieName;
  const customerCookieName : string = moduleOptions.cookies?.customerCookieName || defaultConfig.cookies.customerCookieName;
  const storeCookieName : string = moduleOptions.cookies?.storeCookieName || defaultConfig.cookies.storeCookieName;
  const currencyCookieName : string = moduleOptions.cookies?.currencyCookieName || defaultConfig.cookies.currencyCookieName;
  const localeCookieName : string = moduleOptions.cookies?.localeCookieName || defaultConfig.cookies.localeCookieName;
  const countryCookieName : string = moduleOptions.cookies?.countryCookieName || defaultConfig.cookies.countryCookieName;

  const { $cookies } = plugin.app;

  const getCartId = () => $cookies.get(cartCookieName);
  const setCartId = (id: string) => (!id ? $cookies.remove(cartCookieName) : $cookies.set(cartCookieName, id));

  const getCustomerToken = () => $cookies.get(customerCookieName);
  const setCustomerToken = (token: string) => (!token ? $cookies.remove(customerCookieName) : $cookies.set(customerCookieName, token));

  const getStore = () => $cookies.get(storeCookieName);
  const setStore = (store: string) => (!store ? $cookies.remove(storeCookieName) : $cookies.set(storeCookieName, store));

  const getCurrency = () => $cookies.get(currencyCookieName);
  const setCurrency = (currency: string) => (!currency ? $cookies.remove(currencyCookieName) : $cookies.set(currencyCookieName, currency));

  const getLocale = () => $cookies.get(localeCookieName);
  const setLocale = (locale: string) => (!locale ? $cookies.remove(localeCookieName) : $cookies.set(localeCookieName, locale));

  const getCountry = () => $cookies.get(countryCookieName);
  const setCountry = (country: string) => (!country ? $cookies.remove(countryCookieName) : $cookies.set(countryCookieName, country));

  const settings = mapConfigToSetupObject({
    moduleOptions,
    app: plugin.app,
    additionalProperties: {
      state: {
        // Cart
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
    },
  });

  // @ts-ignore - not typed in core
  plugin.integration.configure('magento', settings);
});
