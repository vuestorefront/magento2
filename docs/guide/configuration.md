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

## Multistore and localization

Each Magento Store View need to have corresponding locale configuration object in `i18n.locales` array in `nuxt.config.js`.

### Locale configuration object reference

`code` (required) - unique identifier of the locale - corresponding to Magento store view code
For other properties please follow official [nuxt-i18n docs](https://i18n.nuxtjs.org/options-reference#locales)

### Sample configuration

```json
locales: [
  {
    code: 'default',
    file: 'en.js',
    iso: 'en_US',
  },
  {
    code: 'german',
    file: 'de.js',
    iso: 'de_DE',
  },
],
  ```
So for this configuration you need to have two Magento store views with corresponding store codes: `default` and `german`

## Translations

There are two steps to translate whole storefront:
1. Add translations in Magento for products and categories if necessary
2. Add translations to files in the `lang` directory
