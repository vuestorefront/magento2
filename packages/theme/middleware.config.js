const config = require('./config.js');

module.exports = {
  integrations: {
    magento: {
      location: '@vue-storefront/magento-api/server',
      configuration: {
        api: config.get('magentoGraphQl'),
        cookies: {
          currencyCookieName: 'vsf-currency',
          countryCookieName: 'vsf-country',
          localeCookieName: 'vsf-locale',
          cartCookieName: 'vsf-cart',
          customerCookieName: 'vsf-customer',
          storeCookieName: 'vsf-store',
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
        websites: {
          base: {
            code: 'base',
            defaultStoreGroup: 'main_website_store',
            storeGroups: {
              main_website_store: {
                code: 'main_website_store',
                defaultStore: 'default',
                stores: {
                  default: { code: 'default' },
                  de: { code: 'de' },
                  fr: { code: 'fr' },
                },
              },
            },
          },
        },
        facets: {
          available: ['color', 'size', 'price'],
        },
      },
    },
  },
};
