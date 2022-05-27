import type { Ref, DeepReadonly } from '@nuxtjs/composition-api';
import type { ComposableFunctionArgs } from '~/composables/types';
import type { Wishlist, ProductInterface } from '~/modules/GraphQL/types';
import {
  BundleProduct, ConfigurableProduct, DownloadableProduct, GroupedProduct, VirtualProduct,
} from '~/modules/GraphQL/types';

export interface Product extends ProductInterface, ConfigurableProduct, Omit<BundleProduct, 'items'>, Omit<GroupedProduct, 'items'>, Omit<DownloadableProduct, 'items'>, Omit<VirtualProduct, 'items'> { __typename: string }

/**
 * Errors that occurred in the `useWishlist` composable
 */
export interface UseWishlistErrors {
  addItem: Error | null;
  removeItem: Error | null;
  load: Error | null;
  clear: Error | null;
  loadItemsCount: Error | null;
  afterAddingWishlistItemToCart: Error | null,
}

/**
 * Parameters accepted by the `loadItemsCount` method in the `useWishlist` composable
 */
export type UseWishlistLoadItemsCountParams = ComposableFunctionArgs<{}>;

/**
 * Parameters accepted by the `isInWishlist` method in the `useWishlist` composable
 */
export type UseWishlistIsInWishlistParams = { product: Product };

/**
 * Parameters accepted by the `addItem` method in the `useWishlist` composable
 */
export type UseWishlistAddItemParams = ComposableFunctionArgs<{
  product: Product;
}>;

/**
 * Parameters accepted by the `load` method in the `useWishlist` composable
 */
export type UseWishlistLoadParams = ComposableFunctionArgs<{
  searchParams?: Partial<{
    currentPage: number;
    pageSize: number;
  }>
}>;

/**
 * Parameters accepted by the `removeItem` method in the `useWishlist` composable
 */
export type UseWishlistRemoveItemParams = ComposableFunctionArgs<{
  product: Product;
}>;

/**
 * Parameters accepted by the `clear` method in the `useWishlist` composable
 */
export type UseWishlistClearParams = {
  currentWishlist: Wishlist;
};

/**
 * Parameters accepted by the `afterAddingWishlistItemToCart` method in the `useWishlist` composable
 */
export type UseWishlistAfterAddingWishlistItemToCartParams = ComposableFunctionArgs<{
  product: Product;
  cartError: Error;
}>;

/**
 * Data and methods returned from the {@link useWishlist|useWishlist()} composable
 */
export interface UseWishlistInterface {
  /**
   * Returns a total number of items added to the wishlist of the current user
   */
  loadItemsCount(): Promise<number | null>;

  /**
   * Checks if given product is in the wishlist of the current user
   */
  isInWishlist(params: UseWishlistIsInWishlistParams): boolean;

  /**
   * Adds product to the wishlist of the current user
   */
  addItem(params: UseWishlistAddItemParams): Promise<void>;

  /**
   * Fetches wishlist of the current customer
   */
  load(params?: UseWishlistLoadParams): Promise<Wishlist>;

  /**
   * Removes product from the wishlist of the current user
   */
  removeItem(params: UseWishlistRemoveItemParams): Promise<void>;

  /**
   * Removes all products from the wishlist of the current user
   */
  clear(params: UseWishlistClearParams): Promise<any>;

  /**
   * Overrides the wishlist of the current user
   */
  setWishlist(newWishlist: Wishlist): void;

  /**
   * After adding a product from the wishlist to the cart
   */
  afterAddingWishlistItemToCart(params: UseWishlistAfterAddingWishlistItemToCartParams): void;

  /**
   * Adds item to the wishlist if is not already added, otherwise remove it from the wishlist
   */
  addOrRemoveItem(params: UseWishlistAddItemParams): Promise<void>;

  /**
   * Indicates whether any of the methods is in progress
   */
  loading: Readonly<Ref<boolean>>;

  /**
   * Contains errors from any of the composable methods
   */
  error: DeepReadonly<Ref<UseWishlistErrors>>;
}
