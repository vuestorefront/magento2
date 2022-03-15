import { Ref } from '@nuxtjs/composition-api';
import {
  ComposableFunctionArgs,
  AvailableShippingMethod,
} from '~/composables/types';

export declare type ShippingMethod = AvailableShippingMethod;
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
