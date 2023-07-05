import { sdk } from './__config__/sdk.config';
import { describeGroup, getUserToken } from './__config__/jest.setup';

describe(describeGroup('getAvailableCustomerPaymentMethods'), () => {
  it('should fetch logged in customer payment methods', async () => {
    const token = await getUserToken();

    //  On the frontend token should be passed automatically using cookie, but in integration tests we have no browser context so it's done manually
    const result = await sdk.magento.getAvailableCustomerPaymentMethods({
      customHeaders: { Authorization: `Bearer ${token}` },
    });

    const expected = expect.objectContaining({
      data: expect.objectContaining({
        customerCart: expect.objectContaining({
          __typename: 'Cart',
          available_payment_methods: expect.any(Array),
        }),
      }),
    });

    expect(result).toEqual(expected);
  });
});
