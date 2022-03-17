import { CustomerAddressInput } from '~/modules/GraphQL/types';

export const transformUserCreateAddressInput = (addressInputParams): CustomerAddressInput => {
  const {
    apartment,
    neighborhood,
    extra,
    ...address
  } = addressInputParams.address;

  const street = [address.street];

  if (apartment) street.push(apartment);

  if (neighborhood) street.push(neighborhood);

  if (extra) street.push(extra);

  return {
    ...address,
    street,
  };
};

export const transformUserUpdateAddressInput = (addressInputParams): {
  addressId: number;
  input: CustomerAddressInput;
} => {
  const {
    apartment,
    neighborhood,
    extra,
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

  const street = (Array.isArray(address.street) ? [...address.street] : [address.street]);

  if (apartment) street.push(apartment);

  if (neighborhood) street.push(neighborhood);

  if (extra) street.push(extra);

  const addressParams: CustomerAddressInput = {
    ...address,
    region,
    street: street.filter(Boolean),
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
  neighborhood: addressInput.street[2],
  extra: addressInput.street[3],
});
