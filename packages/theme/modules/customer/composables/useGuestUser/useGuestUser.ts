import { ComputedRef, DeepReadonly, Ref } from '@nuxtjs/composition-api';
import { ComposableFunctionArgs } from '~/composables/types';
import { Cart } from '~/modules/GraphQL/types';

/** Errors returned by the {@link useGuestUser} composable */
export interface UseGuestUserErrors {
  attachToCart: Error;
}

/** Params used by {@link useGuestUser} composable's `attachToCart` method */
export interface AttachToCartParams {
  email: string;
  cart: ComputedRef<Cart>,
  [x: string]: any;
}

/**
 * Data and methods returned from the {@link useGuestUser}  composable
 */
export interface UseGuestUserInterface<REGISTER_GUEST_USER_PARAMS extends AttachToCartParams> {
  /** Attaches guest cart to user */
  attachToCart(params: ComposableFunctionArgs<REGISTER_GUEST_USER_PARAMS>): Promise<void>;
  /** Indicates the loading state for `attachToCart` */
  loading: DeepReadonly<Ref<boolean>>;
  /** Possible errors when calling `attachToCart` */
  error: DeepReadonly<Ref<UseGuestUserErrors>>;
}
