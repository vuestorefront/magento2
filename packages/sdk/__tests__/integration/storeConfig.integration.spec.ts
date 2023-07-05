import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';

describe(describeGroup('storeConfig'), () => {
  it('should fetch store config', async () => {
    const result = await sdk.magento.storeConfig();

    expect(result?.data?.storeConfig).not.toBeNull();
  });

  it('should fetch store config using custom query', async () => {
    const customQuery = {
      storeConfig: 'store-config-custom-query',
      metadata: {
        fields: 'logo_alt logo_height logo_width',
      },
    };

    const result = await sdk.magento.storeConfig({ customQuery });

    const expectedResult = expect.objectContaining({
      data: expect.objectContaining({
        storeConfig: expect.objectContaining({
          __typename: 'StoreConfig',
          logo_alt: null,
          logo_height: null,
          logo_width: null,
        }),
      }),
      loading: false,
      networkStatus: 7,
    });

    expect(result).toEqual(expectedResult);
    // check if default (non-custom) query isn't ran on accident
    await expect(result?.data?.storeConfig?.base_currency_code).toBeUndefined();
  });
});
