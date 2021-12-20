import { Context } from '@vue-storefront/core';
import { StoreConfig } from '@vue-storefront/magento-api';
import { useConfigFactory, UseConfigFactoryParams } from '../../factories/useConfigFactory';
import { UseConfig } from '../../types/composables';

const factoryParams: UseConfigFactoryParams<StoreConfig> = {
  loadConfig: async (context: Context, params) => {
    const { data } = await context.$magento.api.storeConfig(params?.customQuery || {});

    return data.storeConfig || {};
  },
};

const useConfig: (cacheId?: string) => UseConfig<StoreConfig> = useConfigFactory<StoreConfig>(factoryParams);

export default useConfig;
