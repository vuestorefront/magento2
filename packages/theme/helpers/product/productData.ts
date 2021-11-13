import { computed, useRoute } from '@nuxtjs/composition-api';
import { productGetters, useProduct } from '@vue-storefront/magento';

export const productData = () => {
  const route = useRoute();
  const { params: { id }, query } = route.value;

  const { products, loading } = useProduct(`product-${id}`);

  return {
    id,
    loading,
    product: computed(() => {
      const baseProduct = Array.isArray(products.value?.items) && products.value?.items[0] ? products.value?.items[0] : [];
      // @ts-ignore
      return productGetters.getFiltered(baseProduct, {
        master: true,
        attributes: query,
      });
    }),
  };
};
