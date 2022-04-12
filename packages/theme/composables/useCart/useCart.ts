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
  load: (params: ComposableFunctionArgs<{ realCart?: boolean }>) => Promise<void>;
  /**
   * Updates the global application state with the current total quantity of the cart
   *
   * @example
   *
   * Load cart total on the server side using the `onSsr` hook:
   *
   * ```typescript
   * import { useCart } from '@vue-storefront/magento';
   * import { onSsr } from '@vue-storefront/core';
   * export default {
   *   setup () {
   *     const { loadTotalQty, cart } = useCart()
   *
   *     onSsr(async () => {
   *       await loadTotalQty()
   *     })
   *
   *     return {
   *      cart
   *     }
   *   }
   * }
   * ```
   */
  loadTotalQty: (context: Context['app']) => Promise<void>;
  /**
   * Takes in a `product` and its `quantity` and adds it to the cart
   *
   * @example
   *
   * Adding a product to cart and handling possible errors:
   *
   * ```typescript
   * import { useCart } from '~/composables';
   *
   * export default {
   *   setup() {
   *     const { addItem, error } = useCart();
   *
   *     const addItemToCart = async (
   *       product: ProductInterface,
   *       quantity: nubmer
   *     ) => {
   *       await addItem({ product, quantity });
   *
   *       if (error.value.addItem) {
   *         // handle adding item to cart error
   *       }
   *     }
   *
   *     return { addItemToCart };
   *   }
   * }
   * ```
   */
  addItem: (
    params: ComposableFunctionArgs<{
      product: PRODUCT;
      quantity: any;
    }>
  ) => Promise<void>;
  /**
   * Removes an `item` from a `cart`
   *
   * @example
   *
   * Removing an item from cart and handling possible errors:
   *
   * ```typescript
   * import { useCart } from '~/composables';
   *
   * export default {
   *   setup() {
   *     const { removeItem, error } = useCart();
   *
   *     const removeItemFromCart = async (
   *       product: ProductInterface,
   *       quantity: nubmer
   *     ) => {
   *       await removeItem({ product, quantity });
   *
   *       if (error.value.removeItem) {
   *         // handle adding item to cart error
   *       }
   *     }
   *
   *     return { removeItemToCart };
   *   }
   * }
   * ```
   */
  removeItem: (params: ComposableFunctionArgs<{ currentCart: CART; product: CART_ITEM }>) => Promise<void>;
  /** Updates the `quantity` of an `item` in a cart */
  updateItemQty: (params: ComposableFunctionArgs<{ product: CART_ITEM; quantity: number }>) => Promise<void>;
  /** Removes all items from the cart */
  clear: (params: ComposableFunctionArgs<{ realCart?: boolean }>) => Promise<void>;
  /** Applies a coupon to the cart */
  applyCoupon: (params: ComposableFunctionArgs<{ couponCode: string }>) => Promise<void>;
  /** Removes applied coupon from the cart */
  removeCoupon: (params: ComposableFunctionArgs<{}>) => Promise<void>;
  /** Checks wheter a `product` is in the `cart` */
  isInCart: (params: { currentCart: CART; product: PRODUCT }) => boolean;
  /** Sets the contents of the cart */
  setCart: (newCart: CART) => void;
  /** Returns the Items in the Cart as a `computed` property */
  cart: ComputedRef<CART>;
  /** The loading state. It's `true` when loading, saving, updating, or removing customer addresses and `false` otherwise. */
  loading: Ref<boolean>;
  /** The error object */
  error: Ref<UseCartErrors>;
}

/**
 * The {@link useCart} error object. The properties values are the errors thrown by its methods
 *
 * @example
 * Check if adding an item to a cart failed:
 *
 * ```typescript
 * import { useCart } from '~/composables';
 *
 * export default {
 *   setup() {
 *     const { addItem, error } = useCart();
 *
 *     const addItemToCart = async (
 *       product: ProductInterface,
 *       quantity: nubmer
 *     ) => {
 *       await addItem({ product, quantity });
 *
 *       if (error.value.addItem) {
 *         // handle adding item to cart error
 *       }
 *     }
 *
 *     return { addItemToCart };
 *   }
 * }
 * ```
 */
export interface UseCartErrors {
  /** Error when adding item to cart fails, otherwise is `null` */
  addItem: Error | null;

  /** Error when removing item from cart fails, otherwise is `null` */
  removeItem: Error | null;

  /** Error when updating item quantity fails, otherwise is `null` */
  updateItemQty: Error | null;

  /** Error when loading fails, otherwise is `null` */
  load: Error | null;

  /** Error when clearing cart fails, otherwise is `null` */
  clear: Error | null;

  /** Error when applying coupon to cart fails, otherwise is `null` */
  applyCoupon: Error | null;

  /** Error when removing coupon to cart fails, otherwise is `null` */
  removeCoupon: Error | null;

  /** Error when loading total quantity fails, otherwise is `null` */
  loadTotalQty: Error | null;
}

/** Params object used to add items to a cart */
export declare type AddProductsToCartInput = {
  cartId: string;
  cartItems: CartItemInput[];
};
