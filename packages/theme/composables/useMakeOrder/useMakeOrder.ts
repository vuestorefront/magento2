import type { DeepReadonly, Ref } from '@nuxtjs/composition-api';
import type { PlaceOrderOutput } from '~/modules/GraphQL/types';

export interface UseMakeOrderErrors {
  make: Error;
}

export interface UseMakeOrderInterface {
  make(): Promise<PlaceOrderOutput | null>;
  error: DeepReadonly<Ref<UseMakeOrderErrors>>;
  loading: Readonly<Ref<boolean>>;
}
