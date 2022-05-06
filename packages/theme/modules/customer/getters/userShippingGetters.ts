import { UserShippingGetters } from '~/modules/customer/getters/types';
import { Logger } from '~/helpers/logger';

const userShippingGetters: UserShippingGetters<any, any> = {
  getAddresses: (shipping, criteria?: Record<string, any>) => {
    Logger.debug(shipping);
    if (!shipping || !shipping.addresses) return [] as Record<string, any>;

    if (!criteria || Object.keys(criteria).length === 0) {
      return shipping.addresses;
    }

    const entries = Object.entries(criteria);
    return shipping.addresses.filter((address) => entries.every(([key, value]) => address[key] === value));
  },
  getDefault: (shipping) => shipping.addresses.find(({ isDefault }) => isDefault),
  getTotal: (shipping) => shipping.addresses.length,

  getPostCode: (address) => address?.postcode || '',
  getStreetName: (address) => (Array.isArray(address?.street) ? address?.street[0] : ''),
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
  getApartmentNumber: (address) => (Array.isArray(address?.street) ? address?.street[1] : ''),
  isDefault: (address) => address?.default_shipping || false,
};

export default userShippingGetters;
