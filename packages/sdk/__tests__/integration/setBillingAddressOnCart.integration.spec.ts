import { SetBillingAddressOnCartInput } from '@vue-storefront/magento-types';
import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';
import { TEST_ADDRESS, TEST_CART_ID } from './__config__/jest.const';

const SHARED_PARAMS: SetBillingAddressOnCartInput = {
  cart_id: TEST_CART_ID,
  billing_address: {
    address: TEST_ADDRESS,
  },
};

describe(describeGroup('setBillingAddressOnCart'), () => {
  afterEach(async () => {
    // Reset addresses
    await sdk.magento.setBillingAddressOnCart({
      cart_id: TEST_CART_ID,
      billing_address: {},
    });
  });

  it('should set billing address on the cart', async () => {
    const { data } = await sdk.magento.setBillingAddressOnCart(SHARED_PARAMS);

    const expectedResult = expect.objectContaining({
      setBillingAddressOnCart: expect.objectContaining({
        cart: expect.objectContaining({
          billing_address: expect.objectContaining({
            firstname: TEST_ADDRESS.firstname,
            lastname: TEST_ADDRESS.lastname,
            street: expect.arrayContaining([TEST_ADDRESS.street[0], TEST_ADDRESS.street[1]]),
            city: TEST_ADDRESS.city,
          }),
        }),
      }),
    });

    expect(data).toStrictEqual(expectedResult);
  });

  it('using custom query should return customized result', async () => {
    const customQuery = {
      setBillingAddressOnCart: 'set-billing-address-on-cart-custom-query',
      metadata: {
        fields: 'billing_address { city }',
      },
    };

    const { data } = await sdk.magento.setBillingAddressOnCart(SHARED_PARAMS, { customQuery });

    // check if default (non-custom) query isn't ran on accident
    expect(data?.setBillingAddressOnCart?.cart?.billing_address?.firstname).toBe(undefined);
    expect(data?.setBillingAddressOnCart?.cart?.billing_address?.city).toBe(TEST_ADDRESS.city);
  });
});
