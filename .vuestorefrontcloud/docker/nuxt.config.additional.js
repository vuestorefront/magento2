import config from '@vue-storefront/magento-theme/config';
import baseNuxtConfig from '@vue-storefront/magento-theme/base.nuxt.config';

export default {
  ...baseNuxtConfig,
  modules: [
    ...baseNuxtConfig.modules,
    '@nuxtjs/sentry'
  ],
  sentry: {
    dsn: process.env.SENTRY_DSN,
    tracing: true,
  },
};
