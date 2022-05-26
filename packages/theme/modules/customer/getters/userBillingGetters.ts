import { UserBillingGetters as BaseGetters } from '~/modules/customer/getters/types';
import type { Customer, CustomerAddress } from '~/modules/GraphQL/types';

interface UserBillingGetters extends BaseGetters<any, any>{
  getNeighborhood: (address: any) => string
  getAddressExtra: (address: any) => string
}

const userBillingGetters: UserBillingGetters = {
  getAddresses: (billing: Customer, criteria?: Record<string, any>) => {
    if (!criteria || Object.keys(criteria).length === 0) {
      return billing.addresses;
    }

    const entries = Object.entries(criteria);
    return billing.addresses.filter((address) => entries.every(([key, value]) => address[key as keyof CustomerAddress] === value));
  },
  getDefault: (billing: Customer) => billing.addresses.find(({ default_billing }) => default_billing),
  getTotal: (billing: Customer) => billing.addresses.length,
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
  getNeighborhood: (address) => (Array.isArray(address?.street) ? address?.street[2] : address?.neighborhood),
  getAddressExtra: (address) => (Array.isArray(address?.street) ? address?.street[3] : address?.extra),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getTaxNumber: (address) => address.vat_id || '',
  getId: (address) => address?.id || '',
  getApartmentNumber: (address) => (Array.isArray(address?.street) ? address?.street[1] : ''),
  isDefault: (address) => address?.default_billing || false,
};

export default userBillingGetters;
