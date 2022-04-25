import { DeepReadonly, Ref } from '@nuxtjs/composition-api';
import {
  Maybe,
  SelectedShippingMethod,
} from '~/modules/GraphQL/types';
import type { ComposableFunctionArgs } from '~/types/core';

export interface UseShippingProviderErrors {
  load: Error;
  save: Error;
}

export declare type ComputedProperty<T> = Readonly<Ref<Readonly<T>>>;
export declare type CustomQuery = Record<string, string>;

export type UseShippingProviderSaveParams = ComposableFunctionArgs<{
  // TODO: Define this type.
  shippingMethod: any;
}>;

export interface UseShippingProviderInterface {
  error: DeepReadonly<Ref<UseShippingProviderErrors>>;
  loading: Readonly<Ref<boolean>>;
  load(): Promise<Maybe<SelectedShippingMethod>>;
  save(params: UseShippingProviderSaveParams): Promise<Maybe<SelectedShippingMethod>>;
}
