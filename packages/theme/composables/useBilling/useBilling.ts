import type { Ref } from '@nuxtjs/composition-api';
import type { BillingCartAddress } from '~/modules/GraphQL/types';
import { ComposableFunctionArgs } from '~/types/core';

export interface UseBillingError {
  load: Error | null;
  save: Error | null;
}

export type UseBillingLoadParams = ComposableFunctionArgs<{}>;

export interface UseBillingSaveParams {
  billingDetails: any;
}

export interface UseBillingInterface {
  error: Ref<UseBillingError>;
  loading: Ref<boolean>;
  load(params: UseBillingLoadParams): Promise<BillingCartAddress | null>;
  save(params: UseBillingSaveParams): Promise<BillingCartAddress | null>;
}
