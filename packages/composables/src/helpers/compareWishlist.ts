/**
 * @deprecated since version 1.0.0
 */
export const compareWishlistProduct = (
  productA,
  productB,
): boolean => {
  const equalSku = productA?.sku === productB?.sku;
  const equalUid = productA?.uid === productB?.uid;

  return equalSku && equalUid;
};
