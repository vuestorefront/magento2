import { isEqual } from 'lodash-es';
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
  country_code: (address as CustomerAddress)?.country_code ?? (address as CartAddressInterface).country.code,
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

/**
 * Try to find an address from the user's saved addresses that exactly matches the address that is bound to a cart.
 *
 * `useShipping().save()``sends an addressId to Magento to set the shipping address on the cart,
 * but when you download the cart after that - the cart's endpoint response doesn't contain that addressId, just the address fields (street etc.)
 * So the only choice left is to try to compare the fields of the addresses.
 *
 * This function exists because if a user returns to a cart whose shipping address was set before, we want the user address to be highlighted in the SfAddressPicker component.
 *
 * @param customerAddresses The addresses saved in a user's account
 * @param cartAddress The address that is bound to the cart, @see Cart["billing_address"] Cart["shipping_addresses"]
 *
 */
export const findUserAddressIdenticalToSavedCartAddress = (
  customerAddresses: CustomerAddress[] | null,
  cartAddress: CartAddressInterface,
) : CustomerAddress => customerAddresses?.find(
  (userAddress) => isEqual(addressFromApiToForm(userAddress), addressFromApiToForm(cartAddress)),
) ?? null;
