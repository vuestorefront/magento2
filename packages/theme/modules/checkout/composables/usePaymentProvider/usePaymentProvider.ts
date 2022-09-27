import type { Ref } from '@nuxtjs/composition-api';
import type { ComposableFunctionArgs } from '~/composables/types';
import type { AvailablePaymentMethod, PaymentMethodInput } from '~/modules/GraphQL/types';
import { CustomQuery, CustomHeaders } from '~/types/core';

export type PaymentMethodParams = ComposableFunctionArgs<{
  cart_id: string;
  payment_method: PaymentMethodInput;
}>;

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

/**
 * Data and methods returned from the {@link usePaymentProvider} composable.
 */
export interface UsePaymentProviderInterface {
  /** Indicates whether any of the composable methods is in progress. */
  loading: Readonly<Ref<boolean>>;

  /**
   * Contains errors from any of the composable methods.
   *
   * @see {@link UsePaymentProviderErrors} documentation for more details.
   */
  error: Readonly<Ref<UsePaymentProviderErrors>>;

  /** Loads the available payment methods for current cart. */
  load(customQuery?: CustomQuery, customHeaders?: CustomHeaders): Promise<AvailablePaymentMethod[] | null>;

  /**
   * Saves the payment method for current cart. It returns the updated available
   * payment methods for current cart, so you can update the UI.
   */
  save(params: UsePaymentProviderSaveParams): Promise<AvailablePaymentMethod[] | null>;
}
