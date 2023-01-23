import baseNuxtConfig from './base.nuxt.config';

export default async () => {
  const baseDefaults = await baseNuxtConfig();

  return {
    ...baseDefaults,
    modules: [
      ...baseDefaults.modules,
    ],
  };
}
