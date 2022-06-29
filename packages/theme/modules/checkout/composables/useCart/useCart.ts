import { ComputedRef, Ref } from '@nuxtjs/composition-api';
import { ComposableFunctionArgs } from '~/composables/types';
import { Product } from '~/modules/catalog/product/types';

/**
 * Parameters accepted by the `addItem` method in the {@link useCart} composable
 */
export type UseCartAddItemParams<PRODUCT> = ComposableFunctionArgs<{
  product: PRODUCT;
  quantity: number;
  productConfiguration?: { [key: string]: string };
}>;

/**
 * Parameters accepted by the `removeItem` method in the {@link useCart} composable
 */
type UseCartRemoveItemParams<CART_ITEM> = ComposableFunctionArgs<{
  product: CART_ITEM
}>;

/**
 * Parameters accepted by the `updateItemQty` method in the {@link useCart} composable
 */
type UseCartUpdateItemQtyParams<CART_ITEM> = ComposableFunctionArgs<{
  product: CART_ITEM
  quantity: number
}>;

/**
 * Parameters accepted by the `clear` method in the {@link useCart} composable
 */
type UseCartClearParams = ComposableFunctionArgs<{
  realCart?: boolean
}>;

/**
 * Parameters accepted by the `applyCoupon` method in the {@link useCart} composable
 */
type UseCartApplyCouponParams = ComposableFunctionArgs<{
  couponCode: string
}>;

/**
 * Data and methods returned from the {@link useCart} composable
 */
export interface UseCartInterface<CART, CART_ITEM, PRODUCT> {
  /** Loads the current cart */
  load(params?: ComposableFunctionArgs<{ realCart?: boolean }>): Promise<void>;
  /** Updates the global application state with the current total quantity of the cart */
  loadTotalQty(): Promise<void>;
  /** Takes in a `product` and its `quantity` and adds it to the cart */
  addItem(
    params: UseCartAddItemParams<PRODUCT>
  ): Promise<void>;
  /** Removes an `item` from a `cart` */
  removeItem(params: UseCartRemoveItemParams< CART_ITEM>): Promise<void>;
  /** Updates the `quantity` of an `item` in a cart */
  updateItemQty(params: UseCartUpdateItemQtyParams<CART_ITEM>): Promise<void>;
  /** Removes all items from the cart */
  clear(params: UseCartClearParams): Promise<void>;
  /** Applies a coupon to the cart */
  applyCoupon(params: UseCartApplyCouponParams): Promise<void>;
  /** Removes applied coupon from the cart */
  removeCoupon(params: ComposableFunctionArgs<{}>): Promise<void>;
  /** Checks whether a `product` is in the `cart` */
  isInCart(PRODUCT): boolean;
  /** Sets the contents of the cart */
  setCart(newCart: CART): void;
  /** Returns the Items in the Cart as a `computed` property */
  cart: ComputedRef<CART>;
  /** Checks wheter a `product` can be added to the `cart` */
  canAddToCart(product: Product, qty: number);
  /**
   * The loading state.
   *
   * This is `true` when loading, saving, updating, or removing customer addresses and `false` otherwise.
   */
  loading: Readonly<Ref<boolean>>;
  /** The error object */
  error: Readonly<Ref<UseCartErrors>>;
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
