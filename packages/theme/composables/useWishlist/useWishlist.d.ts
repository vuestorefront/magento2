import { ComposableFunctionArgs, Context } from '@vue-storefront/core';
import {Ref} from '@nuxtjs/composition-api';

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
  wishlist: Ref<any>,
  isInWishlist: (params: { currentWishlist: any; product: any }) => boolean;
  addItem: (
    params: ComposableFunctionArgs<{
      product: any;
    }>) => Promise<void>;
  load: (params: ComposableFunctionArgs<{
    searchParams?: Partial<{
      currentPage: number;
      pageSize: number;
    }>,
  }>) => Promise<any>;
  removeItem: (
    params: ComposableFunctionArgs<{
      product: any;
    }>) => Promise<void>;
  clear: (params: { currentWishlist: any }) => Promise<any>;
  setWishlist: any;
  loading: Ref<boolean>
  error: Ref<UseWishlistErrors>;
};
