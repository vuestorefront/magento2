import { UseContextReturn } from '~/types/core';
import type { GetProductSearchParams } from '~/modules/catalog/product/types';

export const getProductListCommand = {
  execute: async (context: UseContextReturn, searchParams: GetProductSearchParams, customQuery = { products: 'products' }) => {
    const { data } = await context.app.$vsf.$magento.api.products(searchParams, customQuery);

    return data?.products ?? null;
  },
};
