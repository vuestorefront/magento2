<template>
  <div id="category">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <div class="navbar section">
      <div class="navbar__aside desktop-only">
        <LazyHydrate never>
          <SfHeading
            :level="3"
            :title="$t('Categories')"
            class="navbar__title"
          />
        </LazyHydrate>
      </div>

      <div class="navbar__main">
        <LazyHydrate on-interaction>
          <SfButton
            class="sf-button--text navbar__filters-button"
            aria-label="Filters"
            @click="toggleFilterSidebar"
          >
            <SfIcon
              size="24px"
              color="dark-secondary"
              icon="filter2"
              class="navbar__filters-icon"
            />
            {{ $t('Filters') }}
          </SfButton>
        </LazyHydrate>

        <div class="navbar__sort desktop-only">
          <span class="navbar__label">{{ $t('Sort by') }}:</span>
          <LazyHydrate on-interaction>
            <SfSelect
              :value="sortBy.selected"
              placeholder="Select sorting"
              class="navbar__select"
              @input="th.changeSorting"
            >
              <SfSelectOption
                v-for="option in sortBy.options"
                :key="option.value"
                :value="option.value"
                class="sort-by__option"
              >
                {{ $t(option.label) }}
              </SfSelectOption>
            </SfSelect>
          </LazyHydrate>
        </div>

        <div class="navbar__counter">
          <span class="navbar__label desktop-only">{{ $t('Products found') }}</span>
          <span class="desktop-only">{{ pagination.totalItems }}</span>
          <span class="navbar__label smartphone-only">{{ pagination.totalItems }} {{
            $t('Items')
          }}</span>
        </div>

        <div class="navbar__view">
          <span class="navbar__view-label desktop-only">{{ $t('View') }}</span>
          <SfIcon
            class="navbar__view-icon"
            :color="isCategoryGridView ? 'black' : 'dark-secondary'"
            icon="tiles"
            size="12px"
            role="button"
            aria-label="Change to grid view"
            :aria-pressed="isCategoryGridView"
            @click="changeToCategoryGridView"
          />
          <SfIcon
            class="navbar__view-icon"
            :color="!isCategoryGridView ? 'black' : 'dark-secondary'"
            icon="list"
            size="12px"
            role="button"
            aria-label="Change to list view"
            :aria-pressed="!isCategoryGridView"
            @click="changeToCategoryListView"
          />
        </div>
      </div>
    </div>

    <div class="main section">
      <div class="sidebar desktop-only">
        <LazyHydrate when-idle>
          <SfLoader
            :class="{ 'loading--categories': categoriesLoading }"
            :loading="categoriesLoading"
          >
            <SfAccordion
              :open="activeCategory"
              :show-chevron="true"
            >
              <SfAccordionItem
                v-for="(cat, i) in categoryTree && categoryTree.items"
                :key="i"
                :header="cat.label"
              >
                <SfList class="list">
                  <SfListItem class="list__item">
                    <SfMenuItem
                      :count="cat.count || ''"
                      :label="cat.label"
                    >
                      <template #label>
                        <nuxt-link
                          :to="localePath(th.getAgnosticCatLink(cat))"
                          :class="cat.isCurrent ? 'sidebar--cat-selected' : ''"
                        >
                          All
                        </nuxt-link>
                      </template>
                    </SfMenuItem>
                  </SfListItem>
                  <SfListItem
                    v-for="(subCat, j) in cat.items"
                    :key="j"
                    class="list__item"
                  >
                    <SfMenuItem
                      :count="subCat.count || ''"
                      :label="subCat.label"
                    >
                      <template #label="{ label }">
                        <nuxt-link
                          :to="localePath(th.getAgnosticCatLink(subCat))"
                          :class="subCat.isCurrent ? 'sidebar--cat-selected' : ''"
                        >
                          {{ label }}
                        </nuxt-link>
                      </template>
                    </SfMenuItem>
                  </SfListItem>
                </SfList>
              </SfAccordionItem>
            </SfAccordion>
          </SfLoader>
        </LazyHydrate>
      </div>
      <SfLoader
        :class="{ loading }"
        :loading="loading"
      >
        <div
          v-if="!loading"
          class="products"
        >
          <transition-group
            v-if="isCategoryGridView"
            appear
            name="products__slide"
            tag="div"
            class="products__grid"
          >
            <SfProductCard
              v-for="(product, i) in products"
              :key="productGetters.getSlug(product)"
              v-e2e="'category-product-card'"
              class="products__product-card"
              :style="{ '--index': i }"
              :title="productGetters.getName(product)"
              :image="productGetters.getProductThumbnailImage(product)"
              :regular-price="$n(productGetters.getPrice(product).regular, 'currency')"
              :special-price="productGetters.getPrice(product).special && $n(productGetters.getPrice(product).special, 'currency')"
              :score-rating="productGetters.getAverageRating(product)"
              :reviews-count="productGetters.getTotalReviews(product)"
              :show-add-to-cart-button="true"
              :is-added-to-cart="isInCart({ product })"
              :is-on-wishlist="product.isInWishlist"
              :link="
                localePath(
                  `/p/${productGetters.getProductSku(
                    product
                  )}${productGetters.getSlug(product, product.categories[0])}`
                )
              "
              @click:wishlist="addItemToWishlist(product)"
              @click:add-to-cart="addItemToCart({ product, quantity: 1 })"
            />
          </transition-group>
          <transition-group
            v-else
            appear
            name="products__slide"
            tag="div"
            class="products__list"
          >
            <SfProductCardHorizontal
              v-for="(product, i) in products"
              :key="productGetters.getSlug(product)"
              class="products__product-card-horizontal"
              :style="{ '--index': i }"
              :title="productGetters.getName(product)"
              :description="productGetters.getDescription(product)"
              :image="productGetters.getProductThumbnailImage(product)"
              :regular-price="$n(productGetters.getPrice(product).regular, 'currency')"
              :special-price="productGetters.getPrice(product).special && $n(productGetters.getPrice(product).special, 'currency')"
              :score-rating="productGetters.getAverageRating(product)"
              :reviews-count="productGetters.getTotalReviews(product)"
              :is-on-wishlist="product.isInWishlist"
              :link="
                localePath(
                  `/p/${productGetters.getProductSku(
                    product
                  )}${productGetters.getSlug(product, product.categories[0])}`
                )
              "
              @click:wishlist="addItemToWishlist(product)"
              @click:add-to-cart="addItemToCart({ product, quantity: 1 })"
            >
              <template #configuration>
                <SfProperty
                  class="desktop-only"
                  name="Size"
                  value="XS"
                  style="margin: 0 0 1rem 0"
                />
                <SfProperty
                  class="desktop-only"
                  name="Color"
                  value="white"
                />
              </template>
              <template #actions>
                <SfButton
                  class="sf-button--text desktop-only"
                  style="margin: 0 0 1rem auto; display: block"
                >
                  {{ $t('Save for later') }}
                </SfButton>
              </template>
            </SfProductCardHorizontal>
          </transition-group>

          <LazyHydrate on-interaction>
            <SfPagination
              v-if="!loading"
              v-show="pagination.totalPages > 1"
              class="products__pagination desktop-only"
              :current="pagination.currentPage"
              :total="pagination.totalPages"
              :visible="5"
            />
          </LazyHydrate>

          <div
            v-show="pagination.totalPages > 1"
            class="products__show-on-page"
          >
            <span class="products__show-on-page__label">{{ $t('Show on page') }}</span>
            <LazyHydrate on-interaction>
              <SfSelect
                :value="pagination.itemsPerPage.toString()"
                class="products__items-per-page"
                @input="th.changeItemsPerPage"
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
      </SfLoader>
    </div>

    <LazyHydrate when-idle>
      <SfSidebar
        :visible="isFilterSidebarOpen"
        title="Filters"
        class="sidebar-filters"
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
                :value="option.value"
                :selected="isFilterSelected(facet, option)"
                name="priceFilter"
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
              <SfFilter
                v-for="option in facet.options"
                :key="`${facet.id}-${option.id}`"
                :label="option.id"
                :selected="isFilterSelected(facet, option)"
                class="filters__item"
                @change="() => selectFilter(facet, option)"
              />
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
</template>

