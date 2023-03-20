const GTM_TAG = 'GTM-WMDC3CP';

module.exports = {
  title: 'Vue Storefront 2 for Magento',
  base: '/',
  description: 'Documentation for the Magento connector for Vue Storefront 2',
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
    // Google Tag Manager
    [
      'script',
      {},
      [
        `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${GTM_TAG}');
    `,
      ],
    ],
  ],

  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#configurewebpack
   */
  configureWebpack: (config) => {
    // Add support for webp images
    config.module.rules.push({
      test: /\.(webp)(\?.*)?$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/img/[name].[hash:8].[ext]',
          },
        },
      ],
    });

    // Fix image loading. Ref: https://github.com/vuejs/vue-loader/issues/1612#issuecomment-559366730
    config.module.rules = config.module.rules.map((rule) => {
      rule.use =
        rule.use &&
        rule.use.map((useRule) => {
          if (useRule.loader === 'url-loader') {
            useRule.options.esModule = false;
          }

          return useRule;
        });

      return rule;
    });
  },

  theme: 'vsf-docs',

  themeConfig: {
    GTM_TAG,
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
      { text: 'Demo', link: 'https://demo-magento2.europe-west1.gcp.storefrontcloud.io/' },
      { text: 'GitHub', link: 'https://github.com/vuestorefront/magento2' },
      { text: 'Environments', link: 'https://docs.vuestorefront.io/magento/guide/environments.html' },
    ],
    secondaryNav: [],
    sidebar: {
      '/': [
        {
          title: '',
          collapsable: false,
          children: [['https://developer.vuestorefront.io/quiz/questions/magento', 'Test your knowledge']],
        },
        {
          title: 'Essentials',
          collapsable: false,
          children: [
            ['/', 'Introduction'],
            ['/guide/supported-features', 'Supported features'],
            ['/guide/about', 'About'],
          ],
        },
        {
          title: 'Installation & Setup',
          collapsable: true,
          children: [
            ['/installation-setup/installation', 'Installation'],
            ['/installation-setup/configure-magento', 'Configuring Magento'],
            ['/installation-setup/advanced-configuration', 'Vue Storefront Advanced Configuration'],
          ],
        },
        {
          title: 'Composition',
          collapsable: true,
          children: [
            ['/composition/composables', 'Composables'],
            ['/composition/list-of-composables', 'List of composables'],
            ['/composition/use-addresses', 'useAddresses'],
            ['/composition/use-api', 'useApi'],
            ['/composition/use-billing', 'useBilling'],
            ['/composition/use-cart', 'useCart'],
            ['/composition/use-category', 'useCategory'],
            ['/composition/use-categorysearch', 'useCategorySearch'],
            ['/composition/use-config', 'useConfig'],
            ['/composition/use-content', 'useContent'],
            ['/composition/use-countrysearch', 'useCountrySearch'],
            ['/composition/use-currency', 'useCurrency'],
            ['/composition/use-facet', 'useFacet'],
            ['/composition/use-forgotpassword', 'useForgotPassword'],
            ['/composition/use-getshippingmethods', 'useGetShippingMethods'],
            ['/composition/use-guestuser', 'useGuestUser'],
            ['/composition/use-image', 'useImage'],
            ['/composition/use-magentoconfiguration', 'useMagentoConfiguration'],
            ['/composition/use-makeorder', 'useMakeOrder'],
            ['/composition/use-newsletter', 'useNewsletter'],
            ['/composition/use-paymentprovider', 'usePaymentProvider'],
            ['/composition/use-product', 'useProduct'],
            ['/composition/use-relatedproducts', 'useRelatedProducts'],
            ['/composition/use-review', 'useReview'],
            ['/composition/use-shipping', 'useShipping'],
            ['/composition/use-shippingprovider', 'useShippingProvider'],
            ['/composition/use-store', 'useStore'],
            ['/composition/use-uihelpers', 'useUiHelpers'],
            ['/composition/use-uinotification', 'useUiNotification'],
            ['/composition/use-uistate', 'useUiState'],
            ['/composition/use-upsellproducts', 'useUpsellProducts'],
            ['/composition/use-urlresolver', 'useUrlResolver'],
            ['/composition/use-user', 'useUser'],
            ['/composition/use-userorder', 'useUserOrder'],
            ['/composition/use-wishlist', 'useWishlist'],
          ],
        },
        {
          title: 'Modules',
          collapsable: true,
          sidebarDepth: 2,
          children: [
            {
              title: 'Catalog',
              collapsable: true,
              children: [
                ['/modules/catalog/filters', 'Filters'],
                ['/modules/catalog/product-types', 'Product Types'],
              ],
            },
          ],
        },
        {
          title: 'Guides',
          collapsable: true,
          children: [
            ['/guide/global-state-management', 'Global state management'],
            ['/guide/image-optimization', 'Image optimization'],
            ['/guide/override-queries', 'Override queries'],
            ['/guide/testing', 'Testing'],
            ['/guide/recaptcha', 'ReCaptcha'],
          ],
        },
        {
          title: 'Performance',
          collapsable: true,
          children: [
            ['/guide/graphql-get', 'Varnish & GET for GraphQL Queries'],
            ['/guide/ssr', 'Server Side Rendering Cache'],
          ],
        },
        {
          title: 'Reference',
          children: [
            ['/plugins/', 'Plugins'],
            ['/api-reference/', 'API Reference'],
            ['/migration-guides/', 'Migration Guides'],
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
  },
};
