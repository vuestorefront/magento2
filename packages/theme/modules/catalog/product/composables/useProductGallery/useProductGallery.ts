import { ComputedRef } from '@nuxtjs/composition-api';
import { ImageSizes } from '~/composables';

/**
 * Product gallery image data structure
 */
export interface ProductGalleryImageInterface {
  url: string;
}

/**
 * Product gallery data structure
 */
export interface ProductGalleryInterface {
  mobile?: ProductGalleryImageInterface;
  desktop?: ProductGalleryImageInterface;
  big?: ProductGalleryImageInterface;
  alt?: string;
}

/**
 * Represents the data returned from and functions available in the `useProductGallery()` composable.
 */
export interface UseProductGalleryInterface {
  /**
   * Computed {@link ProductGalleryInterface} data array, mapped based on the product's gallery fetch
   */
  productGallery: ComputedRef<ProductGalleryInterface[]>,
  /**
   * Available image sizes derived from {@link UseImageInterface}
   */
  imageSizes: ImageSizes
}
