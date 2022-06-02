import { DeepReadonly, Ref } from '@nuxtjs/composition-api';
import { ComposableFunctionArgs } from '~/composables/types';

/**
 * The params object accepted by the `initializeCheckout` method in the {@link useExternalCheckout|useExternalCheckout()} composable
 */
export type UseExternalCheckoutInitializeParams = ComposableFunctionArgs<{ baseUrl: string }>;

/**
 * Data and methods returned from the {@link useExternalCheckout|useExternalCheckout()} composable
 */
export interface UseExternalCheckoutInterface {
  /**
   * Initializes the checkout provider with the `baseUrl`
   */
  initializeCheckout(params: UseExternalCheckoutInitializeParams): string

  /**
   * Indicates whether any of the methods is in progress
   */
  loading: DeepReadonly<Ref<boolean>>,

  /**
   * Contains errors from the composable methods
   */
  error: DeepReadonly<Ref<string>>,
}
