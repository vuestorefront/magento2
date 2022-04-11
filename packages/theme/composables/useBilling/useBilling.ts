import { Ref } from '@nuxtjs/composition-api';
import { BillingCartAddress } from '~/modules/GraphQL/types';
import { ComposableFunctionArgs } from '~/composables/types';

/**
 * The {@link useBilling} error object. The properties values' are the errors
 * thrown by its methods.
 *
 * @example
 *
 * Check if saving a new billing address was failed:
 *
 * ```typescript
 * import { useBilling, UseBillingSaveParams } from '~/composables';
 *
 * export default {
 *   setup() {
 *     const { error, save } = useBilling();
 *
 *     const onSave = async (params: UseBillingSaveParams) => {
 *       const newBilling = await save(params);
 *
 *       if (error.value.save) {
 *         // Handle save error
 *       }
 *     };
 *
 *     return { onSave };
 *   },
 * };
 * ```
 */
export interface UseBillingError {
  /** Error when loading billing address fails, otherwise is `null`. */
  load: Error | null;

  /** Error when saving new billing address fails, otherwise is `null`. */
  save: Error | null;
}

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

export type UseBillingLoadParams = ComposableFunctionArgs<{}>;

export interface UseBillingSaveParams {
  billingDetails: BillingDetails;
}

export interface UseBillingInterface {
  loading: Ref<boolean>;
  error: Ref<UseBillingError>;
  load: (params?: UseBillingLoadParams) => Promise<BillingCartAddress | null>;
  save: (params: UseBillingSaveParams) => Promise<BillingCartAddress | null>;
}
