import { GetProductSearchParams } from '~/composables/useProduct/useProduct';
import { VsfContext } from '~/composables/context';

export const getProductDetailsCommand = {
  execute: async (context: VsfContext, searchParams, customQuery = { productDetail: 'productDetail' }) => {
    const result = await context
      .$magento
      .api
      .productDetail({
        ...searchParams,
      } as GetProductSearchParams, customQuery);
    return result.data?.products;
  },
};
