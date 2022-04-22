import { DeepReadonly, Ref } from '@nuxtjs/composition-api';
import { ShippingCartAddress } from '~/modules/GraphQL/types';
import { ComposableFunctionArgs } from '~/composables/types';

export interface UseShippingErrors {
  load: Error | null;
  save: Error | null;
}

export type UseShippingLoadParams = ComposableFunctionArgs<{}>;

export type UseShippingSaveParams = ComposableFunctionArgs<{
  params: any;
  shippingDetails: any;
}>;

export interface UseShippingInterface {
  error: DeepReadonly<Ref<UseShippingErrors>>;
  loading: Readonly<Ref<boolean>>;
  load(params: UseShippingLoadParams): Promise<ShippingCartAddress | {}>;
  save(params: UseShippingSaveParams): Promise<ShippingCartAddress | {}>;
}
