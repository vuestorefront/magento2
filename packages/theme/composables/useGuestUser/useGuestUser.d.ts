import { ComputedRef, Ref } from '@nuxtjs/composition-api';
import { PlatformApi, Composable, ComposableFunctionArgs } from '~/composables/types';
import { Cart } from '~/modules/GraphQL/types';

export interface UseGuestUserErrors {
  attachToCart: Error;
}

export interface AttachToCartParams {
  email: string;
  cart: ComputedRef<Cart>,
  [x: string]: any;
}

export interface UseGuestUser<REGISTER_GUEST_USER_PARAMS extends AttachToCartParams, API extends PlatformApi = any> extends Composable<API> {
  attachToCart: (params: ComposableFunctionArgs<REGISTER_GUEST_USER_PARAMS>) => Promise<void>;
  loading: Ref<boolean>;
  error: Ref<UseGuestUserErrors>;
}
