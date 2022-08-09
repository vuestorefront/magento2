<template>
  <ProductsCarousel
    v-if="!loading && products && products.length > 0"
    :products="products"
    :title="$t('Other products you might like')"
  />
</template>
<script lang="ts">
import {
  defineComponent, ref, onMounted,
} from '@nuxtjs/composition-api';
import ProductsCarousel from '~/modules/catalog/product/components/ProductsCarousel.vue';
import useUpsellProducts from '~/modules/catalog/product/composables/useUpsellProducts';
import { usePageStore } from '~/stores/page';

export default defineComponent({
  name: 'UpsellProducts',
  components: {
    ProductsCarousel,
  },
  setup() {
    const { routeData } = usePageStore();
    const { search, loading } = useUpsellProducts();
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
