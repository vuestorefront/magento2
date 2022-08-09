import type {
  Totals,
} from '~/composables/types';
import type { Price } from '~/modules/catalog/types';
import type { ProductAttribute, Product } from '~/modules/catalog/product/types';
import { PaymentMethodInterface } from '~/modules/checkout/types';
import {
  Cart,
  Discount,
  ProductInterface,
  SelectedShippingMethod,
  ConfigurableCartItem,
  CartItemInterface,
} from '~/modules/GraphQL/types';
import { getName, getSlug as getSlugGetter, getProductThumbnailImage } from '~/modules/catalog/product/getters/productGetters';
import { CartGetters as CartGettersBase, CartDiscount, Coupon } from './types';

export const getItems = (cart: Cart): CartItemInterface[] => {
  if (!cart || !cart.items) {
    return [];
  }

  return cart.items;
};

export const getItemName = (product: CartItemInterface): string => getName(product.product as Product);
export const getSlug = (product: CartItemInterface): string => getSlugGetter(product.product as Product);

export const getItemImage = (product: CartItemInterface): string => getProductThumbnailImage(product.product as Product);

export const getItemPrice = (product: CartItemInterface): Price => {
  if (!product || !product.prices) {
    return {
      regular: 0,
      special: 0,
    };
  }
  if (product.prices) {
    return {
      regular: product.prices.row_total.value || 0,
      special: product.prices.total_item_discount.value || 0,
    };
  }
  const regularPrice = product.product?.price_range?.minimum_price?.regular_price?.value;
  const specialPrice = product.product?.price_range?.minimum_price?.final_price?.value;

  return {
    regular: regularPrice || 0,
    special: specialPrice || 0,
    // @ts-ignore
    credit: Math.round(specialPrice / 10),
    discountPercentage: 100 - Math.round((specialPrice / regularPrice) * 100),
    total: product.prices?.row_total?.value,
  };
};

export const productHasSpecialPrice = (product: CartItemInterface): boolean => getItemPrice(product).regular < getItemPrice(product).special;

export const getItemQty = (product: CartItemInterface): number => product.quantity;

export const getItemAttributes = (
  { product }: CartItemInterface & { product: Product },
  _filterByAttributeName?: Array<string>,
): Record<string, ProductAttribute | string> => {
  const attributes = {};

  if (!product || !product.configurable_options) {
    return attributes;
  }

  const configurableOptions = product.configurable_options;

  // eslint-disable-next-line no-restricted-syntax
  for (const option of configurableOptions) {
    attributes[option.attribute_code] = {
      name: option.attribute_code,
      label: option.label,
      value: option.values.map((value) => {
        const obj = {};
        obj[value.value_index] = value.label;
        return obj;
      }),
    } as ProductAttribute;
  }
  return attributes;
};

export const getItemSku = (product: CartItemInterface): string => product?.product?.sku || '';

const calculateDiscounts = (discounts: Discount[]): number => discounts.reduce((a, b) => Number.parseFloat(`${a}`) + Number.parseFloat(`${b.amount.value}`), 0);

export const getTotals = (cart: Cart): Totals => {
  if (!cart || !cart.prices) return {} as Totals;

  const subtotal = cart.prices.subtotal_including_tax.value;
  return {
    total: cart.prices.grand_total.value,
    subtotal: cart.prices.subtotal_including_tax.value,
    special: (cart.prices.discounts) ? subtotal - calculateDiscounts(cart.prices.discounts) : subtotal,
  } as Totals;
};

export const getShippingPrice = (cart: Cart): number => {
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
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        return acc + selected_shipping_method.amount.value;
      }

      return acc;
    }, 0);
};

export const getTotalItems = (cart: Cart): number => {
  if (!cart) {
    return 0;
  }
  return cart.total_quantity;
};

export const getConfiguredVariant = (product: ConfigurableCartItem): ProductInterface | null => product?.configured_variant || null;

export const getCoupons = (cart: Cart): Coupon[] => (Array.isArray(cart?.applied_coupons) ? cart.applied_coupons.map((c) => ({
  id: c.code,
  name: c.code,
  value: 0,
  code: c.code,
} as Coupon)) : []);

export const getDiscounts = (cart: Cart): CartDiscount[] => (Array.isArray(cart?.prices?.discounts) ? cart.prices.discounts.map((d) => ({
  id: d.label,
  name: d.label,
  description: '',
  value: d.amount.value,
  code: d.label,
} as CartDiscount)) : []);

export const getDiscountAmount = (cart: Cart): number => calculateDiscounts(cart?.prices?.discounts ?? []);

export const getAppliedCoupon = (cart: Cart): Coupon | null => (Array.isArray(cart?.applied_coupons) && cart?.applied_coupons.length > 0 ? {
  id: cart.applied_coupons[0].code,
  name: cart.applied_coupons[0].code,
  value: 0,
  code: cart.applied_coupons[0].code,
} : null);

export const getSelectedShippingMethod = (cart: Cart): SelectedShippingMethod | null => (cart?.shipping_addresses?.length > 0
  ? cart?.shipping_addresses[0]?.selected_shipping_method
  : null);

export const getAvailablePaymentMethods = (cart: Cart): PaymentMethodInterface[] => cart?.available_payment_methods.map((p) => ({
  label: p.title,
  value: p.code,
}));

export const getStockStatus = (product: CartItemInterface): string => product.product.stock_status;
export interface CartGetters extends CartGettersBase<Cart, CartItemInterface> {
  getAppliedCoupon(cart: Cart): Coupon | null;
  getAvailablePaymentMethods(cart: Cart): PaymentMethodInterface[];
  getSelectedShippingMethod(cart: Cart): SelectedShippingMethod | null;
  productHasSpecialPrice(product: CartItemInterface): boolean;
  getStockStatus(product: CartItemInterface): string;
  getConfiguredVariant(product: ConfigurableCartItem): ProductInterface | null;
}

const cartGetters: CartGetters = {
  getAppliedCoupon,
  getAvailablePaymentMethods,
  getCoupons,
  getDiscounts,
  getItemAttributes,
  getItemImage,
  getItemName,
  getSlug,
  getItemPrice,
  getItemQty,
  getItems,
  getItemSku,
  getSelectedShippingMethod,
  getShippingPrice,
  getTotalItems,
  getTotals,
  getDiscountAmount,
  productHasSpecialPrice,
  getStockStatus,
  getConfiguredVariant,
};

export default cartGetters;
