import {
  useConfig,
  useStore,
  effectScope,
  extendScopeContext,
} from '@vue-storefront/magento';

export default async ({ app }) => {

  if (app.$cookies.get('vsf-store-view-code')) {
    return;
  }

  const scope = effectScope();
  extendScopeContext(scope, app);

  await scope.run(async () => {
    const { config, loadConfig } = useConfig();
    const { stores, load: loadStores } = useStore();

    await loadConfig();
    await loadStores();

    return;
  });

  scope.stop();
};
