import { sdk } from './__config__/sdk.config';
import { describeGroup, getUserToken } from './__config__/jest.setup';

const addressId = 308;

const OLD_CITY = 'Warsaw';
const NEW_CITY = 'Krakow';

describe(describeGroup('updateCustomerAddress'), () => {
  it('updates address', async () => {
    const token = await getUserToken();
    const customHeaders = { Authorization: `Bearer ${token}` };
    const result = await sdk.magento.updateCustomerAddress(
      { id: addressId, input: { city: NEW_CITY } },
      { customHeaders },
    );

    expect(result.data!.updateCustomerAddress!.city).toBe(NEW_CITY);

    // reset
    await sdk.magento.updateCustomerAddress({ id: addressId, input: { city: OLD_CITY } }, { customHeaders });
  });

  it('updates address (customQuery)', async () => {
    const token = await getUserToken();
    const customQuery = {
      updateCustomerAddress: 'update-customer-address-custom-query',
      metadata: {
        fields: 'id firstname city',
      },
    };
    const customHeaders = { Authorization: `Bearer ${token}` };

    const result = await sdk.magento.updateCustomerAddress(
      { id: addressId, input: { city: NEW_CITY } },
      { customQuery, customHeaders },
    );

    expect(result.data!.updateCustomerAddress!.city).toBe(NEW_CITY);
    // check if default (non-custom) query isn't ran on accident
    expect(result.data!.updateCustomerAddress!.lastname).not.toBeDefined();

    // reset
    await sdk.magento.updateCustomerAddress({ id: addressId, input: { city: OLD_CITY } }, { customHeaders });
  });
});
