import path from 'node:path';
import url from 'node:url';
import { Module } from '@nuxt/types';
import { NuxtRouteConfig } from '@nuxt/types/config/router';

const moduleDir = path.dirname(url.fileURLToPath(import.meta.url));

const stub = path.resolve(moduleDir, 'components/RoutePlaceholder.vue');

const moduleRoutes : NuxtRouteConfig = {
  name: 'customer',
  path: '/customer',
  component: path.resolve(moduleDir, 'pages/MyAccount/MyAccount.vue'),
  meta: { titleLabel: 'My Account' },
  children: [
    {
      name: 'customer-my-profile',
      path: 'my-profile',
      component: path.resolve(moduleDir, 'pages/MyAccount/MyProfile/MyProfile.vue'),
      meta: { titleLabel: 'My profile' },
    },
    {
      name: 'customer-addresses-details',
      path: 'addresses-details',
      component: path.resolve(moduleDir, 'pages/AddressesDetails/AddressesDetails.vue'),
      meta: { titleLabel: 'Addresses details' },
    },
    {
      name: 'customer-addresses-details-new',
      path: 'addresses-details/create',
      component: path.resolve(moduleDir, 'pages/AddressesDetails/AddressesDetailsNew.vue'),
      meta: { titleLabel: 'Addresses details' },
    },
    {
      name: 'customer-addresses-details-edit',
      path: 'addresses-details/edit/:addressId',
      component: path.resolve(moduleDir, 'pages/AddressesDetails/AddressesDetailsEdit.vue'),
      props: true,
      meta: { titleLabel: 'Addresses details' },
    },
    {
      name: 'customer-my-newsletter',
      path: 'my-newsletter',
      // component: path.resolve(moduleDir, 'pages/MyNewsletter.vue'),
      component: stub,
      meta: { titleLabel: 'My newsletter' },
    },
    {
      name: 'customer-my-wishlist',
      path: 'my-wishlist',
      // component: path.resolve(moduleDir, 'pages/MyWishlist.vue'),
      component: stub,
      meta: { titleLabel: 'My wishlist' },
    },
    {
      name: 'customer-order-history',
      path: 'order-history',
      // component: path.resolve(moduleDir, 'pages/OrderHistory.vue'),
      component: stub,
      meta: { titleLabel: 'Order history' },
    },
    {
      name: 'customer-my-reviews',
      path: 'my-reviews',
      // component: path.resolve(moduleDir, 'pages/MyReviews.vue'),
      component: stub,
      meta: { titleLabel: 'My reviews' },
    },
  ],
};

const nuxtModule : Module = function customerModule() {
  this.extendRoutes((routes: NuxtRouteConfig[]) => {
    routes.unshift(moduleRoutes);
  });
};

export default nuxtModule;
