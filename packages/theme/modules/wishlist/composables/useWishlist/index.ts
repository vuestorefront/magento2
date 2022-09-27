import { readonly, ref, useContext } from '@nuxtjs/composition-api';
import { findItemOnWishlist } from '~/modules/wishlist/helpers/findItemOnWishlist';
import { Logger } from '~/helpers/logger';
import { useWishlistStore } from '~/modules/wishlist/store/wishlistStore';
import type { Wishlist } from '~/modules/GraphQL/types';
import type {
  UseWishlistAddItemParams,
  UseWishlistErrors,
  UseWishlistInterface,
  UseWishlistIsInWishlistParams,
  UseWishlistLoadParams,
  UseWishlistRemoveItemParams,
  UseWishlistAfterAddingWishlistItemToCartParams,
} from '~/modules/wishlist/composables/useWishlist/useWishlist';
import { useUiNotification } from '~/composables';

/**
 * Allows loading and manipulating wishlist of the current user.
 *
 * See the {@link UseWishlistInterface} for a list of methods and values available in this composable.
 */
export function useWishlist(): UseWishlistInterface {
  const wishlistStore = useWishlistStore();
  const { app } = useContext();
  const { send: sendNotification } = useUiNotification();
  const loading = ref(false);
  const calculateWishlistTotal = (wishlists: Wishlist[]) => wishlists.reduce((acc, current) => acc + (current?.items_count ?? 0), 0);
  const error = ref<UseWishlistErrors>({
    addItem: null,
    removeItem: null,
    load: null,
    clear: null,
    loadItemsCount: null,
    afterAddingWishlistItemToCart: null,
  });

  const load = async (params?: UseWishlistLoadParams) => {
    Logger.debug('useWishlist/load');

    try {
      loading.value = true;
      Logger.debug('[Magento Storefront]: useWishlist.load params->', params);
      const apiState = app.$vsf.$magento.config.state;

      if (apiState.getCustomerToken()) {
        const { data } = await app.$vsf.$magento.api.wishlist(params?.searchParams, params?.customQuery ?? null, params?.customHeaders);

        Logger.debug('[Result]:', { data });
        const loadedWishlist = data?.customer?.wishlists ?? [];
        if (loadedWishlist[0]) {
          // @ts-expect-error M2-579
          [wishlistStore.wishlist] = loadedWishlist;
        }
      }

      error.value.load = null;
    } catch (err) {
      error.value.load = err;
      Logger.error('useWishlist/load', err);
    } finally {
      loading.value = false;
    }

    return wishlistStore.wishlist;
  };

  const isInWishlist = ({ product }: UseWishlistIsInWishlistParams) => {
    Logger.debug('useWishlist/isInWishlist', product);

    const wishlistProduct = findItemOnWishlist(wishlistStore.wishlist, product);

    return !!(wishlistProduct?.id && wishlistProduct?.quantity);
  };

  const setWishlist = (newWishlist: Wishlist) => {
    wishlistStore.wishlist = newWishlist;
    Logger.debug('useWishlist/setWishlist', newWishlist);
  };

  const removeItem = async ({ product, customQuery, customHeaders }: UseWishlistRemoveItemParams) => {
    Logger.debug('useWishlist/removeItem', product);

    try {
      loading.value = true;
      Logger.debug('[Magento Storefront]: useWishlist.removeItem params->', {
        currentWishlist: wishlistStore.wishlist,
        product,
        customQuery,
        customHeaders,
      });

      const itemOnWishlist = findItemOnWishlist(wishlistStore.wishlist, product);
      const { data } = await app.context.$vsf.$magento.api.removeProductsFromWishlist({
        id: '0',
        items: [itemOnWishlist.id],
      }, customQuery, customHeaders);

      Logger.debug('[Result]:', { data });
      error.value.removeItem = null;
      wishlistStore.$patch((state) => {
        state.wishlist = data?.removeProductsFromWishlist?.wishlist ?? {};
      });
    } catch (err) {
      error.value.removeItem = err;
      Logger.error('useWishlist/removeItem', err);
    } finally {
      loading.value = false;
    }
  };

  const loadItemsCount = async (): Promise<number | null> => {
    Logger.debug('useWishlist/wishlistItemsCount');
    const apiState = app.context.$vsf.$magento.config.state;
    let itemsCount : number | null = null;

    try {
      loading.value = true;
      error.value.loadItemsCount = null;
      if (apiState.getCustomerToken()) {
        const { data } = await app.context.$vsf.$magento.api.wishlistItemsCount();

        Logger.debug('[Result]:', { data });
        const loadedWishlist : Wishlist[] = data?.customer?.wishlists ?? [];
        itemsCount = calculateWishlistTotal(loadedWishlist);
        wishlistStore.$patch((state) => {
          state.wishlist.items_count = itemsCount;
        });
      }
    } catch (err) {
      error.value.loadItemsCount = err;
      Logger.error('useWishlist/wishlistItemsCount', err);
    } finally {
      loading.value = false;
    }

    return itemsCount;
  };

  // eslint-disable-next-line consistent-return
  const addItem = async ({ product, customQuery, customHeaders }: UseWishlistAddItemParams) => {
    Logger.debug('useWishlist/addItem', product);

    try {
      loading.value = true;
      Logger.debug('[Magento Storefront]: useWishlist.addItem params->', {
        currentWishlist: wishlistStore.wishlist,
        product,
        customQuery,
        customHeaders,
      });

      if (!wishlistStore.wishlist) {
        await load({});
      }

      const itemOnWishlist = findItemOnWishlist(wishlistStore.wishlist, product);

      if (itemOnWishlist) {
        return;
      }

      if (!app.$vsf.$magento.config.state.getCustomerToken()) {
        Logger.error('Need to be authenticated to add a product to wishlist');
      }

      // @ts-ignore
      // eslint-disable-next-line no-underscore-dangle
      switch (product.__typename) {
        case 'VirtualProduct':
        case 'DownloadableProduct':
        case 'GroupedProduct':
        case 'GiftCard':
        case 'SimpleProduct': {
          const { data } = await app.context.$vsf.$magento.api.addProductToWishList({
            id: '0',
            items: [{
              sku: product.sku,
              quantity: 1,
            }],
          }, customQuery, customHeaders);

          Logger.debug('[Result]:', { data });

          wishlistStore.$patch((state) => {
            state.wishlist = data?.addProductsToWishlist?.wishlist ?? {};
          });

          break;
        }
        case 'ConfigurableProduct': {
          const { data: configurableProductData } = await app.context.$vsf.$magento.api.addProductToWishList({
            id: '0',
            items: [{
              sku: product.configurable_product_options_selection?.variant?.sku || product.sku,
              quantity: 1,
              parent_sku: product.sku,
            }],
          }, customQuery, customHeaders);

          Logger.debug('[Result]:', { data: configurableProductData });

          wishlistStore.$patch((state) => {
            state.wishlist = configurableProductData?.addProductsToWishlist?.wishlist ?? {};
          });

          break;
        }
        case 'BundleProduct': {
          const { data: bundleProductData } = await app.context.$vsf.$magento.api.addProductToWishList({
            id: '0',
            items: [{
              sku: product.sku,
              quantity: 1,
              entered_options: [],
            }],
          }, customQuery, customHeaders);

          Logger.debug('[Result]:', { data: bundleProductData });

          wishlistStore.$patch((state) => {
            state.wishlist = bundleProductData?.addProductsToWishlist?.wishlist ?? {};
          });

          break;
        }
        default:
          // @ts-ignore
          // eslint-disable-next-line no-underscore-dangle
          Logger.error(`Product Type ${product.__typename} not supported in add to wishlist yet`);
      }
    } catch (err) {
      error.value.addItem = err;
      Logger.error('useWishlist/addItem', err);
    } finally {
      loading.value = false;
    }
  };

  // eslint-disable-next-line @typescript-eslint/require-await
  const clear = async () => {
    Logger.debug('useWishlist/clear');

    try {
      loading.value = true;
      error.value.clear = null;
      wishlistStore.$patch((state) => {
        state.wishlist = {};
      });
    } catch (err) {
      error.value.clear = err;
      Logger.error('useWishlist/clear', err);
    } finally {
      loading.value = false;
    }
  };

  const afterAddingWishlistItemToCart = (
    { product, cartError }: UseWishlistAfterAddingWishlistItemToCartParams,
  ) => {
    Logger.debug('useWishlist/afterAddingItemToCart', product);

    if (!isInWishlist({ product })) return;

    try {
      if (cartError?.message) {
        sendNotification({
          id: Symbol('product_added_to_cart_from_wishlist_error'),
          message: cartError.message,
          type: 'danger',
          icon: 'cross',
          persist: false,
          title: 'Wishlist error',
        });
      } else {
        // eslint-disable-next-line promise/catch-or-return
        removeItem({ product })
          // eslint-disable-next-line promise/always-return
          .then(() => {
            sendNotification({
              id: Symbol('product_added_to_cart_from_wishlist'),
              message: app.i18n.t(
                'You added {product} to your shopping cart.',
                { product: product.name },
              ) as string,
              type: 'success',
              icon: 'check',
              persist: false,
              title: 'Wishlist',
            });
          });
      }
    } catch (err) {
      error.value.afterAddingWishlistItemToCart = err;
      Logger.error('useWishlist/afterAddingWishlistItemToCart', err);
    }
  };

  const addOrRemoveItem = async ({ product, customQuery, customHeaders }: UseWishlistAddItemParams) => {
    await (isInWishlist({ product }) ? removeItem({ product, customQuery, customHeaders }) : addItem({ product, customQuery, customHeaders }));
  };

  return {
    loadItemsCount,
    isInWishlist,
    addItem,
    load,
    removeItem,
    clear,
    setWishlist,
    afterAddingWishlistItemToCart,
    addOrRemoveItem,
    loading: readonly(loading),
    error: readonly(error),
  };
}

export default useWishlist;
export * from './useWishlist';
