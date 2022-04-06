import { Ref } from '@nuxtjs/composition-api';
import {
  ComposableFunctionArgs,
} from '~/composables/types';

export interface UseGetShippingMethodsErrors {
  load: Error;
}
export interface UseGetShippingMethodsInterface<SHIPPING_METHOD> {
  load: (params: ComposableFunctionArgs<{
    cartId: string;
  }>) => Promise<SHIPPING_METHOD[]>;
  error: Ref<UseGetShippingMethodsErrors>;
  loading: Ref<boolean>;
}
