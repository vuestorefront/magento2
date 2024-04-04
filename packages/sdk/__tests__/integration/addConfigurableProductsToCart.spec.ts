import { AddConfigurableProductsToCartInput } from '@vue-storefront/magento-types';
import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';
import { TEST_CART_ID, TEST_CONF_SKU_PARENT, TEST_CONF_SKU_VARIANT } from './__config__/jest.const';

const PARAMS: AddConfigurableProductsToCartInput = {
  cart_id: TEST_CART_ID,
  cart_items: [
    {
      data: {
        quantity: 1,
        sku: TEST_CONF_SKU_VARIANT,
      },
      parent_sku: TEST_CONF_SKU_PARENT,
      customizable_options: [],
    },
  ],
};

describe(describeGroup('addConfigurableProductsToCart'), () => {
  it('should add product to cart', async () => {
    const result = await sdk.magento.addConfigurableProductsToCart(PARAMS);

    const item = result.data.addConfigurableProductsToCart!.cart!.items!.find(
      (cartItem) => cartItem!.product.sku === TEST_CONF_SKU_PARENT,
    );
    expect(result.data.addConfigurableProductsToCart!.cart!.id).toEqual(PARAMS.cart_id);
    expect(item).not.toBe(undefined);
  });

  it('should add product to cart and return custom query fields', async () => {
    const customQuery = {
      addConfigurableProductsToCart: 'add-configurable-products-to-cart-custom-query',
      metadata: {
        fields: 'id items { uid product { uid sku }}',
      },
    };

    const result = await sdk.magento.addConfigurableProductsToCart(PARAMS, { customQuery });

    const item = result.data.addConfigurableProductsToCart!.cart!.items!.find(
      (cartItem) => cartItem!.product.sku === TEST_CONF_SKU_PARENT,
    );
    expect(item).not.toBe(undefined);
    expect(result.data.addConfigurableProductsToCart!.cart!.id).toEqual(PARAMS.cart_id);
    // make sure default query is not called by accident
    expect(result.data.addConfigurableProductsToCart!.cart!.email).toBe(undefined);
  });
});
