export const compareWishlistProduct = (
  productA,
  productB,
): boolean => {
  const equalSku = productA?.sku === productB?.sku;
  const equalUid = productA?.uid === productB?.uid;

  return equalSku && equalUid;
};

export const findItemOnWishlist = (currentWishlist, product) => {
  const wishlist = Array.isArray(currentWishlist) ? currentWishlist[0] : currentWishlist;

  return wishlist
    ?.items_v2
    ?.items?.find((item) => compareWishlistProduct(item.product, product));
};
