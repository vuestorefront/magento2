<template>
  <div class="smartphone-only">
    <SfBottomNavigation class="navigation-bottom">
      <SfBottomNavigationItem
        :class="{ 'sf-bottom-navigation__item--active': $route.name && $route.name.startsWith('home') }"
        :label="$t('Home')"
        data-testid="bottom-navigation-home"
        @click="handleHomeClick"
      >
        <template #icon>
          <SvgImage
            icon="home"
            :label="$t('Home')"
            width="20"
            height="20"
          />
        </template>
      </SfBottomNavigationItem>
      <SfBottomNavigationItem
        :label="$t('Menu')"
        data-testid="bottom-navigation-menu"
        @click="loadCategoryMenu"
      >
        <template #icon>
          <SvgImage
            icon="menu"
            :label="$t('Menu')"
            width="20"
            height="20"
          />
        </template>
      </SfBottomNavigationItem>
      <SfBottomNavigationItem
        v-if="isAuthenticated"
        :label="$t('Wishlist')"
        data-testid="bottom-navigation-wishlist"
        @click="toggleWishlistSidebar"
      >
        <template #icon>
          <SvgImage
            icon="heart"
            :label="$t('Wishlist')"
            width="20"
            height="20"
          />
        </template>
      </SfBottomNavigationItem>
      <SfBottomNavigationItem
        :label="$t('Account')"
        data-testid="bottom-navigation-account"
        @click="handleAccountClick"
      >
        <template #icon>
          <SvgImage
            icon="profile"
            :label="$t('Account')"
            width="20"
            height="20"
          />
        </template>
      </SfBottomNavigationItem>
      <SfBottomNavigationItem
        :label="$t('Cart')"
        data-testid="bottom-navigation-cart"
        @click="toggleCartSidebar"
      >
        <template #icon>
          <SfCircleIcon aria-label="Go to cart">
            <SvgImage
              icon="add_to_cart"
              width="25"
              height="25"
              class="navigation-bottom__add-to-cart"
            />
          </SfCircleIcon>
        </template>
      </SfBottomNavigationItem>
    </SfBottomNavigation>
    <MobileCategorySidebar v-if="isMobileMenuOpen" />
  </div>
</template>

<script lang="ts">
import { SfBottomNavigation, SfCircleIcon } from '@storefront-ui/vue';
import { defineComponent, useRouter, useContext } from '@nuxtjs/composition-api';
import { useUiState } from '~/composables/useUiState';
import { useUser } from '~/modules/customer/composables/useUser';
import SvgImage from '~/components/General/SvgImage.vue';
import { useCategoryStore } from '~/modules/catalog/category/stores/category';

const MobileCategorySidebar = () => import('~/modules/catalog/category/components/sidebar/MobileCategorySidebar/MobileCategorySidebar.vue');

export default defineComponent({
  name: 'BottomNavigation',
  components: {
    SfBottomNavigation,
    SfCircleIcon,
    MobileCategorySidebar,
    SvgImage,
  },
  setup() {
    const {
      toggleCartSidebar,
      toggleWishlistSidebar,
      toggleLoginModal,
      toggleMobileMenu,
      isMobileMenuOpen,
    } = useUiState();
    const { isAuthenticated } = useUser();
    const router = useRouter();
    const { app } = useContext();

    const handleHomeClick = async () => {
      const homePath = app.localeRoute({ name: 'home' });
      await router.push(homePath);
      if (isMobileMenuOpen.value) {
        toggleMobileMenu();
      }
    };

    const handleAccountClick = async () => {
      if (isAuthenticated.value) {
        await router.push(app.localeRoute({ name: 'customer' }));
      } else {
        toggleLoginModal();
      }
    };

    const loadCategoryMenu = async () => {
      const categories = useCategoryStore();
      if (categories.categories === null) {
        await categories.load();
      }
      toggleMobileMenu();
    };

    return {
      isAuthenticated,
      isMobileMenuOpen,
      toggleWishlistSidebar,
      toggleCartSidebar,
      toggleMobileMenu,
      loadCategoryMenu,
      handleAccountClick,
      handleHomeClick,
    };
  },
});
</script>
<style lang="scss" scoped>
.navigation-bottom {
  --bottom-navigation-z-index: 3;

  &__add-to-cart {
    margin-left: -2px
  }

  ::v-deep {
    .sf-bottom-navigation-item {
      align-self: end;
    }

    .svg-image {
      margin-bottom: var(--spacer-xs);
    }
  }
}
</style>
