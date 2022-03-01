<template>
  <div id="category">
    <CmsContent
      v-if="isShowCms && !$fetchState.pending"
      :content="cmsContent"
    />
    <CategoryNavbar
      v-if="isShowProducts"
      :sort-by="sortBy"
      :pagination="pagination"
    />
    <div class="main section">
      <CategorySidebar
        v-if="isShowProducts"
        class="sidebar desktop-only"
      />

      <SfLoader
        :class="{ loading: $fetchState.pending }"
        :loading="$fetchState.pending"
      >
        <div v-if="isShowProducts && !$fetchState.pending">
          <EmptyResults v-if="products.length === 0" />
          <div
            v-else
            class="products"
          >
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
                :image="getMagentoImage(getProductThumbnailImage(product))"
                :image-height="imageSizes.productCard.height"
                :image-width="imageSizes.productCard.width"
                :is-added-to-cart="isInCart({ product })"
                :is-in-wishlist="isInWishlist({ product })"
                :is-in-wishlist-icon="isAuthenticated ? 'heart_fill' : ''"
                :link="
                  localePath(
                    `/p/${getProductSku(
                      product
                    )}${getSlug(product, product.categories[0])}`
                  )
                "
                :regular-price="$fc(getPrice(product).regular)"
                :reviews-count="getTotalReviews(product)"
                :score-rating="getAverageRating(product)"
                :show-add-to-cart-button="true"
                :special-price="getPrice(product).special && $fc(getPrice(product).special)"
                :style="{ '--index': i }"
                :title="getName(product)"
                :wishlist-icon="isAuthenticated ? 'heart' : ''"
                class="products__product-card"
                @click:wishlist="addItemToWishlist(product)"
                @click:add-to-cart="addItemToCart({ product, quantity: 1 })"
              >
                <template #image="imageSlotProps">
                  <SfButton
                    :link="imageSlotProps.link"
                    aria-label="Go To Product"
                    class="sf-button--pure sf-product-card__link"
                    data-testid="product-link"
                    v-on="$listeners"
                  >
                    <template v-if="Array.isArray(imageSlotProps.image)">
                      <nuxt-img
                        v-for="(picture, key) in imageSlotProps.image.slice(0, 2)"
                        :key="key"
                        :alt="imageSlotProps.title"
                        :height="imageSlotProps.imageHeight"
                        :src="picture"
                        :width="imageSlotProps.imageWidth"
                        class="sf-product-card__picture"
                      />
                    </template>
                    <nuxt-img
                      v-else
                      :alt="imageSlotProps.title"
                      :height="imageSlotProps.imageHeight"
                      :src="imageSlotProps.image"
                      :width="imageSlotProps.imageWidth"
                      class="sf-product-card__image lol"
                    />
                  </SfButton>
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
                :description="getDescription(product)"
                :image="getMagentoImage(getProductThumbnailImage(product))"
                :image-height="imageSizes.productCardHorizontal.height"
                :image-width="imageSizes.productCardHorizontal.width"
                :is-in-wishlist="isInWishlist({product})"
                :is-in-wishlist-icon="isAuthenticated ? '' : ''"
                :link="
                  localePath(
                    `/p/${getProductSku(
                      product
                    )}${getSlug(product, product.categories[0])}`
                  )
                "
                :regular-price="$fc(getPrice(product).regular)"
                :reviews-count="getTotalReviews(product)"
                :score-rating="getAverageRating(product)"
                :special-price="getPrice(product).special && $fc(getPrice(product).special)"
                :style="{ '--index': i }"
                :title="getName(product)"
                :wishlist-icon="isAuthenticated ? '' : ''"
                class="products__product-card-horizontal"
                @click:add-to-cart="addItemToCart({ product, quantity: 1 })"
                @click:wishlist="addItemToWishlist(product)"
              >
                <template #image="imageSlotProps">
                  <SfLink
                    :link="imageSlotProps.link"
                    class="
                    sf-product-card-horizontal__link
                    sf-product-card-horizontal__link--image
                  "
                  >
                    <template v-if="Array.isArray(imageSlotProps.image)">
                      <SfImage
                          v-for="(picture, key) in imageSlotProps.image.slice(0, 2)"
                          :key="key"
                          image-tag="nuxt-img"
                          :src="picture"
                          :alt="imageSlotProps.title"
                          :width="imageSlotProps.imageWidth"
                          :height="imageSlotProps.imageHeight"
                          class="sf-product-card-horizontal__picture"
                      />
                    </template>
                    <SfImage
                        v-else
                        image-tag="nuxt-img"
                        :src="imageSlotProps.image"
                        :alt="imageSlotProps.title"
                        :width="imageSlotProps.imageWidth"
                        :height="imageSlotProps.imageHeight"
                        class="sf-product-card-horizontal__image"
                    />
                  </SfLink>
                </template>
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
                    {{ isInWishlist({ product }) ? $t('Remove from Wishlist') : $t('Save for later') }}
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
                <span class="products__show-on-page__label">{{ $t('Show') }}</span>
                <LazyHydrate on-interaction>
                  <SfSelect
                    :value="pagination.itemsPerPage.toString()"
                    class="products__items-per-page"
                    @input="changeItemsPerPage"
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
      </SfLoader>

      <LazyHydrate when-idle>
        <SfSidebar
          v-if="isShowProducts && products.length > 0"
          :visible="isFilterSidebarOpen"
          class="sidebar-filters"
          title="Filters"
          @close="toggleFilterSidebar"
        >
          <div class="filters desktop-only">
            <div
              v-for="(facet, i) in facets"
              :key="i"
            >
              <SfHeading
                :key="`filter-title-${facet.id}`"
                :level="4"
                :title="facet.label"
                class="filters__title sf-heading--left"
              />
              <div
                v-if="isFacetColor(facet)"
                :key="`${facet.id}-colors`"
                class="filters__colors"
              >
                <SfColor
                  v-for="option in facet.options"
                  :key="`${facet.id}-${option.value}`"
                  :color="option.attrName"
                  :selected="isFilterSelected(facet, option)"
                  class="filters__color"
                  @click="() => selectFilter(facet, option)"
                />
              </div>
              <div v-else-if="facet.id === 'price'">
                <SfRadio
                  v-for="option in facet.options"
                  :key="`${facet.id}-${option.value}`"
                  :label="`${option.id}${option.count ? ` (${option.count})` : ''}`"
                  :selected="isFilterSelected(facet, option)"
                  :value="option.value"
                  name="filter__price"
                  @change="() => selectFilter(facet, option)"
                />
              </div>
              <div v-else>
                <SfFilter
                  v-for="option in facet.options"
                  :key="`${facet.id}-${option.value}`"
                  :label="option.id + `${option.count ? ` (${option.count})` : ''}`"
                  :selected="isFilterSelected(facet, option)"
                  class="filters__item"
                  @change="() => selectFilter(facet, option)"
                />
              </div>
            </div>
          </div>
          <SfAccordion class="filters smartphone-only">
            <div
              v-for="(facet, i) in facets"
              :key="i"
            >
              <SfAccordionItem
                :key="`filter-title-${facet.id}`"
                :header="facet.label"
                class="filters__accordion-item"
              >
                <div v-if="facet.id === 'price'">
                  <SfRadio
                    v-for="option in facet.options"
                    :key="`${facet.id}-${option.value}`"
                    :label="`${option.id}${option.count ? ` (${option.count})` : ''}`"
                    :selected="isFilterSelected(facet, option)"
                    :value="option.value"
                    name="filter__price"
                    @change="() => selectFilter(facet, option)"
                  />
                </div>
                <div v-else>
                  <SfFilter
                    v-for="option in facet.options"
                    :key="`${facet.id}-${option.id}`"
                    :label="option.id"
                    :selected="isFilterSelected(facet, option)"
                    class="filters__item"
                    @change="() => selectFilter(facet, option)"
                  />
                </div>
              </SfAccordionItem>
            </div>
          </SfAccordion>
          <template #content-bottom>
            <div class="filters__buttons">
              <SfButton
                class="sf-button--full-width"
                @click="applyFilters()"
              >
                {{ $t('Done') }}
              </SfButton>
              <SfButton
                class="sf-button--full-width filters__button-clear"
                @click="applyFilters({})"
              >
                {{ $t('Clear all') }}
              </SfButton>
            </div>
          </template>
        </SfSidebar>
      </LazyHydrate>
    </div>
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration';
import {
  SfAccordion,
  SfButton,
  SfColor,
  SfFilter,
  SfHeading,
  SfImage,
  SfLink,
  SfLoader,
  SfPagination,
  SfProductCard,
  SfProductCardHorizontal,
  SfProperty,
  SfRadio,
  SfSelect,
  SfSidebar,
} from '@storefront-ui/vue';
import {
  defineComponent, ref, useFetch,
} from '@nuxtjs/composition-api';
import {
  facetGetters, productGetters, useFacet, useUser, useWishlist,
} from '@vue-storefront/magento';
import { useVSFContext } from '@vue-storefront/core';
import { CacheTagPrefix, useCache } from '@vue-storefront/cache';
import { useUrlResolver } from '~/composables/useUrlResolver.ts';
import { useImage, useUiHelpers, useUiState } from '~/composables';
import cacheControl from '~/helpers/cacheControl';
import { useAddToCart } from '~/helpers/cart/addToCart';
import useCategoryContent from '~/components/Category/useCategoryContent.ts';

