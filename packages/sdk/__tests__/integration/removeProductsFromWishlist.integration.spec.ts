import { sdk } from './__config__/sdk.config';
import { describeGroup, getUserToken } from './__config__/jest.setup';
import { TEST_PRODUCT_SKU } from './__config__/jest.const';

describe(describeGroup('removeProductsFromWishlist'), () => {
  const addProductToWishlist = async () => {
    const token = await getUserToken();
    const headers = {
      customHeaders: { Authorization: `Bearer ${token}` },
    };

    const wishlist = await sdk.magento.addProductToWishList(
      {
        id: '258',
        items: [{ quantity: 1, sku: TEST_PRODUCT_SKU }],
      },
      headers,
    );

    return { wishlist, headers };
  };

  it('should remove item from the wishlist', async () => {
    const { wishlist, headers } = await addProductToWishlist();
    const result = await sdk.magento.removeProductsFromWishlist(
      {
        id: wishlist!.data!.addProductsToWishlist!.wishlist!.id ?? '',
        items: ['656'],
      },
      headers,
    );

    const { items } = result!.data!.removeProductsFromWishlist!.wishlist!.items_v2!;
    const removedItem = items.find((item) => item!.product!.sku === TEST_PRODUCT_SKU);

    expect(removedItem).toBeUndefined();
  });

  it('should remove product array with custom query', async () => {
    const { wishlist, headers } = await addProductToWishlist();
    const customQuery = {
      removeProductsFromWishlist: 'remove-products-from-wishlist-custom-query',
      metadata: {
        fields: 'sharing_code',
      },
    };

    const result = await sdk.magento.removeProductsFromWishlist(
      {
        id: wishlist!.data!.addProductsToWishlist!.wishlist!.id ?? '',
        items: ['656'],
      },
      { customQuery, ...headers },
    );

    expect(result!.data!.removeProductsFromWishlist!.wishlist.sharing_code).toBeTruthy();
    // check if default (non-custom) query isn't ran on accident
    expect(result!.data!.removeProductsFromWishlist!.wishlist.id).toBe(undefined);
  });
});
