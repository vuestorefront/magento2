import {
  CartGetters, AgnosticPrice, AgnosticTotals, AgnosticAttribute, AgnosticCoupon, AgnosticDiscount,
} from '@vue-storefront/core';
import { Cart, CartItem } from '../../types';
import productGetters from './productGetters';
// import { settings } from '@vue-storefront/magento-api';

const settings = { tax: { displayCartSubtotalIncludingTax: false } };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItems = (cart: Cart): CartItem[] => {
  if (!cart || !cart.items) {
    return [];
  }
  return cart.items;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemName = (product: CartItem): string => productGetters.getName(product.product);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemImage = (product: CartItem): string => productGetters.getCoverImage(product.product);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemPrice = (product: CartItem): AgnosticPrice => {
  if (!product || !product.prices) {
    return {
      regular: 0,
      special: 0,
    };
  }

  const regular = product.prices.row_total.value;
  let special = null;
  const discount = product.prices.total_item_discount.value;
  if (discount > 0) {
    special = regular - discount;
  }

  return {
    regular,
    special,
  };
};

export const getCartItemQty = (product: CartItem): number => product.quantity;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemAttributes = (product: CartItem, filterByAttributeName?: Array<string>): Record<string, AgnosticAttribute | string> => {
  const attributes = {};
  if (!product.configurable_options) {
    return attributes;
  }
  for (const option of product.configurable_options) {
    attributes[option.option_label] = option.value_label as AgnosticAttribute;
  }
  return attributes;
};

export const getCartItemSku = (product: CartItem): string => {
  if (!product.product) {
    return '';
  }
  return product.product.sku;
};

export const getCartTotals = (cart: Cart): AgnosticTotals => {
  if (!cart || !cart.prices.grand_total || !cart.prices.subtotal_including_tax || !cart.prices.subtotal_excluding_tax) {
    return {
      total: 0,
      subtotal: 0,
    };
  }

  const totals = {
    subtotal: 0,
    total: cart.prices.grand_total.value,
  };

  totals.subtotal = settings.tax.displayCartSubtotalIncludingTax ? cart.prices.subtotal_including_tax.value : cart.prices.subtotal_excluding_tax.value;

  return totals;
};

export const getCartShippingPrice = (cart: Cart): number => {
  if (!cart.shipping_addresses) {
    return 0;
  }
  let shippingPrice = 0;
  for (const shippingAddress of cart.shipping_addresses) {
    if (!shippingAddress.selected_shipping_method) {
      continue;
    }
    shippingPrice += shippingAddress.selected_shipping_method.amount.value;
  }
  return shippingPrice;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartTotalItems = (cart: Cart): number => {
  if (!cart) {
    return 0;
  }
  return cart.total_quantity;
};

export const getFormattedPrice = (price: number) => productGetters.getFormattedPrice(price);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCoupons = (cart: Cart): AgnosticCoupon[] => [];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getDiscounts = (cart: Cart): AgnosticDiscount[] => [];

const cartGetters: CartGetters<Cart, CartItem> = {
  getItems: getCartItems,
  getItemName: getCartItemName,
  getItemImage: getCartItemImage,
  getItemPrice: getCartItemPrice,
  getItemQty: getCartItemQty,
  getItemAttributes: getCartItemAttributes,
  getItemSku: getCartItemSku,
  getTotals: getCartTotals,
  getShippingPrice: getCartShippingPrice,
  getTotalItems: getCartTotalItems,
  getFormattedPrice,
  getCoupons,
  getDiscounts,
};

export default cartGetters;
