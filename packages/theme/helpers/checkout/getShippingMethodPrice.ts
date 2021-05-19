import { ShippingMethod } from '@vue-storefront/magento-api';

export default (shippingMethod: ShippingMethod) => {
  const value = shippingMethod?.amount?.value;
  const priceWithTax = shippingMethod?.price_incl_tax?.value;

  return priceWithTax > 0 && priceWithTax > value ? priceWithTax : value;
};
