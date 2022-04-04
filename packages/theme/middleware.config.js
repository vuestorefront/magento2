/* eslint-disable unicorn/prefer-module */
const cookieNames = require('./enums/cookieNameEnum');

const isCheckoutEnabled = process.env.MAGENTO_EXTERNAL_CHECKOUT_ENABLED === 'true';

module.exports = {
  integrations: {
    magento: {
      location: '@vue-storefront/magento-api/server',
      configuration: {
        api: process.env.MAGENTO_GRAPHQL_URL,
        cookies: {
          ...cookieNames,
        },
        defaultStore: 'default',
        externalCheckout: {
          enable: isCheckoutEnabled,
          cmsUrl: process.env.MAGENTO_EXTERNAL_CHECKOUT_URL,
          syncUrlPath: process.env.MAGENTO_EXTERNAL_CHECKOUT_SYNC_PATH,
          stores: {
            default: isCheckoutEnabled,
          },
        },
        facets: {
          available: ['color', 'size', 'price'],
        },
        customApolloHttpLinkOptions: {
          useGETForQueries: true,
        },
        magentoBaseUrl: process.env.MAGENTO_BASE_URL,
        magentoApiEndpoint: process.env.MAGENTO_GRAPHQL_URL,
        imageProvider: process.env.IMAGAE_PROVIDER,
        recaptcha: {
          isEnabled: process.env.RECAPTCHA_ENABLED === 'true',
          sitekey: process.env.RECAPTCHA_SITE_KEY,
          secretkey: process.env.RECAPTCHA_SECRET_KEY,
          version: process.env.RECAPTCHA_VERSION,
          score: process.env.RECAPTCHA_MIN_SCORE,
        },
      },
    },
  },
};
