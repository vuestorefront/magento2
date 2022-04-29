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
          <SkeletonLoader
            v-if="$fetchState.pending"
            :height="skeletonHeight"
          />
          <MyProfile v-else />
        </SfContentPage>

        <SfContentPage :title="$t('Addresses details')">
          <SkeletonLoader
            v-if="$fetchState.pending"
            :height="skeletonHeight"
          />
          <AddressesDetails v-else />
        </SfContentPage>

        <SfContentPage :title="$t('My newsletter')">
          <SkeletonLoader
            v-if="$fetchState.pending"
            :height="skeletonHeight"
          />
          <MyNewsletter v-else />
        </SfContentPage>
        <SfContentPage :title="$t('My wishlist')">
          <SkeletonLoader
            v-if="$fetchState.pending"
            :height="skeletonHeight"
          />
          <MyWishlist v-else />
        </SfContentPage>
      </SfContentCategory>

      <SfContentCategory :title="$t('Order details')">
        <SfContentPage :title="$t('Order history')">
          <SkeletonLoader
            v-if="$fetchState.pending"
            :height="skeletonHeight"
          />
          <OrderHistory v-else />
        </SfContentPage>

        <SfContentPage :title="$t('My reviews')">
          <SkeletonLoader
            v-if="$fetchState.pending"
            height="100vh"
          />
          <MyReviews v-else />
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
  ref,
  useContext,
  useFetch,
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api';
import SkeletonLoader from '~/components/SkeletonLoader/index.vue';
import MyProfile from '~/modules/customer/pages/MyProfile.vue';
import AddressesDetails from '~/modules/customer/pages/AddressesDetails.vue';
import MyNewsletter from '~/modules/customer/pages//MyNewsletter.vue';
import MyWishlist from '~/modules/customer/pages/MyWishlist.vue';
import OrderHistory from '~/modules/customer/pages/OrderHistory.vue';
import MyReviews from '~/modules/customer/pages/MyReviews.vue';
import { useUser } from '~/modules/customer/composables/useUser';
import { useCart } from '~/composables';

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
    SkeletonLoader,
  },
  middleware: [
    'is-authenticated',
  ],
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { logout, load: loadUser, user } = useUser();
    const { clear } = useCart();
    const { localePath, app } = useContext();

    useFetch(async () => {
      if (user.value === null) {
        await loadUser();
      }
    });

    const breadcrumbs = ref([
      {
        text: app.i18n.t('Home'),
        link: '#',
      },
      {
        text: app.i18n.t('My Account'),
        link: '#',
      },
    ]);

    const activePage = computed(() => {
      const { pageName } = route.value.params;

      return pageName
        ? (pageName.charAt(0).toUpperCase() + pageName.slice(1).replace('-', ' '))
        : app.i18n.t('My profile');
    });

    const changeActivePage = async (title) => {
      if (title === app.i18n.t('Log out')) {
        localStorage.removeItem('vsf-checkout');
        await Promise.all([logout(), clear()]);
        await router.push(`${localePath({ name: 'home' })}`);

        return;
      }

      const slugifiedTitle = (title || '').toLowerCase().replace(' ', '-');
      const transformedPath = `/my-account/${slugifiedTitle}`;
      await router.push(`${localePath(transformedPath)}`);
    };

    return {
      user,
      activePage,
      breadcrumbs,
      changeActivePage,
      skeletonHeight: '100vh',
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
