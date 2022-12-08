import { UseContextReturn } from '~/types/core';
import type { GetProductSearchParams } from '~/modules/catalog/product/types';

export const getProductDetailsCommand = {
  execute: async (context: UseContextReturn, searchParams: GetProductSearchParams, customQuery = { productDetail: 'productDetail' }, customHeaders = {}) => {
    const { data } = await context.app.$vsf.$magento.api.productDetail(searchParams, customQuery, customHeaders);

    return data?.products ?? null;
  },
};
