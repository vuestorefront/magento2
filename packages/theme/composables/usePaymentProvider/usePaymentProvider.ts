import type { DeepReadonly, Ref } from '@nuxtjs/composition-api';
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
  loading: Readonly<Ref<boolean>>;
  error: DeepReadonly<Ref<UsePaymentProviderErrors>>;
  load(): Promise<AvailablePaymentMethod[] | null>;
  save(params: UsePaymentProviderSaveParams): Promise<AvailablePaymentMethod[] | null>;
}
