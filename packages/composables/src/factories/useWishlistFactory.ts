import {
  Ref,
  computed,
} from '@vue/composition-api';
import {
  configureFactoryParams,
  Context,
  CustomQuery,
  FactoryParams,
  Logger,
  sharedRef,
} from '@absolute-web/vsf-core';
import { ComposableFunctionArgs, PlatformApi } from '@absolute-web/vsf-core/lib/src/types';
import { UseWishlist, UseWishlistErrors } from '../types/composables';

export interface UseWishlistFactoryParams<WISHLIST,
  WISHLIST_ITEM,
  PRODUCT,
  API extends PlatformApi = any> extends FactoryParams<API> {
  load: (context: Context, params: ComposableFunctionArgs<{
    searchParams?: Partial<{
      currentPage: number;
      pageSize: number;
    }>,
  }>) => Promise<WISHLIST>;
  addItem: (
    context: Context,
    params: ComposableFunctionArgs<{
      currentWishlist: WISHLIST;
      product: PRODUCT;
    }>) => Promise<WISHLIST>;
  removeItem: (
    context: Context,
    params: ComposableFunctionArgs<{
      currentWishlist: WISHLIST;
      product: WISHLIST_ITEM;
    }>) => Promise<WISHLIST>;
  clear: (context: Context, params: { currentWishlist: WISHLIST }) => Promise<WISHLIST>;
  isInWishlist: (context: Context, params: { currentWishlist: WISHLIST; product: PRODUCT }) => boolean;
}

export const useWishlistFactory = <WISHLIST, WISHLIST_ITEM, PRODUCT, API extends PlatformApi = any>(
  factoryParams: UseWishlistFactoryParams<WISHLIST, WISHLIST_ITEM, PRODUCT, API>,
) => {
  const useWishlist = (ssrKey = 'useWishlistFactory'): UseWishlist<WISHLIST, WISHLIST_ITEM, PRODUCT, API> => {
    const loading: Ref<boolean> = sharedRef<boolean>(false, `useWishlist-loading-${ssrKey}`);
    const wishlist: Ref<WISHLIST> = sharedRef(null, `useWishlist-wishlist-${ssrKey}`);
    const error: Ref<UseWishlistErrors> = sharedRef({
      addItem: null,
      removeItem: null,
      load: null,
      clear: null,
    }, `useWishlist-error-${ssrKey}`);

    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(
      factoryParams,
      {
        mainRef: wishlist,
        alias: 'currentWishlist',
        loading,
        error,
      },
    );

    const setWishlist = (newWishlist: WISHLIST) => {
      wishlist.value = newWishlist;
      Logger.debug(`useWishlistFactory/${ssrKey}/setWishlist`, newWishlist);
    };

    const addItem = async ({ product, customQuery }) => {
      Logger.debug(`useWishlist/${ssrKey}/addItem`, product);

      try {
        loading.value = true;
        const updatedWishlist = await _factoryParams.addItem({
          currentWishlist: wishlist.value,
          product,
          customQuery,
        });
        error.value.addItem = null;
        wishlist.value = updatedWishlist;
      } catch (err) {
        error.value.addItem = err;
        Logger.error(`useWishlist/${ssrKey}/addItem`, err);
      } finally {
        loading.value = false;
      }
    };

    const removeItem = async ({ product, customQuery }) => {
      Logger.debug(`useWishlist/${ssrKey}/removeItem`, product);

      try {
        loading.value = true;
        const updatedWishlist = await _factoryParams.removeItem({
          currentWishlist: wishlist.value,
          product,
          customQuery,
        });
        error.value.removeItem = null;
        wishlist.value = updatedWishlist;
      } catch (err) {
        error.value.removeItem = err;
        Logger.error(`useWishlist/${ssrKey}/removeItem`, err);
      } finally {
        loading.value = false;
      }
    };

    const load = async (params: {
      searchParams?: Partial<{
        currentPage: number;
        pageSize: number;
      }>,
      customQuery?: CustomQuery,
    }) => {
      Logger.debug(`useWishlist/${ssrKey}/load`);
      try {
        loading.value = true;
        wishlist.value = await _factoryParams.load(params);
        error.value.load = null;
      } catch (err) {
        error.value.load = err;
        Logger.error(`useWishlist/${ssrKey}/load`, err);
      } finally {
        loading.value = false;
      }
    };

    const clear = async () => {
      Logger.debug(`useWishlist/${ssrKey}/clear`);

      try {
        loading.value = true;
        const updatedWishlist = await _factoryParams.clear({
          currentWishlist: wishlist.value,
        });
        error.value.clear = null;
        wishlist.value = updatedWishlist;
      } catch (err) {
        error.value.clear = err;
        Logger.error(`useWishlist/${ssrKey}/clear`, err);
      } finally {
        loading.value = false;
      }
    };

    const isInWishlist = ({ product }) => {
      Logger.debug(`useWishlist/${ssrKey}/isInWishlist`, product);

      return _factoryParams.isInWishlist({
        currentWishlist: wishlist.value,
        product,
      });
    };

    return {
      api: _factoryParams.api,
      wishlist: computed(() => wishlist.value),
      isInWishlist,
      addItem,
      load,
      removeItem,
      clear,
      setWishlist,
      loading: computed(() => loading.value),
      error: computed(() => error.value),
    };
  };

  return useWishlist;
};
