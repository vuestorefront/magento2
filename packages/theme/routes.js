import path from 'node:path';
import url from 'node:url';

export function getRoutes(themeDir = path.dirname(url.fileURLToPath(import.meta.url))) {
  return [{
    name: 'home',
    path: '/',
    component: path.resolve(themeDir, 'pages/Home.vue'),
  },
  {
    name: 'checkout',
    path: '/checkout',
    component: path.resolve(themeDir, 'pages/Checkout.vue'),
    children: [
      {
        path: 'user-account',
        name: 'user-account',
        component: path.resolve(themeDir, 'pages/Checkout/UserAccount.vue'),
      },
      {
        path: 'shipping',
        name: 'shipping',
        component: path.resolve(themeDir, 'pages/Checkout/Shipping.vue'),
      },
      {
        path: 'billing',
        name: 'billing',
        component: path.resolve(themeDir, 'pages/Checkout/Billing.vue'),
      },
      {
        path: 'payment',
        name: 'payment',
        component: path.resolve(themeDir, 'pages/Checkout/Payment.vue'),
      },
      {
        path: 'thank-you',
        name: 'thank-you',
        component: path.resolve(themeDir, 'pages/Checkout/ThankYou.vue'),
      },
      {
        path: 'external-thank-you',
        name: 'external-thank-you',
        component: path.resolve(themeDir, 'pages/Checkout/ExternalCheckoutThankYou.vue'),
      },
    ],
  },
  {
    name: 'reset-password',
    path: '/reset-password',
    alias: '/customer/account/createPassword',
    component: path.resolve(themeDir, 'pages/ResetPassword.vue'),
  },
  {
    name: 'page',
    path: '/:slug+',
    component: path.resolve(themeDir, 'pages/Page.vue'),
  },
  ];
}
