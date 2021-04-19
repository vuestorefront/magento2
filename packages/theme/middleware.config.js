module.exports = {
  integrations: {
    magento: {
      location: '@vue-storefront/magento-api/server',
      configuration: {
        api: 'https://bo-mvp.ecritel.com.br/graphql', // 'https://demo-magento2.storefrontcloud.io/graphql',
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
