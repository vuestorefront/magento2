<template>
  <div id="category">
    <CmsContent
      v-if="isShowCms"
      :content="cmsContent"
    />
    <CategoryBreadcrumbs
      :category-ancestors="categoryAncestorsWithoutActiveCategory"
      class="breadcrumbs"
    />
    <SfHeading
      v-if="isShowProducts"
      :level="2"
      :title="activeCategoryLabel"
      class="category-title"
    />
    <div class="category-layout">
      <div class="sidebar column">
        <CategoryFilters
          v-if="isShowProducts"
          class="mobile-only"
          :is-visible="isFilterSidebarOpen"
          :cat-uid="routeData.entity_uid"
          @close="toggleFilterSidebar"
          @reloadProducts="fetch"
        />
      </div>
      <div class="main section column">
        <CategoryNavbar
          v-if="isShowProducts"
          :sort-by="sortBy"
          :pagination="pagination"
          :is-loading="$fetchState.pending"
          @reloadProducts="fetch"
        />
        <div class="products">
          <CategoryEmptyResults v-if="products.length === 0 && !$fetchState.pending && isShowProducts" />

          <CategoryProductGrid
            v-if="isCategoryGridView"
            :products="products"
            :prices-loaded="isPriceLoaded"
            :loading="$fetchState.pending"
            @click:wishlist="addItemToWishlist"
            @click:add-to-cart="addItemToCart"
          />

          <CategoryProductList
            v-else
            :products="products"
            :loading="$fetchState.pending"
            @click:wishlist="addItemToWishlist"
            @click:add-to-cart="addItemToCart"
          />

          <div
            v-if="!$fetchState.pending"
            class="products__display-opt"
          >
            <LazyHydrate on-interaction>
              <SfPagination
                v-show="pagination.totalPages > 1"
                :current="pagination.currentPage"
                :total="pagination.totalPages"
                :visible="5"
                class="products__pagination"
              />
            </LazyHydrate>

            <div
              v-show="pagination.totalPages > 1"
              class="products__show-on-page"
            >
              <span class="products__show-on-page__label">{{
                $t('Show')
              }}</span>
              <LazyHydrate on-interaction>
                <SfSelect
                  :value="pagination.itemsPerPage.toString()"
                  class="products__items-per-page"
                  @input="doChangeItemsPerPage"
                >
                  <SfSelectOption
                    v-for="option in pagination.pageOptions"
                    :key="option"
                    :value="option"
                    class="products__items-per-page__option"
                  >
                    {{ option }}
                  </SfSelectOption>
                </SfSelect>
              </LazyHydrate>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import LazyHydrate from 'vue-lazy-hydration';
import {
  SfPagination,
  SfSelect,
  SfHeading,
} from '@storefront-ui/vue';
import {
  computed,
  defineComponent, onMounted, ref, ssrRef, useFetch,
} from '@nuxtjs/composition-api';
import { CacheTagPrefix, useCache } from '@vue-storefront/cache';
import { facetGetters } from '~/getters';
import {
  useFacet,
  useUiHelpers,
  useUiState,
} from '~/composables';
import useWishlist from '~/modules/wishlist/composables/useWishlist';
import { AgnosticPagination } from '~/composables/types';
import { Product } from '~/modules/catalog/product/types';
import { useUrlResolver } from '~/composables/useUrlResolver';
import { useAddToCart } from '~/helpers/cart/addToCart';
import { useCategoryContent } from '~/modules/catalog/category/components/cms/useCategoryContent';
import { usePrice } from '~/modules/catalog/pricing/usePrice';
import CategoryNavbar from '~/modules/catalog/category/components/navbar/CategoryNavbar.vue';
import type { EntityUrl } from '~/modules/GraphQL/types';
import { useTraverseCategory } from '~/modules/catalog/category/helpers/useTraverseCategory';
import CategoryBreadcrumbs from '~/modules/catalog/category/components/breadcrumbs/CategoryBreadcrumbs.vue';

