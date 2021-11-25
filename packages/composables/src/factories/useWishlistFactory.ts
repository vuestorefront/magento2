import { computed, Ref } from '@vue/composition-api';
import {
  Context,
  CustomQuery,
  sharedRef,
  Logger,
  configureFactoryParams, FactoryParams, ComposableFunctionArgs,
} from '@vue-storefront/core';
import { PlatformApi } from '@vue-storefront/core/lib/src/types';
import { UseWishlist } from '../types/composables';

export interface UseWishlistFactoryParams<
  WISHLIST,
  WISHLIST_SEARCH_PARAMS,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  PRODUCT,
  API extends PlatformApi = any> extends FactoryParams<API> {
  load: (context: Context, params: {
    customQuery?: CustomQuery;
    searchParams?: ComposableFunctionArgs<WISHLIST_SEARCH_PARAMS>
  }) => Promise<WISHLIST>;
  addItem: (context: Context, params: ADD_TO_WISHLIST) => Promise<WISHLIST>;
  removeItem: (context: Context, params: REMOVE_FROM_WISHLIST) => Promise<WISHLIST>;
  clear: (context: Context, params: {
    currentWishlist: WISHLIST;
  }) => Promise<WISHLIST>;
  isInWishlist: (context: Context, params: {
    currentWishlist: WISHLIST;
    product: PRODUCT;
  }) => boolean;
}

// export declare const useWishlistFactory: <WISHLIST, WISHLIST_ITEM, PRODUCT, API extends PlatformApi = any>(factoryParams: UseWishlistFactoryParams<WISHLIST, WISHLIST_ITEM, PRODUCT, API>) => () => UseWishlist<WISHLIST, WISHLIST_ITEM, PRODUCT, API>;
export function useWishlistFactory<WISHLIST,
  WISHLIST_SEARCH_PARAMS,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  PRODUCT,
  API extends PlatformApi = any>(factoryParams: UseWishlistFactoryParams<WISHLIST,
  WISHLIST_SEARCH_PARAMS,
  ADD_TO_WISHLIST,
  PRODUCT,
  API>) {
  return function useWishlist(): UseWishlist<WISHLIST,
    WISHLIST_SEARCH_PARAMS,
    ADD_TO_WISHLIST,
    REMOVE_FROM_WISHLIST,
    PRODUCT,
    API> {
    // @ts-ignore
    const wishlist: Ref<WISHLIST> = sharedRef([], 'useWishlist-wishlist');
    const loading = sharedRef<boolean>(false, 'useWishlist-loading');
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(factoryParams);

    const addItem = async (params?: ADD_TO_WISHLIST) => {
      Logger.debug('useWishlist/addItem');
      loading.value = true;
      try {
        wishlist.value = await _factoryParams.addItem(params);
      } finally {
        loading.value = false;
      }
    };

    const clear = async () => {
      Logger.debug('useWishlist/clear');
      loading.value = true;
      try {
        wishlist.value = await _factoryParams.clearWishlist();
      } finally {
        loading.value = false;
      }
    };

    const load = async (params?: {
      customQuery?: CustomQuery,
      searchParams?: ComposableFunctionArgs<WISHLIST_SEARCH_PARAMS>
    }) => {
      Logger.debug('useWishlist/load');
      loading.value = true;
      try {
        wishlist.value = await _factoryParams.loadWishlist(params);
      } finally {
        loading.value = false;
      }
    };

    const removeItem = async (params?: REMOVE_FROM_WISHLIST) => {
      Logger.debug('useWishlist/removeItem');
      loading.value = true;
      try {
        wishlist.value = await _factoryParams.removeItem(params);
      } finally {
        loading.value = false;
      }
    };

    return {
      addItem,
      clear,
      load,
      loading: computed(() => loading.value),
      removeItem,
      wishlist: computed(() => wishlist.value)
    };
  };
}
