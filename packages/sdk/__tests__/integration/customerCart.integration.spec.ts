import { sdk } from './__config__/sdk.config';
import { describeGroup, getUserToken } from './__config__/jest.setup';
import { TEST_USER_EMAIL } from './__config__/jest.const';

describe(describeGroup('customerCart'), () => {
  it('should fetch customer cart', async () => {
    const token = await getUserToken();

    const result = await sdk.magento.customerCart({ customHeaders: { Authorization: `Bearer ${token}` } });

    const expected = expect.objectContaining({
      data: expect.objectContaining({
        customerCart: expect.objectContaining({
          __typename: 'Cart',
          email: TEST_USER_EMAIL,
        }),
      }),
    });

    expect(result).toEqual(expected);
  });

  it('should fetch customer cart with usage of custom query', async () => {
    const token = await getUserToken();

    const customQuery = {
      customerCart: 'customer-cart-custom-query',
      metadata: {
        fields: 'id email',
      },
    };

    const result = await sdk.magento.customerCart({ customQuery, customHeaders: { Authorization: `Bearer ${token}` } });

    expect(result?.data?.customerCart?.email).toEqual(TEST_USER_EMAIL);
    // check if default (non-custom) query isn't ran on accident
    expect(result?.data?.customerCart?.is_virtual).toBeUndefined();
  });
});
