import { sdk } from './__config__/sdk.config';
import { describeGroup, getUserToken } from './__config__/jest.setup';

const addressId = 308;
const getRandomCity = () => 'Warsaw' + (Math.floor(Math.random() * 10));

describe(describeGroup('updateCustomerAddress'), () => {
  it('updates address', async () => {
    const token = await getUserToken();
    const randomCity = getRandomCity();
    const result = await sdk.magento.updateCustomerAddress({ id: addressId, input: { city: randomCity } }, { customHeaders: { Authorization: `Bearer ${token}` } });

    expect(result.data!.updateCustomerAddress!.city).toBe(randomCity);
  });

  it('updates address (customQuery)', async () => {
    const token = await getUserToken();
    const customQuery = {
      updateCustomerAddress: 'update-customer-address-custom-query',
      metadata: {
        fields: 'id firstname city'
      }
    };

    const randomCity = getRandomCity();
    const result = await sdk.magento.updateCustomerAddress({ id: addressId, input: { city: randomCity } }, { customQuery, customHeaders: { Authorization: `Bearer ${token}` } });

    expect(result.data!.updateCustomerAddress!.city).toBe(randomCity);
    // check if default (non-custom) query isn't ran on accident
    expect(result.data!.updateCustomerAddress!.lastname).not.toBeDefined();
  });
});
