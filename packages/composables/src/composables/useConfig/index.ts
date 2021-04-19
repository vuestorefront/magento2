import { Context } from '@vue-storefront/core';
import { Config, UseConfig } from '../../types';
import { useConfigFactory } from '../../factories/useConfigFactory';

const useConfig: (cacheId: string) => UseConfig<Config> = useConfigFactory<Config>({
  loadConfig: async (context: Context) => {
    const result = await context.$ma.api.storeConfig();

    return result.data.storeConfig || {};
  },
});

export default useConfig;
