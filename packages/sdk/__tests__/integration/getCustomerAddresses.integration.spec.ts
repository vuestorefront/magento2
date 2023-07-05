import { sdk } from './__config__/sdk.config';
import { describeGroup, getUserToken } from './__config__/jest.setup';

describe(describeGroup('getCustomerAddresses'), () => {
  it('should fetch customer addresses', async () => {
    const token = await getUserToken();
    const result = await sdk.magento.getCustomerAddresses({ customHeaders: { Authorization: `Bearer ${token}` } });

    const expected = expect.objectContaining({
      data: expect.objectContaining({
        customer: expect.objectContaining({
          __typename: 'Customer',
          addresses: expect.arrayContaining([
            expect.objectContaining({
              __typename: 'CustomerAddress',
            }),
          ]),
        }),
      }),
    });

    expect(result).toEqual(expected);
  });

  it('should fetch customer addresses using custom queries', async () => {
    const token = await getUserToken();
    const customQuery = {
      getCustomerAddresses: 'get-customer-addresses-custom-query',
      metadata: {
        fields: 'city',
      },
    };

    const result = await sdk.magento.getCustomerAddresses({
      customQuery,
      customHeaders: { Authorization: `Bearer ${token}` },
    });

    const expected = expect.objectContaining({
      data: expect.objectContaining({
        customer: expect.objectContaining({
          __typename: 'Customer',
          addresses: expect.arrayContaining([
            expect.objectContaining({
              __typename: 'CustomerAddress',
              city: expect.any(String),
            }),
          ]),
        }),
      }),
    });

    expect(result).toEqual(expected);
    // check if default (non-custom) query isn't ran on accident
    expect(result?.data?.customer?.addresses?.[0]?.country_code).toBeUndefined();
  });
});
