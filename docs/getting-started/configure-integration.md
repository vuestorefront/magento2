# Configuring Vue Storefront for Magento 2

This guide explains the steps needed to install and set up Vue Storefront for Magento 2.

## Prerequisites

Before you can get started, you need the following:

- **Node.js 16** installed,
- Magento 2 server configured following the [Configuring Magento store](/getting-started/configure-magento.html) guide.

## Creating the Vue Storefront for Magento 2

To install Vue Storefront, run the command below. It will ask you for the project name and the integration of your choice. Keep in mind that the project name will also be used as the folder name, and be sure to select the Magento 2 integration.

```sh
npx @vue-storefront/cli init
```

Here's a recording of these steps:

<Asciinema id="493286" />

## Setting environment variables

After installation, the first step is to configure the integration using the environment variables.

1. Go to the root folder of your project.
2. Make a copy of the `.env.example` file and rename it to `.env`. You can do it manually or use the following command:

    ```sh
    cp .env.example .env
    ```

3. Update values in the `.env` file.

## Populating store configuration

The `plugins/storeConfigPlugin.ts` plugin loads store configuration data from Magento and saves it into the Pinia store under the `$state.storeConfig` property. By default, the amount of data loaded from Magento is minimal to avoid over-fetching, but as your application grows, you might need to pull more data.

This plugin loads the store configuration data based on a query in the `plugins/query/StoreConfig.gql.ts` file. You can modify this file to change what data is loaded.

## Configuring multistore and localization

Each Magento store view needs a corresponding locale configuration object in the `i18n` object in the `nuxt.config.js` file.

### `i18n.locales`

The `i18n.locales` array contains all supported locales. Each item in this array is an object containing the following properties:

- `code` - unique identifier of the locale corresponding to Magento store view code.
- `file` - the name of the file containing translations for this locale in the `lang` folder.
- `iso` - corresponding ISO country code.

For other properties please follow official [nuxt-i18n documentation](https://i18n.nuxtjs.org/options-reference#locales).

In the example configuration below, you need to have two Magento store views with corresponding store codes: `default` and `german`.

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
  }
]
```

### Translations

When working with translation in your application, you need to:

1. Add translations in Magento for products and categories.
2. Update the `i18n.locales` array in the `nuxt.config.js` file and add translations to the corresponding files in the `lang` directory.

## Optimizing images

You can use external image providers to optimize your images thanks to the [nuxt-img](https://image.nuxtjs.org/) module.

By default, Vue Storefront uses the `ipx` provider, an open-source, self-hosted image optimizer.

### Configuring external image provider

If you decide to use an external image provider, you have to update the following environment variables inside the `.env` file:

1. `VSF_MAGENTO_BASE_URL` - base URL of Magento shop. The `useImage` composable uses it to extract the image path from the full Magento URL.
2. `VSF_IMAGE_PROVIDER` - name of the external provider, e.g. `cloudinary`. See the [Providers](https://image.nuxtjs.org/getting-started/providers) page for more information.
3. `VSF_IMAGE_PROVIDER_DOMAIN` - domain of the image provider.
4. `VSF_IMAGE_PROVIDER_BASE_URL` - base URL of the image provider to upload images.

See the `image` property in the `nuxt.config.js` to learn how these environment variables are used and to configure any [other options](https://image.nuxtjs.org/api/options) supported by the [nuxt-img](https://image.nuxtjs.org/) plugin.

### Synchronize Magento images with an external provider

You need to synchronize all your images from the two folders below manually or create a script to do so:

- `media` folder in Magento. We recommend using the same path as in Magento. For example, if your image path is `{MAGENTO_BASE_URL}/media/catalog/product/{IMAGE_PATH}`, you should have the corresponding image in your external provider with the same path, e.g. `media/catalog/product/{IMAGE_PATH}`.
- `static` folder in Vue Storefront.

### The `useImage()` composable

Magento GraphQL API returns an URL to cached images, e.g. `{MAGENTO_BASE_URL}/media/catalog/product/cache/{IMAGE_PATH}`. When you download all images from your server's `media` directory, paths don't include the `cache/***/` part.

Because of that, we created the `useImage()` hook, which provides the `getMagentoImage(fullImageUrl: string)` method. This method returns an URL to the image without the Magento base URL and cache part. You can use it to get images from external providers.

Here's an example of how to use the `useImage()` composable:

```vue
<template>
  <SfImage
    image-tag="nuxt-img"
    :src="getMagentoImage(wishlistGetters.getItemImage(product))"
    :alt="wishlistGetters.getItemName(product)"
    :width="140"
    :height="200"
  />
</template>

<script>
import { useImage } from '~/composables';

export default {
  setup() {
    const { getMagentoImage } = useImage();

    return {
      getMagentoImage
    };
  }
};
</script>
```

### ImageSizes enum

There is a helper object in the `enums/imageEnums.js` file that export configuration for various image types:

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
