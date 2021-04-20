module.exports = {
  title: 'Vue Storefront Next with Magento',
  base: '/',
  description: 'Documentation for the Magento connector for Vue Storefront Next',
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }]
  ],
  configureWebpack: (config) => {
    config.module.rules = config.module.rules.map(rule => ({
      ...rule,
      use: rule.use && rule.use.map(useRule => ({
        ...useRule,
        options: useRule.loader === 'url-loader' ?
          /**
            Hack for loading images properly.
            ref: https://github.com/vuejs/vue-loader/issues/1612#issuecomment-559366730
           */
          {  ...useRule.options, esModule: false } :
          useRule.options
      }))
    }))
  },
  themeConfig: {
    logo: 'https://camo.githubusercontent.com/48c886ac0703e3a46bc0ec963e20f126337229fc/68747470733a2f2f643968687267346d6e767a6f772e636c6f756466726f6e742e6e65742f7777772e76756573746f726566726f6e742e696f2f32383062313964302d6c6f676f2d76735f3062793032633062793032633030303030302e6a7067',
    sidebar: [
      {
        title: 'Essentials',
        collapsable: false,
        children: [
          ['/', 'Introduction'],
          ['/magento/getting-started', 'Getting started'],
          ['/magento/configuration', 'Configuration'],
        ]
      },
      {
        title: 'Composables',
        collapsable: false,
        children: [
          ['/magento/composables/use-billing', 'useBilling'],
          ['/magento/composables/use-cart', 'useCart'],
          ['/magento/composables/use-category', 'useCategory'],
          ['/magento/composables/use-checkout', 'useCheckout'],
          ['/magento/composables/use-config', 'useConfig'],
          ['/magento/composables/use-facet', 'useFacet'],
          ['/magento/composables/use-make-oder', 'useMakeOrder'],
          ['/magento/composables/use-page', 'usePage'],
          ['/magento/composables/use-product', 'useProduct'],
          ['/magento/composables/use-router', 'useRouter'],
          ['/magento/composables/use-shipping', 'useShipping'],
          ['/magento/composables/use-shipping-provider', 'useShippingProvider'],
          ['/magento/composables/use-user', 'useUser'],
          ['/magento/composables/use-user-billing', 'useUserBilling'],
          ['/magento/composables/use-user-order', 'useUserOrder'],
          ['/magento/composables/use-user-shipping', 'useUserShipping'],
          ['/magento/composables/use-user-wishlist', 'useUserWishlist']
        ]
      }
    ]
  }
}
