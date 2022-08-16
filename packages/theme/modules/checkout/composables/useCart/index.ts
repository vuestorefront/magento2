import {
  computed, readonly, ref, useContext, useRoute,
} from '@nuxtjs/composition-api';
import { addItemCommand } from '~/modules/checkout/composables/useCart/commands/addItemCommand';
import { applyCouponCommand } from '~/modules/checkout/composables/useCart/commands/applyCouponCommand';
import { loadCartCommand } from '~/modules/checkout/composables/useCart/commands/loadCartCommand';
import { loadTotalQtyCommand } from '~/modules/checkout/composables/useCart/commands/loadTotalQtyCommand';
import { removeCouponCommand } from '~/modules/checkout/composables/useCart/commands/removeCouponCommand';
import { removeItemCommand } from '~/modules/checkout/composables/useCart/commands/removeItemCommand';
import { updateItemQtyCommand } from '~/modules/checkout/composables/useCart/commands/updateItemQtyCommand';
import { Logger } from '~/helpers/logger';
import { Cart, CartItemInterface, ProductInterface } from '~/modules/GraphQL/types';
import { useCartStore } from '~/modules/checkout/stores/cart';
import { useWishlist } from '~/modules/wishlist/composables/useWishlist';
import { Product } from '~/modules/catalog/product/types';
import { ComposableFunctionArgs } from '~/composables';
import { UseCartErrors, UseCartInterface } from './useCart';

/**
 * Allows loading and manipulating cart of the current user.
 *
 * See the {@link UseCartInterface} for a list of methods and values available in this composable.
 */
