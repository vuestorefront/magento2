/**
 * @deprecated since version 1.0.0
 */
import { compareWishlistProduct } from './compareWishlist';

export const findItemOnWishlist = (currentWishlist, product) => {
  const wishlist = Array.isArray(currentWishlist) ? currentWishlist[0] : currentWishlist;

  return wishlist
    ?.items_v2
    ?.items?.find((item) => compareWishlistProduct(item.product, product));
};
