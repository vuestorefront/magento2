import { Ref } from '@nuxtjs/composition-api';
import { ComposableFunctionArgs } from '~/types/core';
import { CustomerAddress } from '~/modules/GraphQL/types';

export type UseAddressesErrors = {
  load: Error;
  save: Error;
  remove: Error;
  update: Error;
};

export type UseAddressesParamsInput = {
  address: CustomerAddress
};

export interface UseAddressesInterface {
  error: Ref<UseAddressesErrors>,
  loading: Ref<boolean>,
  load: () => Promise<Array<CustomerAddress>>,
  save: (saveParams: ComposableFunctionArgs<UseAddressesParamsInput>) => Promise<CustomerAddress>,
  update: (updateParams?: ComposableFunctionArgs<UseAddressesParamsInput>) => Promise<CustomerAddress>,
  remove: (removeParams?: ComposableFunctionArgs<UseAddressesParamsInput>) => Promise<boolean>,
}
