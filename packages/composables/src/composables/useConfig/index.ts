/**
 * @deprecated since version 1.0.0
 */
import { Context, Logger } from '@vue-storefront/core';
import { StoreConfig } from '@vue-storefront/magento-api';
import { useConfigFactory, UseConfigFactoryParams } from '../../factories/useConfigFactory';
import { UseConfig } from '../../types/composables';

const factoryParams: UseConfigFactoryParams<StoreConfig> = {
  loadConfig: async (context: Context) => {
    const { data } = await context.$magento.api.storeConfig();

    Logger.debug('[Magento] useConfig:loadConfig data', { data });

    return data.storeConfig || {};
  },
};

const useConfig: (cacheId?: string) => UseConfig<StoreConfig> = useConfigFactory<StoreConfig>(factoryParams);

export default useConfig;
