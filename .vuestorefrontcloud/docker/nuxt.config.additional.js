import baseNuxtConfig from '@vue-storefront/magento-theme/base.nuxt.config';

export default async () => {
  const baseDefaults = await baseNuxtConfig();

  return {
    ...baseDefaults,
    modules: [
      ...baseDefaults.modules,
    ],
    sentry: {
      dsn: process.env.VSF_SENTRY_DSN,
      tracing: true,
    },
  };
}
