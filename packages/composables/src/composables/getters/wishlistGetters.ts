/* istanbul ignore file */
import {
  WishlistGetters as BaseWishlistGetters,
  AgnosticPrice,
  AgnosticTotals, AgnosticPagination,
} from '@vue-storefront/core';
import { WishlistOutput, WishlistItem } from '@vue-storefront/magento-api';
import { WishlistdataFragment } from '@vue-storefront/magento-api/lib/types/GraphQL';

type Wishlist = WishlistOutput;
type WishlistProduct = WishlistItem;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getItems = (wishlist: Wishlist): WishlistProduct[] => wishlist.items;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getItemName = (product: WishlistProduct): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getItemImage = (product: WishlistProduct): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getItemPrice = (product: WishlistProduct): AgnosticPrice => ({ regular: 0, special: 0 });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getItemQty = (product: WishlistProduct): number => 1;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getItemAttributes = (product: WishlistProduct, filterByAttributeName?: string[]) => ({ '': '' });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getItemSku = (product: WishlistProduct): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getTotals = (wishlist: Wishlist): AgnosticTotals => ({ total: 0, subtotal: 0 });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getShippingPrice = (wishlist: Wishlist): number => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getTotalItems = (wishlist: Wishlist): number => ((wishlist) ? wishlist.items_count : 0);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getFormattedPrice = (price: number): string => '';

const getPagination = (wishlistData: WishlistdataFragment): AgnosticPagination => ({
  currentPage: wishlistData?.items_v2?.page_info?.current_page || 1,
  totalPages: wishlistData?.items_v2?.page_info?.total_pages || 1,
  totalItems: wishlistData?.items_count || 0,
  itemsPerPage: wishlistData?.items_v2?.page_info?.page_size || 20,
  pageOptions: [10, 50, 100],
});

const getProducts = (wishlistData: WishlistdataFragment[] | WishlistdataFragment): {
  product: WishlistProduct;
  quantity: number;
  added_at: string;
}[] => {
  if (!wishlistData || (Array.isArray(wishlistData) && wishlistData.length === 0)) {
    return [];
  }

  const reducer = (acc, curr) => [...acc, ...curr.items_v2.items.map((item) => ({
    product: item.product,
    quantity: item.quantity,
    added_at: item.added_at,
  }))];

  const mapper = (item) => ({
    product: item.product,
    quantity: item.quantity,
    added_at: item.added_at,
  });

  return Array.isArray(wishlistData)
    ? wishlistData.reduce((acc, curr) => reducer(acc, curr), [])
    : wishlistData.items_v2.items.map((e) => mapper(e));
};

export interface WishlistGetters extends BaseWishlistGetters<Wishlist, WishlistProduct> {
  getShippingPrice(wishlist: Wishlist): number;

  getItemQty(product: WishlistProduct): number;

  getPagination(wishlistData): AgnosticPagination;

  getProducts(wishlistData): {
    product: WishlistProduct;
    quantity: number;
    added_at: string;
  }[];
}

const wishlistGetters: WishlistGetters = {
  getTotals,
  getShippingPrice,
  getItems,
  getItemName,
  getItemImage,
  getItemPrice,
  getItemQty,
  getItemAttributes,
  getItemSku,
  getTotalItems,
  getFormattedPrice,
  getPagination,
  getProducts,
};

export default wishlistGetters;
