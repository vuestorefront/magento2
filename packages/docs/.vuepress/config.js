const GTM_TAG = 'GTM-WMDC3CP';

module.exports = {
  title: 'Vue Storefront 2 for Magento 2',
  base: '/',
  description: 'Documentation for the Magento 2 module for Vue Storefront 2',
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
    ['meta', { name: 'robots', content: 'nofollow' }],
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
      `
      ]
    ]
  ],
  theme: 'vsf-docs',
  configureWebpack: (config) => {
    // Add support for webp images
    config.module.rules.push({
      test: /\.(webp)(\?.*)?$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/img/[name].[hash:8].[ext]'
          }
        }
      ]
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
  themeConfig: {
    nav: [
      { text: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      { text: 'Core Documentation', link: 'https://docs.vuestorefront.io/v2/' }
    ],
    sidebar: {
      '/': [
        {
          title: 'Quiz',
          collapsable: false,
          children: [['https://developer.vuestorefront.io/quiz/questions/magento-2', 'Test your knowledge']]
        },

        {
          title: 'Getting started',
          collapsable: false,
          children: [
            ['/', 'Introduction'],
            ['/getting-started/quick-start', 'Quick start'],
            ['/getting-started/configuration', 'Configuration']
          ]
        },

        {
          title: 'Key concepts',
          collapsable: false,
          children: [
            ['/key-concepts/sdk', 'SDK'],
            ['/key-concepts/server-middleware', 'Server Middleware']
          ]
        },

        {
          title: 'Basics',
          collapsable: false,
          children: [
            ['/basics/products', 'Products'],
            ['/basics/cart', 'Cart'],
            ['/basics/authentication', 'Authentication'],
            ['/basics/users', 'Users'],
            ['/basics/wishlist', 'Wishlist'],
            ['/basics/checkout', 'Checkout']
          ]
        },

        {
          title: 'Advanced',
          collapsable: false,
          children: [
            ['/advanced/custom-queries', 'Custom queries']
          ]
        },

        {
          title: 'Reference',
          collapsable: false,
          children: [
            ['/reference/api/', 'API Reference'],
            ['/reference/releases/', 'Release notes'],
            ['/reference/compatibility', 'Compatibility']
          ]
        },

        {
          title: 'Learn Vue Storefront',
          collapsable: true,
          children: [
            ['https://docs.vuestorefront.io/v2/getting-started/introduction.html', 'What is Vue Storefront?'],
            ['https://docs.vuestorefront.io/v2/getting-started/project-structure.html', 'Project structure'],
            ['https://docs.vuestorefront.io/v2/getting-started/configuration.html', 'Configuration'],
            ['https://docs.vuestorefront.io/v2/getting-started/layouts-and-routing.html', 'Layouts and Routing'],
            ['https://docs.vuestorefront.io/v2/getting-started/theme.html', 'Theme'],
            ['https://docs.vuestorefront.io/v2/getting-started/internationalization.html', 'Internationalization']
          ]
        }
      ]
    }
  }
};
