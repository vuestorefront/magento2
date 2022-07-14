import baseNuxtConfig from '@vue-storefront/magento-theme/base.nuxt.config';

export default () => {
  const baseDefaults = baseNuxtConfig();

  return {
    ...baseDefaults,
    modules: [
      ...baseDefaults.modules,
      '@nuxtjs/sentry',
    ],
    sentry: {
      dsn: process.env.VSF_SENTRY_DSN,
      tracing: true,
    },
  };
}
