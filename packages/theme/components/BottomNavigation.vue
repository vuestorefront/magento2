<template>
  <!-- TODO: create logic with isActive prop for BottomNavigationItems -->
  <div class="smartphone-only">
    <SfBottomNavigation class="navigation-bottom">
      <SfBottomNavigationItem
        :class="{ 'sf-bottom-navigation__item--active': $route.name && $route.name.startsWith('home') }"
        label="Home"
        @click="$router.push(app.localePath('/')) && (isMobileMenuOpen ? toggleMobileMenu() : false)"
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
        label="Menu"
        @click="toggleMobileMenu"
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
        label="Wishlist"
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
        label="Account"
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
        :label="$route.name && $route.name.startsWith('product') ? 'Add to Cart' : 'Basket'"
        @click="toggleCartSidebar"
      >
        <template #icon>
          <SfCircleIcon aria-label="Add to cart">
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
    <MobileMenuSidebar />
  </div>
</template>

<script>
import { SfBottomNavigation, SfCircleIcon } from '@storefront-ui/vue';
import { useUser } from '@vue-storefront/magento';
import { defineComponent, useRouter, useContext } from '@nuxtjs/composition-api';
import { useUiState } from '~/composables';
import MobileMenuSidebar from '~/components/MobileMenuSidebar.vue';
import SvgImage from '~/components/General/SvgImage.vue';

export default defineComponent({
  components: {
    SfBottomNavigation,
    SfCircleIcon,
    MobileMenuSidebar,
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
    const handleAccountClick = async () => {
      if (isAuthenticated.value) {
        await router.push(`${app.localePath('/my-account')}`);
      } else {
        toggleLoginModal();
      }
    };

    return {
      isAuthenticated,
      isMobileMenuOpen,
      toggleWishlistSidebar,
      toggleCartSidebar,
      toggleMobileMenu,
      handleAccountClick,
      app,
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
