import { DeepReadonly, Ref } from '@nuxtjs/composition-api';
import { ComposableFunctionArgs } from '~/composables/types';

export type UseExternalCheckoutInitializeParams = ComposableFunctionArgs<{ baseUrl: string }>;

/** Represents the data and methods returned by the {@link useExternalCheckout} composable */
export interface UseExternalCheckoutInterface {
  /** Initializes the checkout provider with the `baseUrl` */
  initializeCheckout(params: UseExternalCheckoutInitializeParams): string
  /** Returns the loading state as a computed boolean */
  loading: DeepReadonly<Ref<boolean>>,
  /** Returns errors when intializing the checkout */
  error: DeepReadonly<Ref<string>>,
}
