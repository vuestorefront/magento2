import {
  Logger,
  Context,
} from '@vue-storefront/core';
import { ref, useContext } from '@nuxtjs/composition-api';
import { getProductListCommand } from '~/composables/useProduct/commands/getProductListCommand';
import { getProductDetailsCommand } from '~/composables/useProduct/commands/getProductDetailsCommand';

export const useProduct = (id: string) => {
  const loading = ref(false);
  const error = ref({
    search: null,
  });

  const { app } = useContext();
  const context = app.$vsf as Context;

  const getProductList = async (searchParams) => {
    Logger.debug(`useProduct/${id}/getProductList`, searchParams);
    let products = [];

    try {
      loading.value = true;
      products = await getProductListCommand.execute(context, searchParams);
      error.value.search = null;
    } catch (err) {
      error.value.search = err;
      Logger.error(`useProduct/${id}/search`, err);
    } finally {
      loading.value = false;
    }

    return products;
  };

  const getProductDetails = async (searchParams) => {
    Logger.debug(`useProduct/${id}/getProductDetails`, searchParams);
    let products = [];

    try {
      loading.value = true;
      products = await getProductDetailsCommand.execute(context, searchParams);
      error.value.search = null;
    } catch (err) {
      error.value.search = err;
      Logger.error(`useProduct/${id}/search`, err);
    } finally {
      loading.value = false;
    }

    return products;
  };

  return {
    getProductList,
    getProductDetails,
    loading,
    error,
  };
};

export default useProduct;
