import type { DeepReadonly, Ref } from '@nuxtjs/composition-api';
import type { ComposableFunctionArgs } from '~/composables/types';
import type { AvailablePaymentMethod, PaymentMethodInput } from '~/modules/GraphQL/types';

/**
 * The {@link usePaymentProvider} error object. The properties values' are the
 * errors thrown by its methods.
 */
export interface UsePaymentProviderErrors {
  /** Error when loading payment methods fails, otherwise is `null`. */
  load: Error | null;

  /** Error when saving payment method fails, otherwise is `null`. */
  save: Error | null;
}

/** The params received by {@link usePaymentProvider}'s `save` method. */
export type UsePaymentProviderSaveParams = ComposableFunctionArgs<{
  paymentMethod: PaymentMethodInput;
}>;

/** The interface provided by {@link usePaymentProvider} composable. */
export interface UsePaymentProviderInterface {
  /** Indicates whether any of the composable methods is in progress. */
  loading: Readonly<Ref<boolean>>;

  /**
   * Contains errors from any of the composable methods.
   *
   * @see {@link UsePaymentProviderErrors} documentation for more details.
   */
  error: DeepReadonly<Ref<UsePaymentProviderErrors>>;

  /** Loads the available payment methods for current cart. */
  load(): Promise<AvailablePaymentMethod[] | null>;

  /**
   * Saves the payment method for current cart. It returns the updated available
   * payment methods for current cart, so you can update the UI.
   */
  save(params: UsePaymentProviderSaveParams): Promise<AvailablePaymentMethod[] | null>;
}
