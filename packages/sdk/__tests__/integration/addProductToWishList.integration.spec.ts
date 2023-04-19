import { sdk } from '../integration/__config__/sdk.config';
import { describeGroup, getUserToken } from './__config__/jest.setup';

describe(describeGroup('addProductToWishList'), () => {
  it('adds product array', async () => {
    const token = await getUserToken();
    const options = {
      customHeaders: { Authorization: `Bearer ${token}` }
    };

    const result =
      await sdk.magento.addProductToWishList(
        {
          id: '258',
          items: [
            { quantity: 1, sku: 'WSH12' }
          ]
        },
        options
      );

    const { items } = result.data.addProductsToWishlist!.wishlist!.items_v2!;
    const addedItem = items.find(item => item!.product!.sku === 'WSH12');

    expect(addedItem?.product?.sku).not.toBe(undefined);
  });

  it('adds product array with custom query', async () => {
    const token = await getUserToken();
    const options = {
      customHeaders: { Authorization: `Bearer ${token}` },
      customQuery: {
        addProductsToWishlist: 'add-product-to-wishlist-custom-query',
        metadata: {
          fields: 'sharing_code'
        }
      }
    };

    const result = await sdk.magento.addProductToWishList(
      {
        id: '258',
        items: [
          { quantity: 1, sku: 'WSH12' }
        ]
      },
      options
    );

    expect(result.data.addProductsToWishlist!.wishlist.sharing_code).toBeTruthy();
    // check if default (non-custom) query isn't ran on accident
    expect(result.data.addProductsToWishlist!.wishlist.id).toBe(undefined);
  });
});
