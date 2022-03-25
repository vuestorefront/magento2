import { GetProductSearchParams } from '~/composables/useProduct/useProduct';
import { VsfContext } from '~/composables/context';

export const getProductListCommand = {
  execute: async (context: VsfContext, searchParams, customQuery = { products: 'products' }) => {
    const result = await context
      .$magento
      .api
      .products(searchParams as GetProductSearchParams, customQuery);

    return result.data?.products;
  },
};
