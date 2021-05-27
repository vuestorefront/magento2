require('dotenv').config();
const convict = require('convict');

convict.addFormat(require('convict-format-with-validator').url);

const config = convict({
  env: {
    doc: 'Current Store Running Environment',
    format: String,
    default: 'dev',
    env: 'STORE_ENV',
  },
  // region Magento 2 VueStorefront
  magentoGraphQl: {
    doc: 'The Magento GraphQL API URL',
    format: 'url',
    default: 'https://localhost/graphql',
    env: 'MAGENTO_GRAPHQL',
  },
  enableMagentoExternalCheckout: {
    doc: 'Enable the usage of Magento External Checkout flow.',
    format: Boolean,
    default: 'false',
    env: 'MAGENTO_EXTERNAL_CHECKOUT',
  },
  externalCheckoutUrl: {
    doc: 'The Magento External Checkout URL',
    format: 'url',
    default: 'https://localhost',
    env: 'MAGENTO_EXTERNAL_CHECKOUT_URL',
  },
  externalCheckoutSyncPath: {
    doc: 'The Magento External Checkout Sync Path',
    format: String,
    default: '/vue/cart/sync',
    env: 'MAGENTO_EXTERNAL_CHECKOUT_SYNC_PATH',
  },
  // endregion
});

const env = config.get('env');

config.loadFile(`./config/${env}.json`);

// Perform validation
config.validate({ allowed: 'strict' });

module.exports = config;
