import {
  AgnosticAttribute, AgnosticPrice, AgnosticTotals,
  AgnosticCoupon, AgnosticDiscount,
} from '~/composables/types';

export interface UserBillingGetters<USER_BILLING, USER_BILLING_ITEM> {
  getAddresses: (billing: USER_BILLING, criteria?: Record<string, any>) => USER_BILLING_ITEM[];
  getDefault: (billing: USER_BILLING) => USER_BILLING_ITEM;
  getTotal: (billing: USER_BILLING) => number;
  getPostCode: (address: USER_BILLING_ITEM) => string;
  getStreetName: (address: USER_BILLING_ITEM) => string;
  getStreetNumber: (address: USER_BILLING_ITEM) => string | number;
  getCity: (address: USER_BILLING_ITEM) => string;
  getFirstName: (address: USER_BILLING_ITEM) => string;
  getLastName: (address: USER_BILLING_ITEM) => string;
  getCountry: (address: USER_BILLING_ITEM) => string;
  getPhone: (address: USER_BILLING_ITEM) => string;
  getEmail: (address: USER_BILLING_ITEM) => string;
  getProvince: (address: USER_BILLING_ITEM) => string;
  getCompanyName: (address: USER_BILLING_ITEM) => string;
  getTaxNumber: (address: USER_BILLING_ITEM) => string;
  getId: (address: USER_BILLING_ITEM) => string;
  getApartmentNumber: (address: USER_BILLING_ITEM) => string | number;
  isDefault: (address: USER_BILLING_ITEM) => boolean;
}

export interface ForgotPasswordGetters<FORGOT_PASSWORD_RESULT> {
  getResetPasswordToken: (result: FORGOT_PASSWORD_RESULT) => string
  isPasswordChanged: (result: FORGOT_PASSWORD_RESULT) => boolean
}

export interface UserShippingGetters<USER_SHIPPING, USER_SHIPPING_ITEM> {
  getAddresses: (shipping: USER_SHIPPING, criteria?: Record<string, any>) => USER_SHIPPING_ITEM[];
  getDefault: (shipping: USER_SHIPPING) => USER_SHIPPING_ITEM;
  getTotal: (shipping: USER_SHIPPING) => number;
  getPostCode: (address: USER_SHIPPING_ITEM) => string;
  getStreetName: (address: USER_SHIPPING_ITEM) => string;
  getStreetNumber: (address: USER_SHIPPING_ITEM) => string | number;
  getCity: (address: USER_SHIPPING_ITEM) => string;
  getFirstName: (address: USER_SHIPPING_ITEM) => string;
  getLastName: (address: USER_SHIPPING_ITEM) => string;
  getCountry: (address: USER_SHIPPING_ITEM) => string;
  getPhone: (address: USER_SHIPPING_ITEM) => string;
  getEmail: (address: USER_SHIPPING_ITEM) => string;
  getProvince: (address: USER_SHIPPING_ITEM) => string;
  getCompanyName: (address: USER_SHIPPING_ITEM) => string;
  getTaxNumber: (address: USER_SHIPPING_ITEM) => string;
  getId: (address: USER_SHIPPING_ITEM) => string | number;
  getApartmentNumber: (address: USER_SHIPPING_ITEM) => string | number;
  isDefault: (address: USER_SHIPPING_ITEM) => boolean;
}

export interface UserGetters<USER> {
  getFirstName: (customer: USER) => string;
  getLastName: (customer: USER) => string;
  getFullName: (customer: USER) => string;
  getEmailAddress: (customer: USER) => string;
  [getterName: string]: (element: any, options?: any) => unknown;
}

export interface WishlistGetters<WISHLIST, WISHLIST_ITEM> {
  getItems: (wishlist: WISHLIST) => WISHLIST_ITEM[];
  getItemName: (wishlistItem: WISHLIST_ITEM) => string;
  getItemImage: (wishlistItem: WISHLIST_ITEM) => string;
  getItemPrice: (wishlistItem: WISHLIST_ITEM) => AgnosticPrice;
  getItemAttributes: (wishlistItem: WISHLIST_ITEM, filters?: Array<string>) => Record<string, AgnosticAttribute | string>;
  getItemSku: (wishlistItem: WISHLIST_ITEM) => string;
  getTotals: (wishlist: WISHLIST) => AgnosticTotals;
  getTotalItems: (wishlist: WISHLIST) => number;
  getFormattedPrice: (price: number) => string;
  [getterName: string]: (element: any, options?: any) => unknown;
}

export interface CartGetters<CART, CART_ITEM> {
  getItems: (cart: CART) => CART_ITEM[];
  getItemName: (cartItem: CART_ITEM) => string;
  getItemImage: (cartItem: CART_ITEM) => string;
  getItemPrice: (cartItem: CART_ITEM) => AgnosticPrice;
  getItemQty: (cartItem: CART_ITEM) => number;
  getItemAttributes: (cartItem: CART_ITEM, filters?: Array<string>) => Record<string, AgnosticAttribute | string>;
  getItemSku: (cartItem: CART_ITEM) => string;
  getTotals: (cart: CART) => AgnosticTotals;
  getShippingPrice: (cart: CART) => number;
  getTotalItems: (cart: CART) => number;
  getFormattedPrice: (price: number) => string;
  // @deprecated - use getDiscounts instead
  getCoupons: (cart: CART) => AgnosticCoupon[];
  getDiscounts: (cart: CART) => AgnosticDiscount[];
  [getterName: string]: (element: any, options?: any) => unknown;
}
