/* eslint-disable unicorn/prefer-module */
const cookieNames = require('./enums/cookieNameEnum');

const isCheckoutEnabled = process.env.VSF_MAGENTO_EXTERNAL_CHECKOUT_ENABLED === 'true';

module.exports = {
  integrations: {
    magento: {
      location: '@vue-storefront/magento-api/server',
      configuration: {
        api: process.env.VSF_MAGENTO_GRAPHQL_URL,
        cookies: {
          ...cookieNames,
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
      },
    },
  },
};
