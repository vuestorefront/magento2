# Image optimization

You can use external image providers to optimize your images thanks to the [nuxt-img](https://image.nuxtjs.org/) module.

By default, Vue Storefront uses the `ipx` provider, an open-source, self-hosted image optimizer.

## Configure external image provider

If you decide to use an external image provider, you have to update the following environment variables inside the `.env` file:

1. `VSF_MAGENTO_BASE_URL` - base URL of Magento shop. The `useImage` composable uses it to extract the image path from the full Magento URL.
2. `VSF_IMAGE_PROVIDER` - name of the external provider, e.g. `cloudinary`. See the [Providers](https://image.nuxtjs.org/getting-started/providers) page for more information.
3. `VSF_IMAGE_PROVIDER_DOMAIN` - domain of the image provider.
4. `VSF_IMAGE_PROVIDER_BASE_URL` - base URL of the image provider to upload images.

See the `image` property in the `nuxt.config.js` to learn how these environment variables are used and to configure any [other options](https://image.nuxtjs.org/api/options) supported by the [nuxt-img](https://image.nuxtjs.org/) plugin.

## Synchronize Magento images with an external provider

You need to synchronize all your images from the two folders below manually or create a script to do so:

- `media` folder in Magento. We recommend using the same path as in Magento. For example, if your image path is `{MAGENTO_BASE_URL}/media/catalog/product/{IMAGE_PATH}`, you should have the corresponding image in your external provider with the same path, e.g. `media/catalog/product/{IMAGE_PATH}`.
- `static` folder in Vue Storefront.

## The `useImage()` composable

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

## Configure `ImageSizes` enum

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
