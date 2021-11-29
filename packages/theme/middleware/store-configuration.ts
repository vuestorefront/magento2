import {
  useConfig,
  useStore,
  extendScopeContext,
} from '@vue-storefront/magento';
import { effectScope, onGlobalSetup } from '@nuxtjs/composition-api';
import { Middleware } from '@nuxt/types';

const storeConfigurationMiddleware: Middleware = async ({ app }) => {
  if (app.$cookies.get('vsf-store-view-code')) {
    return;
  }

  onGlobalSetup(async () => {
    const scope = effectScope();
    extendScopeContext(scope, app);

    await scope.run(async () => {
      const {
        config,
        loadConfig,
      } = useConfig();

      const {
        stores,
        load: loadStores,
      } = useStore();

      await Promise.allSettled([loadConfig, loadStores]);

      console.log({
        config: config.value,
        stores: stores.value,
      });
    });

    scope.stop();
  });
};

export default storeConfigurationMiddleware;
