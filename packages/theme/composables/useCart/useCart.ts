import { Context } from '@nuxt/types';
import { ComputedRef, Ref } from '@nuxtjs/composition-api';
import { ComposableFunctionArgs } from '~/composables/types';
import { CartItemInput } from '~/modules/GraphQL/types';

/**
 * Represents data and methods returned from the {@link useCart} composable
 */
export interface UseCartInterface<CART, CART_ITEM, PRODUCT> {
  /** Loads the current cart */
  load: (params: ComposableFunctionArgs<{ realCart?: boolean }>) => Promise<void>;
  /** Updates the global application state with the current total quantity of the cart */
  loadTotalQty: (context: Context['app']) => Promise<void>;
  /** Takes in a `product` and its `quantity` and adds it to the cart */
  addItem: (
    params: ComposableFunctionArgs<{
      product: PRODUCT;
      quantity: any;
    }>
  ) => Promise<void>;
  /** Removes an `item` from a `cart` */
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
  /**
   * The loading state.
   *
   * This is `true` when loading, saving, updating, or removing customer addresses and `false` otherwise.
   */
  loading: Ref<boolean>;
  /** The error object */
  error: Ref<UseCartErrors>;
}

/** The {@link useCart} error object. The properties values are the errors thrown by its methods */
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
