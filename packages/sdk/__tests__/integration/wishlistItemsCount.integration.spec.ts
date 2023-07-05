import { sdk } from './__config__/sdk.config';
import { describeGroup, getUserToken } from './__config__/jest.setup';

describe(describeGroup('wishlistItemsCount'), () => {
  it('counts items', async () => {
    const token = await getUserToken();
    const options = {
      customHeaders: { Authorization: `Bearer ${token}` },
    };

    const result = await sdk.magento.wishlistItemsCount(options);

    expect(typeof result.data!.customer!.wishlists[0]!.items_count).toBe('number');
  });
});
