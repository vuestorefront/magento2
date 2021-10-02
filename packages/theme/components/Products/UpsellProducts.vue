<template>
  <ProductsCarousel
    v-if="!loading && products.length > 0"
    :products="products"
    :title="$t('Other products you might like')"
  />
</template>
<script>
import { useUpsellProducts } from '@vue-storefront/magento';
import { onSSR } from '@vue-storefront/core';
import ProductsCarousel from '~/components/ProductsCarousel.vue';
import { productData } from '~/helpers/product/productData';

export default {
  name: 'UpsellProducts',
  components: {
    ProductsCarousel,
  },
  setup() {
    const { id } = productData();
    const { search, products, loading } = useUpsellProducts(id);

    onSSR(async () => {
      const baseSearchQuery = {
        filter: {
          sku: {
            eq: id,
          },
        },
      };

      await search(baseSearchQuery);
    });

    return {
      products,
      loading,
    };
  },
};
</script>
