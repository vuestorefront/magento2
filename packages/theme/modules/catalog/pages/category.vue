<template>
  <div id="category">
    <CmsContent
      v-if="isShowCms"
      :content="cmsContent"
    />
    <CategoryBreadcrumbs
      v-bind="{ categoryAncestors }"
      class="breadcrumbs"
    />
    <CategoryNavbar
      :sort-by="sortBy"
      :pagination="pagination"
      @reloadProducts="fetch"
    />
    <div class="main section">
      <CategorySidebar
        class="sidebar desktop-only"
      />
      <div
        v-if="$fetchState.pending"
        class="products products__grid"
      >
        <div
          v-for="n in productsSkeletons"
          :key="n"
          class="sf-product-card products__product-card"
        >
          <SkeletonLoader :height="`${imageSizes.productCard.height}px`" />
          <SkeletonLoader />
          <SkeletonLoader />
        </div>
      </div>
      <div
        v-else-if="isShowProducts"
        class="products"
      >
        <CategoryEmptyResults v-if="products.length === 0" />
        <transition-group
          v-if="isCategoryGridView"
          appear
          class="products__grid"
          name="products__slide"
          tag="div"
        >
          <SfProductCard
            v-for="(product, i) in products"
            :key="getSlug(product)"
            v-e2e="'category-product-card'"
            image-tag="nuxt-img"
            :image="getMagentoImage(getProductThumbnailImage(product))"
            :image-height="imageSizes.productCard.height"
            :image-width="imageSizes.productCard.width"
            :nuxt-img-config="{
              fit: 'cover',
            }"
            :is-added-to-cart="isInCart({ product })"
            :is-in-wishlist="isInWishlist({ product })"
            :is-in-wishlist-icon="isAuthenticated ? 'heart_fill' : ''"
            :link="
              localePath(
                `/p/${getProductSku(product)}${getSlug(
                  product,
                  product.categories[0]
                )}`
              )
            "
            :regular-price="$fc(getPrice(product).regular)"
            :reviews-count="getTotalReviews(product)"
            :score-rating="getAverageRating(product)"
            :show-add-to-cart-button="true"
            :special-price="
              getPrice(product).special && $fc(getPrice(product).special)
            "
            :style="{ '--index': i }"
            :title="getName(product)"
            :wishlist-icon="isAuthenticated ? 'heart' : ''"
            class="products__product-card"
            @click:wishlist="addItemToWishlist(product)"
            @click:add-to-cart="addItemToCart({ product, quantity: 1 })"
          >
            <template #price>
              <SfPrice
                :class="{ 'display-none': !isPriceLoaded || !$fc(getPrice(product).regular) }"
                class="sf-product-card__price"
                :regular="$fc(getPrice(product).regular)"
                :special="getPrice(product).special && $fc(getPrice(product).special)"
              />
            </template>
          </SfProductCard>
        </transition-group>
        <transition-group
          v-else
          appear
          class="products__list"
          name="products__slide"
          tag="div"
        >
          <SfProductCardHorizontal
            v-for="(product, i) in products"
            :key="getSlug(product)"
            image-tag="nuxt-img"
            :description="getDescription(product)"
            :image="getMagentoImage(getProductThumbnailImage(product))"
            :image-height="imageSizes.productCardHorizontal.height"
            :image-width="imageSizes.productCardHorizontal.width"
            :nuxt-img-config="{
              fit: 'cover',
            }"
            :is-in-wishlist="isInWishlist({ product })"
            :is-in-wishlist-icon="isAuthenticated ? '' : ''"
            :link="
              localePath(
                `/p/${getProductSku(product)}${getSlug(
                  product,
                  product.categories[0]
                )}`
              )
            "
            :regular-price="$fc(getPrice(product).regular)"
            :reviews-count="getTotalReviews(product)"
            :score-rating="getAverageRating(product)"
            :special-price="
              getPrice(product).special && $fc(getPrice(product).special)
            "
            :style="{ '--index': i }"
            :title="getName(product)"
            :wishlist-icon="isAuthenticated ? '' : ''"
            class="products__product-card-horizontal"
            @click:add-to-cart="addItemToCart({ product, quantity: $event })"
            @click:wishlist="addItemToWishlist(product)"
          >
            <template #configuration>
              <SfProperty
                class="desktop-only"
                name="Size"
                style="margin: 0 0 1rem 0"
                value="XS"
              />
              <SfProperty
                class="desktop-only"
                name="Color"
                value="white"
              />
            </template>
            <template #actions>
              <SfButton
                v-if="isAuthenticated"
                class="sf-button--text products__product-card-horizontal__add-to-wishlist"
                @click="addItemToWishlist(product)"
              >
                {{
                  isInWishlist({ product })
                    ? $t('Remove from Wishlist')
                    : $t('Save for later')
                }}
              </SfButton>
            </template>
          </SfProductCardHorizontal>
        </transition-group>
        <div class="products__display-opt">
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
      <CategoryFilters
        v-if="isShowProducts"
        :is-visible="isFilterSidebarOpen"
        :cat-uid="routeData.entity_uid"
        @close="toggleFilterSidebar"
        @reloadProducts="fetch"
      />
    </div>
  </div>
