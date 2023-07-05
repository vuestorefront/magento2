import { CountryCodeEnum, CustomerAddressInput } from '@vue-storefront/magento-types';
import { sdk } from './__config__/sdk.config';
import { describeGroup, getUserToken } from './__config__/jest.setup';

describe(describeGroup('deleteCustomerAddress'), () => {
  const address: CustomerAddressInput = {
    city: 'city',
    country_code: CountryCodeEnum.Us,
    default_billing: false,
    default_shipping: false,
    firstname: 'firstname',
    lastname: 'lastname',
    postcode: '123-123-123',
    street: ['street'],
    telephone: '123123123',
    region: {
      region_code: 'NJ',
      region_id: 41,
      region: 'New Jersey',
    },
  };

  it('removes address of the customer', async () => {
    const token = await getUserToken();
    const createResult = await sdk.magento.createCustomerAddress(address, {
      customHeaders: { Authorization: `Bearer ${token}` },
    });
    const createdAddressId = createResult.data?.createCustomerAddress?.id;

    const result = await sdk.magento.deleteCustomerAddress(
      { id: createdAddressId! },
      { customHeaders: { Authorization: `Bearer ${token}` } },
    );
    expect(result.data!.deleteCustomerAddress).toBeTruthy();
  });
});
