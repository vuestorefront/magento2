import { computed } from '@vue/composition-api';
import {
  configureFactoryParams,
  Context,
  FactoryParams,
  Logger,
  sharedRef,
} from '@absolute-web/vsf-core';
import { UsePickupLocation, UsePickupLocationErrors } from '../types/composables';

export interface UsePickupLocationFactory<PICKUP_LOCATION, PICKUP_LOCATION_SEARCH_PARAMS> extends FactoryParams {
  search: (context: Context, params: PICKUP_LOCATION_SEARCH_PARAMS) => Promise<PICKUP_LOCATION[]>;
}

export function usePickupLocationFactory<PICKUP_LOCATION, PICKUP_LOCATION_SEARCH_PARAMS>(
  factoryParams: UsePickupLocationFactory<PICKUP_LOCATION, PICKUP_LOCATION_SEARCH_PARAMS>,
) {
  return function usePickupLocation(id: string = ''): UsePickupLocation<PICKUP_LOCATION, PICKUP_LOCATION_SEARCH_PARAMS> {
    const ssrKey = id || 'usePickupLocation';
    // @ts-ignore
    const result = sharedRef<PICKUP_LOCATION[]>([], `${ssrKey}-result`);
    const loading = sharedRef(false, `${ssrKey}-loading`);
    const error = sharedRef<UsePickupLocationErrors>({
      search: null,
    }, `${ssrKey}-error`);
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(factoryParams);

    // eslint-disable-next-line consistent-return
    const search = async (params: PICKUP_LOCATION_SEARCH_PARAMS): Promise<PICKUP_LOCATION[]> => {
      Logger.debug(`usePickupLocation/${ssrKey}/search`);

      try {
        loading.value = true;

        const data = await _factoryParams.search(params);

        result.value = data;

        error.value.search = null;

        return data;
      } catch (err) {
        error.value.search = err;
        Logger.error(`usePickupLocation/${ssrKey}/search`, err);
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
