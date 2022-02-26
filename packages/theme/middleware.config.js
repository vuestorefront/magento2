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
        facets: {
          available: ['color', 'size', 'price'],
        },
        customApolloHttpLinkOptions: {
          useGETForQueries: true,
        },
        magentoBaseUrl: config.get('magentoBaseUrl'),
        magentoApiEndpoint: config.get('magentoGraphQl'),
        imageProvider: config.get('imageProvider'),
        recaptcha: {
          isEnabled: config.get('recaptchaEnabled'),
          sitekey: config.get('recaptchaSiteKey'),
          secretkey: config.get('recaptchaSecretKey'),
          version: config.get('recaptchaVersion'),
          score: config.get('recaptchaMinScore'),
        },
      },
    },
  },
};
