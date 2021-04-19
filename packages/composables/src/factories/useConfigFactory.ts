import { computed } from '@vue/composition-api';
import {
  Context,
  generateContext,
  sharedRef,
  Logger,
} from '@vue-storefront/core';
import { UseConfig } from '../types';

export interface UseConfigFactoryParams<CONFIG> {
  loadConfig: (context: Context) => Promise<CONFIG>;
}

export function useConfigFactory<CONFIG>(
  factoryParams: UseConfigFactoryParams<CONFIG>,
) {
  return function useConfig(cacheId: string): UseConfig<CONFIG> {
    const context = generateContext(factoryParams);
    const config = sharedRef<CONFIG>({}, `useConfig-categories-${cacheId}`);
    const loading = sharedRef<boolean>(false, `useConfig-loading-${cacheId}`);

    const loadConfig = async () => {
      Logger.debug(`useConfig/${cacheId}/loadConfig`);
      loading.value = true;
      try {
        config.value = await factoryParams.loadConfig(context);
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
