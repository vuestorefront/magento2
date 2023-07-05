import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';
import { TEST_ADDRESS, TEST_CART_ID } from './__config__/jest.const';

const SHARED_PARAMS = {
  cart_id: TEST_CART_ID,
  shipping_methods: [
    {
      carrier_code: 'flatrate',
      method_code: 'flatrate',
    },
  ],
};

describe(describeGroup('setShippingMethodsOnCart'), () => {
  it('should set shipping method on the cart', async () => {
    // We must have an address set before we can set a shipping method
    await sdk.magento.setShippingAddressesOnCart({
      cart_id: TEST_CART_ID,
      shipping_addresses: [{ address: TEST_ADDRESS }],
    });

    const { data } = await sdk.magento.setShippingMethodsOnCart(SHARED_PARAMS);

    expect(
      data?.setShippingMethodsOnCart?.cart?.shipping_addresses?.[0]?.selected_shipping_method?.method_code,
    ).toEqual('flatrate');

    // Reset shipping methods
    await sdk.magento.setShippingMethodsOnCart({ cart_id: TEST_CART_ID, shipping_methods: [] });
  });

  it('using custom query should return customized result', async () => {
    // We must have an address set before we can set a shipping method
    await sdk.magento.setShippingAddressesOnCart({
      cart_id: TEST_CART_ID,
      shipping_addresses: [{ address: TEST_ADDRESS }],
    });

    const customQuery = {
      setShippingMethodsOnCart: 'set-shipping-methods-on-cart-custom-query',
      metadata: {
        fields: 'shipping_addresses { selected_shipping_method { method_code } }',
      },
    };

    const { data } = await sdk.magento.setShippingMethodsOnCart(SHARED_PARAMS, { customQuery });

    // check if default (non-custom) query isn't ran on accident
    expect(data?.setShippingMethodsOnCart?.cart?.id).toBe(undefined);
    expect(data?.setShippingMethodsOnCart?.cart?.shipping_addresses?.[0]?.selected_shipping_method?.method_code).toBe(
      'flatrate',
    );

    // Reset shipping methods
    await sdk.magento.setShippingMethodsOnCart({ cart_id: TEST_CART_ID, shipping_methods: [] });
  });
});
