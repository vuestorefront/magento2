import { Ref, computed } from '@vue/composition-api';
import {
  CustomQuery, Context, FactoryParams, sharedRef, Logger, configureFactoryParams,
} from '@absolute-web/vsf-core';
import { UseCompareList, UseCompareListErrors } from '../types/composables';

export interface UseCompareListFactoryParams<COMPARE_LIST, PRODUCT> extends FactoryParams {
  load: (context: Context, params: { uid: string; customQuery?: any }) => Promise<COMPARE_LIST>;
  loadCustomerCompareList: (context: Context, params: { customQuery?: any }) => Promise<COMPARE_LIST>;
  create: (context: Context, params: { products: PRODUCT[]; customQuery?: any }) => Promise<COMPARE_LIST>;
  clear: (context: Context, params: { currentCompareList: COMPARE_LIST; customQuery?: any }) => Promise<boolean>;
  assignToCustomer: (context: Context, params: { currentCompareList: COMPARE_LIST; customQuery?: any }) => Promise<COMPARE_LIST>;
  addItems: (
    context: Context,
    params: {
      currentCompareList: COMPARE_LIST;
      products: PRODUCT[];
      customQuery?: CustomQuery;
    }
  ) => Promise<COMPARE_LIST>;
  removeItems:
  (context: Context, params: { currentCompareList: COMPARE_LIST; products: PRODUCT[]; customQuery?: CustomQuery }) => Promise<COMPARE_LIST>;
  isInCompareList: (context: Context, params: { currentCompareList: COMPARE_LIST; product: PRODUCT }) => boolean;
}

export const useCompareListFactory = <COMPARE_LIST, PRODUCT>(
  factoryParams: UseCompareListFactoryParams<COMPARE_LIST, PRODUCT>,
) => function useCompareList(id: string = ''): UseCompareList<COMPARE_LIST, PRODUCT> {
  const ssrKey = id || 'useCompareList';
  const loading: Ref<boolean> = sharedRef(false, `${ssrKey}-loading`);
  const compareList: Ref<COMPARE_LIST> = sharedRef(null, `${ssrKey}-compareList`);
  const error: Ref<UseCompareListErrors> = sharedRef({
    load: null,
    loadCustomerCompareList: null,
    create: null,
    clear: null,
    assignToCustomer: null,
    addItems: null,
    removeItems: null,
  }, `${ssrKey}-error`);

  // eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
  const _factoryParams = configureFactoryParams(
    factoryParams,
  );

  const reset = () => {
    loading.value = false;
    compareList.value = null;
    error.value = {
      load: null,
      loadCustomerCompareList: null,
      create: null,
      clear: null,
      assignToCustomer: null,
      addItems: null,
      removeItems: null,
    };
  };

  const load = async ({ uid, customQuery }) => {
    Logger.debug(`useCompareList/${ssrKey}/load`, { uid });

    try {
      loading.value = true;
      compareList.value = await _factoryParams.load({ uid, customQuery });
      error.value.load = null;
    } catch (err) {
      error.value.load = err;
      Logger.error(`useCompareList/${ssrKey}/load`, err);
    } finally {
      loading.value = false;
    }
  };

  const loadCustomerCompareList = async ({ customQuery } = { customQuery: null }) => {
    Logger.debug(`useCompareList/${ssrKey}/loadCustomerCompareList`);

    try {
      loading.value = true;
      compareList.value = await _factoryParams.loadCustomerCompareList({ customQuery });
      error.value.loadCustomerCompareList = null;
    } catch (err) {
      error.value.loadCustomerCompareList = err;
      Logger.error(`useCompareList/${ssrKey}/loadCustomerCompareList`, err);
    } finally {
      loading.value = false;
    }
  };

  const create = async ({ products, customQuery }) => {
    Logger.debug(`useCompareList/${ssrKey}/create`, { products });

    try {
      loading.value = true;
      compareList.value = await _factoryParams.create({ products, customQuery });
      error.value.create = null;
    } catch (err) {
      error.value.create = err;
      Logger.error(`useCompareList/${ssrKey}/create`, err);
    } finally {
      loading.value = false;
    }
  };

  const clear = async ({ customQuery } = { customQuery: null }) => {
    Logger.debug(`useCompareList/${ssrKey}/clear`);

    try {
      loading.value = true;
      const result = await _factoryParams.clear({ currentCompareList: compareList.value, customQuery });
      error.value.clear = null;
      if (result) {
        compareList.value = null;
      }
      return result;
    } catch (err) {
      error.value.clear = err;
      Logger.error(`useCompareList/${ssrKey}/clear`, err);
    } finally {
      loading.value = false;
    }
    return false;
  };

  const assignToCustomer = async ({ customQuery } = { customQuery: null }) => {
    Logger.debug(`useCompareList/${ssrKey}/assignToCustomer`);

    try {
      loading.value = true;
      const updatedCompareList = await _factoryParams.assignToCustomer({ currentCompareList: compareList.value, customQuery });
      error.value.assignToCustomer = null;
      compareList.value = updatedCompareList;
    } catch (err) {
      error.value.assignToCustomer = err;
      Logger.error(`useCompareList/${ssrKey}/assignToCustomer`, err);
    } finally {
      loading.value = false;
    }
  };

  const addItems = async ({ products, customQuery }) => {
    Logger.debug(`useCompareList/${ssrKey}/addItems`, { products });

    try {
      loading.value = true;
      const updatedCompareList = await _factoryParams.addItems({
        currentCompareList: compareList.value,
        products,
        customQuery,
      });
      error.value.addItems = null;
      compareList.value = updatedCompareList;
    } catch (err) {
      error.value.addItems = err;
      Logger.error(`useCompareList/${ssrKey}/addItems`, err);
    } finally {
      loading.value = false;
    }
  };

  const removeItems = async ({ products, customQuery }) => {
    Logger.debug(`useCompareList/${ssrKey}/removeItems`, { products });

    try {
      loading.value = true;
      const updatedCompareList = await _factoryParams.removeItems({
        currentCompareList: compareList.value,
        products,
        customQuery,
      });
      error.value.removeItems = null;
      compareList.value = updatedCompareList;
    } catch (err) {
      error.value.removeItems = err;
      Logger.error(`useCompareList/${ssrKey}/removeItems`, err);
    } finally {
      loading.value = false;
    }
  };

  const isInCompareList = ({ product }) => _factoryParams.isInCompareList({
    currentCompareList: compareList.value,
    product,
  });

  return {
    compareList: computed(() => compareList.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    reset,
    load,
    loadCustomerCompareList,
    create,
    clear,
    assignToCustomer,
    addItems,
    removeItems,
    isInCompareList,
  };
};