</template>

<script lang="ts">
import LazyHydrate from 'vue-lazy-hydration';
import {
  SfButton,
  SfPagination,
  SfProductCard,
  SfProductCardHorizontal,
  SfProperty,
  SfSelect,
  SfPrice,
} from '@storefront-ui/vue';
import {
  computed,
  defineComponent, onMounted, ref, ssrRef, useFetch,
} from '@nuxtjs/composition-api';
import { CacheTagPrefix, useCache } from '@vue-storefront/cache';
import { facetGetters } from '~/getters';
import {
  getTotalReviews, getSlug, getProductThumbnailImage, getProductSku, getPrice, getAverageRating, getName,
} from '~/getters/productGetters';
import {
  useFacet,
  useUser,
  useWishlist,
  useImage,
  useUiHelpers,
  useUiState,
} from '~/composables';

import { AgnosticPagination } from '~/composables/types';
import { useUrlResolver } from '~/composables/useUrlResolver';
import { useAddToCart } from '~/helpers/cart/addToCart';
import { useCategoryContent } from '~/modules/catalog/category/components/cms/useCategoryContent';
import { usePrice } from '~/modules/catalog/pricing/usePrice';
import SkeletonLoader from '~/components/SkeletonLoader/index.vue';
import CategoryNavbar from '~/modules/catalog/category/components/navbar/CategoryNavbar.vue';
import CategoryBreadcrumbs from '../category/components/breadcrumbs/CategoryBreadcrumbs.vue';
import { useCategoryLogic } from '../category/helpers';
import type { ProductInterface, EntityUrl } from '~/modules/GraphQL/types';
// TODO(addToCart qty, horizontal): https://github.com/vuestorefront/storefront-ui/issues/1606
export default defineComponent({
  name: 'CategoryPage',
  components: {
    CategoryEmptyResults: () => import('~/modules/catalog/category/components/CategoryEmptyResults.vue'),
    CategoryFilters: () => import('~/modules/catalog/category/components/filters/CategoryFilters.vue'),
    SkeletonLoader,
    CategoryNavbar,
    CategoryBreadcrumbs,
    CmsContent: () => import('~/modules/catalog/category/components/cms/CmsContent.vue'),
    CategorySidebar: () => import('~/modules/catalog/category/components/sidebar/CategorySidebar.vue'),
    SfPrice,
    SfButton,
    SfProductCard,
    SfProductCardHorizontal,
    SfPagination,
    SfSelect,
    SfProperty,
    LazyHydrate,
  },
  transition: 'fade',
  setup() {
    const { getContentData } = useCategoryContent();
    const { addTags } = useCache();
    const uiHelpers = useUiHelpers();
    const cmsContent = ref('');
    const isShowCms = ref(false);
    const isShowProducts = ref(false);
    const products = ssrRef<ProductInterface[]>([]);
    const sortBy = ref({});
    const facets = ref([]);
    const pagination = ref<AgnosticPagination>({});

    const { search: resolveUrl } = useUrlResolver();
    const { isAuthenticated } = useUser();
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
    const { addItemToCart, isInCart } = useAddToCart();

    const addItemToWishlist = async (product) => {
      await (isInWishlist({ product })
        ? removeItemFromWishlist({ product })
        : addItemToWishlistBase({ product }));
    };

    const searchCategoryProduct = async (categoryId) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await search({
        ...uiHelpers.getFacetsFromURL(),
        categoryId,
      });
    };

    const { categoryAncestors, isCategoryTreeLoaded, loadCategoryTree } = useCategoryLogic();
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
        products.value = products.value.map((product) => {
          const modifiedProduct = { ...product };
          modifiedProduct.price_range = priceData.items.find((item) => item.sku === product.sku)?.price_range;
          return modifiedProduct;
        });
      }
      isPriceLoaded.value = true;
    });

    const doChangeItemsPerPage = (itemsPerPage: number) => {
      uiHelpers.changeItemsPerPage(itemsPerPage, false);
      fetch();
    };
    const { getMagentoImage, imageSizes } = useImage();
    const productsSkeletons = computed(() => (products.value.length > 0 ? products.value.length : 10));
    return {
      isPriceLoaded,
      getTotalReviews,
      getSlug,
      getProductThumbnailImage,
      getProductSku,
      getPrice,
      getAverageRating,
      getName,
      ...uiHelpers,
      toggleFilterSidebar,
      isCategoryGridView,
      changeToCategoryListView,
      changeToCategoryGridView,
      isFilterSidebarOpen,
      addItemToCart,
      addItemToWishlist,
      facets,
      isAuthenticated,
      isInCart,
      isInWishlist,
      pagination,
      products,
      sortBy,
      getMagentoImage,
      imageSizes,
      isShowCms,
      isShowProducts,
      cmsContent,
      categoryAncestors,
      routeData,
      doChangeItemsPerPage,
      fetch,
      productsSkeletons,
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
   padding: var(--spacer-sm);
 }

