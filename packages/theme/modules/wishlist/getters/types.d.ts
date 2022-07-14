import { Price } from '~/modules/catalog/types';
import { ProductAttribute } from '~/modules/catalog/product/types';
import { Totals } from '~/composables';

export interface WishlistGetters<WISHLIST, WISHLIST_ITEM> {
  getItems: (wishlist: WISHLIST) => WISHLIST_ITEM[];
  getItemName: (wishlistItem: WISHLIST_ITEM) => string;
  getItemImage: (wishlistItem: WISHLIST_ITEM) => string;
  getItemPrice: (wishlistItem: WISHLIST_ITEM) => Price;
  getItemAttributes: (wishlistItem: WISHLIST_ITEM, filters?: Array<string>) => Record<string, ProductAttribute | string>;
  getItemSku: (wishlistItem: WISHLIST_ITEM) => string;
  getTotals: (wishlist: WISHLIST) => Totals;
  getTotalItems: (wishlist: WISHLIST) => number;
  [getterName: string]: (element: any, options?: any) => unknown;
}
