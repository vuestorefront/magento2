/**
 * @deprecated since version <version?>
 *
 * @see <add docs link>
 */
import { computed } from '@vue/composition-api';
import {
  Context,
  sharedRef,
  Logger,
  configureFactoryParams, FactoryParams, ComposableFunctionArgs,
} from '@vue-storefront/core';
import { PlatformApi } from '@vue-storefront/core/lib/src/types';
import { UseConfig } from '../types/composables';

export interface UseConfigFactoryParams<CONFIG, API extends PlatformApi = any> extends FactoryParams<API>{
  loadConfig: (context: Context, params?: ComposableFunctionArgs<{}>) => Promise<CONFIG>;
}

export function useConfigFactory<CONFIG, API extends PlatformApi = any>(factoryParams: UseConfigFactoryParams<CONFIG, API>) {
  return function useConfig(cacheId: string = ''): UseConfig<CONFIG, API> {
    const ssrKey = cacheId || 'useConfigFactory';
    // @ts-ignore
    const config = sharedRef<CONFIG>({}, `${ssrKey}-config`);
    const loading = sharedRef<boolean>(false, `${ssrKey}-loading`);
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(factoryParams);

    const loadConfig = async (params?: ComposableFunctionArgs<{}>) => {
      Logger.debug(`useConfig/${ssrKey}/loadConfig`);
      loading.value = true;
      try {
        config.value = await _factoryParams.loadConfig(params);
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
