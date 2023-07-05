import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';
import { TEST_CART_ID, TEST_PRODUCT_SKU } from './__config__/jest.const';
import { removeItemFromCart } from '../../src/methods';

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

describe(describeGroup('updateCartItems'), () => {
  // Store added item to remove it later
  let addedItem: any = null;

  const addProductsToCart = async () => {
    // Add product to cart before each test
    const result = await sdk.magento.addProductsToCart(ADD_TO_CART_PARAMS);
    addedItem = result.data.addProductsToCart!.cart!.items!.find((item) => item!.product.sku === TEST_PRODUCT_SKU);
  };

  const removeAddedProductFromCart = async () => {
    await removeItemFromCart({ cart_id: TEST_CART_ID, cart_item_uid: addedItem!.uid });
  };

  it('should update item data in the cart', async () => {
    // Add product to cart before each test
    await addProductsToCart();

    // Update quantity
    const expectedQuantity = 69;

    // Update cart item
    const result = await sdk.magento.updateCartItems({
      cart_id: TEST_CART_ID,
      cart_items: [
        {
          cart_item_uid: addedItem!.uid,
          quantity: expectedQuantity,
        },
      ],
    });

    // Find updated item
    const item = result!.data!.updateCartItems!.cart!.items!.find(
      (cartItem) => cartItem!.product.sku === TEST_PRODUCT_SKU,
    );

    expect(item!.quantity).toEqual(expectedQuantity);

    await removeAddedProductFromCart();
  });

  it('should update product in cart and return custom query fields', async () => {
    const customQuery = {
      updateCartItems: 'update-cart-items-custom-query',
      metadata: {
        fields: 'id items { uid quantity product { uid sku }}',
      },
    };

    // Add product to cart before each test
    await addProductsToCart();

    // Expected quantity
    const expectedQuantity = 69;

    const result = await sdk.magento.updateCartItems(
      {
        cart_id: TEST_CART_ID,
        cart_items: [
          {
            cart_item_uid: addedItem!.uid,
            quantity: expectedQuantity,
          },
        ],
      },
      { customQuery },
    );

    const item = result!.data!.updateCartItems!.cart!.items!.find(
      (cartItem) => cartItem!.product.sku === TEST_PRODUCT_SKU,
    );

    expect(item!.quantity).toEqual(expectedQuantity);
    expect(result!.data!.updateCartItems!.cart!.id).toEqual(TEST_CART_ID);
    // make sure default query is not called by accident
    expect(result!.data!.updateCartItems!.cart!.email).toBe(undefined);

    await removeAddedProductFromCart();
  });
});
