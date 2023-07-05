import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';
import { TEST_ADDRESS, TEST_PRODUCT_SKU } from './__config__/jest.const';

describe(describeGroup('placeOrder'), () => {
  it('should place an order for a customer', async () => {
    const emptyCart = await sdk.magento.createEmptyCart();
    const cartId = emptyCart?.data?.createEmptyCart || '';

    await sdk.magento.setGuestEmailOnCart({ cart_id: cartId, email: 'john.doe+test@vuestorefront.io' });

    await sdk.magento.addProductsToCart({
      cartId,
      cartItems: [
        {
          quantity: 1,
          sku: TEST_PRODUCT_SKU,
          // size and color
          selected_options: ['Y29uZmlndXJhYmxlLzkzLzUz', 'Y29uZmlndXJhYmxlLzE0NC8xNzE='],
        },
      ],
    });

    await sdk.magento.setShippingAddressesOnCart({
      cart_id: cartId,
      shipping_addresses: [{ address: TEST_ADDRESS }],
    });

    await sdk.magento.setBillingAddressOnCart({
      cart_id: cartId,
      billing_address: { address: TEST_ADDRESS },
    });

    await sdk.magento.setShippingMethodsOnCart({
      cart_id: cartId,
      shipping_methods: [{ carrier_code: 'flatrate', method_code: 'flatrate' }],
    });

    await sdk.magento.setPaymentMethodOnCart({
      cart_id: cartId,
      payment_method: {
        code: 'checkmo',
      },
    });

    const result = await sdk.magento.placeOrder({ cart_id: cartId });

    const expected = expect.objectContaining({
      data: expect.objectContaining({
        placeOrder: expect.objectContaining({
          __typename: 'PlaceOrderOutput',
          order: expect.objectContaining({
            __typename: 'Order',
            order_number: expect.any(String),
          }),
        }),
      }),
    });

    expect(result).toEqual(expected);
  });
});
