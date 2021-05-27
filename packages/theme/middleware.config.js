require('dotenv').config();

module.exports = {
  integrations: {
    magento: {
      location: '@vue-storefront/magento-api/server',
      configuration: {
        api: process.env.MAGENTO_GRAPHQL,
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
          enable: JSON.parse(process.env.MAGENTO_EXTERNAL_CHECKOUT),
          cmsUrl: process.env.MAGENTO_EXTERNAL_CHECKOUT_URL,
          syncUrlPath: process.env.MAGENTO_EXTERNAL_CHECKOUT_SYNC_PATH,
          stores: {
            default: process.env.MAGENTO_EXTERNAL_CHECKOUT,
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
      },
    },
  },
};
