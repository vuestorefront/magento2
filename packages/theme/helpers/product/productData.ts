import { computed, useRoute } from '@nuxtjs/composition-api';

export const productData = (products) => {
  const route = useRoute();
  const { params: { id } } = route.value;

  return {
    id,
    product: computed(() => {
      if (!products) return {};
      return products.value?.items?.[0] ?? [];
    }),
  };
};
