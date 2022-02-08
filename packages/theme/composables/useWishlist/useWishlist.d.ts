import { ComposableFunctionArgs } from '@vue-storefront/core';
import { Ref } from '@nuxtjs/composition-api';
import {Maybe, Scalars, WishlistItem, WishlistItems} from "@vue-storefront/magento-api/lib/types/GraphQL";

export interface Wishlist {
  /** The unique ID for a `Wishlist` object */
  id?: Maybe<Scalars['ID']>;
  /** @deprecated Use field `items_v2` from type `Wishlist` instead */
  items?: Maybe<Array<Maybe<WishlistItem>>>;
  /** The number of items in the wish list */
  items_count?: Maybe<Scalars['Int']>;
  /** An array of items in the customer's wish list */
  items_v2?: Maybe<WishlistItems>;
  /** An encrypted code that Magento uses to link to the wish list */
  sharing_code?: Maybe<Scalars['String']>;
  /** The time of the last modification to the wish list */
  updated_at?: Maybe<Scalars['String']>;
}

export interface UseWishlistErrors {
  addItem: Error;
  removeItem: Error;
  load: Error;
  clear: Error;
}
/**
 * TODO: add types
 */
export type UseWishlist = {
  wishlist: Ref<Wishlist>,
  isInWishlist: (params: { currentWishlist: any; product: any }) => boolean;
  addItem: (
    params: ComposableFunctionArgs<{
      product: any; // TODO: add product intrface
    }>) => Promise<void>;
  load: (params: ComposableFunctionArgs<{
    searchParams?: Partial<{
      currentPage: number;
      pageSize: number;
    }>,
  }>) => Promise<void>;
  removeItem: (
    params: ComposableFunctionArgs<{
      product: any; // TODO: add product intrface
    }>) => Promise<void>;
  clear: (params: { currentWishlist: any }) => Promise<any>;
  setWishlist: any;
  loading: Ref<boolean>
  error: Ref<UseWishlistErrors>;
};
