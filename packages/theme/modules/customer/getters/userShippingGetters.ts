import { UserShippingGetters } from '~/modules/customer/getters/types';
import { Customer, CustomerAddress } from '~/modules/GraphQL/types';
import { Logger } from '~/helpers/logger';
import { TransformedCustomerAddress } from '../composables/types';

const userShippingGetters: UserShippingGetters<Customer, CustomerAddress, TransformedCustomerAddress> = {
  getAddresses: (shipping, criteria?: Record<string, any>) => {
    Logger.debug(shipping);
    if (!shipping || !shipping.addresses) return [] as CustomerAddress[];

    if (!criteria || Object.keys(criteria).length === 0) {
      return shipping.addresses;
    }

    const entries = Object.entries(criteria);
    return shipping.addresses.filter((address) => entries.every(([key, value]: [ keyof CustomerAddress, unknown ]) => address[key] === value));
  },
  getDefault: (shipping) => shipping.addresses.find(({ default_shipping }) => default_shipping),
  getTotal: (shipping) => shipping.addresses.length,
  getPostCode: (address) => address?.postcode || '',
  getStreetName: (address) => (Array.isArray(address?.street) ? address?.street[0] : ''),
  getApartmentNumber: (address) => (Array.isArray(address?.street) ? address?.street[1] : ''),
  getCity: (address) => address?.city || '',
  getFirstName: (address) => address?.firstname || '',
  getLastName: (address) => address?.lastname || '',
  getCountry: (address) => address?.country_code || '',
  getPhone: (address) => address?.phone || '',
  getEmail: (address) => address?.email || '',
  getProvince: (address) => (address?.region?.region_code || address?.region?.region) || '',
  getCompanyName: (address) => address?.company || '',
  getId: (address) => address?.id || '',
  isDefault: (address) => address?.default_shipping || false,
};

export default userShippingGetters;
