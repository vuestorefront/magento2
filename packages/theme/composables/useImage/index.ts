import { useContext } from '@nuxtjs/composition-api';
import { UseImageInterface } from './useImage';

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

/**
 * Allows extracting image paths from magento URL.
 *
 * See the {@link UseImageInterface} for a list of methods and values available in this composable.
 * */
export function useImage(): UseImageInterface {
  const context = useContext();
  /**
   * Extract image path from Magento URL.
   *
   * @param fullImageUrl {string | null}
   *
   * @return {string}
   */
  const getMagentoImage = (fullImageUrl: string | null) => {
    if (!fullImageUrl) return '';

    // @ts-ignore
    const { imageProvider, magentoBaseUrl } = context.$vsf.$magento.config;

    if (imageProvider !== 'ipx') {
      const url = fullImageUrl.split(`${magentoBaseUrl}`);

      const regex = /cache\/(.*?)\//gm;
      return url[1].replace(regex, '');
    }

    return fullImageUrl;
  };

  return {
    getMagentoImage,
    imageSizes,
  };
}

export * from './useImage';
export default useImage;
