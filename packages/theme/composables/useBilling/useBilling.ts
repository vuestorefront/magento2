import { Ref } from '@nuxtjs/composition-api';
import { BillingCartAddress } from '~/modules/GraphQL/types';
import { ComposableFunctionArgs } from '~/composables/types';

export interface UseBillingError {
  load: Error | null;
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
