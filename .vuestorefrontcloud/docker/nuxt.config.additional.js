import config from '@vue-storefront/magento-theme/config';
import baseNuxtConfig from '@vue-storefront/magento-theme/base.nuxt.config';

export default () => {
  const baseDefaults = baseNuxtConfig();

  return {
    ...baseDefaults,
    modules: [
      ...baseDefaults.modules,
    ],
    sentry: {
      dsn: process.env.SENTRY_DSN,
      tracing: true,
    },
  };
}
