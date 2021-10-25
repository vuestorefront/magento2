import { ShippingMethod } from '@vue-storefront/magento-api';
import productGetters from './productGetters';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getShippingMethodId = (shippingMethod: ShippingMethod): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getShippingMethodName = (shippingMethod: ShippingMethod): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getShippingMethodDescription = (shippingMethod: ShippingMethod): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getShippingMethodPrice = (shippingMethod: ShippingMethod): number => 0;

// eslint-disable-next-line import/no-named-as-default-member
export const getFormattedPrice = (price: number) => productGetters.getFormattedPrice(price);

const checkoutGetters = {
  getShippingMethodId,
  getShippingMethodName,
  getShippingMethodDescription,
  getFormattedPrice,
  getShippingMethodPrice,
};

export default checkoutGetters;
