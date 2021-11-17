import { computed, Ref } from '@vue/composition-api';
import {
  configureFactoryParams,
  Context,
  FactoryParams,
  Logger,
  sharedRef,
} from '@absolute-web/vsf-core';
import { UseGuestRequestReturn, UseGuestRequestReturnErrors } from '../types/composables';

export interface UseGuestRequestReturnFactory<REQUEST_RETURN_DATA, REQUEST_RETURN_PARAMS>
  extends FactoryParams {
  requestReturn: (context: Context, params: REQUEST_RETURN_PARAMS) => Promise<REQUEST_RETURN_DATA>;
}

export const useGuestRequestReturnFactory = <REQUEST_RETURN_DATA, REQUEST_RETURN_PARAMS>(
  factoryParams: UseGuestRequestReturnFactory<REQUEST_RETURN_DATA, REQUEST_RETURN_PARAMS>,
) => function useGuestRequestReturn(
  id: string = '',
): UseGuestRequestReturn<REQUEST_RETURN_DATA, REQUEST_RETURN_PARAMS> {
  // @ts-ignore
  const ssrKey = id || 'useGuestRequestReturn';
  const loading: Ref<boolean> = sharedRef(false, `${ssrKey}-loading`);
  const result: Ref<REQUEST_RETURN_DATA> = sharedRef(null, `${ssrKey}-result`);
  const error: Ref<UseGuestRequestReturnErrors> = sharedRef(
    {
      requestReturn: null,
    },
    `${ssrKey}-error`,
  );
  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
  const _factoryParams = configureFactoryParams(factoryParams);

  const requestReturn = async (params: REQUEST_RETURN_PARAMS): Promise<void> => {
    Logger.debug(`useGuestRequestReturn/${ssrKey}/requestReturn`, params);

    try {
      loading.value = true;
      result.value = await _factoryParams.requestReturn(params);
      error.value.requestReturn = null;
    } catch (err) {
      error.value.requestReturn = err;
      Logger.error(`useCustomerReturn/${ssrKey}/requestReturn`, err);
    } finally {
      loading.value = false;
    }
  };

  return {
    requestReturn,
    result: computed(() => result.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
  };
};
