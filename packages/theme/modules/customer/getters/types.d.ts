import type { Country } from '~/modules/GraphQL/types';
import type { Countries } from '~/composables';

export interface AddressGetter {
  countriesList(countries: Countries[]): {
    id: string;
    label: string;
    englishLabel: string;
    abbreviation: string;
  }[];
  regionList(country: Country): {
    id: number;
    label: string;
    abbreviation: string;
  }[];
}

export interface UserBillingGetters<USER_BILLING, USER_BILLING_ITEM, TRANSFORMED_USER_BILLING_ITEM> {
  getAddresses: (billing: USER_BILLING, criteria?: Record<string, any>) => USER_BILLING_ITEM[];
  getDefault: (billing: USER_BILLING) => USER_BILLING_ITEM;
  getTotal: (billing: USER_BILLING) => number;
  getPostCode: (address: USER_BILLING_ITEM) => string;
  getStreetName: (address: USER_BILLING_ITEM) => string;
  getCity: (address: USER_BILLING_ITEM) => string;
  getFirstName: (address: USER_BILLING_ITEM) => string;
  getLastName: (address: USER_BILLING_ITEM) => string;
  getCountry: (address: USER_BILLING_ITEM) => string;
  getPhone: (address: TRANSFORMED_USER_BILLING_ITEM) => string;
  getEmail: (address: TRANSFORMED_USER_BILLING_ITEM) => string;
  getProvince: (address: USER_BILLING_ITEM) => string;
  getCompanyName: (address: USER_BILLING_ITEM) => string;
  getTaxNumber: (address: USER_BILLING_ITEM) => string;
  getId: (address: USER_BILLING_ITEM) => string | number;
  getApartmentNumber: (address: USER_BILLING_ITEM) => string | number;
  getNeighborhood: (address: TRANSFORMED_USER_BILLING_ITEM) => string
  getAddressExtra: (address: TRANSFORMED_USER_BILLING_ITEM) => string
  isDefault: (address: USER_BILLING_ITEM) => boolean;
}

export interface UserGetters<USER> {
  getFirstName: (customer: USER) => string;
  getLastName: (customer: USER) => string;
  getFullName: (customer: USER) => string;

  getEmailAddress: (customer: USER) => string;
  [getterName: string]: (element: any, options?: any) => unknown;
}

export interface ForgotPasswordGetters<FORGOT_PASSWORD_RESULT> {
  getResetPasswordToken: (result: FORGOT_PASSWORD_RESULT) => string
  isPasswordChanged: (result: FORGOT_PASSWORD_RESULT) => boolean
}

export interface UserShippingGetters<USER_SHIPPING, USER_SHIPPING_ITEM, TRANSFORMED_USER_SHIPPING_ITEM> {
  getAddresses: (shipping: USER_SHIPPING, criteria?: Record<string, any>) => USER_SHIPPING_ITEM[];
  getDefault: (shipping: USER_SHIPPING) => USER_SHIPPING_ITEM;
  getTotal: (shipping: USER_SHIPPING) => number;
  getPostCode: (address: USER_SHIPPING_ITEM) => string;
  getStreetName: (address: USER_SHIPPING_ITEM) => string;
  getCity: (address: USER_SHIPPING_ITEM) => string;
  getFirstName: (address: USER_SHIPPING_ITEM) => string;
  getLastName: (address: USER_SHIPPING_ITEM) => string;
  getCountry: (address: USER_SHIPPING_ITEM) => string;
  getPhone: (address: TRANSFORMED_USER_SHIPPING_ITEM) => string;
  getEmail: (address: TRANSFORMED_USER_SHIPPING_ITEM) => string;
  getProvince: (address: USER_SHIPPING_ITEM) => string;
  getCompanyName: (address: USER_SHIPPING_ITEM) => string;
  getId: (address: USER_SHIPPING_ITEM) => string | number;
  getApartmentNumber: (address: USER_SHIPPING_ITEM) => string | number;
  isDefault: (address: USER_SHIPPING_ITEM) => boolean;
}
