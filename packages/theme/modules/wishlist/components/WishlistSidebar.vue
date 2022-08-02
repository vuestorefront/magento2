<template>
  <div id="wishlist">
    <SfSidebar
      :visible="isWishlistSidebarOpen"
      :button="false"
      position="right"
      :title="$t('My wishlist')"
      class="sidebar sf-sidebar--right"
      @close="toggleWishlistSidebar"
    >
      <template #title>
        <div class="heading__wrapper">
          <SfHeading
            :level="3"
            :title="$t('My wishlist')"
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
            {{ $t('Total items') }}: <strong>{{ totalItems }}</strong>
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
              :link="getItemLink(wishlistItem)"
              :special-price="getItemPrice(wishlistItem).special && $fc(getItemPrice(wishlistItem).special)"
              :stock="99999"
              class="collected-product"
              @click:remove="removeItem({ product: wishlistItem.product })"
            >
              <template #input>
                <div />
              </template>
              <template #image>
                <SfLink :link="getItemLink(wishlistItem)">
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
        </div>
        <EmptyWishlist v-else />
      </SfLoader>
      <template #content-bottom>
        <SfButton
          v-if="isShowGoToWishlistButton"
          class="sf-button--full-width color-secondary"
          @click="$router.push(localeRoute({ name: 'customer-my-wishlist' }))"
        >
          {{ $t('Show all products') }}
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
  SfCollectedProduct,
  SfLink,
  SfLoader,
  SfImage,
} from '@storefront-ui/vue';
import {
  computed,
  defineComponent,
  onMounted,
  useContext,
  useRouter,
} from '@nuxtjs/composition-api';
import {
  useUiState,
  useImage,
  useProduct,
} from '~/composables';
import type { Price } from '~/modules/catalog/types';
import { useWishlist } from '~/modules/wishlist/composables/useWishlist';
import { useUser } from '~/modules/customer/composables/useUser';
import { useWishlistStore } from '~/modules/wishlist/store/wishlistStore';
import EmptyWishlist from '~/modules/wishlist/components/EmptyWishlist.vue';

import SvgImage from '~/components/General/SvgImage.vue';

import type { WishlistItemInterface, ConfigurableProduct, BundleProduct } from '~/modules/GraphQL/types';

export default defineComponent({
  name: 'WishlistSidebar',
  components: {
    SfSidebar,
    SfButton,
    SfHeading,
    SfProperty,
    SfCollectedProduct,
    SfLink,
    SfLoader,
    SfImage,
    EmptyWishlist,
    SvgImage,
  },
  setup() {
    const { localeRoute } = useContext();
    const router = useRouter();
    const { isWishlistSidebarOpen, toggleWishlistSidebar } = useUiState();
    const { getProductPath } = useProduct();
    const {
      removeItem, load: loadWishlist, loading,
    } = useWishlist();
    const { isAuthenticated } = useUser();
    const wishlistStore = useWishlistStore();
    const wishlistItems = computed<WishlistItemInterface[]>(
      () => wishlistStore.wishlist?.items_v2?.items ?? [],
    );

    const getItemPrice = (product: WishlistItemInterface): Price => {
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

    const getAttributes = (product: WishlistItemInterface) => (product?.product as ConfigurableProduct)?.configurable_options || [];
    const getBundles = (product: WishlistItemInterface) => (product?.product as BundleProduct)?.items?.map((b) => b.title).flat() || [];
    // @ts-ignore
    const getItemLink = (item: WishlistItemInterface) => localeRoute(getProductPath(item.product));

    const { getMagentoImage, imageSizes } = useImage();
    const isShowGoToWishlistButton = computed(() => wishlistStore.wishlist.items_count > wishlistStore.wishlist?.items_v2?.items.length);

    onMounted(async () => {
      await loadWishlist({ searchParams: { pageSize: 100 } });
    });

    router.afterEach(() => {
      if (isWishlistSidebarOpen.value) {
        toggleWishlistSidebar();
      }
    });

    return {
      getAttributes,
      getBundles,
      getItemLink,
      isAuthenticated,
      isWishlistSidebarOpen,
      wishlistItems,
      removeItem,
      toggleWishlistSidebar,
      totalItems,
      totals,
      wishlist: wishlistStore.wishlist,
      getMagentoImage,
      imageSizes,
      loading,
      getItemPrice,
      isShowGoToWishlistButton,
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
