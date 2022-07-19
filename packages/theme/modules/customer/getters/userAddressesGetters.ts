import { CustomerAddress } from '~/composables';
import { TransformedCustomerAddress } from '~/modules/customer/composables/types';
import { transformUserGetter } from '~/modules/customer/helpers/userAddressManipulator';

export interface UserAddressesGetters<GENERIC_USER_ADDRESS_ITEM, SPECIFIC_USER_ADDRESS_ITEM> {
  getAddresses: (shipping: GENERIC_USER_ADDRESS_ITEM[], criteria?: Record<string, any>) => GENERIC_USER_ADDRESS_ITEM[];
  getTotal: (shipping: GENERIC_USER_ADDRESS_ITEM[]) => number;
  getPostCode: (address: GENERIC_USER_ADDRESS_ITEM) => string;
  getStreetName: (address: GENERIC_USER_ADDRESS_ITEM) => string;
  getCity: (address: GENERIC_USER_ADDRESS_ITEM) => string;
  getFirstName: (address: GENERIC_USER_ADDRESS_ITEM) => string;
  getLastName: (address: GENERIC_USER_ADDRESS_ITEM) => string;
  getCountry: (address: GENERIC_USER_ADDRESS_ITEM) => string;
  getPhone: (address: GENERIC_USER_ADDRESS_ITEM) => string;
  getEmail: (address: SPECIFIC_USER_ADDRESS_ITEM) => string;
  getApartmentNumber: (address: SPECIFIC_USER_ADDRESS_ITEM) => string | number;
  getProvince: (address: GENERIC_USER_ADDRESS_ITEM) => string;
  getCompanyName: (address: GENERIC_USER_ADDRESS_ITEM) => string;
  getTaxNumber: (address: GENERIC_USER_ADDRESS_ITEM) => string;
  getId: (address: GENERIC_USER_ADDRESS_ITEM) => string | number;
  isDefault: (address: GENERIC_USER_ADDRESS_ITEM) => boolean;
  isDefaultShipping: (address: GENERIC_USER_ADDRESS_ITEM) => boolean;
  isDefaultBilling: (address: GENERIC_USER_ADDRESS_ITEM) => boolean;
  getNeighborhood: (address: any) => string
  getAddressExtra: (address: any) => string
}

const userAddressesGetters: UserAddressesGetters<CustomerAddress, TransformedCustomerAddress> = {
  getAddresses: (addresses, criteria?: Record<string, any>) => {
    if (!addresses || addresses.length === 0 || !Array.isArray(addresses)) return [];

    const addressesData = addresses?.map((a) => transformUserGetter(a))
      ?.sort((a, b) => ((a.default_shipping === b.default_shipping) ? 0 : (a.default_shipping ? -1 : 1)))
      ?.sort((a, b) => ((a.default_billing === b.default_billing) ? 0 : (a.default_billing ? -1 : 1)));

    if (!criteria || Object.keys(criteria).length === 0) {
      return addressesData;
    }

    const entries = Object.entries(criteria);
    return addressesData.filter((address) => entries.every(([key, value]) => address[key] === value));
  },
  getTotal: (addresses) => addresses.length,

  getPostCode: (address) => address?.postcode || '',
  getStreetName: (address) => (Array.isArray(address?.street) ? address?.street[0] : address?.street),
  getCity: (address) => address?.city || '',
  getFirstName: (address) => address?.firstname || '',
  getLastName: (address) => address?.lastname || '',
  getCountry: (address) => address?.country_code || '',
  getPhone: (address) => address?.telephone || '',
  getEmail: (address) => address?.email || '',
  getApartmentNumber: (address) => (Array.isArray(address?.street) ? address?.street[1] : address?.apartment),
  getProvince: (address) => (address?.region?.region || address?.region?.region_code) || '',
  getCompanyName: (address) => address?.company || '',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getTaxNumber: (address) => address?.vat_id || '',
  getId: (address) => address?.id || '',
  getNeighborhood: (address) => (Array.isArray(address?.street) ? address?.street[2] : address?.neighborhood),
  getAddressExtra: (address) => (Array.isArray(address?.street) ? address?.street[3] : address?.extra),
  isDefault: (address) => (address?.default_shipping || address?.default_billing) || false,
  isDefaultShipping: (address) => address?.default_shipping || false,
  isDefaultBilling: (address) => address?.default_billing || false,
};

export default userAddressesGetters;
