// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: "/integrations/sdk/magento",
  },
  extends: ["sf-docs-base"],
  vite: {
    server: {
      fs: {
        strict: false,
      },
    },
  },
});
