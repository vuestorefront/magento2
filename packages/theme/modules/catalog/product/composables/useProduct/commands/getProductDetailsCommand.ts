import type { useContext } from '@nuxtjs/composition-api';
import type { GetProductSearchParams } from '~/modules/catalog/product/types';

type Context = ReturnType<typeof useContext>;

export const getProductDetailsCommand = {
  execute: async (context: Context, searchParams: GetProductSearchParams, customQuery = { productDetail: 'productDetail' }) => {
    const { data } = await context.app.$vsf.$magento.api.productDetail(searchParams, customQuery);

    return data?.products ?? null;
  },
};
