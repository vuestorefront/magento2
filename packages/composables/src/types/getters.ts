export interface UserAddressesGetters<USER_ADDRESS, USER_ADDRESS_ITEM> {
  getAddresses: (shipping: USER_ADDRESS, criteria?: Record<string, any>) => USER_ADDRESS_ITEM[];
  getDefault: (shipping: USER_ADDRESS) => USER_ADDRESS_ITEM;
  getTotal: (shipping: USER_ADDRESS) => number;
  getPostCode: (address: USER_ADDRESS_ITEM) => string;
  getStreetName: (address: USER_ADDRESS_ITEM) => string;
  getStreetNumber: (address: USER_ADDRESS_ITEM) => string | number;
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
}
