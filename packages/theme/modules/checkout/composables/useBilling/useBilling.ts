import type { Ref } from '@nuxtjs/composition-api';
import type { BillingCartAddress } from '~/modules/GraphQL/types';
import { ComposableFunctionArgs } from '~/composables/types';

/**
 * The object used by the {@link useBilling|useBilling()} composable to save new billing information
 */
export interface BillingDetails {
  apartment?: string;
  city?: string;
  country_code?: string;
  customerAddressId: string;
  extra?: string;
  firstname?: string;
  lastname?: string;
  neighborhood?: string;
  postcode?: string;
  region?: string;
  sameAsShipping: boolean;
  street?: string;
  telephone?: string;
}

/**
 * Errors that occured in the {@link useBilling|useBilling()} composable
 */
export interface UseBillingError {
  /**
   * Contains error if `load` method failed, otherwise is `null`
   */
  load: Error | null;

  /**
   * Contains error if `save` method failed, otherwise is `null`
   */
  save: Error | null;
}

/**
 * The params object accepted by the `load` method in the {@link useBilling|useBilling()} composable
 */
export type UseBillingLoadParams = ComposableFunctionArgs<{}>;

/**
 * The params object accepted by the `save` method in the {@link useBilling|useBilling()} composable
 */
export type UseBillingSaveParams = ComposableFunctionArgs<{
  billingDetails: BillingDetails;
}>;

/**
 * Data and methods returned from the {@link useBilling|useBilling()} composable
 */
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

  /**
   * Contains errors from the composable methods
   */
  error: Readonly<Ref<UseBillingError>>;

  /**
   * Indicates whether any of the methods is in progress
   */
  loading: Readonly<Ref<boolean>>;
}
