import { Price } from '~/modules/catalog/types';
import { ProductAttribute } from '~/modules/catalog/product/types';
import { Totals } from '~/composables';

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
