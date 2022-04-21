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
    repo: 'https://github.com/vuestorefront/magento2/',
    editLinks: true,
    docsDir: 'docs',
    docsBranch: 'develop',
    editLinkText: 'Edit this page',
    logo: 'https://user-images.githubusercontent.com/1626923/137092657-fb398d20-b592-4661-a1f9-4135db0b61d5.png',
    nav: [
      { text: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      { text: 'Core Documentation', link: 'https://docs.vuestorefront.io/v2/' },
      { text: 'Demo', link: 'https://demo-magento2.europe-west1.gcp.storefrontcloud.io/' },
      { text: 'GitHub', link: 'https://github.com/vuestorefront/magento2' },
      { text: 'Roadmap', link: 'https://docs.vuestorefront.io/magento/guide/roadmap.html' },
      { text: 'Environments', link: 'https://docs.vuestorefront.io/magento/guide/environments.html' },
    ],
    sidebar: [
      {
        title: 'Essentials',
        collapsable: false,
        children: [
          ['/', 'Introduction'],
          ['/guide/environments', 'Demo environments'],
          ['/guide/supported-features', 'Supported features'],
          ['/guide/about', 'About'],
          ['/guide/roadmap', 'Roadmap'],
        ],
      },
      {
        title: 'Creating a Storefront',
        collapsable: false,
        children: [
          ['/guide/creating-a-store', 'Creating a Store'],
          ['/guide/configuration', 'Configuration'],
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
          ['/api-reference/magento-theme.usebilling', 'useBilling()'],
          ['/api-reference/magento-theme.usecart', 'useCart()'],
          ['/api-reference/magento-theme.usecategory', 'useCategory()'],
          ['/api-reference/magento-theme.usecategorysearch', 'useCategorySearch()'],
          ['/api-reference/magento-theme.useconfig', 'useConfig()'],
          ['/api-reference/magento-theme.usecontent', 'useContent()'],
          ['/api-reference/magento-theme.usecountrysearch', 'useCountrySearch()'],
          ['/api-reference/magento-theme.usecurrency', 'useCurrency()'],
          ['/api-reference/magento-theme.useexternalcheckout', 'useExternalCheckout()'],
          ['/api-reference/magento-theme.usefacet', 'useFacet()'],
          ['/api-reference/magento-theme.useforgotpassword', 'useForgotPassword()'],
          ['/api-reference/magento-theme.usegetshippingmethods', 'useGetShippingMethods()'],
          ['/api-reference/magento-theme.useguestuser', 'useGuestUser()'],
          ['/api-reference/magento-theme.useimage', 'useImage()'],
          ['/api-reference/magento-theme.usepaymentprovider', 'usePaymentProvider()'],
          ['/api-reference/magento-theme.useupsellproducts.html', 'useUpsellProducts()'],
          ['/api-reference/magento-theme.useuser', 'useUser()'],
          ['/api-reference/magento-theme.useuseraddress', 'useUserAddress()'],
          ['/api-reference/magento-theme.useuserorder', 'useUserOrder()'],
          ['/api-reference/magento-theme.usewishlist', 'useWishlist()'],
        ],
      },
      {
        title: 'API methods',
        children: [
          ['/api-reference/magento-api.cmsblocks', 'cmsBlocks'],
          ['/api-reference/magento-api.cmspage', 'cmsPage'],
          ['/api-reference/magento-api.categorylist', 'categoryList'],
          ['/api-reference/magento-api.categorysearch', 'categorySearch'],
          ['/api-reference/magento-api.createcustomeraddress', 'createCustomerAddress'],
          ['/api-reference/magento-api.currency', 'currency'],
          ['/api-reference/magento-api.deletecustomeraddress', 'deleteCustomerAddress'],
          ['/api-reference/magento-api.getcustomeraddresses', 'getCustomerAddresses'],
          ['/api-reference/magento-api.updatecustomeraddress', 'updateCustomerAddress'],
          ['/api-reference/magento-api.countries', 'countries'],
          ['/api-reference/magento-api.country', 'country'],
          ['/api-reference/magento-api.storeconfig', 'storeConfig'],
          ['/api-reference/magento-api.products', 'products'],
          ['/api-reference/magento-api.addproductstocart', 'addProductsToCart'],
          ['/api-reference/magento-api.addconfigurableproductstocart', 'addConfigurableProductsToCart'],
          ['/api-reference/magento-api.adddownloadableproductstocart', 'addDownloadableProductsToCart'],
          ['/api-reference/magento-api.addvirtualproductstocart', 'addVirtualProductsToCart'],
          ['/api-reference/magento-api.applycoupontocart', 'applyCouponToCart'],
          ['/api-reference/magento-api.removecouponfromcart', 'removeCouponFromCart'],
          ['/api-reference/magento-api.cart', 'cart'],
          ['/api-reference/magento-api.customercart', 'customerCart'],
          ['/api-reference/magento-api.removeitemfromcart', 'removeItemFromCart'],
          ['/api-reference/magento-api.updatecartitems', 'updateCartItems'],
          ['/api-reference/magento-api.getavailablecustomershippingmethods', 'getAvailableCustomerShippingMethods'],
          ['/api-reference/magento-api.resetpassword', 'resetPassword'],
          ['/api-reference/magento-api.requestpasswordresetemail', 'requestPasswordResetEmail'],
          ['/api-reference/magento-api.setguestemailoncart', 'setGuestEmailOnCart'],
          ['/api-reference/magento-api.getavailablepaymentmethods', 'getAvailablePaymentMethods'],
          ['/api-reference/magento-api.setpaymentmethodoncart', 'setPaymentMethodOnCart'],
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
