# useImage

The `useImage` composable can be used to extract the image paths returned from the Magento API. 

```js
import { useImage } from '~/composables';

const { getMagentoImage, imageSizes } = useImage();
```

## API

`useImage` returns the following properties:
- `getMagentoImage` - extracts the image path from the Magento URL
- `imageSizes` - default sizes for different image usages

## Usage

The `getMagentoImage` method extracts the image path from the Magento URL. This can be useful when working with external image providers and `nuxt-img` to optimize your images. 

:::tip You may need additional setup for image optimization.
Learn more about [image optimization](/guide/image-optimization.html) in Vue Storefront with `nuxt-img`.
:::

Magento's GraphQL API returns a URL that contains both your Magento base URL and the path to the cached image.

However, when we're connecting with third-party image providers via `nuxt-img`, we want to provide a cleaner path that does not include our Magento URL and info about cache.

```
Result from GraphQL API

{MAGENTO_BASE_URL}/media/catalog/product/cache/{IMAGE_PATH}


Path for nuxt-img
/media/catalog/product/{IMAGE_PATH}
```


`getMagentoImage` takes in the Magento URL to your cached image and returns a "clean" path can then be used with your external providers to handle the image resizing and optimization.


## Example

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


## Default Sizes

`useImage` also exposes a `imageSizes` property that can be used to control the size of the image for different usages like:
- `productCard`,
- `productCardHorizontal`,
- `checkout`,
- `productGallery`,
- `cart`

These constant sizes can be used to standardize the image sizes across the application.

You can customize these values inside of the `composables/useImage` file.

```js
const imageSizes = {
  productCard: {
    width: 216,
    height: 268,
  },
  productCardHorizontal: {
    width: 140,
    height: 200,
  },
  checkout: {
    imageWidth: 100,
    imageHeight: 100,
  },
  productGallery: {
    thumbWidth: 160,
    thumbHeight: 160,
    imageWidth: 1080,
    imageHeight: 1340,
  },
  cart: {
    imageWidth: 170,
    imageHeight: 170,
  },
};
```

## Types

```js
export type ImageSizes = {
  productCard: {
    width: number,
    height: number,
  },
  productCardHorizontal: {
    width: number,
    height: number,
  },
  checkout: {
    imageWidth: number,
    imageHeight: number,
  },
  productGallery: {
    thumbWidth: number,
    thumbHeight: number,
    imageWidth: number,
    imageHeight: number,
  },
  cart: {
    imageWidth: number,
    imageHeight: number,
  },
};

/**
 * Data and methods returned from the {@link useImage|useImage()} composable
 */
export interface UseImageInterface {
  /**
   * Extracts image path from Magento URL.
   */
  getMagentoImage(fullImageUrl: string): string

  /**
   * Available image sizes
   */
  imageSizes: ImageSizes
}
```