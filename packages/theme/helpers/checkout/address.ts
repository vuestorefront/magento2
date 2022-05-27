import type { CustomerAddress } from '~/modules/GraphQL/types';

export const formatAddressReturnToData = (address) => ({
  firstname: address.firstname,
  lastname: address.lastname,
  street: address.street[0],
  apartment: address.street[1],
  city: address.city,
  region: address.region.code,
  country_code: address.country.code,
  postcode: address.postcode,
  telephone: address.telephone,
});

export const addressFromApiToForm = (address: CustomerAddress) : CheckoutAddressForm => ({
  firstname: address.firstname,
  lastname: address.lastname,
  street: address.street?.[0],
  apartment: address.street?.[1],
  city: address.city,
  region: address?.region.region_code,
  country_code: address?.country_code,
  postcode: address.postcode,
  telephone: address.telephone,
});

export interface CheckoutAddressForm {
  firstname: string;
  lastname: string;
  street: string;
  apartment: string;
  city: string;
  region: string;
  country_code: string;
  postcode: string;
  telephone: string;
}

export const getInitialCheckoutAddressForm = () : CheckoutAddressForm => ({
  firstname: '',
  lastname: '',
  street: '',
  apartment: '',
  city: '',
  region: '',
  country_code: '',
  postcode: '',
  telephone: '',
});
