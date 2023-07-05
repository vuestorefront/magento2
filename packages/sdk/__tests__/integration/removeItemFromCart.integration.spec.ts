import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';
import { TEST_CART_ID, TEST_PRODUCT_SKU } from './__config__/jest.const';

const ADD_TO_CART_PARAMS = {
  cartId: TEST_CART_ID,
  cartItems: [
    {
      quantity: 1,
      sku: TEST_PRODUCT_SKU,
      // size and color
      selected_options: ['Y29uZmlndXJhYmxlLzkzLzUz', 'Y29uZmlndXJhYmxlLzE0NC8xNzE='],
    },
  ],
};

describe(describeGroup('removeItemFromCart'), () => {
  // Store added item to remove it later
  let addedItem: any = null;

  const addProductsToCart = async () => {
    // Add product to cart before each test
    const result = await sdk.magento.addProductsToCart(ADD_TO_CART_PARAMS);
    addedItem = result.data.addProductsToCart!.cart!.items!.find((item) => item!.product.sku === TEST_PRODUCT_SKU);
  };

  it('should remove item from the cart', async () => {
    // Add product to cart before each test
    await addProductsToCart();

    const result = await sdk.magento.removeItemFromCart({ cart_id: TEST_CART_ID, cart_item_uid: addedItem?.uid });
    const item = result.data?.removeItemFromCart!.cart!.items!.find(
      (cartItem) => cartItem!.product.sku === TEST_PRODUCT_SKU,
    );

    expect(item).toBeUndefined();
  });

  it('using custom query should return customized result', async () => {
    // Add product to cart before each test
    await addProductsToCart();

    const customQuery = {
      removeItemFromCart: 'remove-item-from-cart-custom-query',
      metadata: {
        fields: 'id email',
      },
    };

    const result = await sdk.magento.removeItemFromCart(
      { cart_id: TEST_CART_ID, cart_item_uid: addedItem?.uid },
      { customQuery },
    );
    const expectedResult = {
      data: {
        removeItemFromCart: {
          __typename: 'RemoveItemFromCartOutput',
          cart: {
            __typename: 'Cart',
            email: 'vsf.magento.integration.test.user@gmail.com',
            id: 'pCS0ykep1l3wGlPKSyWLJq5fb1DxIQcp',
          },
        },
      },
    };

    expect(result).toStrictEqual(expectedResult);
  });
});
