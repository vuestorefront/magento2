import { useContext } from '@nuxtjs/composition-api';

const useImage = () => {
  // @ts-ignore
  const { $vsf } = useContext();

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
  };
};

export default useImage;
