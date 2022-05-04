import { ProductInterface } from '~/modules/GraphQL/types';

export const productMatch = (
  productA: ProductInterface,
  productB: ProductInterface,
): boolean => {
  const equalSku = productA?.sku === productB?.sku;
  const equalUid = productA?.uid === productB?.uid;

  return equalSku && equalUid;
};
