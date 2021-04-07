module.exports = {
  integrations: {
    magento: {
      location: '@vue-storefront/magento-api/server',
      configuration: {
        api: {
          uri: 'https://bo-mvp.ecritel.com.br/graphql',
        },
        currency: 'USD',
        country: 'US',
      },
    },
  },
};
