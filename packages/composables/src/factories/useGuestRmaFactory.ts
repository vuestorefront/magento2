import { computed, Ref } from '@vue/composition-api';
import {
  configureFactoryParams,
  Context,
  FactoryParams,
  Logger,
  sharedRef,
} from '@absolute-web/vsf-core';
import { PlatformApi } from '@absolute-web/vsf-core/lib/src/types';
import { UseGuestRma, UseGuestRmaErrors } from '../types/composables';

export interface UseGuestRmaFactoryParams<GUEST_RMA_DATA,
  GUEST_RMA_PARAMS,
  API extends PlatformApi = any,
> extends FactoryParams<API> {
  load: (context: Context, params: GUEST_RMA_PARAMS) => Promise<GUEST_RMA_DATA>;
}

export const useGuestRmaFactory = <GUEST_RMA_DATA, GUEST_RMA_PARAMS, API extends PlatformApi = any>(
  factoryParams: UseGuestRmaFactoryParams<GUEST_RMA_DATA, GUEST_RMA_PARAMS, API>,
) => function useGuestRma(
  id: string = '',
): UseGuestRma<GUEST_RMA_DATA, GUEST_RMA_PARAMS, API> {
  // @ts-ignore
  const ssrKey = id || 'useGuestRma';
  const loading: Ref<boolean> = sharedRef(false, `${ssrKey}-loading`);
  const result: Ref<GUEST_RMA_DATA> = sharedRef(null, `${ssrKey}-result`);
  const error: Ref<UseGuestRmaErrors> = sharedRef(
    {
      load: null,
    },
    `${ssrKey}-error`,
  );
  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
  const _factoryParams = configureFactoryParams(factoryParams);

  const load = async (params: GUEST_RMA_PARAMS): Promise<void> => {
    Logger.debug(`useGuestRma/${ssrKey}/load`, params);

    try {
      loading.value = true;
      result.value = await _factoryParams.load(params);
      error.value.load = null;
    } catch (err) {
      error.value.load = err;
      Logger.error(`useGuestRma/${ssrKey}/load`, err);
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
