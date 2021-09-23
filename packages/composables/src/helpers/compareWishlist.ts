export const compareWishlistProduct = (
  productA,
  productB,
): boolean => {
  const equalSku = productA?.sku === productB?.sku;
  const equalUid = productA?.uid === productB?.uid || Number(productA?.id) === Number(productB?.id);

  return equalSku && equalUid;
};
