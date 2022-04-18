import type { Ref } from '@nuxtjs/composition-api';
import type { ComposableFunctionArgs } from '~/composables/types';
import type { AvailablePaymentMethod, PaymentMethodInput } from '~/modules/GraphQL/types';

export interface UsePaymentProviderErrors {
  load: Error | null;
  save: Error | null;
}

export type UsePaymentProviderSaveParams = ComposableFunctionArgs<{
  paymentMethod: PaymentMethodInput;
}>;

export interface UsePaymentProviderInterface {
  loading: Ref<boolean>;
  error: Ref<UsePaymentProviderErrors>;
  load(): Promise<AvailablePaymentMethod | null>;
  save(params: UsePaymentProviderSaveParams): Promise<AvailablePaymentMethod | null>;
}
