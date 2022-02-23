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
            :aria-label="$t('Filters')"
            @click="toggleFilterSidebar"
          >
            <SvgImage
              icon="filter2"
              width="24"
              height="24"
              class="navbar__filters-icon"
            />
            {{ $t('Filters') }}
          </SfButton>
        </LazyHydrate>

        <div class="navbar__sort">
          <span class="navbar__label desktop-only">{{ $t('Sort by') }}:</span>
          <LazyHydrate when-visible>
            <SfSelect
              :value="sortBy.selected"
              placeholder="Select sorting"
              class="navbar__select"
              @input="uiHelpers.changeSorting"
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
          <SvgImage
            icon="tiles"
            :label="$t('Change to grid view')"
            :aria-pressed="isCategoryGridView"
            width="12"
            height="12"
            class="navbar__view-icon"
            :class="{ 'navbar__view-icon--active': isCategoryGridView }"
            @click.native="changeToCategoryGridView"
          />
          <SvgImage
            icon="list"
            :label="$t('Change to list view')"
            :aria-pressed="!isCategoryGridView"
            width="12"
            height="12"
            class="navbar__view-icon"
            :class="{ 'navbar__view-icon--active': !isCategoryGridView }"
            @click.native="changeToCategoryListView"
          />
        </div>
      </div>
    </div>

    <div class="main section">
      <div class="sidebar desktop-only">
        <SfLoader
          :class="{ loading: isCategoriesLoading }"
          :loading="isCategoriesLoading"
        >
          <LazyHydrate when-visible>
            <category-sidebar-menu
              :no-fetch="true"
            />
          </LazyHydrate>
        </SfLoader>
      </div>
      <SfLoader
        :class="{ loading: isProductsLoading }"
        :loading="isProductsLoading"
      >
        <div
          v-if="!isProductsLoading"
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
              :image-width="imageSizes.productCard.width"
              :image-height="imageSizes.productCard.height"
              :image="getMagentoImage(productGetters.getProductThumbnailImage(product))"
              :regular-price="$fc(productGetters.getPrice(product).regular)"
              :special-price="productGetters.getPrice(product).special && $fc(productGetters.getPrice(product).special)"
              :score-rating="productGetters.getAverageRating(product)"
              :reviews-count="productGetters.getTotalReviews(product)"
              :show-add-to-cart-button="true"
              :is-added-to-cart="isInCart({ product })"
              :is-in-wishlist="isInWishlist({ product })"
              :wishlist-icon="isAuthenticated ? 'heart' : ''"
              :is-in-wishlist-icon="isAuthenticated ? 'heart_fill' : ''"
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
              <template #image="imageSlotProps">
                <SfButton
                  :link="imageSlotProps.link"
                  class="sf-button--pure sf-product-card__link"
                  data-testid="product-link"
                  aria-label="Go To Product"
                  v-on="$listeners"
                >
                  <template v-if="Array.isArray(imageSlotProps.image)">
                    <nuxt-img
                      v-for="(picture, key) in imageSlotProps.image.slice(0, 2)"
                      :key="key"
                      class="sf-product-card__picture"
                      :src="picture"
                      :alt="imageSlotProps.title"
                      :width="imageSlotProps.imageWidth"
                      :height="imageSlotProps.imageHeight"
                    />
                  </template>
                  <nuxt-img
                    v-else
                    class="sf-product-card__image lol"
                    :src="imageSlotProps.image"
                    :alt="imageSlotProps.title"
                    :width="imageSlotProps.imageWidth"
                    :height="imageSlotProps.imageHeight"
                  />
                </SfButton>
              </template>
            </SfProductCard>
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
              :image="getMagentoImage(productGetters.getProductThumbnailImage(product))"
              :image-width="imageSizes.productCardHorizontal.width"
              :image-height="imageSizes.productCardHorizontal.height"
              :regular-price="$fc(productGetters.getPrice(product).regular)"
              :special-price="productGetters.getPrice(product).special && $fc(productGetters.getPrice(product).special)"
              :score-rating="productGetters.getAverageRating(product)"
              :reviews-count="productGetters.getTotalReviews(product)"
              :is-in-wishlist="isInWishlist({product})"
              :is-in-wishlist-icon="isAuthenticated ? '' : ''"
              :wishlist-icon="isAuthenticated ? '' : ''"
              :link="
                localePath(
                  `/p/${productGetters.getProductSku(
                    product
                  )}${productGetters.getSlug(product, product.categories[0])}`
                )
              "
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
                    <nuxt-img
                      v-for="(picture, key) in imageSlotProps.image.slice(0, 2)"
                      :key="key"
                      class="sf-product-card-horizontal__picture"
                      :src="picture"
                      :alt="imageSlotProps.title"
                      :width="imageSlotProps.imageWidth"
                      :height="imageSlotProps.imageHeight"
                    />
                  </template>
                  <nuxt-img
                    v-else
                    class="sf-product-card-horizontal__image"
                    :src="imageSlotProps.image"
                    :alt="imageSlotProps.title"
                    :width="imageSlotProps.imageWidth"
                    :height="imageSlotProps.imageHeight"
                  />
                </SfLink>
              </template>
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
                v-if="!isProductsLoading"
                v-show="pagination.totalPages > 1"
                class="products__pagination"
                :current="pagination.currentPage"
                :total="pagination.totalPages"
                :visible="5"
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
                  @input="uiHelpers.changeItemsPerPage"
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
              v-if="uiHelpers.isFacetColor(facet)"
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
                  :value="option.value"
                  :selected="isFilterSelected(facet, option)"
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
</template>

