import { CustomerUpdateInput } from '@vue-storefront/magento-types';
import { sdk } from './__config__/sdk.config';
import { describeGroup, getUserToken } from './__config__/jest.setup';

describe(describeGroup('updateCustomer'), () => {
  const newCustomerData: CustomerUpdateInput = {
    firstname: 'John2',
  };

  it('should update customer data', async () => {
    const token = await getUserToken();

    const { data } = await sdk.magento.updateCustomer(newCustomerData, {
      customHeaders: { Authorization: `Bearer ${token}` },
    });

    const expected = expect.objectContaining({
      updateCustomerV2: expect.objectContaining({
        __typename: 'CustomerOutput',
        customer: expect.objectContaining({
          firstname: newCustomerData.firstname,
        }),
      }),
    });

    expect(data).toEqual(expected);
  });

  it('should update customer data using custom query', async () => {
    const token = await getUserToken();

    const customQuery = {
      updateCustomer: 'update-customer-custom-query',
      metadata: {
        fields: 'firstname',
      },
    };

    const { data } = await sdk.magento.updateCustomer(newCustomerData, {
      customQuery,
      customHeaders: { Authorization: `Bearer ${token}` },
    });

    expect(data?.updateCustomerV2?.customer?.firstname).toEqual(newCustomerData.firstname);
    // check if default (non-custom) query isn't ran on accident
    expect(data?.updateCustomerV2?.customer?.email).toBeUndefined();
  });
});
