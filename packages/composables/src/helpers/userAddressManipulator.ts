import { CustomerAddressInput } from '@vue-storefront/magento-api';

export const transformUserCreateAddressInput = (addressInputParams): CustomerAddressInput => {
  const {
    apartment,
    ...address
  } = addressInputParams.address;

  return {
    ...address,
    street: [address.street, apartment],
  };
};

export const transformUserUpdateAddressInput = (addressInputParams): {
  addressId: number;
  input: CustomerAddressInput;
} => {
  const {
    apartment,
    id,
    // @ts-ignore
    // eslint-disable-next-line
    extension_attributes,
    // @ts-ignore
    // eslint-disable-next-line no-underscore-dangle
    __typename: typenameAddress,
    ...address
  } = addressInputParams.address;

  const {
    // @ts-ignore
    // eslint-disable-next-line no-underscore-dangle
    __typename: typenameRegion,
    ...region
  } = address.region;
  const addressParams: CustomerAddressInput = {
    ...address,
    region,
    street: (Array.isArray(address.street) ? [...address.street, apartment] : [address.street, apartment]).filter(Boolean),
  };

  return {
    addressId: id,
    input: {
      ...addressParams,
    },
  };
};

export const transformUserGetter = (addressInput) => ({
  ...addressInput,
  street: addressInput.street[0],
  apartment: addressInput.street[1],
});
