const config = require('./config.js');
const cookieNames = require('./enums/cookieNameEnum');

module.exports = {
  integrations: {
    magento: {
      location: '@vue-storefront/magento-api/server',
      configuration: {
        api: config.get('magentoGraphQl'),
        cookies: {
          ...cookieNames,
        },
        defaultStore: 'default',
        externalCheckout: {
          enable: config.get('enableMagentoExternalCheckout'),
          cmsUrl: config.get('externalCheckoutUrl'),
          syncUrlPath: config.get('externalCheckoutSyncPath'),
          stores: {
            default: config.get('enableMagentoExternalCheckout'),
          },
        },
        tax: {
          displayCartSubtotalIncludingTax: true,
        },
        facets: {
          available: ['color', 'size', 'price'],
        },
        customApolloHttpLinkOptions: {
          useGETForQueries: false,
        },
      },
    },
  },
};
