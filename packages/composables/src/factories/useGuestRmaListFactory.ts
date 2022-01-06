import { computed, Ref } from '@vue/composition-api';
import {
  configureFactoryParams,
  Context,
  FactoryParams,
  Logger,
  sharedRef,
} from '@absolute-web/vsf-core';
import { PlatformApi } from '@absolute-web/vsf-core/lib/src/types';
import { UseGuestRmaList, UseGuestRmaListErrors } from '../types/composables';

export interface UseGuestRmaListFactoryParams<GUEST_RMA_LIST_DATA,
  GUEST_RMA_LIST_PARAMS,
  API extends PlatformApi = any,
> extends FactoryParams<API> {
  load: (context: Context, params: GUEST_RMA_LIST_PARAMS) => Promise<GUEST_RMA_LIST_DATA>;
}

export const useGuestRmaListFactory = <GUEST_RMA_LIST_DATA, GUEST_RMA_LIST_PARAMS, API extends PlatformApi = any>(
  factoryParams: UseGuestRmaListFactoryParams<GUEST_RMA_LIST_DATA, GUEST_RMA_LIST_PARAMS, API>,
) => function useGuestRmaList(
  id: string = '',
): UseGuestRmaList<GUEST_RMA_LIST_DATA, GUEST_RMA_LIST_PARAMS, API> {
  // @ts-ignore
  const ssrKey = id || 'useGuestRmaList';
  const loading: Ref<boolean> = sharedRef(false, `${ssrKey}-loading`);
  const result: Ref<GUEST_RMA_LIST_DATA> = sharedRef(null, `${ssrKey}-result`);
  const error: Ref<UseGuestRmaListErrors> = sharedRef(
    {
      load: null,
    },
    `${ssrKey}-error`,
  );
  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
  const _factoryParams = configureFactoryParams(factoryParams);

  const load = async (params: GUEST_RMA_LIST_PARAMS): Promise<void> => {
    Logger.debug(`useGuestRmaList/${ssrKey}/load`, params);

    try {
      loading.value = true;
      result.value = await _factoryParams.load(params);
      error.value.load = null;
    } catch (err) {
      error.value.load = err;
      Logger.error(`useGuestRmaList/${ssrKey}/load`, err);
    } finally {
      loading.value = false;
    }
  };

  return {
    api: _factoryParams.api,
    load,
    result: computed(() => result.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
  };
};
