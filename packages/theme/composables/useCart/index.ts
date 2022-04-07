import { computed, ref, useContext } from '@nuxtjs/composition-api';
import { addItemCommand } from '~/composables/useCart/commands/addItemCommand';
import { applyCouponCommand } from '~/composables/useCart/commands/applyCouponCommand';
import { clearCartCommand } from '~/composables/useCart/commands/clearCartCommand';
import { loadCartCommand } from '~/composables/useCart/commands/loadCartCommand';
import { loadTotalQtyCommand } from '~/composables/useCart/commands/loadTotalQtyCommand';
import { removeCouponCommand } from '~/composables/useCart/commands/removeCouponCommand';
import { removeItemCommand } from '~/composables/useCart/commands/removeItemCommand';
import { updateItemQtyCommand } from '~/composables/useCart/commands/updateItemQtyCommand';
import { UseCartErrors, UseCartInterface } from '~/composables/useCart/useCart';
import { Logger } from '~/helpers/logger';
import { Cart, CartItemInterface, ProductInterface } from '~/modules/GraphQL/types';
import { useCustomerStore } from '~/stores/customer';

/**
 * @public
 * The `useCart` composable provides functions and refs to deal with a usesr's cart from Magento API.
 *
 * With it we can:
 *
 *  - Load cart information;
 *
 *  - Add, update and remove items from the cart;
 *
 *  - Apply and remove coupons;
 *
 *  - Check if a given product is already added to the cart.
 *
 * @remarks
 * Under the hood, it calls the following Server Middleware methods:
 *
 * - {@link @vue-storefront/magento-api#addProductsToCart} for adding products to the cart;
 *
 * - {@link @vue-storefront/magento-api#addConfigurableProductsToCart} for adding configurable products to the cart;
 *
 * - {@link @vue-storefront/magento-api#addDownloadableProductsToCart} for adding downloadable products to the cart;
 *
 * - {@link @vue-storefront/magento-api#addVirtualProductsToCart} for adding virtual products to the cart;
 *
 * - {@link @vue-storefront/magento-api#applyCouponToCart} for applying a coupon to the cart;
 *
 * - {@link @vue-storefront/magento-api#removeCouponFromCart} for removing a coupon from the cart;
 *
 * - {@link @vue-storefront/magento-api#cart} for fetching the cart information;
 *
 * - {@link @vue-storefront/magento-api#customerCart} for fetching cart information for the current logged in  user;
 *
 * - {@link @vue-storefront/magento-api#removeItemFromCart} for removing an item from the cart;
 *
 * - {@link @vue-storefront/magento-api#updateCartItems} for updating cart items;
 *
 *
 * It is currently used in:
 *
 * - `packages/theme/components/AppHeader.vue`
 *
 * - `packages/theme/components/CartSidebar.vue`
 *
 * - `packages/theme/components/CouponCode.vue`
 *
 * - `packages/theme/components/LoginModal.vue`
 *
 * - `packages/theme/components/Checkout/CartPreview.vue`
 *
 * - `packages/theme/components/Checkout/VsfShippingProvider.vue`
 *
 * - `packages/theme/components/Products/BundleProductSelector.vue`
 *
 * - `packages/theme/components/Products/GroupedProductSelector.vue`
 *
 * - `packages/theme/pages/Checkout.vue`
 *
 * - `packages/theme/pages/MyAccount.vue`
 *
 * - `packages/theme/pages/Product.vue`
 *
 * - `packages/theme/pages/Checkout/Payment.vue`
 *
 * - `packages/theme/pages/Checkout/UserAccount.vue`
 *
 * - `packages/theme/pages/MyAccount/MyWishlist.vue`
 *
 *
 * @example
 * Initialization in component:
 *
 * ```typescript
 * import { useCart } from '@vue-storefront/magento';
 *
 * export default {
 *   setup () {
 *     const { cart, removeItem, updateItemQty, load } = useCart();
 *   }
 * }
 * ```
 *
 * @returns {@link UseCartInterface}
 */
