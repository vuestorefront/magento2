import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';
import { TEST_CART_ID, TEST_PRODUCT_SKU } from './__config__/jest.const';

const PARAMS = {
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

describe(describeGroup('addProductsToCart'), () => {
  it('should add product to cart', async () => {
    const result = await sdk.magento.addProductsToCart(PARAMS);

    const item = result.data.addProductsToCart!.cart!.items!.find(
      (cartItem) => cartItem!.product.sku === TEST_PRODUCT_SKU,
    );
    expect(result.data.addProductsToCart!.cart!.id).toEqual(PARAMS.cartId);
    expect(item).not.toBe(undefined);
  });

  it('should add product to cart and return custom query fields', async () => {
    const customQuery = {
      addProductsToCart: 'add-products-to-cart-custom-query',
      metadata: {
        fields: 'id items { uid product { uid sku }}',
      },
    };

    const result = await sdk.magento.addProductsToCart(PARAMS, { customQuery });

    const item = result.data.addProductsToCart!.cart!.items!.find(
      (cartItem) => cartItem!.product.sku === TEST_PRODUCT_SKU,
    );
    expect(item).not.toBe(undefined);
    expect(result.data.addProductsToCart!.cart!.id).toEqual(PARAMS.cartId);
    // make sure default query is not called by accident
    expect(result.data.addProductsToCart!.cart!.email).toBe(undefined);
  });
});
