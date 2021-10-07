import { computed, Ref } from '@vue/composition-api';
import {
  configureFactoryParams,
  Context,
  FactoryParams,
  Logger,
  sharedRef,
} from '@absolute-web/vsf-core';
import { UseCustomerReturns, UseCustomerReturnsErrors } from '../types/composables';

export interface UseCustomerReturnsFactory<CUSTOMER_RETURNS_DATA, CUSTOMER_RETURN_DATA, CUSTOMER_RETURNS_PARAMS, CUSTOMER_RETURN_PARAMS>
  extends FactoryParams {
  loadReturns: (context: Context, params: CUSTOMER_RETURNS_PARAMS) => Promise<CUSTOMER_RETURNS_DATA>;
  loadReturn: (context: Context, params: CUSTOMER_RETURN_PARAMS) => Promise<CUSTOMER_RETURN_DATA>;
}

export const useCustomerReturnsFactory = <CUSTOMER_RETURNS_DATA, CUSTOMER_RETURN_DATA, CUSTOMER_RETURNS_PARAMS, CUSTOMER_RETURN_PARAMS>(
  factoryParams: UseCustomerReturnsFactory<CUSTOMER_RETURNS_DATA, CUSTOMER_RETURN_DATA, CUSTOMER_RETURNS_PARAMS, CUSTOMER_RETURN_PARAMS>,
) => function useCustomerReturns(
  id: string = '',
): UseCustomerReturns<CUSTOMER_RETURNS_DATA, CUSTOMER_RETURN_DATA, CUSTOMER_RETURNS_PARAMS, CUSTOMER_RETURN_PARAMS> {
  // @ts-ignore
  const ssrKey = id || 'useCustomerReturns';
  const loading: Ref<boolean> = sharedRef(false, `${ssrKey}-loading`);
  const customerReturn: Ref<CUSTOMER_RETURN_DATA> = sharedRef(null, `${ssrKey}-customerReturn`);
  const customerReturns: Ref<CUSTOMER_RETURNS_DATA> = sharedRef(null, `${ssrKey}-customerReturns`);
  const error: Ref<UseCustomerReturnsErrors> = sharedRef(
    {
      loadReturns: null,
    },
    `${ssrKey}-error`,
  );
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
  const _factoryParams = configureFactoryParams(factoryParams);

  // eslint-disable-next-line consistent-return
  const loadReturns = async (params: CUSTOMER_RETURNS_PARAMS): Promise<void> => {
    Logger.debug(`useCustomerReturns/${ssrKey}/loadReturns`, params);

    try {
      loading.value = true;
      customerReturns.value = await _factoryParams.loadReturns(params);
      error.value.loadReturns = null;
    } catch (err) {
      error.value.loadReturns = err;
      Logger.error(`useCustomerReturns/${ssrKey}/loadReturns`, err);
    } finally {
      loading.value = false;
    }
  };

  const loadReturn = async (params: CUSTOMER_RETURN_PARAMS): Promise<void> => {
    Logger.debug(`useCustomerReturn/${ssrKey}/loadReturn`, params);

    try {
      loading.value = true;
      customerReturn.value = await _factoryParams.loadReturn(params);
      error.value.loadReturn = null;
    } catch (err) {
      error.value.loadReturn = err;
      Logger.error(`useCustomerReturn/${ssrKey}/loadReturn`, err);
    } finally {
      loading.value = false;
    }
  };

  return {
    loadReturns,
    loadReturn,
    customerReturn: computed(() => customerReturn.value),
    customerReturns: computed(() => customerReturns.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
  };
};
