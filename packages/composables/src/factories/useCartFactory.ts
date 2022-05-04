/**
 * @deprecated since version 1.0.0
 */
import {
  UseCart as UseCartCore,
  Context,
  FactoryParams,
  UseCartErrors as UseCartErrorsCore,
  PlatformApi,
  sharedRef,
  Logger,
  configureFactoryParams,
  ComposableFunctionArgs,
  ComputedProperty,
  CustomQuery,
} from '@vue-storefront/core';
import { computed, Ref } from '@vue/composition-api';

export interface UseCartFactoryParams<CART, CART_ITEM, PRODUCT, API extends PlatformApi = any> extends FactoryParams<API> {
  load: (context: Context, params: ComposableFunctionArgs<{ realCart?: boolean; }>) => Promise<CART>;
  loadTotalQty: (context: Context) => Promise<number>;
  addItem: (
    context: Context,
    params: ComposableFunctionArgs<{
      currentCart: CART;
      product: PRODUCT;
      quantity: any;
    }>
  ) => Promise<CART>;
  removeItem: (context: Context, params: ComposableFunctionArgs<{ currentCart: CART; product: CART_ITEM; }>) => Promise<CART>;
  updateItemQty: (
    context: Context,
    params: ComposableFunctionArgs<{ currentCart: CART; product: CART_ITEM; quantity: number; }>
  ) => Promise<CART>;
  clear: (context: Context, params: { currentCart: CART }) => Promise<CART>;
  applyCoupon: (context: Context, params: ComposableFunctionArgs<{ currentCart: CART; couponCode: string; }>) => Promise<{ updatedCart: CART }>;
  removeCoupon: (
    context: Context,
    params: ComposableFunctionArgs<{ currentCart: CART; couponCode: string; }>
  ) => Promise<{ updatedCart: CART }>;
  isInCart: (context: Context, params: { currentCart: CART; product: PRODUCT }) => boolean;
}

export interface UseCart<CART, CART_ITEM, PRODUCT, API extends PlatformApi = any> extends UseCartCore<CART, CART_ITEM, PRODUCT, API> {
  totalQuantity: ComputedProperty<number>,
  loadTotalQty(params: {
    customQuery?: CustomQuery;
  }): Promise<void>;
}
export interface UseCartErrors extends UseCartErrorsCore {
  loadTotalQty: Error
}

