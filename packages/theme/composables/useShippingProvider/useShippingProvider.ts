import type { DeepReadonly, Ref } from '@nuxtjs/composition-api';
import type { SelectedShippingMethod } from '~/modules/GraphQL/types';
import type { ComposableFunctionArgs } from '~/types/core';

export interface UseShippingProviderErrors {
  load: Error | null;
  save: Error | null;
}

export type UseShippingProviderLoadParams = ComposableFunctionArgs<{}>;

export type UseShippingProviderSaveParams = ComposableFunctionArgs<{
  // TODO: Define this type.
  shippingMethod: any;
}>;

export interface UseShippingProviderInterface {
  error: DeepReadonly<Ref<UseShippingProviderErrors>>;
  loading: Readonly<Ref<boolean>>;
  load(params?: UseShippingProviderLoadParams): Promise<SelectedShippingMethod | null>;
  save(params: UseShippingProviderSaveParams): Promise<SelectedShippingMethod | null>;
}
