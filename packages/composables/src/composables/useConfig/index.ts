import { Context } from '@vue-storefront/core';
import { StoreConfig } from '@vue-storefront/magento-api';
import { useConfigFactory, UseConfigFactoryParams } from '../../factories/useConfigFactory';

const factoryParams: UseConfigFactoryParams<StoreConfig> = {
  loadConfig: async (context: Context) => {
    const { data } = await context.$magento.api.storeConfig();

    return data.storeConfig || {};
  },
};

export default useConfigFactory<StoreConfig>(factoryParams);
