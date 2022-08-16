<template>
  <SfTabs
    :open-tab="1"
    class="tab-orphan"
  >
    <SfTab :title="$t('My wishlist')">
      <div v-if="loading">
        <SfLoader />
      </div>
      <div v-else-if="products && products.length > 0">
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
                  image-tag="nuxt-img"
                  :image-width="imageSizes.productCard.width"
                  :image-height="imageSizes.productCard.height"
                  :image="
                    getMagentoImage(
                      productGetters.getProductThumbnailImage(product.product)
                    )
                  "
                  :nuxt-img-config="{
                    fit: 'cover',
                  }"
                  :is-added-to-cart="isInCart(product.product)"
                  :link="localePath(getProductPath(product.product))"
                  :regular-price="
                    $fc(productGetters.getPrice(product.product).regular)
                  "
                  :reviews-count="
                    productGetters.getTotalReviews(product.product)
                  "
                  :score-rating="
                    productGetters.getAverageRating(product.product)
                  "
                  :special-price="
                    productGetters.getPrice(product.product).special &&
                      $fc(productGetters.getPrice(product.product).special)
                  "
                  :style="{ '--index': i }"
                  :title="productGetters.getName(product.product)"
                  wishlist-icon
                  is-in-wishlist
                  show-add-to-cart-button
                  :add-to-cart-disabled="isCartLoading"
                  @click:wishlist="removeItemFromWishlist(product.product)"
                  @click:add-to-cart="
                    addItemToCart({ product: product.product, quantity: 1 })
                  "
                />
              </transition-group>
              <div class="products__display-opt">
                <LazyHydrate on-interaction>
                  <SfPagination
                    v-if="!loading"
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
                  <span class="products__show-on-page__label">
                    {{ $t('Show on page') }}
                  </span>
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
            </div>
          </SfLoader>
        </div>
      </div>
      <EmptyWishlist v-else />
    </SfTab>
  </SfTabs>
</template>

<script lang="ts">
import LazyHydrate from 'vue-lazy-hydration';
import {
  SfLoader,
  SfTabs,
  SfProductCard,
  SfPagination,
  SfSelect,
} from '@storefront-ui/vue';
import {
  computed,
  defineComponent,
  onMounted,
  useRouter,
  useRoute,
  useContext,
} from '@nuxtjs/composition-api';
import productGetters from '~/modules/catalog/product/getters/productGetters';
import type { Product } from '~/modules/catalog/product/types';
import { useWishlist } from '~/modules/wishlist/composables/useWishlist';
import wishlistGetters from '~/modules/wishlist/getters/wishlistGetters';
import { useCart } from '~/modules/checkout/composables/useCart';
import { useWishlistStore } from '~/modules/wishlist/store/wishlistStore';
import EmptyWishlist from '~/modules/wishlist/components/EmptyWishlist.vue';
import { ProductTypeEnum } from '~/modules/catalog/product/enums/ProductTypeEnum';
import { useUiHelpers, useImage, useProduct } from '~/composables';

export default defineComponent({
  name: 'MyWishlist',
  components: {
    SfLoader,
    SfTabs,
    SfProductCard,
    SfPagination,
    SfSelect,
    EmptyWishlist,
    LazyHydrate,
  },
  setup() {
    const {
      load,
      loading,
      removeItem,
      afterAddingWishlistItemToCart,
    } = useWishlist();
    const route = useRoute();
    const { localeRoute } = useContext();
    const { getProductPath } = useProduct();
    const {
      query: { page, itemsPerPage },
    } = route.value;
    const router = useRouter();
    const th = useUiHelpers();
    const {
      addItem: addItemToCartBase,
      error: cartError,
      isInCart,
      loading: isCartLoading,
    } = useCart();
    const wishlistStore = useWishlistStore();

    const products = computed(() => wishlistGetters.getProducts(wishlistStore.wishlist));
    const pagination = computed(() => wishlistGetters.getPagination(wishlistStore.wishlist));

    const addItemToCart = async ({ product, quantity }: { product: Product, quantity: number }) => {
      // eslint-disable-next-line no-underscore-dangle
      const productType = product.__typename;

      switch (productType) {
        case ProductTypeEnum.SIMPLE_PRODUCT:
          await addItemToCartBase({
            product,
            quantity,
          });
          afterAddingWishlistItemToCart({
            product,
            cartError: cartError.value.addItem,
          });
          break;
        case ProductTypeEnum.CONFIGURABLE_PRODUCT:
        case ProductTypeEnum.BUNDLE_PRODUCT:
        case ProductTypeEnum.GROUPED_PRODUCT:
          await router.push(localeRoute(getProductPath(product)));
          break;
        default:
          throw new Error(
            `Product Type ${productType} not supported in add to cart yet`,
          );
      }
    };

    const removeItemFromWishlist = async (product: Product) => {
      await removeItem({ product });
    };

    const { getMagentoImage, imageSizes } = useImage();

    onMounted(async () => {
      await load({
        searchParams: {
          currentPage: page ? Number.parseInt(page.toString(), 10) : 1,
          pageSize: itemsPerPage ? Number.parseInt(itemsPerPage.toString(), 10) : 10,
        },
      });
    });

    return {
      addItemToCart,
      removeItemFromWishlist,
      isInCart,
      isCartLoading,
      loading,
      pagination,
      productGetters,
      products,
      th,
      getMagentoImage,
      imageSizes,
      getProductPath,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '../styles/shared.scss';

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
      font: var(--font-weight--normal) var(--font-size--base) / 1.6
        var(--font-family--secondary);
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

  &__grid {
    display: flex;
    flex-wrap: wrap;
  }

  &__product-card {
    --product-card-title-font-weight: var(--font-weight--medium);
    --product-card-title-margin: var(--spacer-xs) 0 0 0;
    flex: 1 1 50%;
    @include for-desktop {
      --product-card-title-font-weight: var(--font-weight--normal);
      --product-card-add-button-bottom: var(--spacer-base);
      --product-card-title-margin: var(--spacer-sm) 0 0 0;
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

  &__display-opt {
    display: flex;
    justify-content: space-around;
    align-items: center;

    @include for-mobile {
      .sf-pagination {
        margin-bottom: 10px;
      }
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