export const useCartFactory = <CART, CART_ITEM, PRODUCT, API extends PlatformApi = any>(
  factoryParams: UseCartFactoryParams<CART, CART_ITEM, PRODUCT, API>,
) => function useCart(): UseCart<CART, CART_ITEM, PRODUCT, API> {
  const loading: Ref<boolean> = sharedRef(false, 'useCart-loading');
  const cart: Ref<CART> = sharedRef(null, 'useCart-cart');
  const totalQuantity: Ref<number> = sharedRef(0, 'useCart-totalQuantity');
  const error: Ref<UseCartErrors> = sharedRef({
    addItem: null,
    removeItem: null,
    updateItemQty: null,
    load: null,
    clear: null,
    applyCoupon: null,
    removeCoupon: null,
    loadTotalQty: null,
  }, 'useCart-error');

  // eslint-disable-next-line no-underscore-dangle,@typescript-eslint/naming-convention
  const _factoryParams = configureFactoryParams(
    factoryParams,
    {
      mainRef: cart,
      alias: 'currentCart',
      loading,
      error,
    },
  );

  const setCart = (newCart: CART) => {
    cart.value = newCart;
    Logger.debug('useCartFactory.setCart', newCart);
  };

  const addItem = async ({
    product,
    quantity,
    customQuery,
  }) => {
    Logger.debug('useCart.addItem', {
      product,
      quantity,
    });

    try {
      loading.value = true;
      const updatedCart = await _factoryParams.addItem({
        currentCart: cart.value,
        product,
        quantity,
        customQuery,
      });
      error.value.addItem = null;
      cart.value = updatedCart;
      totalQuantity.value = updatedCart.total_quantity;
    } catch (err) {
      error.value.addItem = err;
      Logger.error('useCart/addItem', err);
    } finally {
      loading.value = false;
    }
  };

  const removeItem = async ({
    product,
    customQuery,
  }) => {
    Logger.debug('useCart.removeItem', { product });

    try {
      loading.value = true;
      const updatedCart = await _factoryParams.removeItem({
        currentCart: cart.value,
        product,
        customQuery,
      });
      error.value.removeItem = null;
      cart.value = updatedCart;
      totalQuantity.value = updatedCart.total_quantity;
    } catch (err) {
      error.value.removeItem = err;
      Logger.error('useCart/removeItem', err);
    } finally {
      loading.value = false;
    }
  };

  const updateItemQty = async ({
    product,
    quantity,
    customQuery,
  }) => {
    Logger.debug('useCart.updateItemQty', {
      product,
      quantity,
    });

    if (quantity && quantity > 0) {
      try {
        loading.value = true;
        const updatedCart = await _factoryParams.updateItemQty({
          currentCart: cart.value,
          product,
          quantity,
          customQuery,
        });
        error.value.updateItemQty = null;
        cart.value = updatedCart;
        totalQuantity.value = updatedCart.total_quantity;
      } catch (err) {
        error.value.updateItemQty = err;
        Logger.error('useCart/updateItemQty', err);
      } finally {
        loading.value = false;
      }
    }
  };

  const load = async ({ customQuery } = { customQuery: undefined }) => {
    Logger.debug('useCart.load');

    try {
      loading.value = true;
      const loadedCart = await _factoryParams.load({ customQuery });
      cart.value = loadedCart;
      totalQuantity.value = loadedCart?.total_quantity ?? 0;
      error.value.load = null;
    } catch (err) {
      error.value.load = err;
      Logger.error('useCart/load', err);
    } finally {
      loading.value = false;
    }
  };

  const loadTotalQty = async ({ customQuery } = { customQuery: undefined }) => {
    Logger.debug('useCart.loadTotalQty');

    try {
      loading.value = true;
      totalQuantity.value = await _factoryParams.loadTotalQty({ customQuery });
      error.value.loadTotalQty = null;
    } catch (err) {
      error.value.loadTotalQty = err;
      Logger.error('useCart/loadTotalQty', err);
    } finally {
      loading.value = false;
    }
  };

  const clear = async () => {
    Logger.debug('useCart.clear');

    try {
      loading.value = true;
      const updatedCart = await _factoryParams.clear({ currentCart: cart.value });
      error.value.clear = null;
      cart.value = updatedCart;
      totalQuantity.value = 0;
    } catch (err) {
      error.value.clear = err;
      Logger.error('useCart/clear', err);
    } finally {
      loading.value = false;
    }
  };

  const isInCart = ({ product }) => _factoryParams.isInCart({
    currentCart: cart.value,
    product,
  });

  const applyCoupon = async ({
    couponCode,
    customQuery,
  }) => {
    Logger.debug('useCart.applyCoupon');

    try {
      loading.value = true;
      const { updatedCart } = await _factoryParams.applyCoupon({
        currentCart: cart.value,
        couponCode,
        customQuery,
      });
      error.value.applyCoupon = null;
      cart.value = updatedCart;
    } catch (err) {
      error.value.applyCoupon = err;
      Logger.error('useCart/applyCoupon', err);
    } finally {
      loading.value = false;
    }
  };

  const removeCoupon = async ({
    couponCode,
    customQuery,
  }) => {
    Logger.debug('useCart.removeCoupon');

    try {
      loading.value = true;
      const { updatedCart } = await _factoryParams.removeCoupon({
        currentCart: cart.value,
        couponCode,
        customQuery,
      });
      error.value.removeCoupon = null;
      cart.value = updatedCart;
      loading.value = false;
    } catch (err) {
      error.value.removeCoupon = err;
      Logger.error('useCart/removeCoupon', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    api: _factoryParams.api,
    setCart,
    cart: computed(() => cart.value),
    totalQuantity,
    isInCart,
    addItem,
    load,
    loadTotalQty,
    removeItem,
    clear,
    updateItemQty,
    applyCoupon,
    removeCoupon,
    loading: computed(() => loading.value),
    error: computed(() => error.value),
  };
};
