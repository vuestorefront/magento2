import type { CustomerAddress, CartAddressInterface } from '~/modules/GraphQL/types';

export const formatAddressReturnToData = (address: CartAddressInterface) => ({
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

/**
 * Converts addresses that were:
 * * added to the logged in user's account
 * * saved in the cart (eg. completed the shipping address step and saved in the Checkout page, then went to some other page)
 * into the form data format used by Billing and Shipping forms in the Checkout page
 */
export const addressFromApiToForm = (address: CustomerAddress | CartAddressInterface) : CheckoutAddressForm => ({
  firstname: address.firstname,
  lastname: address.lastname,
  street: address.street?.[0],
  apartment: address.street?.[1],
  city: address.city,
  region: (address as CustomerAddress)?.region?.region_code ?? (address as CartAddressInterface).region.code,
  country_code: (address as CustomerAddress)?.country_code ?? (address as CartAddressInterface).region.code,
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