// TODO(addToCart qty, horizontal): https://github.com/vuestorefront/storefront-ui/issues/1606
export default defineComponent({
  name: 'CategoryPage',
  components: {
    CategoryEmptyResults: () => import('~/modules/catalog/category/components/CategoryEmptyResults.vue'),
    CategoryFilters: () => import('~/modules/catalog/category/components/filters/CategoryFilters.vue'),
    CmsContent: () => import('~/modules/catalog/category/components/cms/CmsContent.vue'),
    CategoryProductGrid: () => import('~/modules/catalog/category/components/views/CategoryProductGrid.vue'),
    CategoryProductList: () => import('~/modules/catalog/category/components/views/CategoryProductList.vue'),
    CategoryNavbar,
    CategoryBreadcrumbs,
    SfPagination,
    SfSelect,
    LazyHydrate,
    SfHeading,
  },
  transition: 'fade',
  setup() {
    const { getContentData } = useCategoryContent();
    const { addTags } = useCache();
    const uiHelpers = useUiHelpers();
    const cmsContent = ref('');
    const isShowCms = ref(false);
    const isShowProducts = ref(false);
    const products = ssrRef<Product[]>([]);
    const sortBy = ref({});
    const facets = ref([]);
    const pagination = ref<AgnosticPagination>({});

    const { search: resolveUrl } = useUrlResolver();
    const {
      toggleFilterSidebar,
      changeToCategoryListView,
      changeToCategoryGridView,
      isCategoryGridView,
      isFilterSidebarOpen,
    } = useUiState();
    const {
      addItem: addItemToWishlistBase,
      isInWishlist,
      removeItem: removeItemFromWishlist,
    } = useWishlist();
    const { result, search } = useFacet();
    const { addItemToCart } = useAddToCart();

    const addItemToWishlist = async (product: Product) => {
      await (isInWishlist({ product })
        ? removeItemFromWishlist({ product })
        : addItemToWishlistBase({ product }));
    };

    const searchCategoryProduct = async (categoryId: string) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await search({
        ...uiHelpers.getFacetsFromURL(),
        categoryId,
      });
    };

    const {
      categoryAncestors, isCategoryTreeLoaded, loadCategoryTree, activeCategory,
    } = useTraverseCategory();
    const activeCategoryLabel = computed(() => activeCategory.value?.name ?? '');
    const categoryAncestorsWithoutActiveCategory = computed(() => categoryAncestors.value.slice(0, -1));
    const routeData = ref<EntityUrl>({});

    const { fetch } = useFetch(async () => {
      routeData.value = await resolveUrl();
      const content = await getContentData(routeData.value?.id);
      cmsContent.value = content?.cmsBlock?.content ?? '';
      isShowCms.value = content.isShowCms;
      isShowProducts.value = content.isShowProducts;

      await searchCategoryProduct(routeData.value?.entity_uid);
      products.value = facetGetters.getProducts(result.value) ?? [];
      sortBy.value = facetGetters.getSortOptions(result.value);
      facets.value = facetGetters.getGrouped(
        result.value,
      );
      pagination.value = facetGetters.getPagination(result.value);
      const tags = [{ prefix: CacheTagPrefix.View, value: 'category' }];
      // eslint-disable-next-line no-underscore-dangle
      const productTags = products.value.map((product) => ({
        prefix: CacheTagPrefix.Product,
        value: product.uid,
      }));

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      addTags([...tags, ...productTags]);

      if (!isCategoryTreeLoaded.value) {
        await loadCategoryTree();
      }
    });

    const isPriceLoaded = ref(false);
    onMounted(async () => {
      const { getPricesBySku } = usePrice();
      if (products.value.length > 0) {
        const skus = products.value.map((item) => item.sku);
        const priceData = await getPricesBySku(skus, pagination.value.itemsPerPage);
        products.value = products.value.map((product) => ({
          ...product,
          price_range: priceData.items.find((item) => item.sku === product.sku)?.price_range,
        }));
      }
      isPriceLoaded.value = true;
    });

    const doChangeItemsPerPage = (itemsPerPage: number) => {
      uiHelpers.changeItemsPerPage(itemsPerPage, false);
      fetch();
    };

    return {
      isPriceLoaded,
      ...uiHelpers,
      toggleFilterSidebar,
      isCategoryGridView,
      changeToCategoryListView,
      changeToCategoryGridView,
      isFilterSidebarOpen,
      addItemToCart,
      addItemToWishlist,
      facets,
      pagination,
      products,
      sortBy,
      isShowCms,
      isShowProducts,
      cmsContent,
      categoryAncestorsWithoutActiveCategory,
      activeCategoryLabel,
      routeData,
      doChangeItemsPerPage,
      fetch,
    };
  },
});
</script>

<style lang="scss" scoped>
#category {
  box-sizing: border-box;

  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}
.category-layout {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  @include for-mobile {
    flex-direction: column;
  }

  .column {
    display: flex;
    flex-direction: column;
    flex: 1;

    @include for-mobile {
      flex: auto;
    }

    &.sidebar {
      max-width: 20%;
    }
  }
}

.main {
  &.section {
    padding: var(--spacer-xs);

    @include for-desktop {
      padding: 0;
    }
  }
}

.main {
  display: flex;
}

.breadcrumbs {
  margin-left: var(--spacer-sm);

  @include for-mobile {
    margin-top: var(--spacer-lg)
  }
}

.category-title  {
  margin-left: var(--spacer-sm);
  text-align: left;
}

.sidebar {
  flex: 0 0 15%;
  padding: 0 0 0 var(--spacer-sm);
  border: 1px solid var(--c-light);
  border-width: 0 1px 0 0;
}

.sidebar-filters {
  --overlay-z-index: 3;
  --sidebar-title-display: none;
  --sidebar-top-padding: 0;

  @include for-desktop {
    --sidebar-content-padding: 0 var(--spacer-xl);
    --sidebar-bottom-padding: 0 var(--spacer-xl);
  }
}

.products {
  box-sizing: border-box;
  flex: 1;
  margin: 0;

  @include for-desktop {
    &__pagination {
      display: flex;
      justify-content: flex-start;
      margin: var(--spacer-xl) 0 0 0;
    }
  }

  @include for-mobile {
    &__display-opt {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    &__show-on-page {
      margin-top: 12px;
    }
  }

  &__show-on-page {
    display: flex;
    justify-content: flex-end;
    align-items: baseline;

    &__label {
      font-family: var(--font-family--secondary);
      font-size: var(--font-size--sm);
    }
  }
}

::v-deep .sf-sidebar__aside {
  --sidebar-z-index: 3;
}
</style>
