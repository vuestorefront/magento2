import { ProductInterface, Wishlist } from '~/modules/GraphQL/types';
import { productMatch } from '~/modules/wishlist/helpers/productMatch';

export const findItemOnWishlist = (currentWishlist: Wishlist, product: ProductInterface) => {
  const wishlist: Wishlist = Array.isArray(currentWishlist) ? currentWishlist[0] : currentWishlist;

  return wishlist
    ?.items_v2
    ?.items?.find((item) => productMatch(item.product, product));
};
