import { CountryCodeEnum, CustomerAddressInput } from '@vue-storefront/magento-types';
import { sdk } from './__config__/sdk.config';
import { describeGroup, getUserToken } from './__config__/jest.setup';

describe(describeGroup('createCustomerAddress'), () => {
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

  it('should add address to the customer', async () => {
    const token = await getUserToken();

    const expected = expect.objectContaining({
      data: expect.objectContaining({
        createCustomerAddress: expect.objectContaining({
          city: 'city',
          country_code: 'US',
          default_billing: false,
          default_shipping: false,
          postcode: '123-123-123',
          region: { __typename: 'CustomerAddressRegion', region: 'New Jersey', region_code: 'NJ', region_id: 41 },
          street: ['street'],
          telephone: '123123123',
          vat_id: null,
        }),
      }),
    });

    const result = await sdk.magento.createCustomerAddress(address, {
      customHeaders: { Authorization: `Bearer ${token}` },
    });

    expect(result).toEqual(expected);
  });

  it('should create an address using custom query', async () => {
    const token = await getUserToken();

    const customQuery = {
      createCustomerAddress: 'create-customer-address-custom-query',
      metadata: {
        fields: 'id city',
      },
    };

    const expected = { data: { createCustomerAddress: { __typename: 'CustomerAddress', city: 'city', id: 354 } } };

    const result = await sdk.magento.createCustomerAddress(address, {
      customQuery,
      customHeaders: { Authorization: `Bearer ${token}` },
    });

    expect(result).toEqual(expected);
  });
});
