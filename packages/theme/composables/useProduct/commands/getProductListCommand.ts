import type { NuxtAppOptions } from '@nuxt/types';
import type { GetProductSearchParams } from '~/composables/types';

export const getProductListCommand = {
  execute: async (app: NuxtAppOptions, searchParams: GetProductSearchParams, customQuery = { products: 'products' }) => {
    const { data } = await app.$vsf.$magento.api.products(searchParams, customQuery);

    return data?.products ?? null;
  },
};
