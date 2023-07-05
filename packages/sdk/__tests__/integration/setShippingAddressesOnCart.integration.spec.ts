import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';
import { TEST_ADDRESS, TEST_CART_ID } from './__config__/jest.const';

const SHARED_PARAMS = {
  cart_id: TEST_CART_ID,
  shipping_addresses: [
    {
      address: TEST_ADDRESS,
    },
  ],
};

describe(describeGroup('setShippingAddressesOnCart'), () => {
  it('should set shipping addresses on the cart', async () => {
    const { data } = await sdk.magento.setShippingAddressesOnCart(SHARED_PARAMS);

    const expectedResult = expect.objectContaining({
      setShippingAddressesOnCart: expect.objectContaining({
        cart: expect.objectContaining({
          shipping_addresses: expect.arrayContaining([
            expect.objectContaining({
              firstname: TEST_ADDRESS.firstname,
              lastname: TEST_ADDRESS.lastname,
              street: expect.arrayContaining([TEST_ADDRESS.street[0], TEST_ADDRESS.street[1]]),
              city: TEST_ADDRESS.city,
            }),
          ]),
        }),
      }),
    });

    expect(data).toStrictEqual(expectedResult);
  });

  it('using custom query should return customized result', async () => {
    const customQuery = {
      setShippingAddressesOnCart: 'set-shipping-addresses-on-cart-custom-query',
      metadata: {
        fields: 'shipping_addresses { city }',
      },
    };

    const { data } = await sdk.magento.setShippingAddressesOnCart(SHARED_PARAMS, { customQuery });

    // check if default (non-custom) query isn't ran on accident
    expect(data?.setShippingAddressesOnCart?.cart?.shipping_addresses?.[0]?.firstname).toBe(undefined);
    expect(data?.setShippingAddressesOnCart?.cart?.shipping_addresses?.[0]?.city).toBe(TEST_ADDRESS.city);
  });
});
