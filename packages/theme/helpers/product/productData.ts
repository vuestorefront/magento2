import { computed, useRoute } from '@nuxtjs/composition-api';

export const productData = (products) => {
  const route = useRoute();
  const { params: { id } } = route.value;

  return {
    id,
    product: computed(() => {
      if (!products) return {};
      return Array.isArray(products.value?.items) && products.value?.items[0] ? products.value?.items[0] : [];
    }),
  };
};