// TODO(addToCart qty, horizontal): https://github.com/vuestorefront/storefront-ui/issues/1606
export default defineComponent({
  name: 'CategoryPage',
  components: {
    CategoryNavbar: () => import('~/components/Category/CategoryNavbar.vue'),
    CmsContent: () => import('~/components/Category/CmsContent.vue'),
    CategorySidebar: () => import('~/components/Category/CategorySidebar'),
    EmptyResults: () => import('~/components/Category/EmptyResults'),
    LazyHydrate,
    SfAccordion,
    SfButton,
    SfColor,
    SfFilter,
    SfHeading,
    SfImage,
    SfLink,
    SfLoader,
    SfPagination,
    SfProductCard,
    SfProductCardHorizontal,
    SfProperty,
    SfRadio,
    SfSelect,
    SfSidebar,
  },
  middleware: cacheControl({
    'max-age': 60,
    'stale-when-revalidate': 5,
  }),
  transition: 'fade',
  setup() {
    const { getContentData } = useCategoryContent();
    const { addTags } = useCache();
    const uiHelpers = useUiHelpers();
    const uiState = useUiState();

    const cmsContent = ref('');
    const isShowCms = ref(false);
    const isShowProducts = ref(false);
    const products = ref([]);
    const sortBy = ref({});
    const facets = ref([]);
    const pagination = ref({});

    const {
      path,
      result: routeData,
      search: resolveUrl,
    } = useUrlResolver();
    const { $magento: { config: magentoConfig } } = useVSFContext();
    const { isAuthenticated } = useUser();
    const {
      addItem: addItemToWishlistBase,
      isInWishlist,
      removeItem: removeItemFromWishlist,
    } = useWishlist('GlobalWishlist');
    const {
      result,
      search,
    } = useFacet(`facetId:${path}`);
    const { toggleFilterSidebar } = useUiState();
    const {
      addItemToCart,
      isInCart,
    } = useAddToCart();

    const getSelectedFilterValues = () => {
      const selectedFilterValues = Object.fromEntries(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        (magentoConfig.facets.available)
          .map((curr) => [curr, (curr === 'price' ? '' : [])]),
      );
      const { filters } = uiHelpers.getFacetsFromURL();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      Object.keys(filters)
        .forEach((filter) => {
          if (filter === 'price') {
            selectedFilterValues[filter] = filters[filter][0];
          } else {
            selectedFilterValues[filter] = filters[filter];
          }
        });
      return selectedFilterValues;
    };
    const selectedFilters = ref(getSelectedFilterValues());

    const isFilterSelected = (facet, option) => {
      if (facet.id === 'price') {
        return selectedFilters.value[facet.id] || '';
      }

      return (selectedFilters.value[facet.id] || []).includes(option.value);
    };

    /* eslint-disable */
    const selectFilter = (facet, option) => {
      if (facet.id === 'price') {
        // eslint-disable-next-line
        selectedFilters.value[facet.id] = option.value;
        return;
      }

      if (!selectedFilters.value[facet.id]) {
        selectedFilters.value[facet.id] = [];
      }

      if (selectedFilters.value[facet.id].find((f) => f === option.value)) {
        selectedFilters.value[facet.id] = selectedFilters.value[
          facet.id
          ]?.filter((f) => f !== option.value);
        return;
      }

      selectedFilters.value[facet.id].push(option.value);
    };
    /* eslint-enable */

    const applyFilters = (filters) => {
      toggleFilterSidebar();
      if (filters) {
        selectedFilters.value = filters;
      }

      uiHelpers.changeFilters(selectedFilters.value);
    };

    const addItemToWishlist = async (product) => {
      await (
        isInWishlist({ product })
          ? removeItemFromWishlist({ product })
          : addItemToWishlistBase({ product })
      );
    };

    const searchCategoryProduct = async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await search({
        ...uiHelpers.getFacetsFromURL(),
        categoryId: routeData.value?.entity_uid,
      });
    };

    useFetch(async () => {
      await resolveUrl();
      const [content] = await Promise.all([getContentData(routeData.value?.id), searchCategoryProduct()]);
      cmsContent.value = content?.cmsBlock?.content ?? '';
      isShowCms.value = content.isShowCms;
      isShowProducts.value = content.isShowProducts;
      selectedFilters.value = getSelectedFilterValues();
      products.value = facetGetters.getProducts(result.value) ?? [];
      sortBy.value = facetGetters.getSortOptions(result.value);
      facets.value = facetGetters.getGrouped(result.value, magentoConfig.facets.available);
      pagination.value = facetGetters.getPagination(result.value);

      const tags = [{ prefix: CacheTagPrefix.View, value: 'category' }];
      // eslint-disable-next-line no-underscore-dangle
      const productTags = products.value.map((product) => ({ prefix: CacheTagPrefix.Product, value: product.uid }));

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      addTags([...tags, ...productTags]);
    });

    const {
      getMagentoImage,
      imageSizes,
    } = useImage();

    return {
      routeData,
      ...productGetters,
      ...uiHelpers,
      ...uiState,
      addItemToCart,
      addItemToWishlist,
      applyFilters,
      facets,
      isAuthenticated,
      isFilterSelected,
      isInCart,
      isInWishlist,
      pagination,
      products,
      selectedFilters,
      selectFilter,
      sortBy,
      getMagentoImage,
      imageSizes,
      isShowCms,
      isShowProducts,
      cmsContent,
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

.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
}

.sort-by {
  flex: unset;
  width: 11.875rem;
}

.main {
  display: flex;
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
      display: block
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

.filters {
  &__title {
    --heading-title-font-size: var(--font-size--xl);
    margin: var(--spacer-xl) 0 var(--spacer-base) 0;

    &:first-child {
      margin: calc(var(--spacer-xl) + var(--spacer-base)) 0 var(--spacer-xs) 0;
    }
  }

  &__colors {
    display: flex;
  }

  &__color {
    margin: var(--spacer-xs) var(--spacer-xs) var(--spacer-xs) 0;
  }

  &__chosen {
    color: var(--c-text-muted);
    font-weight: var(--font-weight--normal);
    font-family: var(--font-family--secondary);
    position: absolute;
    right: var(--spacer-xl);
  }

  &__item {
    --radio-container-padding: 0 var(--spacer-sm) 0 var(--spacer-xl);
    --radio-background: transparent;
    --filter-label-color: var(--c-secondary-variant);
    --filter-count-color: var(--c-secondary-variant);
    --checkbox-padding: 0 var(--spacer-sm) 0 var(--spacer-xl);
    padding: var(--spacer-sm) 0;
    border-bottom: 1px solid var(--c-light);

    &:last-child {
      border-bottom: 0;
    }

    @include for-desktop {
      --checkbox-padding: 0;
      margin: var(--spacer-sm) 0;
      border: 0;
      padding: 0;
    }
  }

  &__accordion-item {
    --accordion-item-content-padding: 0;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    width: 100vw;
  }

  &__buttons {
    margin: var(--spacer-sm) 0;
  }

  &__button-clear {
    --button-background: var(--c-light);
    --button-color: var(--c-dark-variant);
    margin: var(--spacer-xs) 0 0 0;
  }
}
</style>
