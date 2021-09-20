import { computed } from '@vue/composition-api';
import {
  configureFactoryParams,
  Context,
  FactoryParams,
  Logger,
  sharedRef,
} from '@absolute-web/vsf-core';
import { UseIDmeVerify, UseIDmeVerifyErrors } from '../types/composables';

export interface UseIDmeVerifyFactory<CUSTOMER_DATA> extends FactoryParams {
  load: (context: Context, params: any) => Promise<CUSTOMER_DATA>;
}

export function useIDmeVerifyFactory<CUSTOMER_DATA>(
  factoryParams: UseIDmeVerifyFactory<CUSTOMER_DATA>,
) {
  return function useIDmeVerify(id: string = ''): UseIDmeVerify<CUSTOMER_DATA> {
    const ssrKey = id || 'useIDmeVerify';
    // @ts-ignore
    const result: Ref<CUSTOMER_DATA> = sharedRef(null, `${ssrKey}-customer-data`);
    const loading = sharedRef(false, `${ssrKey}-loading`);
    const error = sharedRef<UseIDmeVerifyErrors>({
      load: null,
    }, `${ssrKey}-error`);
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(factoryParams);

    // eslint-disable-next-line consistent-return
    const load = async (params: any): Promise<CUSTOMER_DATA> => {
      Logger.debug(`useIDmeVerify/${ssrKey}/load`);

      try {
        loading.value = true;

        const data = await _factoryParams.load(params);

        result.value = data;

        error.value.load = null;

        return data;
      } catch (err) {
        error.value.load = err;
        Logger.error(`useIDmeVerify/${ssrKey}/load`, err);
      } finally {
        loading.value = false;
      }
    };

    return {
      load,
      result: computed(() => result.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value),
    };
  };
}
