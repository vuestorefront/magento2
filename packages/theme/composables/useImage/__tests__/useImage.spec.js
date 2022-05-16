import { useContext } from '@nuxtjs/composition-api';
import { useImage } from '../index';

jest.mock('@nuxtjs/composition-api', () => ({
  useContext: jest.fn(),
}));

describe('useImage composable', () => {
  const testURL = 'https://mymagento.dev/media/image.png';

  it('return given URL without modifications if custom image provider is not set', () => {
    useContext.mockReturnValue({
      $vsf: {
        $magento: {
          config: {
            imageProvider: 'ipx',
          },
        },
      },
    });

    const { getMagentoImage } = useImage();
    const image = getMagentoImage(testURL);

    expect(image).toEqual(image);
  });

  it('return modified URL when custom image provider is set', () => {
    useContext.mockReturnValue({
      $vsf: {
        $magento: {
          config: {
            imageProvider: 'cloudinary',
            magentoBaseUrl: 'https://mymagento.dev/',
          },
        },
      },
    });

    const { getMagentoImage } = useImage();
    const image = getMagentoImage(testURL);

    expect(image).toEqual('media/image.png');
  });
});
