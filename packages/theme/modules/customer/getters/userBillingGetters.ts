import { Customer, CustomerAddress } from '~/modules/GraphQL/types';
import { UserBillingGetters } from '~/modules/customer/getters/types';
import { TransformedCustomerAddress } from '../composables/types';

const userBillingGetters: UserBillingGetters<Customer, CustomerAddress, TransformedCustomerAddress> = {
  getAddresses: (billing, criteria?: Record<string, any>) => {
    if (!billing || !billing.addresses) return [] as CustomerAddress[];

    if (!criteria || Object.keys(criteria).length === 0) {
      return billing.addresses;
    }

    const entries = Object.entries(criteria);
    return billing.addresses.filter((address) => entries.every(([key, value]: [keyof CustomerAddress, unknown]) => address[key] === value));
  },
  getDefault: (billing) => billing.addresses.find(({ default_billing }) => default_billing),
  getTotal: (billing) => billing.addresses.length,
  getPostCode: (address) => address?.postcode || '',
  getStreetName: (address) => (Array.isArray(address?.street) ? address?.street[0] : ''),
  getCity: (address) => address?.city || '',
  getFirstName: (address) => address?.firstname || '',
  getLastName: (address) => address?.lastname || '',
  getCountry: (address) => address?.country_code || '',
  getPhone: (address) => address?.phone || '',
  getEmail: (address) => address?.email || '',
  getProvince: (address) => (address?.region?.region_code || address?.region?.region) || '',
  getCompanyName: (address) => address?.company || '',
  getNeighborhood: (address) => (Array.isArray(address?.street) ? address?.street[2] : address?.neighborhood),
  getAddressExtra: (address) => (Array.isArray(address?.street) ? address?.street[3] : address?.extra),
  getTaxNumber: (address) => address.vat_id || '',
  getId: (address) => address?.id || '',
  getApartmentNumber: (address) => (Array.isArray(address?.street) ? address?.street[1] : ''),
  isDefault: (address) => address?.default_billing || false,
};

export default userBillingGetters;
