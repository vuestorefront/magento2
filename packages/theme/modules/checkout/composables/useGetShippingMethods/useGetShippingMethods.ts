import { Ref } from '@nuxtjs/composition-api';
import {
  ComposableFunctionArgs,
} from '~/composables/types';

/** Errors returned by the {@link useGetShippingMethods} composable */
export interface UseGetShippingMethodsErrors {
  load: Error;
}

/**
 * Data and methods returned from the {@link useGetShippingMethods} composable
 */
export interface UseGetShippingMethodsInterface<SHIPPING_METHOD> {
  /** Loads the shipping methods for a cart */
  load (params: ComposableFunctionArgs<{ cartId: string }>): Promise<SHIPPING_METHOD[]>;
  /** Possible errors when loading shipping methods */
  error: Readonly<Ref<UseGetShippingMethodsErrors>>;
  /** Indicates whether the shipping methods are already being loaded */
  loading: Readonly<Ref<boolean>>;
}
