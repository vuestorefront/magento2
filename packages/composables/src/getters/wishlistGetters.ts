/**
 * @deprecated since version 1.0.0
 */
import {
  WishlistGetters as BaseWishlistGetters,
  AgnosticPrice,
  AgnosticTotals, AgnosticPagination,
} from '@vue-storefront/core';
import {
  Wishlist, WishlistItemInterface,
} from '@vue-storefront/magento-api';

export type WishlistProduct = WishlistItemInterface;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getItems = (wishlist: Wishlist): WishlistItemInterface[] => wishlist.items_v2.items;

export const getItemName = (product: WishlistItemInterface): string => product?.product?.name || '';

export const getItemImage = (product: WishlistItemInterface): string => product?.product?.thumbnail.url || '';

export const getItemPrice = (product: WishlistItemInterface): AgnosticPrice => {
  let regular = 0;
  let special = null;

  if (product?.product?.price_range) {
    regular = product?.product?.price_range.minimum_price.regular_price.value;
    const final = product?.product?.price_range.minimum_price.final_price.value;

    if (final < regular) {
      special = final;
    }
  }

  return {
    regular,
    special,
  };
};

export const getItemQty = (product: WishlistItemInterface): number => product.quantity;

export const getItemAttributes = (_product: WishlistItemInterface, _filterByAttributeName?: string[]) => ({ '': '' });

export const getItemSku = (product: WishlistItemInterface): string => product?.product?.sku || '';

export const getTotals = (wishlist: Wishlist | Wishlist[]): AgnosticTotals => {
  if (Array.isArray(wishlist)) {
    return wishlist[0]?.items_v2?.items.reduce((acc, curr) => ({
      total: acc.total + getItemPrice(curr).special,
      subtotal: acc.subtotal + getItemPrice(curr).regular,
    }), ({ total: 0, subtotal: 0 }));
  }
  return wishlist?.items_v2?.items.reduce((acc, curr) => ({
    total: acc.total + getItemPrice(curr).special,
    subtotal: acc.subtotal + getItemPrice(curr).regular,
  }), ({ total: 0, subtotal: 0 }));
};

export const getShippingPrice = (_wishlist: Wishlist): number => 0;

export const getTotalItems = (wishlist: Wishlist): number => (Array.isArray(wishlist) ? wishlist[0]?.items_count : (wishlist?.items_count || 0));

export const getFormattedPrice = (_price: number): string => '';

const getPagination = (wishlistData: Wishlist): AgnosticPagination => ({
  currentPage: wishlistData?.items_v2?.page_info?.current_page || 1,
  totalPages: wishlistData?.items_v2?.page_info?.total_pages || 1,
  totalItems: wishlistData?.items_count || 0,
  itemsPerPage: wishlistData?.items_v2?.page_info?.page_size || 10,
  pageOptions: [10, 50, 100],
});

const getProducts = (wishlistData: Wishlist[] | Wishlist): {
  product: WishlistItemInterface;
  quantity: number;
  added_at: string;
}[] => {
  if (!wishlistData || (Array.isArray(wishlistData) && wishlistData.length === 0)) {
    return [];
  }
  const reducer = (
    acc,
    curr: Wishlist,
  ) => [...acc, ...curr?.items_v2?.items.map((item) => ({
    product: item.product,
    quantity: item.quantity,
    added_at: item.added_at,
    id: item.id,
  })) ?? []];

  const mapper = (item: WishlistItemInterface) => ({
    product: item.product,
    quantity: item.quantity,
    added_at: item.added_at,
    id: item.id,
  });

  return Array.isArray(wishlistData)
    ? wishlistData.reduce((accumulator, element) => reducer(accumulator, element), [])
    : wishlistData?.items_v2?.items.map((element) => mapper(element));
};

export interface WishlistGetters extends BaseWishlistGetters<Wishlist, WishlistItemInterface> {
  getShippingPrice(wishlist: Wishlist): number;

  getItemQty(product: WishlistItemInterface): number;

  getPagination(wishlistData): AgnosticPagination;

  getProducts(wishlistData): {
    product: WishlistItemInterface;
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
