import { UseConfig } from '../types';
import { Ref, computed } from '@vue/composition-api';
import { Context, generateContext, sharedRef, Logger } from '@vue-storefront/core';

export interface UseConfigFactoryParams<CONFIG> {
  loadConfig: (context: Context) => Promise<CONFIG>;
}

export function useConfigFactory<CONFIG>(
  factoryParams: UseConfigFactoryParams<CONFIG>
) {
  return function useConfig(cacheId: string): UseConfig<CONFIG> {
    const config: Ref<CONFIG> = sharedRef({}, `useConfig-categories-${cacheId}`);
    const loading: Ref<boolean> = sharedRef(false, `useConfig-loading-${cacheId}`);
    const context = generateContext(factoryParams);

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
      loading: computed(() => loading.value)
    };
  };
}
