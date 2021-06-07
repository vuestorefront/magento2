require('dotenv').config();
const fs = require('fs');
const convict = require('convict');

convict.addFormat(require('convict-format-with-validator').url);

const config = convict({
  env: {
    doc: 'Current Store Running Environment',
    format: String,
    default: process.env.STORE_ENV || '',
    env: 'STORE_ENV',
  },
  // region Magento 2 VueStorefront
  magentoGraphQl: {
    doc: 'The Magento GraphQL API URL',
    format: 'url',
    default: process.env.MAGENTO_GRAPHQL || '',
    env: 'MAGENTO_GRAPHQL',
  },
  enableMagentoExternalCheckout: {
    doc: 'Enable the usage of Magento External Checkout flow.',
    format: Boolean,
    default: process.env.MAGENTO_EXTERNAL_CHECKOUT || false,
    env: 'MAGENTO_EXTERNAL_CHECKOUT',
  },
  externalCheckoutUrl: {
    doc: 'The Magento External Checkout URL',
    format: 'url',
    default: process.env.MAGENTO_EXTERNAL_CHECKOUT_URL || '',
    env: 'MAGENTO_EXTERNAL_CHECKOUT_URL',
  },
  externalCheckoutSyncPath: {
    doc: 'The Magento External Checkout Sync Path',
    format: String,
    default: process.env.MAGENTO_EXTERNAL_CHECKOUT_SYNC_PATH || '',
    env: 'MAGENTO_EXTERNAL_CHECKOUT_SYNC_PATH',
  },
  // endregion
});

const env = config.get('env');
const filePath = `./config/${env}.json`;
fs.access(filePath, fs.F_OK, (err) => {
  if (err) {
    console.warn('[Magento: Middleware Config] Not found any configuration file, will use the ENV variable or default configuration.');
    return;
  }
  config.loadFile(filePath);
});

// Perform validation
config.validate({ allowed: 'strict' });

module.exports = config;
