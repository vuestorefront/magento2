import type { DeepReadonly, Ref } from '@nuxtjs/composition-api';
import type { BillingCartAddress } from '~/modules/GraphQL/types';
import { ComposableFunctionArgs } from '~/composables/types';
import type { BillingDetails } from './BillingDetails';

/**
 * The {@link useBilling} error object. The properties values' are the errors
 * thrown by its methods.
 */
export interface UseBillingError {
  /** Error when loading the billing information fails, otherwise is `null`. */
  load: Error | null;

  /** Error when saving the billing information fails, otherwise is `null`. */
  save: Error | null;
}

/** The params received by {@link useBilling}'s `load` method. */
export type UseBillingLoadParams = ComposableFunctionArgs<{}>;

/** The params received by {@link useBilling}'s `save` method. */
export interface UseBillingSaveParams {
  billingDetails: BillingDetails;
}

/** The interface provided by {@link useBilling} composable. */
export interface UseBillingInterface {
  /**
   * Loads the billing information. It returns a `Promise` that resolves into
   * the billing information, or `null` when fails or is empty.
   */
  load(params?: UseBillingLoadParams): Promise<BillingCartAddress | null>;

  /**
   * Saves the billing information. It, also, returns a `Promise` that resolves
   * into the saved billing information, or `null` when fails.
   */
  save(params: UseBillingSaveParams): Promise<BillingCartAddress | null>;

  /** Contains errors from any of the composable methods. */
  error: DeepReadonly<Ref<UseBillingError>>;

  /** Indicates whether any of the methods is in progress. */
  loading: Readonly<Ref<boolean>>;
}
