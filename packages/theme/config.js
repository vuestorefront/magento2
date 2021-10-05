require('dotenv').config();
const fs = require('fs');
const convict = require('convict');

convict.addFormat(require('convict-format-with-validator').url);

const config = convict({
  env: {
    doc: 'Current Store Running Environment',
    format: String,
    default: process.env.STORE_ENV || 'dev',
    env: 'STORE_ENV',
  },
  // region Magento 2 VueStorefront
  magentoGraphQl: {
    doc: 'The Magento GraphQL API URL',
    format: 'url',
    default: process.env.MAGENTO_GRAPHQL || 'http://localhost:8080/graphql',
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
    default: process.env.MAGENTO_EXTERNAL_CHECKOUT_URL || 'http://localhost:8080',
    env: 'MAGENTO_EXTERNAL_CHECKOUT_URL',
  },
  externalCheckoutSyncPath: {
    doc: 'The Magento External Checkout Sync Path',
    format: String,
    default: process.env.MAGENTO_EXTERNAL_CHECKOUT_SYNC_PATH || '/vue/cart/sync',
    env: 'MAGENTO_EXTERNAL_CHECKOUT_SYNC_PATH',
  },
  // endregion
  storeUrl: {
    doc: 'Store base URL',
    format: String,
    default: process.env.STORE_URL || 'http://localhost:3000',
    env: 'STORE_URL',
  },
  nuxtAppEnvironment: {
    doc: 'Nuxt Store environment',
    format: String,
    default: process.env.NUXT_APP_ENV || 'development',
    env: 'NUXT_APP_ENV',
  },
  nuxtAppPort: {
    doc: 'Nuxt Store Application Port',
    format: Number,
    default: process.env.NUXT_APP_PORT || 3000,
    env: 'NUXT_APP_PORT',
  },
});

const env = config.get('env');
const filePath = `./config/${env}.json`;
try {
  fs.readFileSync(filePath, { encoding: 'utf8' });
  config.loadFile(filePath);
} catch {
  console.warn('[Magento: Middleware Config] Not found any configuration file, will use the ENV variable or default configuration.');
}

// Perform validation
config.validate({ allowed: 'strict' });

module.exports = config;
