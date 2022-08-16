import path from 'node:path';
import url from 'node:url';
import type { Module } from '@nuxt/types';
import type { NuxtRouteConfig } from '@nuxt/types/config/router';

const nuxtModule : Module = function checkoutModule() {
  const moduleDir = path.dirname(url.fileURLToPath(import.meta.url));

  this.extendRoutes((routes: NuxtRouteConfig[]) => {
    routes.unshift(
      {
        name: 'checkout',
        path: '/checkout',
        component: path.resolve(moduleDir, 'pages/Checkout.vue'),
        children: [
          {
            path: 'user-account',
            name: 'user-account',
            component: path.resolve(moduleDir, 'pages/Checkout/UserAccount.vue'),
          },
          {
            path: 'shipping',
            name: 'shipping',
            component: path.resolve(moduleDir, 'pages/Checkout/Shipping.vue'),
          },
          {
            path: 'billing',
            name: 'billing',
            component: path.resolve(moduleDir, 'pages/Checkout/Billing.vue'),
          },
          {
            path: 'payment',
            name: 'payment',
            component: path.resolve(moduleDir, 'pages/Checkout/Payment.vue'),
          },
          {
            path: 'thank-you',
            name: 'thank-you',
            component: path.resolve(moduleDir, 'pages/Checkout/ThankYou.vue'),
          },
        ],
      },
      {
        name: 'cart',
        path: '/cart',
        component: path.resolve(moduleDir, 'pages/Cart.vue'),
      },
    );
  });
};

export default nuxtModule;
