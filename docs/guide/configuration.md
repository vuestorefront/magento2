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
MAGENTO_BASE_URL={YOUR_SITE_FRONT_URL} # base url of your Magento instance
IMAGE_PROVIDER={YOUR_IMAGE_PROVIDER} # your image provider, for example cloudinary, default is ipx
IMAGE_PROVIDER_BASE_URL={YOUR_IMAGE_PROVIDER_BASE_URL} # base url provided from your image provider. It's used by nuxt-img to fetch images
```

## Configuration file

To use the configuration file in your application, first you need to define an `environment variables` called `STORE_ENV` which will be used to attribute what file the application will use to load the configuration from. You can create an `.env` file and add the following configuration.

```dotenv
# .env file example
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
  "nuxtAppPort": 3000, // Define nuxt port
  "imageProvider": "ipx", // define image provider
  "magentoBaseUrl": "https://magento2-instance.vuestorefront.io/", // define your Magento base URL
  "imageProviderBaseUrl": "https://res-4.cloudinary.com/{YOUR_CLOUD_ID}/image/upload/" // define image provider base url - this is example from cloudinary
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


## Image Providers
Thanks to the [nuxt-img](https://image.nuxtjs.org/) you can use external image providers.

By default, we use the `ipx` provider. that means the images are fetched from Magento, and from `static` directory.

### How to configure external image provider

1. Configure ENV variables
  1. `MAGENTO_BASE_URL` - base URL of Magento shop. It's used by the `useImage` composable to extract image's path from full Magento URL.
  2. `IMAGE_PROVIDER` - for example: `cloudinary`. List of available providers is [here](https://image.nuxtjs.org/getting-started/providers)
  3. `IMAGE_PROVIDER_BASE_URL` - the base url of your project in for example cloudinary or other image providers
2. Configure your provider in `nuxt.config.js`. Here is the example:
```javascript
image: {
  provider: config.get('imageProvider'),
  magekit: {
    baseURL: config.get('imageProviderBaseUrl'),
  }
},
```
3. Sync your Magento images with external provider
  1. For example if you have anb image in Magento with path `{YOUR_MAGENTO_BASE_URL}o/media/catalog/product/w/g/wg02-bk-0.jpg`
     you should have corresponding image in your external provider: `media/catalog/product/w/g/wg02-bk-0.jpg`
4. Sync your local images with external provider
  1. Upload content of `static` directory to your external media library

### The useImage composable

Magento GraphQL API returns an URL to cached images, for example: `https://magento2-instance.vuestorefront.io/media/catalog/product/cache/d3f55929541f2d022ca06067148d0eae/w/g/wg02-bk-0.jpg`.
When you basically download all images from your server (from media) directory, paths are different, they does not include `cache/***/` part.

Because of that, we created the `useImage` hook, which provides `getMagentoImage(fullImageUrl: string)` method.
That methods returns an URL to image, without magento base url, and cache part. Then you can use it to get images from external providers.


When you want to use this composable you need to:

1. import it in component
   `import { useImage } from '~/composables';`
2. Export `getMagentoImage to a template
```javascript
// component body (typically a setup() function)
const { getMagentoImage } = useImage();

return {
  ... // other things like computed properties, methods and so on
    getMagentoImage
}
```
3. Use the `getMagentoImage` method in template like this:
```vue
<SfImage
  image-tag="nuxt-img"
  :src="getMagentoImage(wishlistGetters.getItemImage(product))"
  :alt="wishlistGetters.getItemName(product)"
  :width="140"
  :height="200"
/>
```

### ImageSizes enum
There is helper object in `enums/imageEnums.js` file that export configuration for various image types:
```javascript
module.exports = {
  productCard: {
    width: 216,
    height: 268,
  },
  productCardHorizontal: {
    width: 140,
    height: 200,
  },
  cartItem: {
    width: 100,
    height: 100,
  },
};

```
