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
    ...address
  } = addressInputParams.address;

  const addressParams: CustomerAddressInput = {
    ...address,
    street: [address.street, apartment],
  };

  return {
    addressId: id,
    input: {
      ...addressParams,
      default_shipping: true,
    },
  };
};

export const transformUserGetter = (addressInput) => ({
  ...addressInput,
  street: addressInput.street[0],
  apartment: addressInput.street[1],
});
