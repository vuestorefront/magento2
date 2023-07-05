import { sdk } from './__config__/sdk.config';
import { describeGroup, getUserToken } from './__config__/jest.setup';
import { TEST_PRODUCT_SKU } from './__config__/jest.const';

const createAddToCartParams = (sourceCartId: string) => ({
  cartId: sourceCartId,
  cartItems: [
    {
      sku: TEST_PRODUCT_SKU,
      quantity: 1,
      selected_options: [
        // size and color
        'Y29uZmlndXJhYmxlLzkzLzUz',
        'Y29uZmlndXJhYmxlLzE0NC8xNzE=',
      ],
    },
  ],
});

describe(describeGroup('mergeCarts'), () => {
  it('should merge carts', async () => {
    const customHeaders = { Authorization: `Bearer ${await getUserToken()}` };
    const sourceCartId = (await sdk.magento.createEmptyCart()).data!.createEmptyCart!;
    // carts are generally merged when guest adds something to cart then logs in, hence the destination cart is created as an authorized user (customHeaders)
    const destinationCartId = (await sdk.magento.createEmptyCart({ customHeaders })).data!.createEmptyCart!;
    await sdk.magento.addProductsToCart(createAddToCartParams(sourceCartId));

    const result = await sdk.magento.mergeCarts({ sourceCartId, destinationCartId }, { customHeaders });

    const addedProductInDestinationCart = result.data.mergeCarts.items!.find(
      (item) => item!.product.sku === TEST_PRODUCT_SKU,
    );
    expect(addedProductInDestinationCart).toBeDefined();
  });

  it('merges cart using custom query', async () => {
    const customQuery = {
      mergeCarts: 'merge-carts-custom-query',
      metadata: {
        fields: 'id',
      },
    };
    const customHeaders = { Authorization: `Bearer ${await getUserToken()}` };
    const sourceCartId = (await sdk.magento.createEmptyCart()).data!.createEmptyCart!;
    const destinationCartId = (await sdk.magento.createEmptyCart({ customHeaders })).data!.createEmptyCart!;
    await sdk.magento.addProductsToCart(createAddToCartParams(sourceCartId));

    const result = await sdk.magento.mergeCarts({ sourceCartId, destinationCartId }, { customHeaders, customQuery });

    expect(result.data.mergeCarts.id).toBe(destinationCartId);
    // check if default (non-custom) query isn't ran on accident
    expect(result.data.mergeCarts.email).not.toBeDefined();
  });
});