export function useCart<CART extends Cart, CART_ITEM extends CartItemInterface, PRODUCT extends ProductInterface>(): UseCartInterface<
CART,
CART_ITEM,
PRODUCT
> {
  const loading = ref<boolean>(false);
  const error = ref<UseCartErrors>({
    addItem: null,
    removeItem: null,
    updateItemQty: null,
    load: null,
    clear: null,
    applyCoupon: null,
    removeCoupon: null,
    loadTotalQty: null,
  });
  const { app } = useContext();
  const context = app.$vsf;
  const route = useRoute();
  const cartStore = useCartStore();
  const cart = computed(() => cartStore.cart as CART);
  const apiState = context.$magento.config.state;
  const { loading: wishlistLoading, afterAddingWishlistItemToCart } = useWishlist();

  /**
   * Assign new cart object
   * @param newCart
   *
   * @return void
   */
  const setCart = (newCart: CART): void => {
    Logger.debug('useCart.setCart', newCart);

    cartStore.$patch((state) => {
      state.cart = newCart;
    });
  };

  /**
   * Check if product is in the cart
   * @param product
   *
   * @return boolean
   */
  const isInCart = (product: PRODUCT): boolean => !!cart.value?.items?.find((cartItem) => cartItem?.product?.uid === product.uid);

  const load = async ({ customQuery = {}, realCart = false } = { customQuery: { cart: 'cart' } }): Promise<void> => {
    Logger.debug('useCart.load');

    try {
      loading.value = true;
      const loadedCart = await loadCartCommand.execute(context, { customQuery, realCart });
      cartStore.$patch((state) => {
        state.cart = loadedCart;
      });
      error.value.load = null;
    } catch (err) {
      error.value.load = err;
      Logger.error('useCart/load', err);
    } finally {
      loading.value = false;
    }
  };

  const clear = async ({ customQuery } = { customQuery: { cart: 'cart' } }): Promise<void> => {
    Logger.debug('useCart.clear');

    try {
      loading.value = true;
      context.$magento.config.state.removeCartId();
      const loadedCart = await loadCartCommand.execute(context, { customQuery });

      cartStore.$patch((state) => {
        state.cart = loadedCart;
      });
    } catch (err) {
      error.value.clear = err;
      Logger.error('useCart/clear', err);
    } finally {
      loading.value = false;
    }
  };

  const loadTotalQty = async (params?: ComposableFunctionArgs<{}>): Promise<void> => {
    Logger.debug('useCart.loadTotalQty');

    try {
      loading.value = true;
      const totalQuantity = await loadTotalQtyCommand.execute(context, params);

      cartStore.$patch((state) => {
        state.cart.total_quantity = totalQuantity;
      });
    } catch (err) {
      error.value.loadTotalQty = err;
      Logger.error('useCart/loadTotalQty', err);
    } finally {
      loading.value = false;
    }
  };

  const addItem = async ({
    product, quantity, productConfiguration, customQuery,
  }): Promise<void> => {
    Logger.debug('useCart.addItem', { product, quantity });

    try {
      loading.value = true;

      if (!apiState.getCartId()) {
        await load({ realCart: true });
      }

      const updatedCart = await addItemCommand.execute(context, {
        currentCart: cart.value,
        product,
        quantity,
        productConfiguration,
        customQuery,
      });

      error.value.addItem = null;
      cartStore.$patch((state) => {
        state.cart = updatedCart;
      });
    } catch (err) {
      error.value.addItem = err;
      Logger.error('useCart/addItem', err);
    } finally {
      if (!wishlistLoading.value && route.value.query?.wishlist) {
        afterAddingWishlistItemToCart({
          product,
          cartError: error.value.addItem,
        });
      }
      loading.value = false;
    }
  };

  const removeItem = async ({ product, customQuery }) => {
    Logger.debug('useCart.removeItem', { product });

    try {
      loading.value = true;
      const updatedCart = await removeItemCommand.execute(context, {
        currentCart: cart.value,
        product,
        customQuery,
      });

      error.value.removeItem = null;
      cartStore.$patch((state) => {
        state.cart = updatedCart;
      });
    } catch (err) {
      error.value.removeItem = err;
      Logger.error('useCart/removeItem', err);
    } finally {
      loading.value = false;
    }
  };

  const updateItemQty = async ({ product, quantity, customQuery = { updateCartItems: 'updateCartItems' } }): Promise<void> => {
    Logger.debug('useCart.updateItemQty', {
      product,
      quantity,
    });

    if (quantity && quantity > 0) {
      try {
        loading.value = true;
        const updatedCart = await updateItemQtyCommand.execute(context, {
          currentCart: cart.value,
          product,
          quantity,
          customQuery,
        });

        error.value.updateItemQty = null;
        cartStore.$patch((state) => {
          state.cart = updatedCart;
        });
      } catch (err) {
        error.value.updateItemQty = err;
        Logger.error('useCart/updateItemQty', err);
      } finally {
        loading.value = false;
      }
    }
  };

  const handleCoupon = async (couponCode = null, customQuery = null): Promise<void> => {
    const variables = {
      currentCart: cart.value,
      customQuery,
      couponCode,
    };

    const { updatedCart, errors } = couponCode
      ? await applyCouponCommand.execute(context, variables)
      : await removeCouponCommand.execute(context, variables);

    if (errors) {
      throw errors[0];
    }

    if (updatedCart) {
      cartStore.$patch((state) => {
        state.cart = updatedCart;
      });
    }
  };

  const applyCoupon = async ({ couponCode, customQuery }): Promise<void> => {
    Logger.debug('useCart.applyCoupon');

    try {
      loading.value = true;
      await handleCoupon(couponCode, customQuery);
      error.value.applyCoupon = null;
    } catch (err) {
      error.value.applyCoupon = err;
      Logger.error('useCart/applyCoupon', err);
    } finally {
      loading.value = false;
    }
  };

  const removeCoupon = async ({ customQuery }): Promise<void> => {
    Logger.debug('useCart.removeCoupon');

    try {
      loading.value = true;
      await handleCoupon(null, customQuery);
      error.value.applyCoupon = null;
    } catch (err) {
      error.value.removeCoupon = err;
      Logger.error('useCart/removeCoupon', err);
    } finally {
      loading.value = false;
    }
  };

  const canAddToCart = (product: Product, qty = 1) => {
    // eslint-disable-next-line no-underscore-dangle
    if (product?.__typename === 'ConfigurableProduct') {
      return !!product?.configurable_product_options_selection?.variant
        ?.uid;
    }
    const inStock = product?.stock_status || '';
    const stockLeft = product?.only_x_left_in_stock === null
      ? true
      : qty <= product?.only_x_left_in_stock;
    return inStock && stockLeft;
  };

  return {
    setCart,
    cart,
    loadTotalQty,
    isInCart,
    addItem,
    load,
    removeItem,
    clear,
    updateItemQty,
    applyCoupon,
    removeCoupon,
    canAddToCart,
    loading: readonly(loading),
    error: readonly(error),
  };
}

export default useCart;
export * from './useCart';
