<template>
  <div>
    <LazyHydrate when-visible>
      <CartSidebar />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <WishlistSidebar />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <LoginModal />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <Notification />
    </LazyHydrate>
    <TopBar class="desktop-only" />
    <AppHeader />
    <div id="layout">
      <nuxt :key="route.fullPath" />
    </div>
    <BottomNavigation />
    <AppFooter />
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration';
import { useRoute, defineComponent, onMounted } from '@nuxtjs/composition-api';
import {
  useUser,
} from '@vue-storefront/magento';
import { useMagentoConfiguration } from '~/composables/useMagentoConfiguration';
import AppHeader from '~/components/AppHeader.vue';
import BottomNavigation from '~/components/BottomNavigation.vue';
import TopBar from '~/components/TopBar.vue';
import CartSidebar from '~/components/CartSidebar.vue';
import WishlistSidebar from '~/components/WishlistSidebar.vue';
import LoginModal from '~/components/LoginModal.vue';
import Notification from '~/components/Notification';
import AppFooter from '~/components/AppFooter.vue';

export default defineComponent({
  name: 'DefaultLayout',

  components: {
    LazyHydrate,
    TopBar,
    AppHeader,
    BottomNavigation,
    AppFooter,
    CartSidebar,
    WishlistSidebar,
    LoginModal,
    Notification,
  },

  setup() {
    const route = useRoute();
    const { load: loadUser } = useUser();
    const { loadConfiguration } = useMagentoConfiguration();

    onMounted(() => {
      loadConfiguration();
      loadUser();
    });

    return {
      route,
    };
  },
});
</script>

<style lang="scss">
@import "~@storefront-ui/vue/styles";

#layout {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: auto;
  }
}

.no-scroll {
  overflow: hidden;
  height: 100vh;
}

// Reset CSS
html {
  width: auto;
  @include for-mobile {
    overflow-x: hidden;
  }
}

body {
  overflow-x: hidden;
  color: var(--c-text);
  font-size: var(--font-size--base);
  font-family: var(--font-family--primary);
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
  color: var(--c-link);

  &:hover {
    color: var(--c-link-hover);
  }
}

h1 {
  font-family: var(--font-family--secondary);
  font-size: var(--h1-font-size);
  line-height: 1.6;
  margin: 0;
}

h2 {
  font-family: var(--font-family--secondary);
  font-size: var(--h2-font-size);
  line-height: 1.6;
  margin: 0;
}

h3 {
  font-family: var(--font-family--secondary);
  font-size: var(--h3-font-size);
  line-height: 1.6;
  margin: 0;
}

h4 {
  font-family: var(--font-family--secondary);
  font-size: var(--h4-font-size);
  line-height: 1.6;
  margin: 0;
}
</style>
