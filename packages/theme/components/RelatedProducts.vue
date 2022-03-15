<template>
  <ProductsCarousel
    v-if="!loading && products && products.length > 0"
    :products="products"
    :title="$t('Match it with')"
  />
</template>
<script>
import { defineComponent, useFetch, ref } from '@nuxtjs/composition-api';
import { useRelatedProducts } from '~/composables';
import ProductsCarousel from '~/components/ProductsCarousel.vue';
import { productData } from '~/helpers/product/productData';

export default defineComponent({
  name: 'RelatedProducts',
  components: {
    ProductsCarousel,
  },
  setup() {
    const { id } = productData();
    const {
      search,
      loading,
    } = useRelatedProducts();
    const products = ref([]);

    useFetch(async () => {
      const baseSearchQuery = {
        filter: {
          sku: {
            eq: id,
          },
        },
      };

      products.value = await search(baseSearchQuery);
    });

    return {
      products,
      loading,
    };
  },
});
</script>
