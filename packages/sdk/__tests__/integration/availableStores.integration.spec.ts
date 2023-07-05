import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';

describe(describeGroup('availableStores'), () => {
  it('should fetch list of available stores', async () => {
    const result = await sdk.magento.availableStores();

    expect(result?.data?.availableStores?.length).toBeGreaterThan(0);
  });

  it('should fetch list of available stores using custom query', async () => {
    const customQuery = {
      availableStores: 'available-stores-custom-query',
      metadata: {
        fields: 'code store_name',
      },
    };

    const result = await sdk.magento.availableStores({ customQuery });

    expect(result?.data?.availableStores?.[0]?.code).toBeDefined();
    // check if default (non-custom) query isn't ran on accident
    expect(result?.data?.availableStores?.[0]?.id).toBeUndefined();
  });
});
