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
  magentoBaseUrl: {
    doc: 'Magento base url',
    format: String,
    default: process.env.MAGENTO_BASE_URL || 'https://magento2-instance.vuestorefront.io/',
    env: 'MAGENTO_BASE_URL',
  },
  storeUrl: {
    doc: 'Store base URL',
    format: String,
    default: process.env.STORE_URL || 'http://localhost:3000',
    env: 'STORE_URL',
  },
  // endregion
  // region Nuxt Options
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
  // endregion
  // region Nuxt-Image Options
  imageProvider: {
    doc: 'Image provider',
    format: String,
    default: process.env.IMAGE_PROVIDER || 'ipx',
    env: 'IMAGE_PROVIDER',
  },
  imageProviderBaseUrl: {
    doc: 'Image provider base URL',
    format: String,
    default: process.env.IMAGE_PROVIDER_BASE_URL,
    env: 'IMAGE_PROVIDER_BASE_URL',
  },
  // endregion
  // region recaptcha
  recaptchaEnabled: {
    doc: 'reCaptcha Enabled',
    format: Boolean,
    default: process.env.RECAPTCHA_ENABLED || false,
    env: 'RECAPTCHA_ENABLED',
  },
  recaptchaHideBadge: {
    doc: 'reCaptcha Hide Badge',
    format: Boolean,
    default: process.env.RECAPTCHA_HIDE_BADGE || false,
    env: 'RECAPTCHA_HIDE_BADGE',
  },
  recaptchaVersion: {
    doc: 'reCaptcha Version',
    format: Number,
    default: process.env.RECAPTCHA_VERSION || 3,
    env: 'RECAPTCHA_VERSION',
  },
  recaptchaSiteKey: {
    doc: 'reCaptcha Site Key',
    format: String,
    default: process.env.RECAPTCHA_SITE_KEY || '',
    env: 'RECAPTCHA_SITE_KEY',
  },
  recaptchaSecretKey: {
    doc: 'reCaptcha Secret Key',
    format: String,
    default: process.env.RECAPTCHA_SECRET_KEY || '',
    env: 'RECAPTCHA_SECRET_KEY',
  },
  recaptchaSize: {
    doc: 'reCaptcha Size',
    format: String,
    default: process.env.RECAPTCHA_SIZE || 'invisible',
    env: 'RECAPTCHA_SIZE',
  },
  recaptchaMinScore: {
    doc: 'reCaptcha Minimum Score',
    format: Number,
    default: process.env.RECAPTCHA_MIN_SCORE || 0.5,
    env: 'RECAPTCHA_MIN_SCORE',
  },
  // endregion
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
