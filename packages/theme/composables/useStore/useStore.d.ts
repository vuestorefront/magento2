import { UseStoreInterface as UseStoreInterfaceCore, UseStore as UseStoreCore } from '@vue-storefront/core';
import { UseStoreFactoryChangeParamArguments } from '@vue-storefront/core/lib/src/types';

export interface UseStoreInterface<STORES> extends Omit<UseStoreInterfaceCore<STORES>, 'change'> {
  change(params: UseStoreFactoryChangeParamArguments): void;
}

export interface UseStore<STORES> {
  (): UseStoreInterface<STORES>;
}

export { UseStoreErrors } from '@vue-storefront/core';
