# Configuration the Magento Integration

After the creation of the store, you must configure the Magento integration. You can configure the integration using the `environment variables` or using a `configuration file`.

## Environment Variables

For configure the integration using `environment variables`, you can have a `.env` file in the root folder, or define those in the server `environment`.

```dotenv
# Example environment configuration
STORE_ENV=dev # Store environment (Usage for file configuration)
NUXT_APP_ENV=development # Define nuxt application environment
NUXT_APP_PORT=3000 # Define nuxt port
MAGENTO_GRAPHQL=https://{YOUR_SITE_FRONT_URL}/graphql # Define Magento GraphQL endpoint
MAGENTO_EXTERNAL_CHECKOUT=false # Flag if VSF will use External Checkout
MAGENTO_EXTERNAL_CHECKOUT_URL=https://{YOUR_SITE_FRONT_URL} # External checkout URL
MAGENTO_EXTERNAL_CHECKOUT_SYNC_PATH=/vue/cart/sync # External Checkout synchronization path
```

## Configuration file

To use the configuration file in your application, first you need to define an `environment variables` called `STORE_ENV` which will be used to attribute what file the application will use to load the configuration from. You can create an `.env` file and add the following configuration.

```dotenv
# .evn file example
STORE_ENV=dev # Store environment (Usage for file configuration)
```

Then on the `config` folder create a file `dev.json` with your configurations.

```json5
{
  "magentoGraphQl": "https://{YOUR_SITE_FRONT_URL}/graphql", // Define Magento GraphQL endpoint
  "enableMagentoExternalCheckout": false, // Flag if VSF will use External Checkout
  "externalCheckoutUrl": "https://{YOUR_SITE_FRONT_URL}", // External checkout URL 
  "externalCheckoutSyncPath": "/vue/cart/sync", // External Checkout synchronization path
  "nuxtAppEnvironment": "development",  // Define nuxt application environment
  "nuxtAppPort": 3000 // Define nuxt port
}
```

## Languages (i18n)

To properly translate theme content with the usage of i18n library you must add configuration in `nuxt.config.js`. Here is the sample configuration for an English translation. VSF also provides default configuration OOTB which can be overridden if necessary.

By default VSF will map all locales ISO Codes into a locale code, eg. `en_US` will be mapped into `en` code therefore, to properly link the dictionary to Magento 2 store-view, you must set the locale `code` field to be exactly the same as ISO 639-1 alpha-2 code prefix. Mapping is handled by composable `isoToCode.js` helper function which is the extension point for implementing different strategies.


```json
i18n: {
    ...
    locales: [
      {
        code: 'en', // This must match <iso_a2alpha_prefix>_US from the iso code
        label: 'English',
        file: 'en.js', // Points to a file in langDir directory
        iso: 'en_US',
      }
    ],
    defaultLocale: 'en',
    langDir: 'lang/',
    },
    ...
  },
  ```