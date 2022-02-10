import { ComposableFunctionArgs, Context, UseCartErrors } from '@vue-storefront/core';
import { ComputedRef, Ref } from '@nuxtjs/composition-api';

export interface UseCartInterface<CART, CART_ITEM, PRODUCT> {
  load: (params: ComposableFunctionArgs<{ realCart?: boolean; }>) => Promise<void>;
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
  isInCart: (context: Context, params: { currentCart: CART; product: PRODUCT }) => boolean;
  setCart: (newCart: CART) => void;
  cart: ComputedRef<CART>;
  loading: Ref<boolean>;
  error: Ref<UseCartErrors>;
}
