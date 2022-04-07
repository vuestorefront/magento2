import { Context } from '@nuxt/types';
import { ComputedRef, Ref } from '@nuxtjs/composition-api';
import { ComposableFunctionArgs } from '~/composables/types';
import { CartItemInput } from '~/modules/GraphQL/types';

/**
 * `UseCartInterface` is used by userCart composable, and it's responsible for manipulating cart data in Magento.
 */
export interface UseCartInterface<CART, CART_ITEM, PRODUCT> {
  /**
   * Loads the current cart
   *
   * Returns a `Promise` that resolves when cart information is fetched
   *
   * @example
   * Load cart information on the server side using the `onSsr` hook:
   *
   * ```typescript
   * import { useCart } from '@vue-storefront/magento';
   * import { onSsr } from '@vue-storefront/core';
   * export default {
   *   setup () {
   *     const { load, cart } = useCart()
   *
   *     onSsr(async () => {
   *       await load()
   *     })
   *
   *     return {
   *      cart
   *     }
   *   }
   * }
   * ```
   */
  load: (params: ComposableFunctionArgs<{ realCart?: boolean; }>) => Promise<void>;
  loadTotalQty: (context: Context['app']) => Promise<void>;
  addItem: (
    params: ComposableFunctionArgs<{
      product: PRODUCT;
      quantity: any;
    }>
  ) => Promise<void>;
  removeItem: (params: ComposableFunctionArgs<{ currentCart: CART; product: CART_ITEM; }>) => Promise<void>;
  updateItemQty: (
    params: ComposableFunctionArgs<{ product: CART_ITEM; quantity: number; }>
  ) => Promise<void>;
  clear: (params: ComposableFunctionArgs<{ realCart?: boolean; }>) => Promise<void>;
  applyCoupon: (params: ComposableFunctionArgs<{ couponCode: string; }>) => Promise<void>;
  removeCoupon: (params: ComposableFunctionArgs<{}>) => Promise<void>;
  isInCart: (params: { currentCart: CART; product: PRODUCT }) => boolean;
  setCart: (newCart: CART) => void;
  cart: ComputedRef<CART>;
  loading: Ref<boolean>;
  error: Ref<UseCartErrors>;
}

export interface UseCartErrors {
  addItem: Error;
  removeItem: Error;
  updateItemQty: Error;
  load: Error;
  clear: Error;
  applyCoupon: Error;
  removeCoupon: Error;
  loadTotalQty: Error;
}

export declare type AddProductsToCartInput = {
  cartId: string;
  cartItems: CartItemInput[];
};
