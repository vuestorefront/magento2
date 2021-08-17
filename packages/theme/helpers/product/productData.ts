import { computed } from '@vue/composition-api';
import { productGetters, useProduct } from '@vue-storefront/magento';
import { useVueRouter } from '~/helpers/hooks/useVueRouter';

export const productData = () => {
  const { route } = useVueRouter();
  const { id } = route.params;

  const { products, loading } = useProduct(`product-${id}`);

  return {
    id,
    loading,
    product: computed(() => {
      const baseProduct = Array.isArray(products.value?.items) && products.value?.items[0] ? products.value?.items[0] : [];
      // @ts-ignore
      return productGetters.getFiltered(baseProduct, {
        master: true,
        attributes: route.query,
      });
    }),
  };
};
