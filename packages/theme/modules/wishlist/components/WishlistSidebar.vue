<template>
  <div id="wishlist">
    <SfSidebar
      :visible="isWishlistSidebarOpen"
      :button="false"
      position="right"
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
            <SvgImage
              icon="cross"
              width="14"
              height="14"
              class="heading__close"
            />
          </SfButton>
        </div>
      </template>

      <SfLoader :loading="loading">
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
              v-for="(wishlistItem, itemKey) in wishlistItems"
              :key="itemKey"
              :image="wishlistItem.product.thumbnail.url"
              :title="wishlistItem.product.name"
              :regular-price="
                $fc(getItemPrice(wishlistItem).regular)
              "
              :link="
                localePath(
                  `/p/${wishlistItem.product.sku}${productGetters.getSlug(
                    wishlistItem.product,
                    wishlistItem.product.categories[0]
                  )}`
                )
              "
              :special-price="getItemPrice(wishlistItem).special && $fc(getItemPrice(wishlistItem).special)"
              :stock="99999"
              class="collected-product"
              @click:remove="removeItem({ product: wishlistItem.product })"
            >
              <template #input>
                <div />
              </template>
              <template #image>
                <SfLink
                  :link="
                    localePath(
                      `/p/${wishlistItem.product.sku}${productGetters.getSlug(
                        wishlistItem.product,
                        wishlistItem.product.categories[0]
                      )}`
                    )
                  "
                >
                  <SfImage
                    image-tag="nuxt-img"
                    :src="getMagentoImage(wishlistItem.product.thumbnail.url)"
                    :alt="wishlistItem.product.name"
                    :width="imageSizes.productCard.width"
                    :height="imageSizes.productCard.height"
                    :nuxt-img-config="{
                      fit: 'cover',
                    }"
                    class="sf-collected-product__image"
                  />
                </SfLink>
              </template>
              <template #configuration>
                <div v-if="getAttributes(wishlistItem).length > 0">
                  <SfProperty
                    v-for="(attr, index) in getAttributes(wishlistItem)"
                    :key="index"
                    :name="attr.option_label"
                    :value="attr.value_label"
                  />
                </div>
                <div v-if="getBundles(wishlistItem).length > 0">
                  <SfProperty
                    v-for="(bundle, i) in getBundles(wishlistItem)"
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
            <SfProperty
              class="sf-property--full-width my-wishlist__total-price"
            >
              <template #name>
                <span class="my-wishlist__total-price-label">{{ $t('Total price') }}:</span>
              </template>
              <template #value>
                <SfPrice :regular="$fc(totals.subtotal)" />
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
            <SvgImage
              icon="empty_cart_image"
              :label="$t('Empty bag')"
              width="211"
              height="143"
              class="empty-wishlist__icon"
            />
            <SfHeading
              title="Your bag is empty"
              description="Looks like you haven’t added any items to the Wishlist."
              class="empty-wishlist__label"
            />
          </div>
        </div>
      </SfLoader>
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
<script lang="ts">
import {
  SfSidebar,
  SfHeading,
  SfButton,
  SfProperty,
  SfPrice,
  SfCollectedProduct,
  SfLink,
  SfLoader,
  SfImage,
} from '@storefront-ui/vue';
import {
  computed, defineComponent, onMounted,
} from '@nuxtjs/composition-api';
import productGetters from '~/modules/catalog/product/getters/productGetters';
import {
  useUiState, useImage, AgnosticPrice,
} from '~/composables';
import { useWishlist } from '~/modules/wishlist/composables/useWishlist';
import { useUser } from '~/modules/customer/composables/useUser';
import { useWishlistStore } from '~/modules/wishlist/store/wishlistStore';

import SvgImage from '~/components/General/SvgImage.vue';

import type { WishlistItemInterface } from '~/modules/GraphQL/types';

export default defineComponent({
  name: 'WishlistSidebar',
  components: {
    SfSidebar,
    SfButton,
    SfHeading,
    SfProperty,
    SfPrice,
    SfCollectedProduct,
    SfLink,
    SfLoader,
    SfImage,
    SvgImage,
  },
  setup() {
    const { isWishlistSidebarOpen, toggleWishlistSidebar } = useUiState();
    const {
      removeItem, load: loadWishlist, loading,
    } = useWishlist();
    const { isAuthenticated } = useUser();
    const wishlistStore = useWishlistStore();
    const wishlistItems = computed<WishlistItemInterface[]>(
      () => wishlistStore.wishlist?.items_v2?.items ?? [],
    );

    const getItemPrice = (product: WishlistItemInterface): AgnosticPrice => {
      let regular = 0;
      let special = null;

      if (product?.product?.price_range) {
        regular = product?.product?.price_range.minimum_price.regular_price.value;
        const final = product?.product?.price_range.minimum_price.final_price.value;

        if (final < regular) {
          special = final;
        }
      }

      return {
        regular,
        special,
      };
    };

    const totals = computed<{ total: number, subtotal: number }>(
      () => ((wishlistStore.wishlist?.items_v2?.items ?? []).length > 0
        ? wishlistStore.wishlist?.items_v2?.items.reduce((acc, curr) => ({
          total: acc.total + getItemPrice(curr).special,
          subtotal: acc.subtotal + getItemPrice(curr).regular,
        }), ({ total: 0, subtotal: 0 }))
        : ({ total: 0, subtotal: 0 })),
    );

    const totalItems = computed(
      () => wishlistStore.wishlist?.items_count ?? 0,
    );

    const getAttributes = (product) => product?.product?.configurable_options || [];
    const getBundles = (product) => product?.product?.items?.map((b) => b.title).flat() || [];

    const { getMagentoImage, imageSizes } = useImage();

    onMounted(async () => {
      if (!wishlistStore.wishlist.id) {
        await loadWishlist();
      }
    });

    return {
      getAttributes,
      getBundles,
      isAuthenticated,
      isWishlistSidebarOpen,
      wishlistItems,
      removeItem,
      toggleWishlistSidebar,
      totalItems,
      totals,
      wishlist: wishlistStore.wishlist,
      productGetters,
      getMagentoImage,
      imageSizes,
      loading,
      getItemPrice,
    };
  },
});
</script>

<style lang="scss" scoped>
.sidebar {
  --sidebar-z-index: 3;
  --overlay-z-index: 3;
  --sidebar-top-padding: var(--spacer-lg) var(--spacer-base) 0
    var(--spacer-base);
  --sidebar-content-padding: var(--spacer-lg) var(--spacer-base);
}

.my-wishlist {
  flex: 1;
  display: flex;
  flex-direction: column;
  &__total-items {
    font: var(--font-weight--normal) var(--font-size--lg) / 1.6
      var(--font-family--secondary);
    color: var(--c-link);
    margin: 0;
  }
  &__total-price {
    --property-name-font-size: var(--font-size--xl);
    --price-font-size: var(--font-size--xl);
    margin: 0 0 var(--spacer-xl) 0;
    &-label {
      font: var(--font-weight--normal) var(--font-size--2xl) / 1.6
        var(--font-family--secondary);
      color: var(--c-link);
    }
  }
}
.empty-wishlist {
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  height: 100%;
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

  &__close {
    color: var(--c-gray-variant);
    cursor: pointer;
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
