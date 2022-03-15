import { computed, useRoute } from '@nuxtjs/composition-api';
import { productGetters } from '~/getters';

export const productData = (products) => {
  const route = useRoute();
  const { params: { id }, query } = route.value;

  return {
    id,
    product: computed(() => {
      if (!products) return {};
      const baseProduct = Array.isArray(products.value?.items) && products.value?.items[0] ? products.value?.items[0] : [];

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return productGetters.getFiltered(baseProduct, {
        master: true,
        attributes: query,
      });
    }),
  };
};
