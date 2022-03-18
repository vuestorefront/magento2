<template>
  <ProductsCarousel
    v-if="!loading && products && products.length > 0"
    :products="products"
    :title="$t('Other products you might like')"
  />
</template>
<script>
import { defineComponent, useFetch, ref } from '@nuxtjs/composition-api';
import { useUpsellProducts } from '~/composables';
import ProductsCarousel from '~/components/ProductsCarousel.vue';
import { productData } from '~/helpers/product/productData';

export default defineComponent({
  name: 'UpsellProducts',
  components: {
    ProductsCarousel,
  },
  setup() {
    const { id } = productData();
    const { search, loading } = useUpsellProducts(id);
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
