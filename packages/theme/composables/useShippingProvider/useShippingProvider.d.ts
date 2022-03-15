import { Ref } from '@nuxtjs/composition-api';
import {
  SelectedShippingMethod,
} from '~/composables/types';

export interface UseShippingProviderErrors {
  load: Error;
  save: Error;
}

export declare type ComputedProperty<T> = Readonly<Ref<Readonly<T>>>;
export declare type CustomQuery = Record<string, string>;

export interface UseShippingProviderInterface {
  error: ComputedProperty<UseShippingProviderErrors>;
  loading: ComputedProperty<boolean>;
  load(): Promise<SelectedShippingMethod | {}>;
  save(params: {
    shippingMethod: any;
    customQuery?: CustomQuery;
  }): Promise<SelectedShippingMethod | {}>;
}