<script>
import findDeep from 'deepdash/findDeep';
import LazyHydrate from 'vue-lazy-hydration';
import {
  SfSidebar,
  SfButton,
  SfHeading,
  SfFilter,
  SfRadio,
  SfProductCard,
  SfProductCardHorizontal,
  SfPagination,
  SfAccordion,
  SfSelect,
  SfBreadcrumbs,
  SfLink,
  SfLoader,
  SfColor,
  SfProperty,
} from '@storefront-ui/vue';
import {
  ref,
  computed,
  defineComponent,
} from '@nuxtjs/composition-api';
import {
  categoryGetters,
  facetGetters,
  productGetters,
  useCategory,
  useFacet,
  useUser,
  useWishlist,
} from '@vue-storefront/magento';
import { onSSR, useVSFContext } from '@vue-storefront/core';
import { useCache, CacheTagPrefix } from '@vue-storefront/cache';
import { useUrlResolver } from '~/composables/useUrlResolver.ts';
import { useUiHelpers, useUiState, useImage } from '~/composables';
import cacheControl from '~/helpers/cacheControl';
import { useAddToCart } from '~/helpers/cart/addToCart';
import CategorySidebarMenu from '~/components/Category/CategorySidebarMenu';
import SvgImage from '~/components/General/SvgImage.vue';

// TODO(addToCart qty, horizontal): https://github.com/vuestorefront/storefront-ui/issues/1606
export default defineComponent({
  name: 'CategoryPage',
  components: {
    CategorySidebarMenu,
    SvgImage,
    SfButton,
    SfSidebar,
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
    SfHeading,
    SfProperty,
    SfLink,
    LazyHydrate,
  },
  middleware: cacheControl({
    'max-age': 60,
    'stale-when-revalidate': 5,
  }),
  transition: 'fade',
  setup() {
    const { addTags } = useCache();
    const uiHelpers = useUiHelpers();
    const uiState = useUiState();
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
      categories,
      search: categoriesSearch,
    } = useCategory(`categoryList:${path}`);
    const {
      addItemToCart,
      isInCart,
    } = useAddToCart();

    const products = computed(() => facetGetters.getProducts(result.value));

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

      const categoryUidResult = categoryDeep?.parent && categoryDeep?.parent.length === 1
        ? categoryDeep?.parent[0]
        : categoryDeep?.parent;

      return categoryUidResult || items[0]?.uid;
    };

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
      const categoryId = activeCategoryUid(routeData.value?.entity_uid)
        ? activeCategoryUid(routeData.value?.entity_uid)
        : routeData.value?.entity_uid;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await search({
        ...uiHelpers.getFacetsFromURL(),
        categoryId,
      });
    };

    const getSelectedFilterValues = () => {
      let selectedFilterValues = Object.fromEntries(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        (magentoConfig.facets.available)
          .map((curr) => [curr, (curr === 'price' ? '' : [])]),
      );
      const filters = uiHelpers.getFacetsFromURL().filters;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      Object.keys(filters).forEach((filter) => {
        if (filter === 'price') {
          selectedFilterValues[filter] = filters[filter][0];
        } else {
          selectedFilterValues[filter] = filters[filter];
        }
      });
      return selectedFilterValues;
    }

    const isProductsLoading = ref(false);
    const isCategoriesLoading = ref(false);
    const selectedFilters = ref(getSelectedFilterValues());

    onSSR(async () => {
      isProductsLoading.value = true;
      isCategoriesLoading.value = true;
      await resolveUrl();

      await categoriesSearch({
        pageSize: 20,
      });
      isCategoriesLoading.value = false;

      if (routeData?.value) {
        selectedFilters.value = getSelectedFilterValues();

        await searchCategoryProduct();
        isProductsLoading.value = false;
      }

      const tags = [{ prefix: CacheTagPrefix.View, value: 'category' }];
      // eslint-disable-next-line no-underscore-dangle
      const productTags = products.value.map((product) => ({ prefix: CacheTagPrefix.Product, value: product.uid }));

      const categoriesTags = categoryTree.value.items.map((category) => ({ prefix: CacheTagPrefix.Category, value: category.slug }));

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      addTags([...tags, ...productTags, ...categoriesTags]);
    });

    const { getMagentoImage, imageSizes } = useImage();

    return {
      routeData,
      ...uiState,
      activeCategory,
      addItemToCart,
      addItemToWishlist,
      applyFilters,
      breadcrumbs,
      categories,
      categoryTree,
      facets,
      isAuthenticated,
      isFilterSelected,
      isInCart,
      isInWishlist,
      isProductsLoading,
      isCategoriesLoading,
      pagination,
      productGetters,
      products,
      selectedFilters,
      selectFilter,
      sortBy,
      uiHelpers,
      getMagentoImage,
      imageSizes,
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

    @include for-mobile {
      --select-width: 135px;
    }
  }

  &__sort {
    display: flex;
    align-items: center;
    margin: 0 auto 0 var(--spacer-2xl);
    @include for-mobile {
      margin: 0;
      order: 1;
    }
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

  &__view-icon {
    cursor: pointer;

    &--active {
      color: var(--c-primary);
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
