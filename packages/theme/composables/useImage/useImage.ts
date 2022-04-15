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

/** Represent data and methods returned by the {@link useImage} composable */
export interface UseImageInterface {
  /** Extract image path from Magento URL. */
  getMagentoImage (fullImageUrl: string): string
  /** Available image sizes */
  imageSizes: ImageSizes
}
