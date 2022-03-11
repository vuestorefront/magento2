import { Context } from '@vue-storefront/core';
import { GetProductSearchParams } from '~/composables/useProduct/useProduct';

export const getProductListCommand = {
  execute: async (context: Context, searchParams, customQuery = { products: 'products' }) => {
    const result = await context
      .$magento
      .api
      .products(searchParams as GetProductSearchParams, customQuery);

    return result.data?.products ?? [];
  },
};
