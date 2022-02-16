<template>
  <div id="my-account">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <SfContentPages
      v-e2e="'my-account-content-pages'"
      :title="$t('My Account')"
      :active="activePage"
      class="my-account"
      @click:change="changeActivePage"
    >
      <SfContentCategory :title="$t('Personal Details')">
        <SfContentPage :title="$t('My profile')">
          <MyProfile />
        </SfContentPage>

        <SfContentPage :title="$t('Addresses details')">
          <AddressesDetails />
        </SfContentPage>

        <SfContentPage :title="$t('My newsletter')">
          <MyNewsletter />
        </SfContentPage>

        <SfContentPage :title="$t('My wishlist')">
          <MyWishlist />
        </SfContentPage>
      </SfContentCategory>

      <SfContentCategory :title="$t('Order details')">
        <SfContentPage :title="$t('Order history')">
          <OrderHistory />
        </SfContentPage>

        <SfContentPage :title="$t('My reviews')">
          <MyReviews />
        </SfContentPage>
      </SfContentCategory>

      <SfContentPage :title="$t('Log out')" />
    </SfContentPages>
  </div>
</template>
<script>
import { SfBreadcrumbs, SfContentPages } from '@storefront-ui/vue';
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  ref,
  useContext,
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api';
import { useCart, useUser } from '@vue-storefront/magento';
import {
  mapMobileObserver,
  unMapMobileObserver,
} from '@storefront-ui/vue/src/utilities/mobile-observer.js';
import MyProfile from './MyAccount/MyProfile.vue';
import AddressesDetails from './MyAccount/AddressesDetails.vue';
import MyNewsletter from './MyAccount/MyNewsletter.vue';
import MyWishlist from './MyAccount/MyWishlist.vue';
import OrderHistory from './MyAccount/OrderHistory.vue';
import MyReviews from './MyAccount/MyReviews.vue';

export default defineComponent({
  name: 'MyAccount',
  components: {
    AddressesDetails,
    MyNewsletter,
    MyProfile,
    MyReviews,
    MyWishlist,
    OrderHistory,
    SfBreadcrumbs,
    SfContentPages,
  },
  middleware: [
    'is-authenticated',
  ],
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { logout } = useUser();
    const { clear } = useCart();
    const { localePath, app } = useContext();
    const isMobile = computed(() => mapMobileObserver().isMobile.get());
    const breadcrumbs = ref([
      {
        text: app.i18n.t('Home'),
        route: { link: '#' },
      },
      {
        text: app.i18n.t('My Account'),
        route: { link: '#' },
      },
    ]);

    const activePage = computed(() => {
      const { pageName } = route.value.params;
      if (pageName) {
        return (pageName.charAt(0).toUpperCase() + pageName.slice(1)).replace('-', ' ');
      } if (!isMobile.value) {
        return app.i18n.t('My profile');
      }
      return '';
    });

    const changeActivePage = async (title) => {
      if (title === app.i18n.t('Log out')) {
        await Promise.all([logout(), clear()]);
        await router.push(`${localePath({ name: 'home' })}`);

        return;
      }

      const slugifiedTitle = (title || '').toLowerCase().replace(' ', '-');
      const transformedPath = `/my-account/${slugifiedTitle}`;
      await router.push(`${localePath(transformedPath)}`);
    };

    onBeforeUnmount(() => {
      unMapMobileObserver();
    });

    return {
      activePage,
      breadcrumbs,
      changeActivePage,
    };
  },
});
</script>

<style lang='scss' scoped>
#my-account {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}
.my-account {
  @include for-mobile {
    --content-pages-sidebar-category-title-font-weight: var(
      --font-weight--normal
    );
    --content-pages-sidebar-category-title-margin: var(--spacer-sm)
      var(--spacer-sm) var(--spacer-sm) var(--spacer-sm);
  }
  @include for-desktop {
    --content-pages-sidebar-category-title-margin: var(--spacer-xl) 0 0 0;
  }
}
.breadcrumbs {
  margin: var(--spacer-base) 0 var(--spacer-lg);
}
.sf-content-pages {
  height: auto;
}
::v-deep .sf-content-pages__content {
  height: auto;
}
.sf-content-pages__content {
  height: auto;
}
</style>
