import { PiniaPluginContext } from 'pinia';
import { Plugin } from '@nuxt/types';
import { ref, set } from '@nuxtjs/composition-api';
import StoreConfigGql from '~/plugins/query/StoreConfig.gql';
import type { StoreConfig } from '~/modules/GraphQL/types';

const storeConfigPlugin: Plugin = async ({ $pinia, app }) => {
  const { data }: { data: { storeConfig?: StoreConfig } } = await app.$vsf.$magento.api.customQuery({ query: StoreConfigGql });

  $pinia.use(({ store }: PiniaPluginContext) => {
    if (store.$id !== 'magentoConfig') return;
    const storeConfig = ref(data?.storeConfig ?? {});

    // eslint-disable-next-line no-prototype-builtins
    if (!store.$state.hasOwnProperty('storeConfig')) {
      set(store.$state, 'storeConfig', storeConfig);
    } else {
      // eslint-disable-next-line no-param-reassign
      store.$state.storeConfig = storeConfig;
    }
  });
};

export default storeConfigPlugin;
