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
          <SfImage
            src="/icons/logo.svg"
            alt="Vue Storefront Next"
            class="sf-header__logo-image"
          />
        </nuxt-link>
      </template>
      <template #navigation>
        <SfHeaderNavigationItem
          v-for="(category, index) in categoryTree"
          :key="index"
          v-e2e="'app-header-url_women'"
          class="nav-item"
          :label="category.label"
          :link="localePath(getAgnosticCatLink(category))"
        />
      </template>
      <template #aside>
        <StoreSwitcher class="smartphone-only" />
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
        <SfSearchBar
          ref="searchBarRef"
          v-click-outside="closeSearch"
          :placeholder="$t('Search for items')"
          aria-label="Search"
          class="sf-header__search"
          :value="term"
          @input="handleSearch"
          @keydown.enter="handleSearch($event)"
          @focus="isSearchOpen = true"
          @keydown.esc="closeSearch"
        >
          <template #icon>
            <SfButton
              v-if="!!term"
              class="sf-search-bar__button sf-button--pure"
              aria-label="Close search"
              @click="closeOrFocusSearchBar"
            >
              <span class="sf-search-bar__icon">
                <SfIcon
                  color="var(--c-text)"
                  size="18px"
                  icon="cross"
                />
              </span>
            </SfButton>
            <SfButton
              v-else
              class="sf-search-bar__button sf-button--pure"
              aria-label="Open search"
              @click="isSearchOpen ? isSearchOpen = false : isSearchOpen = true"
            >
              <span class="sf-search-bar__icon">
                <SfIcon
                  color="var(--c-text)"
                  size="20px"
                  icon="search"
                />
              </span>
            </SfButton>
          </template>
        </SfSearchBar>
      </template>
    </SfHeader>
    <SearchResults
      :visible="isSearchOpen"
      :result="result"
      @close="closeSearch"
      @removeSearchResults="removeSearchResults"
    />
    <SfOverlay :visible="isSearchOpen" />
  </div>
</template>

<script>
import {
  SfHeader,
  SfImage,
  SfIcon,
  SfButton,
  SfBadge,
  SfSearchBar,
  SfOverlay,
} from '@storefront-ui/vue';
import {
  cartGetters,
  categoryGetters,
  useCart,
  useCategory,
  useCategorySearch,
  useFacet,
  useUser, useWishlist, wishlistGetters,
} from '@vue-storefront/magento';
import {
  computed,
  ref,
  onBeforeUnmount,
  watch,
  defineComponent,
  useRouter,
  useContext,
} from '@nuxtjs/composition-api';
import { onSSR } from '@vue-storefront/core';
import { clickOutside } from '@storefront-ui/vue/src/utilities/directives/click-outside/click-outside-directive.js';
import {
  mapMobileObserver,
  unMapMobileObserver,
} from '@storefront-ui/vue/src/utilities/mobile-observer.js';
import debounce from 'lodash.debounce';
import {
  useUiHelpers,
  useUiState,
} from '~/composables';
import StoreSwitcher from '~/components/StoreSwitcher.vue';
import SearchResults from '~/components/SearchResults.vue';

export default defineComponent({
  components: {
    SfHeader,
    SfImage,
    StoreSwitcher,
    SfIcon,
    SfButton,
    SfBadge,
    SfSearchBar,
    SearchResults,
    SfOverlay,
  },
  directives: { clickOutside },
  setup() {
    const router = useRouter();
    const { app } = useContext();
    const { toggleCartSidebar, toggleWishlistSidebar, toggleLoginModal } = useUiState();
    const { setTermForUrl, getFacetsFromURL, getAgnosticCatLink } = useUiHelpers();
    const { isAuthenticated, load: loadUser } = useUser();
    const { cart, load: loadCart } = useCart();
    const { wishlist } = useWishlist('GlobalWishlist');
    const {
      result: searchResult,
      search: productsSearch,
      // loading: productsLoading,
    } = useFacet('AppHeader:Products');
    const {
      result: categories,
      search: categoriesSearch,
    } = useCategorySearch('AppHeader:Categories');
    const {
      categories: categoryList,
      search: categoriesListSearch,
    } = useCategory('AppHeader:CategoryList');

    const term = ref(getFacetsFromURL().term);
    const isSearchOpen = ref(false);
    const searchBarRef = ref(null);
    const result = ref(null);

    const wishlistHasProducts = computed(() => wishlistGetters.getTotalItems(wishlist.value) > 0);
    const wishlistItemsQty = computed(() => wishlistGetters.getTotalItems(wishlist.value));

    const cartTotalItems = computed(() => {
      const count = cartGetters.getTotalItems(cart.value);
      return count ? count.toString() : null;
    });

    const accountIcon = computed(() => (isAuthenticated.value ? 'profile_fill' : 'profile'));

    const categoryTree = computed(() => categoryGetters.getCategoryTree(categoryList.value?.[0])?.items.filter((c) => c.count > 0));

    const handleAccountClick = async () => {
      if (isAuthenticated.value) {
        await router.push(`${app.localePath('/my-account')}`);
      } else {
        toggleLoginModal();
      }
    };

    onSSR(async () => {
      await Promise.all([
        loadUser(),
        loadCart(),
        categoriesListSearch({
          pageSize: 20,
        }),
      ]);
    });

    const closeSearch = () => {
      if (!isSearchOpen.value) return;

      term.value = '';
      isSearchOpen.value = false;
    };

    const handleSearch = debounce(async (paramValue) => {
      term.value = !paramValue.target ? paramValue : paramValue.target.value;

      await Promise.all([
        productsSearch({
          itemsPerPage: 12,
          term: term.value,
        }),
        categoriesSearch({ filters: { name: { match: `${term.value}` } } }),
      ]);

      result.value = {
        products: searchResult.value?.data?.items,
        categories: categories.value
          .map((element) => categoryGetters.getCategoryTree(element)),
      };
    }, 1000);

    const isMobile = computed(() => mapMobileObserver().isMobile.get());

    const closeOrFocusSearchBar = () => {
      if (isMobile.value) {
        return closeSearch();
      }
      term.value = '';
      return searchBarRef.value.$el.children[0].focus();
    };

    watch(() => term.value, (newVal, oldVal) => {
      const shouldSearchBeOpened = (!isMobile.value && term.value.length > 0)
        && ((!oldVal && newVal)
          || (newVal.length !== oldVal.length
            && isSearchOpen.value === false));

      if (shouldSearchBeOpened) isSearchOpen.value = true;
    });

    const removeSearchResults = () => {
      result.value = null;
    };

    onBeforeUnmount(() => {
      unMapMobileObserver();
    });

    return {
      accountIcon,
      cartTotalItems,
      categoryTree,
      closeOrFocusSearchBar,
      closeSearch,
      getAgnosticCatLink,
      handleAccountClick,
      handleSearch,
      isAuthenticated,
      isMobile,
      isSearchOpen,
      removeSearchResults,
      result,
      searchBarRef,
      setTermForUrl,
      term,
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
    --header-padding: 0;
  }

  &__logo-image {
    height: 100%;
  }
}

.header-on-top {
  z-index: 2;
}

.nav-item {
  --header-navigation-item-margin: 0 var(--spacer-base);

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
