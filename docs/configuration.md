# Configuration

Magento 2 configuration is located in two places:

- nuxt.config.js is a place where you're configuring properties related only to the frontend part of your application.

- middleware.config.js is a place where you're configuring Apollo and extensions. You will put there API keys, integration configurations, custom GraphQL queries and new API endpoints.

## Nuxt Magento configuration

```js
// nuxt.config.js
['@vue-storefront/magento/nuxt', {
  i18n: {
    useNuxtI18nConfig: true
  },
  api: 'https://your-magento-instance.tld/graphql',
  tax: {
    displayCartSubtotalIncludingTax: true
  },
  websites: {
    base: {
      code: 'base',
      defaultStoreGroup: 'main_website_store',
      storeGroups: {
        // eslint-disable-next-line @typescript-eslint/camelcase,camelcase
        main_website_store: {
          code: 'main_website_store',
          defaultStore: 'default',
          stores: {
            default: {
              code: 'default'
            },
            de: {
              code: 'de'
            },
            fr: {
              code: 'fr'
            }
          }
        }
      }
    }
  },
  defaultStore: 'default'
}]
```

- `useNuxtI18nConfig` - when this property is set to true, `@vue-storefront/magento/nuxt` package will use `i18n` 
  config object provided in `nuxt.config.js`. When set to false, `i18n` config should be declared directly inside this package configuration. You can read more about `i18n` config in Vue Storefront [here](../advanced/internationalization.md)

## Middleware Magento configuration

You can read more about middleware configuration in Vue Storefront [here](../advanced/server-middleware.md#configuration)

```js
// middleware.config.js
module.exports = {
  integrations: {
    ma: {
      ...
    }
  }
};
```
