import type { useContext } from '@nuxtjs/composition-api';
import type { GetProductSearchParams } from '~/composables/types';

type Context = ReturnType<typeof useContext>;

export const getProductListCommand = {
  execute: async (context: Context, searchParams: GetProductSearchParams, customQuery = { products: 'products' }) => {
    const { data } = await context.app.$vsf.$magento.api.products(searchParams, customQuery);

    return data?.products ?? null;
  },
};
