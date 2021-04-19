module.exports = {
  integrations: {
    ma: {
      location: '@vue-storefront/magento-api/server',
      configuration: {
        api: 'https://vsf-m2.site-builder.app/graphql',
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
        defaultStore: 'default',
      },
    },
  },
};
