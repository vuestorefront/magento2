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
  /**
   * Ref：https://v1.vuepress.vuejs.org/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    [
      '@vuepress/plugin-medium-zoom',
      {
        // This selector excludes images from the "Integrations" page
        selector: 'main :not(.tile-image) > img'
      }
    ],
    '@vuepress/active-header-links',
    '@vuepress/search'
  ],
  themeConfig: {
    repo: 'https://github.com/vuestorefront/magento2/',
    editLinks: true,
    docsDir: 'docs',
    docsBranch: 'develop',
    editLinkText: 'Edit this page',
    logo: 'https://user-images.githubusercontent.com/1626923/137092657-fb398d20-b592-4661-a1f9-4135db0b61d5.png',
    nav: [
      { text: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      { text: 'Core Documentation', link: 'https://docs.vuestorefront.io/v2/' },
      { text: 'Demo', link: 'http://m2-vsf.caravelx.com/' },
      { text: 'GitHub', link: 'https://github.com/vuestorefront/magento2'},
      { text: 'Roadmap', link: 'https://github.com/vuestorefront/magento2/projects/5'}
    ],
    sidebar: [
      {
        title: 'Essentials',
        collapsable: false,
        children: [
          ['/', 'Introduction'],
          ['/guide/about', 'About'],
        ]
      },
      {
        title: 'Creating a Storefront',
        collapsable: false,
        children: [
          ['/guide/creating-a-store', 'Creating a Store'],
          ['/guide/configuration', 'Configuration'],
        ]
      },
      {
        title: 'Composables',
        children: [
          ['/guide/composables/use-addresses', 'useAddresses'],
          ['/guide/composables/use-billing', 'useBilling'],
          ['/guide/composables/use-cart', 'useCart'],
          ['/guide/composables/use-category', 'useCategory'],
          ['/guide/composables/use-category-search', 'useCategorySearch'],
          ['/guide/composables/use-config', 'useConfig'],
          ['/guide/composables/use-content', 'useContent'],
          ['/guide/composables/use-country-search', 'useCountrySearch'],
          ['/guide/composables/use-custom-mutation', 'useCustomMutation'],
          ['/guide/composables/use-custom-query', 'useCustomQuery'],
          ['/guide/composables/use-external-checkout', 'useExternalCheckout'],
          ['/guide/composables/use-facet', 'useFacet'],
          ['/guide/composables/use-forgot-password', 'useForgotPassword'],
          ['/guide/composables/use-get-shipping-methods', 'useGetShippingMethods'],
          ['/guide/composables/use-guest-user', 'useGuestUser'],
          ['/guide/composables/use-make-oder', 'useMakeOrder'],
          ['/guide/composables/use-menu-category', 'useMenuCategory'],
          ['/guide/composables/use-newsletter', 'useNewsletter'],
          ['/guide/composables/use-payment-provider', 'usePaymentProvider'],
          ['/guide/composables/use-product', 'useProduct'],
          ['/guide/composables/use-related-products', 'useRelatedProducts'],
          ['/guide/composables/use-review', 'useReview'],
          ['/guide/composables/use-store', 'useStore'],
          ['/guide/composables/use-upsell-products', 'useUpsellProducts'],
          ['/guide/composables/use-url-resolver', 'useUrlResolver'],
          ['/guide/composables/use-wishlist', 'useWishlist'],
        ]
      },
      {
        title: 'Reference',
        children: [
          ['/api-reference/', 'API Reference'],
        ]
      },
      {
        title: 'Nuxt Tips  & Tricks',
        children: [
          ['/improvements/optimization/', 'Optimization'],
          ['/improvements/security/', 'Security'],
          ['/improvements/logging/', 'Logging'],
          ['/improvements/analytics/', 'Analytics'],
        ]
      }
    ]
  }
}
