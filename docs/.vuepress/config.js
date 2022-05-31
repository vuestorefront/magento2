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
        title: 'Composition',
        collapsable: false,
        children: [
          ['/composition/composables', 'Composables'],
          ['/composition/list-of-composables', 'List of composables'],
        ],
      },
      {
        title: 'Modules',
        collapsable: false,
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
