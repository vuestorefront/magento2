import { UserAddressesGetters } from '../types/getters';
import { transformUserGetter } from '../helpers/userAddressManipulator';

const userAddressesGetters: UserAddressesGetters<any, any> = {
  getAddresses: (addresses, criteria?: Record<string, any>) => {
    if (!addresses || addresses.length === 0 || !Array.isArray(addresses)) return [];

    const addressesData = addresses?.map((a) => transformUserGetter(a));

    if (!criteria || Object.keys(criteria).length === 0) {
      return addressesData;
    }

    const entries = Object.entries(criteria);
    return addressesData.filter((address) => entries.every(([key, value]) => address[key] === value));
  },
  getDefault: (addresses) => addresses.find(({ isDefault }) => isDefault),
  getTotal: (addresses) => addresses.length,

  getPostCode: (address) => address?.postcode || '',
  getStreetName: (address) => (Array.isArray(address?.street) ? address?.street[0] : address?.street),
  getStreetNumber: (address) => address?.streetNumber || '',
  getCity: (address) => address?.city || '',
  getFirstName: (address) => address?.firstname || '',
  getLastName: (address) => address?.lastname || '',
  getCountry: (address) => address?.country_code || '',
  getPhone: (address) => address?.phone || '',
  getEmail: (address) => address?.email || '',
  getProvince: (address) => (address?.region?.region_code || address?.region?.region) || '',
  getCompanyName: (address) => address?.company || '',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getTaxNumber: (address) => '',
  getId: (address) => address?.id || '',
  getApartmentNumber: (address) => (Array.isArray(address?.street) ? address?.street[1] : address?.apartment),
  isDefault: (address) => (address?.default_shipping || address?.default_billing) || false,
  isDefaultShipping: (address) => address?.default_shipping || false,
  isDefaultBilling: (address) => address?.default_billing || false,
};

export default userAddressesGetters;
