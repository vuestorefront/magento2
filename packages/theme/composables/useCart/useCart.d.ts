import { ComposableFunctionArgs, Context } from '@vue-storefront/core';
import { ComputedRef, Ref } from '@nuxtjs/composition-api';
import { CartItemInput } from '~/modules/GraphQL/types';

export interface UseCartInterface<CART, CART_ITEM, PRODUCT> {
  load: (params: ComposableFunctionArgs<{ realCart?: boolean; }>) => Promise<void>;
  loadTotalQty: (context: Context) => Promise<void>;
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
