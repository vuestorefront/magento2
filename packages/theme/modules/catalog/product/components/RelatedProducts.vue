<template>
  <ProductsCarousel
    v-if="!loading && products && products.length > 0"
    :products="products"
    :title="$t('Match it with')"
  />
</template>
<script lang="ts">
import {
  defineComponent, ref, onMounted,
} from '@nuxtjs/composition-api';
import useRelatedProducts from '~/modules/catalog/product/composables/useRelatedProducts';
import ProductsCarousel from '~/modules/catalog/product/components/ProductsCarousel.vue';
import { usePageStore } from '~/stores/page';

export default defineComponent({
  name: 'RelatedProducts',
  components: {
    ProductsCarousel,
  },
  setup() {
    const { routeData } = usePageStore();
    const {
      search,
      loading,
    } = useRelatedProducts();
    const products = ref([]);

    onMounted(async () => {
      const baseSearchQuery = {
        filter: {
          sku: {
            eq: routeData.sku,
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
