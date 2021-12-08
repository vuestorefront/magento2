const path = require('path');

export function getRoutes(themeDir = __dirname) {
  return [{
    name: 'home',
    path: '/',
    component: path.resolve(themeDir, 'pages/Home.vue'),
  },
  {
    name: 'product',
    path: '/p/:id/:slug/',
    component: path.resolve(themeDir, 'pages/Product.vue'),
  },
  {
    name: 'category',
    path: '/c/:slug_1/:slug_2?/:slug_3?/:slug_4?/:slug_5?',
    component: path.resolve(themeDir, 'pages/Category.vue'),
  },
  {
    name: 'my-account',
    path: '/my-account/:pageName?',
    component: path.resolve(themeDir, 'pages/MyAccount.vue'),
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
