import {
  CartGetters, AgnosticPrice, AgnosticTotals, AgnosticAttribute, AgnosticCoupon, AgnosticDiscount,
} from '@vue-storefront/core';
import {
  Discount,
  Cart,
  CartItem,
  Product,
} from '@vue-storefront/magento-api';
import productGetters from './productGetters';

export const getCartItems = (cart: Cart): CartItem[] => {
  if (!cart || !cart.items) {
    return [];
  }

  return cart.items;
};

export const getCartItemName = (product: CartItem): string => productGetters.getName(product.product as Product);

export const getCartItemImage = (product: CartItem): string => productGetters.getProductThumbnailImage(product.product as Product);

export const getCartItemPrice = (product: CartItem): AgnosticPrice => {
  if (!product || !product.prices) {
    return {
      regular: 0,
      special: 0,
    };
  }

  const regularPrice = product.product?.price_range?.minimum_price?.regular_price?.value;
  const specialPrice = product.product?.price_range?.minimum_price?.final_price?.value;

  return {
    regular: regularPrice || 0,
    special: specialPrice || 0,
    // @ts-ignore
    credit: Math.round(specialPrice / 10),
    // @TODO: Who set this installment value?
    installment: Math.round((specialPrice * 1.1046) / 10),
    discountPercentage: 100 - Math.round((specialPrice / regularPrice) * 100),
    total: product.prices?.row_total?.value,
  };
};

export const productHasSpecialPrice = (product: CartItem): boolean => getCartItemPrice(product).regular < getCartItemPrice(product).special;

export const getCartItemQty = (product: CartItem): number => product.quantity;

export const getCartItemAttributes = (product: CartItem, _filterByAttributeName?: Array<string>): Record<string, AgnosticAttribute | string> => {
  const attributes = {};
  // @ts-ignore
  if (!product || !product.product.configurable_options) {
    return attributes;
  }
  // @ts-ignore
  product.configurable_options.forEach((option) => {
    attributes[option.option_label] = option.value_label as AgnosticAttribute;
  });

  return attributes;
};

export const getCartItemSku = (product: CartItem): string => {
  if (!product.product) {
    return '';
  }

  return product.product.sku;
};

const calculateDiscounts = (discounts: Discount[]): number => discounts.reduce((a, b) => Number.parseFloat(`${a}`) + Number.parseFloat(`${b.amount.value}`), 0);

export const getCartTotals = (cart: Cart): AgnosticTotals => {
  if (!cart || !cart.prices) return {} as AgnosticTotals;

  return {
    total: cart.prices.grand_total.value,
    subtotal: cart.prices.subtotal_including_tax.value,
    special: (cart.prices.discounts) ? calculateDiscounts(cart.prices.discounts) : 0,
  } as AgnosticTotals;
};

export const getCartShippingPrice = (cart: Cart): number => {
  if (!cart.shipping_addresses) {
    return 0;
  }

  return cart.shipping_addresses
    .reduce((
      acc,
      shippingAddress,
    ) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { selected_shipping_method } = shippingAddress;

      if (selected_shipping_method) {
        return acc + selected_shipping_method.amount.value;
      }

      return acc;
    }, 0);
};

export const getCartTotalItems = (cart: Cart): number => {
  if (!cart) {
    return 0;
  }
  return cart.total_quantity;
};

// eslint-disable-next-line import/no-named-as-default-member
export const getFormattedPrice = (price: number) => productGetters.getFormattedPrice(price);

export const getCoupons = (cart: Cart): AgnosticCoupon[] => cart.applied_coupons as AgnosticCoupon[] || [];

export const getDiscounts = (_cart: Cart): AgnosticDiscount[] => [];

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
  productHasSpecialPrice,
};

export default cartGetters;
