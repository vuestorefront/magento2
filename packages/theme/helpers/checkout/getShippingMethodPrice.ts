import { AvailableShippingMethod } from '~/modules/GraphQL/types';

export default (shippingMethod: AvailableShippingMethod) => {
  const value = shippingMethod?.amount?.value;
  const priceWithTax = shippingMethod?.price_incl_tax?.value;

  return priceWithTax > 0 && priceWithTax > value ? priceWithTax : value;
};
