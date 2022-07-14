/* eslint-disable unicorn/prefer-module */
const cookieNames = {
  currencyCookieName: 'vsf-currency',
  countryCookieName: 'vsf-country',
  localeCookieName: 'vsf-locale',
  cartCookieName: 'vsf-cart',
  customerCookieName: 'vsf-customer',
  storeCookieName: 'vsf-store',
  messageCookieName: 'vsf-message',
};

const isCheckoutEnabled = process.env.VSF_MAGENTO_EXTERNAL_CHECKOUT_ENABLED === 'true';

module.exports = {
  helmet: {
    crossOriginResourcePolicy: true,
    referrerPolicy: { policy: 'origin' },
    frameguard: { action: 'deny' },
    permittedCrossDomainPolicies: { permittedPolicies: 'none' },
    contentSecurityPolicy: { useDefaults: true },
    expectCt: { maxAge: 86_400 },
  },
  integrations: {
    magento: {
      location: '@vue-storefront/magento-api/server',
      configuration: {
        api: process.env.VSF_MAGENTO_GRAPHQL_URL,
        cookies: {
          ...cookieNames,
        },
        cookiesDefaultOpts: {
          httpOnly: false,
          secure: true,
          sameSite: 'Strict',
          path: '/',
        },
        defaultStore: 'default',
        externalCheckout: {
          enable: isCheckoutEnabled,
          cmsUrl: process.env.VSF_MAGENTO_EXTERNAL_CHECKOUT_URL,
          syncUrlPath: process.env.VSF_MAGENTO_EXTERNAL_CHECKOUT_SYNC_PATH,
          stores: {
            default: isCheckoutEnabled,
          },
        },
        customApolloHttpLinkOptions: {
          useGETForQueries: true,
        },
        magentoBaseUrl: process.env.VSF_MAGENTO_BASE_URL,
        magentoApiEndpoint: process.env.VSF_MAGENTO_GRAPHQL_URL,
        imageProvider: process.env.VSF_IMAGE_PROVIDER,
        recaptcha: {
          isEnabled: process.env.VSF_RECAPTCHA_ENABLED === 'true',
          sitekey: process.env.VSF_RECAPTCHA_SITE_KEY,
          secretkey: process.env.VSF_RECAPTCHA_SECRET_KEY,
          version: process.env.VSF_RECAPTCHA_VERSION,
          score: process.env.VSF_RECAPTCHA_MIN_SCORE,
        },
        customer: {
          customer_create_account_confirm: true,
        },
      },
    },
  },
};
