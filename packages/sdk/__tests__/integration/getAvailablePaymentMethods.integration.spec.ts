import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';
import { TEST_CART_ID } from './__config__/jest.const';

describe(describeGroup('getAvailablePaymentMethods'), () => {
  it('should fetch guest available payment methods', async () => {
    const result = await sdk.magento.getAvailablePaymentMethods({
      cartId: TEST_CART_ID,
    });

    const expected = expect.objectContaining({
      data: expect.objectContaining({
        cart: expect.objectContaining({
          __typename: 'Cart',
          available_payment_methods: expect.any(Array),
        }),
      }),
    });

    expect(result).toEqual(expected);
  });
});
