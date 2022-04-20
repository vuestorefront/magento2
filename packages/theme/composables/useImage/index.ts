import { useContext } from '@nuxtjs/composition-api';
import imageSizes from '~/enums/imageEnums';
import { UseImageInterface } from './useImage';

/**
 * The `useImage` composable allows to extract an image path from magento URL
 *
 * See {@link UseImageInterface} page for more details
 * */
export function useImage(): UseImageInterface {
  // @ts-ignore
  const { $vsf } = useContext();
  /**
   * Extract image path from Magento URL.
   *
   * @param fullImageUrl {string}
   *
   * @return {string}
   */
  const getMagentoImage = (fullImageUrl: string) => {
    const { imageProvider, magentoBaseUrl } = $vsf.$magento.config;

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
