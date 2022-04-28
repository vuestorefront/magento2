<template>
  <ProductsCarousel
    v-if="!loading && products && products.length > 0"
    :products="products"
    :title="$t('Other products you might like')"
  />
</template>
<script lang="ts">
import {
  defineComponent, ref, onMounted, useRoute,
} from '@nuxtjs/composition-api';
import ProductsCarousel from '~/modules/catalog/product/components/ProductsCarousel.vue';
import useUpsellProducts from '~/modules/catalog/product/composables/useUpsellProducts';

export default defineComponent({
  name: 'UpsellProducts',
  components: {
    ProductsCarousel,
  },
  setup() {
    const route = useRoute();
    const { params: { id } } = route.value;
    const { search, loading } = useUpsellProducts();
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
