import { useContext } from '@nuxtjs/composition-api';
import imageSizes from '~/enums/imageEnums';
import { UseImageInterface } from './useImage';

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
   * @param fullImageUrl {string}
   *
   * @return {string}
   */
  const getMagentoImage = (fullImageUrl: string) => {
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
