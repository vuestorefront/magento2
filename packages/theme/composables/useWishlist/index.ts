import { computed, ref, useContext } from '@nuxtjs/composition-api';
import { CustomQuery, Logger } from '@vue-storefront/core';
import { findItemOnWishlist } from '~/composables/useWishlist/helpers';
import {UseWishlist, UseWishlistErrors, Wishlist} from '~/composables/useWishlist/useWishlist';
import { useCustomerStore } from '~/stores/customer';
import cookieNames from '~/enums/cookieNameEnum';

export const useWishlist = (): UseWishlist => {
  const customerStore = useCustomerStore();
  const { app } = useContext();
  const loading = ref(false);
  const error = ref<UseWishlistErrors>({
    addItem: null,
    removeItem: null,
    load: null,
    clear: null,
  });

  const load = async (params: {
    searchParams?: Partial<{
      currentPage: number;
      pageSize: number;
    }>,
    customQuery?: CustomQuery,
    // eslint-disable-next-line consistent-return
  }) => {
    Logger.debug('useWishlist/load');
    try {
      loading.value = true;
      Logger.debug('[Magento Storefront]: useWishlist.load params->', params);
      const apiState = app.context.$vsf.$magento.config.state;

      if (apiState.getCustomerToken()) {
        const { data } = await app.context.$vsf.$magento.api.wishlist(params?.searchParams, params?.customQuery);

        Logger.debug('[Result]:', { data });
        customerStore.wishlist = data?.customer?.wishlists ?? [];

        return;
      }

      customerStore.$patch((state) => {
        state.wishlist = null;
      });

      error.value.load = null;
    } catch (err) {
      error.value.load = err;
      Logger.error('useWishlist/load', err);
    } finally {
      loading.value = false;
    }
  };

  const isInWishlist = ({ product }) => {
    Logger.debug('useWishlist/isInWishlist', product);

    const wishlistProduct = findItemOnWishlist(customerStore.wishlist, product);

    return !!(wishlistProduct?.id && wishlistProduct?.quantity);
  };

  const setWishlist = (newWishlist: Wishlist) => {
    customerStore.wishlist = newWishlist;
    Logger.debug('useWishlist/setWishlist', newWishlist);
  };

  const removeItem = async ({ product, params }) => {
    Logger.debug('useWishlist/removeItem', product);

    try {
      loading.value = true;
      Logger.debug('[Magento Storefront]: useWishlist.removeItem params->', {
        currentWishlist: customerStore.wishlist,
        product,
        customQuery: params?.customQuery,
      });

      const itemOnWishlist = findItemOnWishlist(customerStore.wishlist, product);
      const { data } = await app.context.$vsf.$magento.api.removeProductsFromWishlist({
        id: '0',
        items: [itemOnWishlist.id],
      }, params?.customQuery);

      Logger.debug('[Result]:', { data });
      error.value.removeItem = null;
      customerStore.$patch((state) => {
        state.wishlist = data?.removeProductsFromWishlist?.wishlist ?? {};
      });
    } catch (err) {
      error.value.removeItem = err;
      Logger.error('useWishlist/removeItem', err);
    } finally {
      loading.value = false;
    }
  };

  // eslint-disable-next-line consistent-return
  const addItem = async ({ product, customQuery }) => {
    Logger.debug('useWishlist/addItem', product);

    try {
      loading.value = true;
      Logger.debug('[Magento Storefront]: useWishlist.addItem params->', {
        currentWishlist: customerStore.wishlist,
        product,
        customQuery,
      });

      if (!customerStore.wishlist) {
        await load({});
      }

      const itemOnWishlist = findItemOnWishlist(customerStore.wishlist, product);

      // todo: legacy code, should be double-checked and probably removed
      if (itemOnWishlist) {
        return await removeItem({
          product,
          params: {},
        });
      }

      if (!app.context.$cookies.get(cookieNames.customerCookieName)) { // TODO: replace by value from pinia store after sueCart composable will be refactored
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
          }, customQuery);

          Logger.debug('[Result]:', { data });

          customerStore.$patch((state) => {
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
          }, customQuery);

          Logger.debug('[Result]:', { data: configurableProductData });

          customerStore.$patch((state) => {
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
              entered_options: product.bundle_options ? [...product.bundle_options] : [],
            }],
          }, customQuery);

          Logger.debug('[Result]:', { data: bundleProductData });

          customerStore.$patch((state) => {
            state.wishlist = bundleProductData?.addProductsToWishlist?.wishlist ?? {};
          });

          break;
        }
        default:
          // todo implement other options
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
      customerStore.$patch((state) => {
        state.wishlist = {};
      });
    } catch (err) {
      error.value.clear = err;
      Logger.error('useWishlist/clear', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    wishlist: computed(() => customerStore.wishlist),
    isInWishlist,
    addItem,
    load,
    removeItem,
    clear,
    setWishlist,
    loading,
    error,
  };
};

export default useWishlist;