.sidebar {
  flex: 0 0 15%;
  padding: var(--spacer-sm);
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

  &__grid {
    justify-content: center;
    @include for-desktop {
      justify-content: flex-start;
    }
  }

  &__grid,
  &__list {
    display: flex;
    flex-wrap: wrap;
  }

  &__product-card {
    --product-card-title-margin: var(--spacer-base) 0 0 0;
    --product-card-title-font-weight: var(--font-weight--medium);
    --product-card-title-margin: var(--spacer-xs) 0 0 0;
    flex: 1 1 50%;
    @include for-desktop {
      --product-card-title-font-weight: var(--font-weight--normal);
      --product-card-add-button-bottom: var(--spacer-base);
      --product-card-title-margin: var(--spacer-sm) 0 0 0;
    }
  }

  &__product-card-horizontal {
    flex: 0 0 100%;
    @include for-mobile {
      ::v-deep .sf-image {
        --image-width: 5.3125rem;
        --image-height: 7.0625rem;
      }
    }

    &__add-to-wishlist {
      @include for-mobile {
        margin: 1rem auto;
      }
      display: block;
    }
  }

  &__slide-enter {
    opacity: 0;
    transform: scale(0.5);
  }

  &__slide-enter-active {
    transition: all 0.2s ease;
    transition-delay: calc(0.1s * var(--index));
  }

  @include for-desktop {
    &__grid {
      margin: var(--spacer-sm) 0 0 var(--spacer-sm);
    }
    &__pagination {
      display: flex;
      justify-content: flex-start;
      margin: var(--spacer-xl) 0 0 0;
    }
    &__product-card-horizontal {
      margin: var(--spacer-lg) 0;
    }
    &__product-card {
      flex: 1 1 25%;
    }
    &__list {
      margin: 0 0 0 var(--spacer-sm);
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

.loading {
  margin: var(--spacer-3xl) auto;
  @include for-desktop {
    margin-top: 6.25rem;
  }

  &--categories {
    @include for-desktop {
      margin-top: 3.75rem;
    }
  }
}

::v-deep .sf-sidebar__aside {
  --sidebar-z-index: 3;
}
</style>
