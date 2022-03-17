import { Context } from '@vue-storefront/core';
import { GetProductSearchParams } from '~/composables/useProduct/useProduct';

export const getProductDetailsCommand = {
  execute: async (context: Context, searchParams, customQuery = { productDetail: 'productDetail' }) => {
    const result = await context
      .$magento
      .api
      .productDetail({
        ...searchParams,
      } as GetProductSearchParams, customQuery);

    return result.data?.products;
  },
};
