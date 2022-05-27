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
