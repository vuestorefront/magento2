<template>
  <SfTabs
    :open-tab="1"
    class="tab-orphan"
  >
    <SfTab title="My wishlist">
      <div v-if="loading">
        <SfLoader />
      </div>
      <div
        v-else
      >
        <div class="navbar section">
          <div class="navbar__main">
            <div class="navbar__counter">
              <span class="navbar__label desktop-only">{{ $t('Products found') }}</span>
              <span class="desktop-only">{{ pagination.totalItems }}</span>
              <span class="navbar__label smartphone-only">
                {{ pagination.totalItems }} {{ $t('Items') }}</span>
            </div>

            <div class="navbar__view">
              <span class="navbar__view-label desktop-only">{{ $t('View') }}</span>
              <SfIcon
                class="navbar__view-icon"
                :color="isWishlistGridView ? 'black' : 'dark-secondary'"
                icon="tiles"
                size="12px"
                role="button"
                aria-label="Change to grid view"
                :aria-pressed="isWishlistGridView"
                @click="changeToWishlistGridView"
              />
              <SfIcon
                class="navbar__view-icon"
                :color="!isWishlistGridView ? 'black' : 'dark-secondary'"
                icon="list"
                size="12px"
                role="button"
                aria-label="Change to list view"
                :aria-pressed="!isWishlistGridView"
                @click="changeToWishlistListView"
              />
            </div>
          </div>
        </div>

        <div class="main section">
          <SfLoader
            :class="{ loading }"
            :loading="loading"
          >
            <div
              v-if="!loading"
              class="products"
            >
              <transition-group
                v-if="isWishlistGridView"
                appear
                name="products__slide"
                tag="div"
                class="products__grid"
              >
                <SfProductCard
                  v-for="(product, i) in products"
                  :key="productGetters.getSlug(product.product)"
                  v-e2e="'wishlist-product-card'"
                  class="products__product-card"
                  :image="productGetters.getProductThumbnailImage(product.product)"
                  :is-added-to-cart="isInCart({ product: product.product })"
                  :is-on-wishlist="true"
                  :link="
                    localePath(
                      `/p/${productGetters.getProductSku(
                        product.product
                      )}${productGetters.getSlug(product.product, product.product.categories[0])}`
                    )
                  "
                  :regular-price="$n(productGetters.getPrice(product.product).regular, 'currency')"
                  :reviews-count="productGetters.getTotalReviews(product.product)"
                  :score-rating="productGetters.getAverageRating(product.product)"
                  :show-add-to-cart-button="true"
                  :special-price="productGetters.getPrice(product.product).special
                    && $n(productGetters.getPrice(product.product).special, 'currency')"
                  :style="{ '--index': i }"
                  :title="productGetters.getName(product.product)"
                  wishlist-icon
                  @click:wishlist="removeItemFromWishlist(product.product)"
                  @click:add-to-cart="addItemToCart({ product: product.product, quantity: 1 })"
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
                  :key="productGetters.getSlug(product.product)"
                  class="products__product-card-horizontal"
                  :description="productGetters.getDescription(product.product)"
                  :image="productGetters.getProductThumbnailImage(product.product)"
                  :is-on-wishlist="true"
                  :link="
                    localePath(
                      `/p/${productGetters.getProductSku(
                        product.product
                      )}${productGetters.getSlug(product.product, product.product.categories[0])}`
                    )
                  "
                  :regular-price="$n(productGetters.getPrice(product.product).regular, 'currency')"
                  :reviews-count="productGetters.getTotalReviews(product.product)"
                  :score-rating="productGetters.getAverageRating(product.product)"
                  :special-price="productGetters.getPrice(product.product).special
                    && $n(productGetters.getPrice(product.product).special, 'currency')"
                  :style="{ '--index': i }"
                  :title="productGetters.getName(product.product)"
                  wishlist-icon
                  @click:wishlist="removeItemFromWishlist(product.product)"
                  @click:add-to-cart="addItemToCart({ product: product.product, quantity: 1 })"
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
                      @click="removeItemFromWishlist(product.product)"
                    >
                      {{ $t('Remove from Wishlist') }}
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
      </div>
    </SfTab>
  </SfTabs>
</template>

<script>
import { onSSR } from '@vue-storefront/core';
import LazyHydrate from 'vue-lazy-hydration';
import {
  SfLoader,
  SfTabs,
  SfButton,
  SfIcon,
  SfProductCard,
  SfProductCardHorizontal,
  SfPagination,
  SfSelect,
  SfProperty,
} from '@storefront-ui/vue';
import {
  computed,
  defineComponent,
} from '@vue/composition-api';
import {
  useCart,
  useWishlist,
  productGetters,
  wishlistGetters,
} from '@vue-storefront/magento';
import { useUiHelpers, useUiState } from '~/composables';
import { useVueRouter } from '~/helpers/hooks/useVueRouter';

export default defineComponent({
  name: 'MyWishlist',
  components: {
    SfLoader,
    SfTabs,
    SfButton,
    SfIcon,
    SfProductCard,
    SfProductCardHorizontal,
    SfPagination,
    SfSelect,
    SfProperty,
    LazyHydrate,
  },
  setup() {
    const {
      load,
      loading,
      wishlist,
      removeItem,
    } = useWishlist();
    const { router } = useVueRouter();
    const th = useUiHelpers();
    const uiState = useUiState();
    const { addItem: addItemToCartBase, isInCart } = useCart();

    const products = computed(() => wishlistGetters.getProducts(wishlist.value));
    const pagination = computed(() => wishlistGetters.getPagination(wishlist.value[0]));

    const addItemToCart = async ({ product, quantity }) => {
      // eslint-disable-next-line no-underscore-dangle
      const productType = product.__typename;

      switch (productType) {
        case 'SimpleProduct':
          await addItemToCartBase({ product, quantity });
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

    const removeItemFromWishlist = async (product) => {
      await removeItem({ product });
    };

    onSSR(async () => {
      await load();
    });

    return {
      ...uiState,
      addItemToCart,
      removeItemFromWishlist,
      isInCart,
      loading,
      pagination,
      productGetters,
      products,
      th,
      wishlist,
    };
  },
});
</script>

<style lang='scss' scoped>
.tab-orphan {
  @include for-mobile {
    --tabs-title-display: none;
    --tabs-content-padding: 0;
    --tabs-conent-border-width: 0;
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
}
</style>
