<template>
  <div id="my-account">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <SfContentPages
      v-e2e="'my-account-content-pages'"
      title="My Account"
      :active="activePage"
      class="my-account"
      @click:change="changeActivePage"
    >
      <SfContentCategory title="Personal Details">
        <SfContentPage title="My profile">
          <MyProfile />
        </SfContentPage>

        <SfContentPage title="Addresses details">
          <AddressesDetails />
        </SfContentPage>

        <SfContentPage title="My newsletter">
          <MyNewsletter />
        </SfContentPage>

        <SfContentPage title="My wishlist">
          <MyWishlist />
        </SfContentPage>
      </SfContentCategory>

      <SfContentCategory title="Order details">
        <SfContentPage title="Order history">
          <OrderHistory />
        </SfContentPage>

        <SfContentPage title="My reviews">
          <MyReviews />
        </SfContentPage>
      </SfContentCategory>

      <SfContentPage title="Log out" />
    </SfContentPages>
  </div>
</template>
<script>
import { SfBreadcrumbs, SfContentPages } from '@storefront-ui/vue';
import { computed, defineComponent } from '@vue/composition-api';
import { useUser } from '@vue-storefront/magento';
import MyProfile from './MyAccount/MyProfile.vue';
import AddressesDetails from './MyAccount/AddressesDetails.vue';
import MyNewsletter from './MyAccount/MyNewsletter.vue';
import MyWishlist from './MyAccount/MyWishlist.vue';
import OrderHistory from './MyAccount/OrderHistory.vue';
import MyReviews from './MyAccount/MyReviews.vue';
import { useVueRouter } from '~/helpers/hooks/useVueRouter';

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
    const { router, route } = useVueRouter();
    const { logout } = useUser();
    const activePage = computed(() => {
      const { pageName } = route.params;

      if (pageName) {
        return (`${pageName.charAt(0).toUpperCase()}${pageName.slice(1)}`).replace('-', ' ');
      }

      return 'My profile';
    });

    const changeActivePage = async (title) => {
      if (title === 'Log out') {
        await logout();
        await router.push('/');
        return;
      }

      await router.push(`/my-account/${(title || '').toLowerCase().replace(' ', '-')}`);
    };

    return { changeActivePage, activePage };
  },

  data() {
    return {
      breadcrumbs: [
        {
          text: 'Home',
          route: { link: '#' },
        },
        {
          text: 'My Account',
          route: { link: '#' },
        },
      ],
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
      var(--spacer-sm) var(--spacer-sm) var(--spacer-base);
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
