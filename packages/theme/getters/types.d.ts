import type {
  Totals,
} from '~/composables/types';

import type { ProductAttribute } from '~/modules/catalog/product/types';
import type { Price } from '~/modules/catalog/types';

export interface Coupon {
  id: string;
  name: string;
  code: string;
  value: number;
}

export interface CartDiscount {
  id: string;
  name: string;
  description: string;
  value: number;
  code?: string;
}

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

export interface WishlistGetters<WISHLIST, WISHLIST_ITEM> {
  getItems: (wishlist: WISHLIST) => WISHLIST_ITEM[];
  getItemName: (wishlistItem: WISHLIST_ITEM) => string;
  getItemImage: (wishlistItem: WISHLIST_ITEM) => string;
  getItemPrice: (wishlistItem: WISHLIST_ITEM) => Price;
  getItemAttributes: (wishlistItem: WISHLIST_ITEM, filters?: Array<string>) => Record<string, ProductAttribute | string>;
  getItemSku: (wishlistItem: WISHLIST_ITEM) => string;
  getTotals: (wishlist: WISHLIST) => Totals;
  getTotalItems: (wishlist: WISHLIST) => number;
  [getterName: string]: (element: any, options?: any) => unknown;
}

export interface CartGetters<CART, CART_ITEM> {
  getItems: (cart: CART) => CART_ITEM[];
  getItemName: (cartItem: CART_ITEM) => string;
  getItemImage: (cartItem: CART_ITEM) => string;
  getItemPrice: (cartItem: CART_ITEM) => Price;
  getItemQty: (cartItem: CART_ITEM) => number;
  getItemAttributes: (cartItem: CART_ITEM, filters?: Array<string>) => Record<string, ProductAttribute | string>;
  getItemSku: (cartItem: CART_ITEM) => string;
  getTotals: (cart: CART) => Totals;
  getShippingPrice: (cart: CART) => number;
  getTotalItems: (cart: CART) => number;
  // @deprecated - use getDiscounts instead
  getCoupons: (cart: CART) => Coupon[];
  getDiscounts: (cart: CART) => CartDiscount[];
  getDiscountAmount: (cart: CART) => number;
  [getterName: string]: (element: any, options?: any) => unknown;
}
