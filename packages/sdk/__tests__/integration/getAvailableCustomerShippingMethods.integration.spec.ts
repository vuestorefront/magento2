import { sdk } from './__config__/sdk.config';
import { describeGroup, getUserToken } from './__config__/jest.setup';

describe(describeGroup('getAvailableCustomerShippingMethods'), () => {
  it('should fetch available customer shipping methods', async () => {
    const token = await getUserToken();
    //  On the frontend token should be passed automatically using cookie, but in integration tests we have no browser context so it's done manually
    const result = await sdk.magento.getAvailableCustomerShippingMethods({
      customHeaders: { Authorization: `Bearer ${token}` },
    });

    expect(result?.data?.customerCart?.shipping_addresses).toBeDefined();
  });

  it('should fetch available customer shipping methods using custom query', async () => {
    const token = await getUserToken();
    const customQuery = {
      getAvailableCustomerShippingMethods: 'get-available-customer-shipping-methods-custom-query',
      metadata: {
        fields: 'shipping_addresses',
      },
    };

    const result = await sdk.magento.getAvailableCustomerShippingMethods({
      customQuery,
      customHeaders: { Authorization: `Bearer ${token}` },
    });

    expect(result?.data?.customerCart?.shipping_addresses).toBeDefined();
  });
});
