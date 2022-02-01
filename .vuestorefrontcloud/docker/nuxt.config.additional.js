import config from '@vue-storefront/magento-theme/config';
import baseNuxtConfig from '@vue-storefront/magento-theme/base.nuxt.config';

export default {
  ...baseNuxtConfig,
  modules: [
    ...baseNuxtConfig.modules,
    // '@nuxtjs/recaptcha',
  ],
  recaptcha: {
    hideBadge: config.get('recaptchaHideBadge'), // Hide badge element (v3 & v2 via size=invisible)
    siteKey: config.get('recaptchaSiteKey'), // Site key for requests
    version: config.get('recaptchaVersion'), // Version 2 or 3
    size: config.get('recaptchaSize'), // Size: 'compact', 'normal', 'invisible' (v2)
  },
  publicRuntimeConfig: {
    isRecaptcha: config.get('recaptchaEnabled'),
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
    tracing: true,
  },
};
