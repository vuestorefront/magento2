import { PiniaPluginContext } from 'pinia';
import { Plugin } from '@nuxt/types';
import { ref, set } from '@nuxtjs/composition-api';
import StoreConfigGql from '~/plugins/query/StoreConfig.gql';

const storeConfigPlugin: Plugin = async ({ $pinia, $graphql }) => {
  const configData = await $graphql.query.request(StoreConfigGql);
  $pinia.use(({ store }: PiniaPluginContext) => {
    if (store.$id !== 'magentoConfig') return;
    const storeConfig = ref(configData.storeConfig);

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
