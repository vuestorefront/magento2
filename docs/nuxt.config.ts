import { defineNuxtConfig } from "nuxt/config";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: "/integrations/magento",
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