function useCart<CART extends Cart, CART_ITEM extends CartItemInterface, PRODUCT extends ProductInterface>(): UseCartInterface<
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
  const customerStore = useCustomerStore();
  const cart = computed<CART>(() => customerStore.cart);
  const apiState = context.$magento.config.state;

  /**
   * Assign new cart object
   * @param newCart
   *
   * @return void
   */
  const setCart = (newCart: CART): void => {
    Logger.debug('useCart.setCart', newCart);

    customerStore.$patch((state) => {
      state.cart = newCart;
    });
  };

  /**
   * Check if product is in the cart
   * @param product
   *
   * @return boolean
   */
  // TODO rework parameter {product} => product, wrapping obj is not necessary
  const isInCart = ({ product }: { product: PRODUCT }): boolean => !!cart.value?.items?.find((cartItem) => cartItem?.product?.uid === product.uid);

  const load = async ({ customQuery = {}, realCart = false } = { customQuery: { cart: 'cart' } }): Promise<void> => {
    Logger.debug('useCart.load');

    try {
      loading.value = true;
      const loadedCart = await loadCartCommand.execute(context, { customQuery, realCart });
      customerStore.$patch((state) => {
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
      clearCartCommand.execute(context);
      const loadedCart = await loadCartCommand.execute(context, { customQuery });

      customerStore.$patch((state) => {
        state.cart = loadedCart;
      });
    } catch (err) {
      error.value.clear = err;
      Logger.error('useCart/clear', err);
    } finally {
      loading.value = false;
    }
  };

  const loadTotalQty = async (): Promise<void> => {
    Logger.debug('useCart.loadTotalQty');

    try {
      loading.value = true;
      const totalQuantity = await loadTotalQtyCommand.execute(context);

      customerStore.$patch((state) => {
        state.cart.total_quantity = totalQuantity;
      });
    } catch (err) {
      error.value.loadTotalQty = err;
      Logger.error('useCart/loadTotalQty', err);
    } finally {
      loading.value = false;
    }
  };

  const addItem = async ({ product, quantity }): Promise<void> => {
    Logger.debug('useCart.addItem', { product, quantity });

    try {
      loading.value = true;

      if (!apiState.getCartId()) {
        // TODO if cart is not loaded throw error instead to decouple this method
        await load({ realCart: true });
      }
      const updatedCart = await addItemCommand.execute(context, {
        currentCart: cart.value,
        product,
        quantity,
      });
      error.value.addItem = null;
      customerStore.$patch((state) => {
        state.cart = updatedCart;
      });
    } catch (err) {
      error.value.addItem = err;
      Logger.error('useCart/addItem', err);
    } finally {
      loading.value = false;
    }
  };

  const removeItem = async ({ product }) => {
    Logger.debug('useCart.removeItem', { product });

    try {
      loading.value = true;
      const updatedCart = await removeItemCommand.execute(context, {
        currentCart: cart.value,
        product,
      });

      error.value.removeItem = null;
      customerStore.$patch((state) => {
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
        customerStore.$patch((state) => {
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

  const applyCoupon = async ({ couponCode, customQuery }): Promise<void> => {
    Logger.debug('useCart.applyCoupon');

    try {
      loading.value = true;
      const { updatedCart } = await applyCouponCommand.execute(context, {
        currentCart: cart.value,
        couponCode,
        customQuery,
      });

      error.value.applyCoupon = null;
      customerStore.$patch((state) => {
        state.cart = updatedCart;
      });
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
      const { updatedCart } = await removeCouponCommand.execute(context, {
        currentCart: cart.value,
        customQuery,
      });

      error.value.removeCoupon = null;
      customerStore.$patch((state) => {
        state.cart = updatedCart;
      });
      loading.value = false;
    } catch (err) {
      error.value.removeCoupon = err;
      Logger.error('useCart/removeCoupon', err);
    } finally {
      loading.value = false;
    }
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
    loading,
    error,
  };
}

export default useCart;
