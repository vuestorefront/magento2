import { computed } from '@vue/composition-api';
import {
  Context,
  sharedRef,
  Logger,
  configureFactoryParams, FactoryParams,
} from '@vue-storefront/core';
import { UseConfig } from '../types';

export interface UseConfigFactoryParams<CONFIG> extends FactoryParams{
  loadConfig: (context: Context) => Promise<CONFIG>;
}

export function useConfigFactory<CONFIG>(factoryParams: UseConfigFactoryParams<CONFIG>) {
  return function useConfig(cacheId: string): UseConfig<CONFIG> {
    // @ts-ignore
    const config = sharedRef<CONFIG>({}, `useConfig-categories-${cacheId}`);
    const loading = sharedRef<boolean>(false, `useConfig-loading-${cacheId}`);
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(factoryParams);

    const loadConfig = async () => {
      Logger.debug(`useConfig/${cacheId}/loadConfig`);
      loading.value = true;
      try {
        config.value = await _factoryParams.loadConfig();
      } finally {
        loading.value = false;
      }
    };

    return {
      loadConfig,
      config: computed(() => config.value),
      loading: computed(() => loading.value),
    };
  };
}
