import { TransformedCustomerAddress } from '~/modules/customer/composables/types';
import { transformUserGetter } from '~/modules/customer/helpers/userAddressManipulator';

export interface UserAddressesGetters<USER_ADDRESS, USER_ADDRESS_ITEM> {
  getAddresses: (shipping: USER_ADDRESS, criteria?: Record<string, any>) => USER_ADDRESS_ITEM[];
  getTotal: (shipping: USER_ADDRESS) => number;
  getPostCode: (address: USER_ADDRESS_ITEM) => string;
  getStreetName: (address: USER_ADDRESS_ITEM) => string;
  getCity: (address: USER_ADDRESS_ITEM) => string;
  getFirstName: (address: USER_ADDRESS_ITEM) => string;
  getLastName: (address: USER_ADDRESS_ITEM) => string;
  getCountry: (address: USER_ADDRESS_ITEM) => string;
  getPhone: (address: USER_ADDRESS_ITEM) => string;
  getEmail: (address: USER_ADDRESS_ITEM) => string;
  getProvince: (address: USER_ADDRESS_ITEM) => string;
  getCompanyName: (address: USER_ADDRESS_ITEM) => string;
  getTaxNumber: (address: USER_ADDRESS_ITEM) => string;
  getId: (address: USER_ADDRESS_ITEM) => string | number;
  getApartmentNumber: (address: USER_ADDRESS_ITEM) => string | number;
  isDefault: (address: USER_ADDRESS_ITEM) => boolean;
  isDefaultShipping: (address: USER_ADDRESS_ITEM) => boolean;
  isDefaultBilling: (address: USER_ADDRESS_ITEM) => boolean;
  getNeighborhood: (address: any) => string
  getAddressExtra: (address: any) => string
}

const userAddressesGetters: UserAddressesGetters<Array<TransformedCustomerAddress>, TransformedCustomerAddress> = {
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
  getPhone: (address) => address?.phone || '',
  getEmail: (address) => address?.email || '',
  getProvince: (address) => (address?.region?.region_code || address?.region?.region) || '',
  getCompanyName: (address) => address?.company || '',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getTaxNumber: (address) => address?.vat_id || '',
  getId: (address) => address?.id || '',
  getApartmentNumber: (address) => (Array.isArray(address?.street) ? address?.street[1] : address?.apartment),
  getNeighborhood: (address) => (Array.isArray(address?.street) ? address?.street[2] : address?.neighborhood),
  getAddressExtra: (address) => (Array.isArray(address?.street) ? address?.street[3] : address?.extra),
  isDefault: (address) => (address?.default_shipping || address?.default_billing) || false,
  isDefaultShipping: (address) => address?.default_shipping || false,
  isDefaultBilling: (address) => address?.default_billing || false,
};

export default userAddressesGetters;
