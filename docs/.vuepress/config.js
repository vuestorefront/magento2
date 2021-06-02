module.exports = {
  title: 'Vue Storefront 2 for Magento',
  base: '/',
  description: 'Documentation for the Magento connector for Vue Storefront 2',
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
    sidebar: [
      {
        title: 'Essentials',
        collapsable: false,
        children: [
          ['/', 'Introduction'],
          ['/guide/getting-started', 'Getting started'],
          ['/guide/configuration', 'Configuration'],
          ['/guide/about', 'About'],
        ]
      },
      {
        title: 'Composables',
        collapsable: false,
        children: [
          ['/guide/composables/use-billing', 'useBilling'],
          ['/guide/composables/use-cart', 'useCart'],
          ['/guide/composables/use-category', 'useCategory'],
          ['/guide/composables/use-category-search', 'useCategorySearch'],
          ['/guide/composables/use-config', 'useConfig'],
          ['/guide/composables/use-country-search', 'useCountrySearch'],
          ['/guide/composables/use-external-checkout', 'useExternalCheckout'],
          ['/guide/composables/use-facet', 'useFacet'],
          ['/guide/composables/use-get-shipping-methods', 'useGetShippingMethods'],
          ['/guide/composables/use-guest-user', 'useGuestUser'],
          ['/guide/composables/use-make-oder', 'useMakeOrder'],
          ['/guide/composables/use-menu-category', 'useMenuCategory'],
          ['/guide/composables/use-page', 'usePage'],
          ['/guide/composables/use-payment-provider', 'usePaymentProvider'],
          ['/guide/composables/use-product', 'useProduct'],
          ['/guide/composables/use-router', 'useRouter'],
        ]
      }
    ]
  }
}
