import { AddBundleProductsToCartInput } from '@vue-storefront/magento-types';
import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';
import { TEST_CART_ID, TEST_BUNDLE_SKU } from './__config__/jest.const';

const PARAMS: AddBundleProductsToCartInput = {
  cart_id: TEST_CART_ID,
  cart_items: [
    {
      data: {
        quantity: 1,
        sku: TEST_BUNDLE_SKU,
      },
      bundle_options: [
        {
          id: 1,
          quantity: 1,
          value: ['1'],
        },
        {
          id: 2,
          quantity: 1,
          value: ['4'],
        },
        {
          id: 3,
          quantity: 1,
          value: ['5'],
        },
        {
          id: 4,
          quantity: 1,
          value: ['8'],
        },
      ],
    },
  ],
};

describe(describeGroup('addBundleProductsToCart'), () => {
  it('should add product to cart', async () => {
    const result = await sdk.magento.addBundleProductsToCart(PARAMS);
    console.log(result);
    const item = result.data.addBundleProductsToCart!.cart!.items!.find(
      (cartItem) => cartItem!.product.sku === TEST_BUNDLE_SKU,
    );
    expect(result.data.addBundleProductsToCart!.cart!.id).toEqual(PARAMS.cart_id);
    expect(item).not.toBe(undefined);
  });

  it('should add product to cart and return custom query fields', async () => {
    const customQuery = {
      addBundleProductsToCart: 'add-bundle-products-to-cart-custom-query',
      metadata: {
        fields: 'id items { uid product { uid sku }}',
      },
    };

    const result = await sdk.magento.addBundleProductsToCart(PARAMS, { customQuery });

    const item = result.data.addBundleProductsToCart!.cart!.items!.find(
      (cartItem) => cartItem!.product.sku === TEST_BUNDLE_SKU,
    );
    expect(item).not.toBe(undefined);
    expect(result.data.addBundleProductsToCart!.cart!.id).toEqual(PARAMS.cart_id);
    // make sure default query is not called by accident
    expect(result.data.addBundleProductsToCart!.cart!.email).toBe(undefined);
  });
});
