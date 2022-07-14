import path from 'node:path';
import url from 'node:url';
import type { Module } from '@nuxt/types';
import type { NuxtRouteConfig } from '@nuxt/types/config/router';

const moduleDir = path.dirname(url.fileURLToPath(import.meta.url));

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
      component: path.resolve(moduleDir, 'pages/MyAccount/AddressesDetails/AddressesDetails.vue'),
      meta: { titleLabel: 'Addresses details' },
    },
    {
      name: 'customer-addresses-details-new',
      path: 'addresses-details/create',
      component: path.resolve(moduleDir, 'pages/MyAccount/AddressesDetails/AddressNew.vue'),
      meta: { titleLabel: 'Addresses details' },
    },
    {
      name: 'customer-addresses-details-edit',
      path: 'addresses-details/edit/:addressId',
      component: path.resolve(moduleDir, 'pages/MyAccount/AddressesDetails/AddressEdit.vue'),
      // @ts-expect-error NuxtRouteConfig and RouteConfig conflict
      props: true,
      meta: { titleLabel: 'Addresses details' },
    },
    {
      name: 'customer-my-newsletter',
      path: 'my-newsletter',
      component: path.resolve(moduleDir, 'pages/MyAccount/MyNewsletter.vue'),
      meta: { titleLabel: 'My newsletter' },
    },
    {
      name: 'customer-my-wishlist',
      path: 'my-wishlist',
      component: path.resolve(moduleDir, 'pages/MyAccount/MyWishlist.vue'),
      meta: { titleLabel: 'My wishlist' },
    },
    {
      name: 'customer-order-history',
      path: 'order-history',
      component: path.resolve(moduleDir, 'pages/MyAccount/OrderHistory/OrderHistory.vue'),
      meta: { titleLabel: 'Order history' },
    },
    {
      name: 'customer-single-order',
      path: 'order-history/:orderId',
      component: path.resolve(moduleDir, 'pages/MyAccount/OrderHistory/SingleOrder/SingleOrder.vue'),
      // @ts-expect-error NuxtRouteConfig and RouteConfig conflict
      props: true,
      meta: { titleLabel: 'Order history' },
    },
    {
      name: 'customer-my-reviews',
      path: 'my-reviews',
      component: path.resolve(moduleDir, 'pages/MyAccount/MyReviews.vue'),
      meta: { titleLabel: 'My reviews' },
    },
    {
      name: 'reset-password',
      path: '/reset-password',
      alias: '/customer/account/createPassword',
      component: path.resolve(moduleDir, 'pages/MyAccount/ResetPassword.vue'),
    },
  ],
};

const nuxtModule : Module = function customerModule() {
  this.extendRoutes((routes: NuxtRouteConfig[]) => {
    routes.unshift(moduleRoutes);
  });
};

export default nuxtModule;
