import { computed } from '@vue/composition-api';
import {
  ComposableFunctionArgs,
  configureFactoryParams,
  Context,
  FactoryParams,
  Logger,
  PlatformApi,
  sharedRef,
} from '@absolute-web/vsf-core';
import { UseDeliveryTime, UseDeliveryTimeErrors } from '../types/composables';

export interface UseDeliveryTimeFactoryParams<DELIVERY_TIME, DELIVERY_TIME_SEARCH_PARAMS, API extends PlatformApi = any> extends FactoryParams<API> {
  search: (context: Context, params: ComposableFunctionArgs<DELIVERY_TIME_SEARCH_PARAMS>) => Promise<DELIVERY_TIME[]>;
}

export function useDeliveryTimeFactory<DELIVERY_TIME, DELIVERY_TIME_SEARCH_PARAMS, API extends PlatformApi = any>(
  factoryParams: UseDeliveryTimeFactoryParams<DELIVERY_TIME, DELIVERY_TIME_SEARCH_PARAMS>,
) {
  return function useDeliveryTime(id: string = ''): UseDeliveryTime<DELIVERY_TIME, DELIVERY_TIME_SEARCH_PARAMS, API> {
    const ssrKey = id || 'useDeliveryTime';
    // @ts-ignore
    const result = sharedRef<DELIVERY_TIME[]>([], `${ssrKey}-result`);
    const loading = sharedRef(false, `${ssrKey}-loading`);
    const error = sharedRef<UseDeliveryTimeErrors>({
      search: null,
    }, `${ssrKey}-error`);
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(factoryParams);

    // eslint-disable-next-line consistent-return
    const search = async (params: ComposableFunctionArgs<DELIVERY_TIME_SEARCH_PARAMS>): Promise<void> => {
      Logger.debug(`useDeliveryTime/${ssrKey}/search`);

      try {
        loading.value = true;

        result.value = await _factoryParams.search(params);

        error.value.search = null;
      } catch (err) {
        error.value.search = err;
        Logger.error(`useDeliveryTime/${ssrKey}/search`, err);
      } finally {
        loading.value = false;
      }
    };

    return {
      search,
      result: computed(() => result.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value),
    };
  };
}
