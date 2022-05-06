<template>
  <ProductsCarousel
    v-if="!loading && products && products.length > 0"
    :products="products"
    :title="$t('Match it with')"
  />
</template>
<script lang="ts">
import {
  defineComponent, ref, onMounted, useRoute,
} from '@nuxtjs/composition-api';
import useRelatedProducts from '~/modules/catalog/product/composables/useRelatedProducts';
import ProductsCarousel from '~/modules/catalog/product/components/ProductsCarousel.vue';

export default defineComponent({
  name: 'RelatedProducts',
  components: {
    ProductsCarousel,
  },
  setup() {
    const route = useRoute();
    const { params: { id } } = route.value;
    const {
      search,
      loading,
    } = useRelatedProducts();
    const products = ref([]);

    onMounted(async () => {
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
