<template>
  <div id="wishlist">
    <SfSidebar
      :visible="isWishlistSidebarOpen"
      :button="false"
      title="My Wishlist"
      class="sidebar sf-sidebar--right"
      @close="toggleWishlistSidebar"
    >
      <template #title>
        <div class="heading__wrapper">
          <SfHeading
            :level="3"
            title="My wishlist"
            class="sf-heading--left"
          />
          <SfButton
            class="heading__close-button sf-button--pure"
            aria-label="Wishlist sidebar close button"
            @click="toggleWishlistSidebar"
          >
            <SfIcon
              icon="cross"
              size="14px"
              color="gray-primary"
            />
          </SfButton>
        </div>
      </template>
      <transition
        name="fade"
        mode="out-in"
      >
        <div
          v-if="totalItems"
          key="my-wishlist"
          class="my-wishlist"
        >
          <div class="my-wishlist__total-items">
            Total items: <strong>{{ totalItems }}</strong>
          </div>
          <div class="collected-product-list">
            <SfCollectedProduct
              v-for="(product, i) in products"
              :key="i"
              :image="wishlistGetters.getItemImage(product)"
              :title="wishlistGetters.getItemName(product)"
              :regular-price="$n(wishlistGetters.getItemPrice(product).regular, 'currency')"
              :link="localePath(`/p/${wishlistGetters.getItemSku(product)}${productGetters.getSlug(product.product, product.product.categories[0])}`)"
              :special-price="wishlistGetters.getItemPrice(product).special && $n(wishlistGetters.getItemPrice(product).special, 'currency')"
              :stock="99999"
              class="collected-product"
              @click:remove="removeItem({ product: product.product })"
            >
              <template #input>
                <div />
              </template>
              <template #image>
                <SfLink
                  :link="
                    localePath(`/p/${wishlistGetters.getItemSku(product)}${productGetters.getSlug(product.product, product.product.categories[0])}`)
                  "
                >
                  <SfImage
                    :src="wishlistGetters.getItemImage(product)"
                    :alt="wishlistGetters.getItemName(product)"
                    :width="140"
                    :height="200"
                    class="sf-collected-product__image"
                  />
                </SfLink>
              </template>
              <template #configuration>
                <div
                  v-if="getAttributes(product).length > 0"
                >
                  <SfProperty
                    v-for="(attr, index) in getAttributes(product)"
                    :key="index"
                    :name="attr.option_label"
                    :value="attr.value_label"
                  />
                </div>
                <div
                  v-if="getBundles(product).length > 0"
                >
                  <SfProperty
                    v-for="(bundle, i) in getBundles(product)"
                    :key="i"
                    :value="bundle"
                  >
                    <template #name>
                      <div />
                    </template>
                  </SfProperty>
                </div>
                <div v-else />
              </template>
              <template #actions>
                <div />
              </template>
            </SfCollectedProduct>
          </div>
          <div class="sidebar-bottom">
            <SfProperty class="sf-property--full-width my-wishlist__total-price">
              <template #name>
                <span class="my-wishlist__total-price-label">Total price:</span>
              </template>
              <template #value>
                <SfPrice :regular="$n(totals.subtotal, 'currency')" />
              </template>
            </SfProperty>
          </div>
        </div>
        <div
          v-else
          key="empty-wishlist"
          class="empty-wishlist"
        >
          <div class="empty-wishlist__banner">
            <SfImage
              src="/icons/empty-cart.svg"
              alt="Empty bag"
              class="empty-wishlist__icon"
            />
            <SfHeading
              title="Your bag is empty"
              description="Looks like you haven’t added any items to the Wishlist."
              class="empty-wishlist__label"
            />
          </div>
        </div>
      </transition>
      <template #content-bottom>
        <SfButton
          class="sf-button--full-width color-secondary"
          @click="toggleWishlistSidebar"
        >
          {{ $t('Start shopping') }}
        </SfButton>
      </template>
    </SfSidebar>
  </div>
</template>
<script>
import {
  SfSidebar,
  SfHeading,
  SfButton,
  SfIcon,
  SfProperty,
  SfPrice,
  SfCollectedProduct,
  SfImage,
  SfLink,
} from '@storefront-ui/vue';
import { computed } from '@vue/composition-api';
import {
  useWishlist,
  useUser,
  wishlistGetters,
  productGetters,
} from '@vue-storefront/magento';
import { onSSR } from '@vue-storefront/core';
import { useUiState } from '~/composables';

export default {
  name: 'WishlistSidebar',
  components: {
    SfSidebar,
    SfButton,
    SfHeading,
    SfIcon,
    SfProperty,
    SfPrice,
    SfCollectedProduct,
    SfImage,
    SfLink,
  },
  setup() {
    const { isWishlistSidebarOpen, toggleWishlistSidebar } = useUiState();
    const { wishlist, removeItem, load: loadWishlist } = useWishlist();
    const { isAuthenticated } = useUser();
    const products = computed(() => wishlistGetters.getProducts(wishlist.value));
    const totals = computed(() => wishlistGetters.getTotals(wishlist.value));
    const totalItems = computed(() => wishlistGetters.getTotalItems(wishlist.value));

    const getAttributes = (product) => product?.product?.configurable_options || [];
    const getBundles = (product) => product?.product?.items?.map((b) => b.title).flat() || [];

    onSSR(async () => {
      await loadWishlist();
    });

    return {
      getAttributes,
      getBundles,
      isAuthenticated,
      isWishlistSidebarOpen,
      products,
      removeItem,
      toggleWishlistSidebar,
      totalItems,
      totals,
      wishlistGetters,
      wishlist,
      productGetters,
    };
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  --sidebar-z-index: 3;
  --overlay-z-index: 3;
  --sidebar-top-padding: var(--spacer-lg) var(--spacer-base) 0 var(--spacer-base);
  --sidebar-content-padding: var(--spacer-lg) var(--spacer-base);
}

.my-wishlist {
  flex: 1;
  display: flex;
  flex-direction: column;
  &__total-items {
    font: var(--font-weight--normal) var(--font-size--lg) / 1.6 var(--font-family--secondary);
    color: var(--c-link);
    margin: 0;
  }
  &__total-price {
    --property-name-font-size: var(--font-size--xl);
    --price-font-size: var(--font-size--xl);
    margin: 0 0 var(--spacer-xl) 0;
    &-label {
      font: var(--font-weight--normal) var(--font-size--2xl) / 1.6 var(--font-family--secondary);
      color: var(--c-link);
    }
  }
}
.empty-wishlist {
  display: flex;
  flex: 1;
  flex-direction: column;
  &__banner {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  &__label,
  &__description {
    text-align: center;
  }
  &__label {
    --heading-description-margin: 0 0 var(--spacer-xl) 0;
    --heading-title-margin: 0 0 var(--spacer-xl) 0;
    --heading-title-color: var(--c-primary);
    --heading-title-font-weight: var(--font-weight--semibold);
      @include for-desktop {
      --heading-title-font-size: var(--font-size--xl);
      --heading-title-margin: 0 0 var(--spacer-sm) 0;
  }
  }
  &__icon {
    --image-width: 16rem;
    margin: 0 0 var(--spacer-2xl) 7.5rem;
  }
}
.heading {
  &__wrapper {
    --heading-title-color: var(--c-link);
    --heading-title-font-weight: var(--font-weight--semibold);
    display: flex;
    justify-content: space-between;
  }
}

.sidebar-bottom {
  margin: auto 0 0 0;
}

.collected-product {
  margin: var(--spacer-base) 0;
  &__properties {
    margin: var(--spacer-sm) 0 0 0;
  }
}

</style>