<script lang="ts">
import findDeep from 'deepdash/findDeep';
import LazyHydrate from 'vue-lazy-hydration';
import {
  SfSidebar,
  SfButton,
  SfList,
  SfIcon,
  SfHeading,
  SfMenuItem,
  SfFilter,
  SfRadio,
  SfProductCard,
  SfProductCardHorizontal,
  SfPagination,
  SfAccordion,
  SfSelect,
  SfBreadcrumbs,
  SfLoader,
  SfColor,
  SfProperty,
} from '@storefront-ui/vue';
import {
  ref,
  computed,
  defineComponent,
} from '@vue/composition-api';
import {
  useCart,
  useWishlist,
  productGetters,
  useFacet,
  useCategory,
  categoryGetters,
  facetGetters,
  useUrlResolver,
} from '@vue-storefront/magento';
import { onSSR, useVSFContext } from '@vue-storefront/core';
import { useUiHelpers, useUiState } from '~/composables';
import { useVueRouter } from '~/helpers/hooks/useVueRouter';
import cacheControl from '~/helpers/cacheControl';

// TODO(addToCart qty, horizontal): https://github.com/vuestorefront/storefront-ui/issues/1606
export default defineComponent({
  components: {
    SfButton,
    SfSidebar,
    SfIcon,
    SfList,
    SfFilter,
    SfRadio,
    SfProductCard,
    SfProductCardHorizontal,
    SfPagination,
    SfMenuItem,
    SfAccordion,
    SfSelect,
    SfBreadcrumbs,
    SfLoader,
    SfColor,
    SfHeading,
    SfProperty,
    LazyHydrate,
  },
  middleware: cacheControl({
    'max-age': 60,
    'stale-when-revalidate': 5,
  }),
  transition: 'fade',
  setup(props, context) {
    const {
      router,
      route,
    } = useVueRouter();
    const { path } = route;
    const th = useUiHelpers();
    const uiState = useUiState();
    const { $magento: { config: magentoConfig } } = useVSFContext();
    const {
      addItem: addItemToCartBase,
      isInCart,
    } = useCart();
    const {
      addItem: addItemToWishlistBase,
      isInWishlist,
      removeItem: removeItemFromWishlist,
    } = useWishlist();
    const {
      result,
      search,
      loading,
    } = useFacet(`facetId:${path}`);
    const {
      changeFilters,
      isFacetColor,
    } = useUiHelpers();
    const { toggleFilterSidebar } = useUiState();
    const {
      categories,
      search: categoriesSearch,
      loading: categoriesLoading,
    } = useCategory(`categoryList:${path}`);

    const {
      search: routeSearch,
      result: routeData,
    } = useUrlResolver(`router:${path}`);

    const selectedFilters = ref(Object.fromEntries((magentoConfig.facets.available).map((curr) => [curr, (curr === 'price' ? '' : [])])));

    const products = computed(() => facetGetters
      .getProducts(result.value)
      .map((product) => ({
        ...product,
        isInWishlist: isInWishlist({ product }),
      })));

    const categoryTree = computed(() => categoryGetters.getCategoryTree(
      categories.value?.[0],
      routeData.value?.entity_uid,
      false,
    ));
    const breadcrumbs = computed(() => facetGetters.getBreadcrumbs(result.value));

    const sortBy = computed(() => facetGetters.getSortOptions(result.value));
    const facets = computed(() => facetGetters.getGrouped(result.value, magentoConfig.facets.available));

    const pagination = computed(() => facetGetters.getPagination(result.value));

    const activeCategory = computed(() => {
      const items = categoryTree.value?.items;

      if (!items) {
        return '';
      }

      const category = items.find((cat) => cat.isCurrent || cat.items.find((c) => c.isCurrent));

      return category?.label || items[0]?.label;
    });

    const activeCategoryUid = (categoryUid) => {
      const items = categoryTree.value?.items;

      if (!items) {
        return '';
      }

      const categoryDeep = findDeep(
        categoryTree.value?.items,
        (value, key, parentValue, _deepCtx) => {
          const hasUid = key === '0' && value && Array.isArray(parentValue);

          return hasUid ? value === categoryUid : false;
        },
      );

      const categoryUidResult = categoryDeep?.parent.length === 1
        ? categoryDeep?.parent[0]
        : categoryDeep?.parent;

      return categoryUidResult || items[0]?.uid;
    };

    const isFilterSelected = (facet, option) => {
      if (facet.id === 'price') {
        return selectedFilters.value[facet.id];
      }
      return (selectedFilters.value[facet.id] || []).includes(option.value);
    };

    const selectFilter = (facet, option) => {
      if (facet.id === 'price') {
        selectedFilters.value[facet.id] = option.value;
        return;
      }

      if (!selectedFilters.value[facet.id]) {
        selectedFilters.value[facet.id] = [];
      }

      if (selectedFilters.value[facet.id].find((f) => f === option.value)) {
        selectedFilters.value[facet.id] = selectedFilters.value[
          facet.id
        ].filter((f) => f !== option.value);

        return;
      }

      selectedFilters.value[facet.id].push(option.value);
    };

    const applyFilters = (filters) => {
      toggleFilterSidebar();

      if (filters) {
        selectedFilters.value = filters;
      }

      changeFilters(selectedFilters.value);
    };

    const addItemToCart = async ({
      product,
      quantity,
    }) => {
      // eslint-disable-next-line no-underscore-dangle
      const productType = product.__typename;

      switch (productType) {
        case 'SimpleProduct':
          await addItemToCartBase({
            product,
            quantity,
          });
          break;
        case 'BundleProduct':
        case 'ConfigurableProduct':
          await router.push(`/p/${productGetters.getProductSku(product)}${productGetters.getSlug(
            product,
            product.categories[0],
          )}`);
          break;
        default:
          throw new Error(`Product Type ${productType} not supported in add to cart yet`);
      }
    };

    const addItemToWishlist = async (product) => {
      await (
        isInWishlist({ product })
          ? removeItemFromWishlist({ product })
          : addItemToWishlistBase({ product })
      );
    };

    onSSR(async () => {
      await routeSearch(path);

      if (!routeData?.value) context.root.$nuxt.error({ statusCode: 404 });

      if (routeData?.value) {
        await categoriesSearch({
          pageSize: 100,
        });

        await search({
          ...th.getFacetsFromURL(),
          categoryId: activeCategoryUid(routeData.value?.entity_uid),
        });

        if (facets.value.length > 0) {
          selectedFilters.value = facets.value.reduce(
            (prev, curr) => (curr.id === 'price'
              ? {
                ...prev,
                [curr.id]: curr.options.find((o) => o.selected)?.value,
              }
              : {
                ...prev,
                [curr.id]: curr.options
                  .filter((o) => o.selected)
                  .map((o) => o.value),
              }),
            {},
          );
        }
      }
    });

    return {
      ...uiState,
      activeCategory,
      addItemToCart,
      addItemToWishlist,
      applyFilters,
      breadcrumbs,
      categories,
      categoriesLoading,
      categoryTree,
      facets,
      isFacetColor,
      isFilterSelected,
      isInCart,
      isInWishlist,
      loading,
      pagination,
      productGetters,
      products,
      selectedFilters,
      selectFilter,
      sortBy,
      th,
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

.navbar {
  position: relative;
  display: flex;
  border: 1px solid var(--c-light);
  border-width: 0 0 1px 0;
  @include for-desktop {
    border-width: 1px 0 1px 0;
  }

  &.section {
    padding: var(--spacer-sm);
    @include for-desktop {
      padding: 0;
    }
  }

  &__aside,
  &__main {
    display: flex;
    align-items: center;
    padding: var(--spacer-sm) 0;
  }

  &__aside {
    flex: 0 0 15%;
    padding: var(--spacer-sm) var(--spacer-sm);
    border: 1px solid var(--c-light);
    border-width: 0 1px 0 0;
  }

  &__main {
    flex: 1;
    padding: 0;
    justify-content: space-between;
    @include for-desktop {
      padding: var(--spacer-xs) var(--spacer-xl);
    }
  }

  &__title {
    --heading-title-font-weight: var(--font-weight--semibold);
    --heading-title-font-size: var(--font-size--xl);
  }

  &__filters-icon {
    margin: 0 0 0 var(--spacer-xs);
    order: 1;
    @include for-desktop {
      margin: 0 var(--spacer-xs) 0 0;
      order: 0;
    }
  }

  &__filters-button {
    display: flex;
    align-items: center;
    --button-font-size: var(--font-size--base);
    --button-text-decoration: none;
    --button-color: var(--c-link);
    --button-font-weight: var(--font-weight--normal);
    @include for-mobile {
      --button-font-weight: var(--font-weight--medium);
      order: 2;
    }

    svg {
      fill: var(--c-text-muted);
      transition: fill 150ms ease;
    }

    &:hover {
      svg {
        fill: var(--c-primary);
      }
    }
  }

  &__label {
    font-family: var(--font-family--secondary);
    font-weight: var(--font-weight--normal);
    color: var(--c-text-muted);
    @include for-desktop {
      color: var(--c-link);
      margin: 0 var(--spacer-2xs) 0 0;
    }
  }

  &__select {
    --select-width: 220px;
    --select-padding: 0;
    --select-height: auto;
    --select-selected-padding: 0 var(--spacer-lg) 0 var(--spacer-2xs);
    --select-margin: 0;
    --select-option-font-size: var(--font-size-sm);
    --select-error-message-height: 0;

    ::v-deep .sf-select__dropdown {
      font-size: var(--font-size-sm);
      font-family: var(--font-family--secondary);
      font-weight: var(--font-weight--light);
      margin: 0;
    }

    ::v-deep .sf-select__placeholder {
      --select-option-font-size: var(--font-size-sm);
    }
  }

  &__sort {
    display: flex;
    align-items: center;
    margin: 0 auto 0 var(--spacer-2xl);
  }

  &__counter {
    font-family: var(--font-family--secondary);
    order: 1;
    @include for-desktop {
      margin: auto 0 auto auto;
      order: 0;
    }
  }

  &__view {
    display: flex;
    align-items: center;
    order: 0;
    @include for-desktop {
      margin: 0 0 0 var(--spacer-2xl);
      order: 0;
    }

    &-icon {
      cursor: pointer;
      margin: 0 var(--spacer-base) 0 0;

      &:last-child {
        margin: 0;
      }
    }

    &-label {
      margin: 0 var(--spacer-sm) 0 0;
      font: var(--font-weight--normal) var(--font-size--base) / 1.6 var(--font-family--secondary);
      text-decoration: none;
      color: var(--c-link);
    }
  }
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

.list {
  --menu-item-font-size: var(--font-size--sm);

  &__item {
    &:not(:last-of-type) {
      --list-item-margin: 0 0 var(--spacer-sm) 0;
    }

    .nuxt-link-exact-active {
      text-decoration: underline;
    }
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
