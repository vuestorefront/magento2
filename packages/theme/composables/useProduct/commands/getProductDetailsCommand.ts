import type { NuxtAppOptions } from '@nuxt/types';
import type { GetProductSearchParams } from '~/composables/types';

export const getProductDetailsCommand = {
  execute: async (app: NuxtAppOptions, searchParams: GetProductSearchParams, customQuery = { productDetail: 'productDetail' }) => {
    const { data } = await app.$vsf.$magento.api.productDetail(searchParams, customQuery);

    return data?.products ?? null;
  },
};
