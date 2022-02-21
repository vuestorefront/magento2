<template>
  <div>
    <SfHeader
      class="sf-header--has-mobile-search"
      :class="{'header-on-top': isSearchOpen}"
    >
      <!-- TODO: add mobile view buttons after SFUI team PR -->
      <template #logo>
        <nuxt-link
          :to="localePath('/')"
          class="sf-header__logo"
        >
          <nuxt-img
            src="/icons/logo.svg"
            alt="Vue Storefront Next"
            class="sf-header__logo-image"
            width="35"
            height="34"
          />
        </nuxt-link>
      </template>
      <template
        v-if="$device.isDesktop"
        #navigation
      >
        <HeaderNavigationItem
          v-for="(category, index) in categoryTree"
          :key="index"
          v-e2e="'app-header-url_women'"
          class="nav-item"
          :label="category.label"
          :link="localePath(getAgnosticCatLink(category))"
        />
      </template>
      <template #aside>
        <div class="sf-header__switchers">
          <CurrencySelector class="smartphone-only" />
          <StoreSwitcher class="smartphone-only" />
        </div>
      </template>
      <template
        #header-icons="{activeIcon}"
      >
        <div class="sf-header__icons">
          <SfButton
            v-e2e="'app-header-account'"
            class="sf-button--pure sf-header__action"
            data-testid="accountIcon"
            aria-label="Account"
            @click="handleAccountClick"
          >
            <SfIcon
              :icon="accountIcon"
              size="1.25rem"
              :class="{
                'sf-header__icon is-active': activeIcon === 'account',
              }"
            />
          </SfButton>
          <SfButton
            v-if="isAuthenticated"
            class="sf-button--pure sf-header__action"
            data-testid="wishlistIcon"
            aria-label="Wishlist"
            @click="toggleWishlistSidebar"
          >
            <SfIcon
              class="sf-header__icon"
              :icon="wishlistHasProducts ? 'heart_fill' : 'heart'"
              :has-badge="wishlistHasProducts"
              :badge-label="wishlistItemsQty"
              size="1.25rem"
              :class="{
                'sf-header__icon is-active': activeIcon === 'wishlist',
              }"
            />
            <SfBadge
              v-if="wishlistHasProducts"
              class="sf-badge--number cart-badge"
            >
              {{ wishlistItemsQty }}
            </SfBadge>
          </SfButton>
          <SfButton
            v-e2e="'app-header-cart'"
            class="sf-button--pure sf-header__action"
            aria-label="Toggle cart sidebar"
            @click="toggleCartSidebar"
          >
            <SfIcon
              class="sf-header__icon"
              icon="empty_cart"
              size="1.25rem"
              :class="{
                'sf-header__icon is-active': activeIcon === 'cart',
              }"
            />
            <SfBadge
              v-if="cartTotalItems"
              class="sf-badge--number cart-badge"
            >
              {{ cartTotalItems }}
            </SfBadge>
          </SfButton>
        </div>
      </template>
      <template #search>
        <SearchBar
          @SearchBar:toggle="isSearchOpen = $event"
          @SearchBar:result="result = $event"
        />
      </template>
    </SfHeader>
    <SearchResults
      v-if="isSearchOpen"
      :visible="isSearchOpen"
      :result="result"
    />
    <SfOverlay :visible="isSearchOpen" />
  </div>
</template>

<script>
import {
  SfOverlay,
  SfHeader,
  SfIcon,
  SfButton,
  SfBadge,
} from '@storefront-ui/vue';

import {
  categoryGetters,
  useCart,
  useCategory,
  useUser, useWishlist,
} from '@vue-storefront/magento';
import {
  computed,
  ref,
  defineComponent,
  useRouter,
  useContext,
  useFetch,
} from '@nuxtjs/composition-api';
import HeaderNavigationItem from '~/components/Navigation/HeaderNavigationItem.vue';
import {
  useUiHelpers,
  useUiState,
} from '~/composables';
import StoreSwitcher from '~/components/StoreSwitcher.vue';
import CurrencySelector from '~/components/CurrencySelector.vue';

export default defineComponent({
  components: {
    HeaderNavigationItem,
    SfHeader,
    SfOverlay,
    CurrencySelector,
    StoreSwitcher,
    SfIcon,
    SfButton,
    SfBadge,
    SearchBar: () => import('~/components/Header/SearchBar/SearchBar.vue'),
    SearchResults: () => import(/* webpackPrefetch: true */ '~/components/Header/SearchBar/SearchResults.vue'),
  },
  setup() {
    const router = useRouter();
    const { app } = useContext();
    const { toggleCartSidebar, toggleWishlistSidebar, toggleLoginModal } = useUiState();
    const { setTermForUrl, getAgnosticCatLink } = useUiHelpers();
    const { isAuthenticated } = useUser();
    const { totalQuantity: cartTotalItems, loadTotalQty: loadCartTotalQty } = useCart();
    const { itemsCount: wishlistItemsQty, loadItemsCount: loadWishlistItemsCount } = useWishlist('GlobalWishlist');

    const {
      categories: categoryList,
      search: categoriesListSearch,
    } = useCategory('AppHeader:CategoryList');

    const isSearchOpen = ref(false);
    const result = ref(null);

    const wishlistHasProducts = computed(() => wishlistItemsQty.value > 0);

    const accountIcon = computed(() => (isAuthenticated.value ? 'profile_fill' : 'profile'));

    const categoryTree = computed(() => categoryGetters.getCategoryTree(categoryList.value?.[0])?.items.filter((c) => c.count > 0));

    const handleAccountClick = async () => {
      if (isAuthenticated.value) {
        await router.push(`${app.localePath('/my-account')}`);
      } else {
        toggleLoginModal();
      }
    };

    useFetch(async () => {
      if (app.$device.isDesktop) {
        await Promise.all([loadCartTotalQty(), loadWishlistItemsCount(), categoriesListSearch({ pageSize: 20 })]);
      }
    });

    return {
      accountIcon,
      cartTotalItems,
      categoryTree,
      getAgnosticCatLink,
      handleAccountClick,
      isAuthenticated,
      isSearchOpen,
      result,
      setTermForUrl,
      toggleCartSidebar,
      toggleWishlistSidebar,
      wishlistHasProducts,
      wishlistItemsQty,
    };
  },
});
</script>

<style lang="scss" scoped>
.sf-header {
  --header-padding: var(--spacer-sm);
  @include for-desktop {
    --header-padding: 0 var(--spacer-sm);
  }

  &__switchers {
    display: flex;
  }

  &__logo-image {
    height: 100%;
  }
}

.header-on-top {
  z-index: 2;
}

.nav-item {
  --header-navigation-item-margin: 0 var(--spacer-sm);

  .sf-header-navigation-item__item--mobile {
    display: none;
  }
}

.cart-badge {
  position: absolute;
  bottom: 40%;
  left: 40%;
}
</style>
