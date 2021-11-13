// @core-development-only-start
/* eslint-disable unicorn/prefer-module */
// @core-development-only-end
import webpack from 'webpack';
import config from './config.js';
import middleware from './middleware.config';
import { getRoutes } from './routes';

const {
  integrations: {
    magento: {
      configuration: {
        cookies,
        externalCheckout,
        tax,
        defaultStore,
        websites,
        facets,
      },
    },
  },
} = middleware;

export default {
  ssr: true,
  dev: config.get('nuxtAppEnvironment') !== 'production',
  server: {
    port: config.get('nuxtAppPort'),
    host: '0.0.0.0',
  },
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
    ],
  },
  loading: { color: '#fff' },
  plugins: [
    {
      src: '~/plugins/domPurify.js',
      ssr: false,
    },
  ],
  buildModules: [
    // to core
    '@nuxtjs/composition-api/module',
    '@nuxt/typescript-build',
    '@nuxtjs/google-fonts',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    ['@vue-storefront/nuxt', {
      // @core-development-only-start
      coreDevelopment: true,
      logger: {
        verbosity: 'debug',
      },
      // @core-development-only-end
      useRawSource: {
        dev: [
          '@vue-storefront/magento',
          '@vue-storefront/core',
        ],
        prod: [
          '@vue-storefront/magento',
          '@vue-storefront/core',
        ],
      },
    }],
    // @core-development-only-start
    ['@vue-storefront/nuxt-theme', {
      generate: {
        replace: {
          apiClient: '@vue-storefront/magento-api',
          composables: '@vue-storefront/magento',
        },
      },
      routes: false,
    }],
    // @core-development-only-end
    /* project-only-start
    ['@vue-storefront/nuxt-theme', {
      routes: false,
    }],
    project-only-end */
    ['@vue-storefront/magento/nuxt', {
      i18n: {
        useNuxtI18nConfig: true,
      },
      cookies,
      externalCheckout,
      tax,
      defaultStore,
      websites,
      facets,
    }],
  ],
  modules: [
    ['nuxt-i18n', {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    }],
    'cookie-universal-nuxt',
    'vue-scrollto/nuxt',
    '@vue-storefront/middleware/nuxt',
  ],
  i18n: {
    currency: 'USD',
    country: 'US',
    currencies: [
      {
        name: 'EUR',
        label: 'Euro',
      },
      {
        name: 'USD',
        label: 'Dollar',
      },
    ],
    locales: [
      {
        code: 'en',
        label: 'English',
        file: 'en.js',
        iso: 'en',
      },
    ],
    defaultLocale: 'en',
    lazy: true,
    seo: true,
    langDir: 'lang/',
    vueI18n: {
      fallbackLocale: 'en',
      numberFormats: {
        en: {
          currency: {
            style: 'currency',
            currency: 'USD',
            currencyDisplay: 'symbol',
          },
        },
      },
    },
    detectBrowserLanguage: {
      cookieKey: 'vsf-locale',
    },
  },
  pwa: {
    meta: {
      theme_color: '#5ECE7B',
    },
  },
  googleFonts: {
    families: {
      Raleway: {
        wght: [300, 400, 500, 600, 700],
        ital: [400],
      },
      Roboto: {
        wght: [300, 400, 500, 700],
        ital: [300, 400],
      },
    },
    display: 'swap',
  },
  styleResources: {
    scss: [require.resolve('@storefront-ui/shared/styles/_helpers.scss', { paths: [process.cwd()] })],
  },
  build: {
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }],
      ],
    },
    transpile: [
      'vee-validate/dist/rules',
    ],
    plugins: [
      new webpack.DefinePlugin({
        'process.VERSION': JSON.stringify({
          // eslint-disable-next-line global-require
          version: require('./package.json').version,
          lastCommit: process.env.LAST_COMMIT || '',
        }),
      }),
    ],
    extend(cfg, ctx) {
      // eslint-disable-next-line no-param-reassign
      cfg.devtool = ctx.isClient ? 'eval-source-map' : 'inline-source-map';

      if (ctx && ctx.isClient) {
        // eslint-disable-next-line no-param-reassign
        cfg.optimization = {
          ...cfg.optimization,
          mergeDuplicateChunks: true,
          splitChunks: {
            ...cfg.optimization.splitChunks,
            automaticNameDelimiter: '.',
            chunks: 'all',
            enforceSizeThreshold: 40_000,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            maxSize: 128_000,
            minChunks: 1,
            minSize: 0,
            cacheGroups: {
              ...cfg.optimization.splitChunks.cacheGroups,
              vendor: {
                test: /[/\\]node_modules[/\\]/,
                reuseExistingChunk: true,
                name: (module) => `${module
                  .context
                  .match(/[/\\]node_modules[/\\](.*?)([/\\]|$)/)[1]
                  .replace(/[.@_]/gm, '')}`,
              },
            },
          },
        };
      }
    },
  },
  router: {
    extendRoutes(routes) {
      getRoutes(`${__dirname}/_theme`)
        .forEach((route) => routes.unshift(route));
    },
  },
};
