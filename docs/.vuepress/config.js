module.exports = {
  title: 'Vue Storefront 2 for Magento',
  base: '/',
  description: 'Documentation for the Magento connector for Vue Storefront 2',
  head: [['link', { rel: 'icon', href: '/favicon.png' }]],
  configureWebpack: (config) => {
    config.module.rules = config.module.rules.map((rule) => ({
      ...rule,
      use:
        rule.use &&
        rule.use.map((useRule) => ({
          ...useRule,
          options:
            useRule.loader === 'url-loader'
              ? /**
            Hack for loading images properly.
            ref: https://github.com/vuejs/vue-loader/issues/1612#issuecomment-559366730
           */
                { ...useRule.options, esModule: false }
              : useRule.options,
        })),
    }));
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
        selector: 'main :not(.tile-image) > img',
      },
    ],
    '@vuepress/active-header-links',
    '@vuepress/search',
  ],
  themeConfig: {
    sidebarDepth: 0,
    repo: 'https://github.com/vuestorefront/magento2/',
    editLinks: true,
    docsDir: 'docs',
    docsBranch: 'develop',
    editLinkText: 'Edit this page',
    logo: 'https://user-images.githubusercontent.com/1626923/137092657-fb398d20-b592-4661-a1f9-4135db0b61d5.png',
    nav: [
      { text: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      { text: 'Core Documentation', link: 'https://docs.vuestorefront.io/v2/' },
    ],
    sidebar: [
      {
        title: '',
        collapsable: false,
        children: [
          ['/', 'Introduction'],
          ['/guide/environments', 'Demo environments'],
          ['/guide/supported-features', 'Supported features'],
          ['/guide/about', 'About'],
        ],
      },
      {
        title: 'Getting started',
        collapsable: false,
        children: [
          ['/getting-started/configure-magento', 'Configuring Magento'],
          ['/getting-started/configure-integration', 'Configuring Vue Storefront'],
        ],
      },
      {
        title: 'Guides',
        collapsable: false,
        children: [
          ['/guide/image-optimization', 'Image optimization'],
          ['/guide/override-queries', 'Override queries'],
          ['/guide/testing', 'Testing'],
          ['/guide/recaptcha', 'ReCaptcha'],
        ],
      },
      {
        title: 'Performance',
        collapsable: false,
        children: [
          ['/guide/graphql-get', 'Varnish & GET for GraphQL Queries'],
          ['/guide/ssr', 'Server Side Rendering Cache'],
        ],
      },
      {
        title: 'Composables',
        children: [
          ['/api-reference/magento-theme.useaddresses', 'useAddresses()'],
          ['/api-reference/magento-theme.useapi', 'useApi()'],
          ['/api-reference/magento-theme.usebilling', 'useBilling()'],
          ['/api-reference/magento-theme.usecart', 'useCart() [Deprecated]'],
          ['/api-reference/magento-theme.usecategory', 'useCategory() [Deprecated]'],
          ['/api-reference/magento-theme.usecategorysearch', 'useCategorySearch()'],
          ['/api-reference/magento-theme.useconfig', 'useConfig()'],
          ['/api-reference/magento-theme.usecontent', 'useContent()'],
          ['/api-reference/magento-theme.usecountrysearch', 'useCountrySearch()'],
          ['/api-reference/magento-theme.usecurrency', 'useCurrency()'],
          ['/api-reference/magento-theme.useexternalcheckout', 'useExternalCheckout()'],
          ['/api-reference/magento-theme.usefacet', 'useFacet() [Deprecated]'],
          ['/api-reference/magento-theme.useforgotpassword', 'useForgotPassword() [Deprecated]'],
          ['/api-reference/magento-theme.usegetshippingmethods', 'useGetShippingMethods() [Deprecated]'],
          ['/api-reference/magento-theme.useguestuser', 'useGuestUser() [Deprecated]'],
          ['/api-reference/magento-theme.useimage', 'useImage()'],
          ['/api-reference/magento-theme.usemagentoconfiguration', 'useMagentoConfiguration()'],
          ['/api-reference/magento-theme.usemakeorder', 'useMakeOrder() [Deprecated]'],
          ['/api-reference/magento-theme.usenewsletter', 'useNewsletter()'],
          ['/api-reference/magento-theme.usepaymentprovider', 'usePaymentProvider() [Deprecated]'],
          ['/api-reference/magento-theme.useproduct', 'useProduct() [Deprecated]'],
          ['/api-reference/magento-theme.userelatedproducts', 'useRelatedProducts() [Deprecated]'],
          ['/api-reference/magento-theme.usereview', 'useReview()'],
          ['/api-reference/magento-theme.useshipping', 'useShipping() [Deprecated]'],
          ['/api-reference/magento-theme.useshippingprovider', 'useShippingProvider()'],
          ['/api-reference/magento-theme.usestore', 'useStore()'],
          ['/api-reference/magento-theme.useuihelpers', 'useUiHelpers()'],
          ['/api-reference/magento-theme.useuinotification', 'useUiNotification()'],
          ['/api-reference/magento-theme.useuistate', 'useUiState()'],
          ['/api-reference/magento-theme.useupsellproducts', 'useUpsellProducts() [Deprecated]'],
          ['/api-reference/magento-theme.useurlresolver', 'useUrlResolver()'],
          ['/api-reference/magento-theme.useuser', 'useUser() [Deprecated]'],
          ['/api-reference/magento-theme.useuseraddress', 'useUserAddress()'],
          ['/api-reference/magento-theme.useuserorder', 'useUserOrder() [Deprecated]'],
          ['/api-reference/magento-theme.usewishlist', 'useWishlist() [Deprecated]'],
        ],
      },
      {
        title: 'Reference',
        children: [
          ['/plugins/', 'Plugins'],
          ['/api-reference/', 'API Reference'],
        ],
      },
      {
        title: 'Nuxt Tips  & Tricks',
        children: [
          ['/improvements/optimization/', 'Optimization'],
          ['/improvements/security/', 'Security'],
          ['/improvements/logging/', 'Logging'],
          ['/improvements/analytics/', 'Analytics'],
        ],
      },
    ],
  },
};
