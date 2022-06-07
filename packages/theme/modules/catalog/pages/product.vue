<template>
  <div id="product">
    <div>
      <SfBreadcrumbs
        class="breadcrumbs desktop-only"
        :breadcrumbs="breadcrumbs"
      />
      <component
        :is="renderer"
        v-if="product"
        :product="product"
        :is-fetching="loading"
        @fetchProduct="fetchProduct($event.query)"
      />
      <ProductSkeleton v-else />
      <LoadWhenVisible>
        <RelatedProducts />
      </LoadWhenVisible>
      <LoadWhenVisible>
        <UpsellProducts />
      </LoadWhenVisible>
    </div>
    <LoadWhenVisible>
      <InstagramFeed />
    </LoadWhenVisible>
    <LoadWhenVisible>
      <MobileStoreBanner />
    </LoadWhenVisible>
  </div>
</template>
<script lang="ts">
import {
  ref,
  computed,
  useContext,
  useRoute,
  defineComponent,
  useFetch,
} from '@nuxtjs/composition-api';
import { useCache, CacheTagPrefix } from '@vue-storefront/cache';
import { SfBreadcrumbs, SfLoader } from '@storefront-ui/vue';
import { getBreadcrumbs } from '~/modules/catalog/product/getters/productGetters';
import { useProduct } from '~/modules/catalog/product/composables/useProduct';
import { ProductTypeEnum } from '~/modules/catalog/product/enums/ProductTypeEnum';
import LoadWhenVisible from '~/components/utils/LoadWhenVisible.vue';

import type { Product } from '~/modules/catalog/product/types';
import ProductSkeleton from '~/modules/catalog/product/components/ProductSkeleton.vue';

export default defineComponent({
  name: 'ProductPage',
  components: {
    ProductSkeleton,
    SimpleProduct: () => import('~/modules/catalog/product/components/product-types/simple/SimpleProduct.vue'),
    BundleProduct: () => import('~/modules/catalog/product/components/product-types/bundle/BundleProduct.vue'),
    ConfigurableProduct: () => import('~/modules/catalog/product/components/product-types/configurable/ConfigurableProduct.vue'),
    GroupedProduct: () => import('~/modules/catalog/product/components/product-types/grouped/GroupedProduct.vue'),
    InstagramFeed: () => import('~/components/InstagramFeed.vue'),
    MobileStoreBanner: () => import('~/components/MobileStoreBanner.vue'),
    RelatedProducts: () => import('~/modules/catalog/product/components/RelatedProducts.vue'),
    UpsellProducts: () => import('~/modules/catalog/product/components/UpsellProducts.vue'),
    LoadWhenVisible,
    SfBreadcrumbs,
    SfLoader,
  },
  transition: 'fade',
  setup() {
    const product = ref<Product | null>(null);
    const { addTags } = useCache();
    const { localePath } = useContext();
    const route = useRoute();
    const { getProductDetails, loading } = useProduct();
    const { error: nuxtError } = useContext();
    const { params: { id } } = route.value;

    const breadcrumbs = computed(() => {
      const productCategories = product.value?.categories ?? [];
      return getBreadcrumbs(
        product.value,
        Array.isArray(productCategories) ? [...productCategories].pop() : null,
      ).map((breadcrumb) => ({ ...breadcrumb, link: localePath(breadcrumb.link) }));
    });

    const getBaseSearchQuery = () => ({
      filter: {
        sku: {
          eq: id,
        },
      },
      configurations: Object.entries(route.value.query)
        .filter((config) => config[0] !== 'wishlist')
        .map(
          (config) => config[1],
        ) as string[],
    });

    // eslint-disable-next-line no-underscore-dangle
    const renderer = computed(() => product.value?.__typename ?? ProductTypeEnum.SIMPLE_PRODUCT);

    const fetchProduct = async (query = getBaseSearchQuery()) => {
      const result = await getProductDetails({
        ...query,
      });

      product.value = result.items[0] as Product ?? null;
    };

    useFetch(async () => {
      await fetchProduct();

      if (Boolean(product?.value?.sku) === false) nuxtError({ statusCode: 404 });

      const tags = [
        {
          prefix: CacheTagPrefix.View,
          value: `product-${id}`,
        },
      ];

      const productTags = [{
        prefix: CacheTagPrefix.Product,
        value: product.value.uid,
      }];

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      addTags([...tags, ...productTags]);
    });

    return {
      renderer,
      loading,
      breadcrumbs,
      product,
      fetchProduct,
    };
  },
});
</script>
<style lang="scss" scoped>
#product {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }
}

.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
}
</style>
