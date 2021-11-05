import { computed } from '@vue/composition-api';
import {
  configureFactoryParams,
  Context,
  FactoryParams,
  PlatformApi,
  Logger,
  sharedRef,
} from '@absolute-web/vsf-core';
import { UsePaypalExpress, UsePaypalExpressErrors } from '../types/composables';

export interface UsePaypalExpressFactory<OUTPUT, PARAMS, API extends PlatformApi = any> extends FactoryParams<API> {
  createToken: (context: Context, params: PARAMS) => Promise<OUTPUT>;
}

export function usePaypalExpressFactory<OUTPUT, PARAMS, API extends PlatformApi = any>(
  factoryParams: UsePaypalExpressFactory<OUTPUT, PARAMS, API>,
) {
  return function usePaypalExpress(id: string = ''): UsePaypalExpress<OUTPUT, PARAMS, API> {
    const ssrKey = id || 'usePaypalExpress';
    // @ts-ignore
    const result = sharedRef<OUTPUT>(null, `${ssrKey}-result`);
    const loading = sharedRef(false, `${ssrKey}-loading`);
    const error = sharedRef<UsePaypalExpressErrors>({
      createToken: null,
    }, `${ssrKey}-error`);
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(factoryParams);

    // eslint-disable-next-line consistent-return
    const createToken = async (params: PARAMS): Promise<OUTPUT> => {
      Logger.debug(`usePaypalExpress/${ssrKey}/createToken`);

      try {
        loading.value = true;
        const data = await _factoryParams.createToken(params);
        result.value = data;
        error.value.createToken = null;
        return data;
      } catch (err) {
        error.value.createToken = err;
        Logger.error(`usePaypalExpress/${ssrKey}/createToken`, err);
      } finally {
        loading.value = false;
      }
    };

    return {
      createToken,
      result: computed(() => result.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value),
    };
  };
}
