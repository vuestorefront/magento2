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
        defaultStore,
        facets,
        magentoBaseUrl,
        imageProvider,
        magentoApiEndpoint,
        customApolloHttpLinkOptions,
      },
    },
  },
} = middleware;

export default () => {
  const baseConfig = {
    ssr: true,
    dev: config.get('nuxtAppEnvironment') !== 'production',
    server: {
      port: process.env.PORT || config.get('nuxtAppPort'),
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
    device: {
      refreshOnResize: true,
    },
    buildModules: [
      // to core
      '@nuxtjs/composition-api/module',
      '@nuxt/typescript-build',
      '@nuxtjs/google-fonts',
      '@nuxtjs/pwa',
      '@nuxtjs/style-resources',
      '@nuxtjs/device',
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
      ['@vue-storefront/magento/nuxt', {
        i18n: {
          useNuxtI18nConfig: true,
        },
        cookies,
        externalCheckout,
        defaultStore,
        facets,
        magentoBaseUrl,
        imageProvider,
        magentoApiEndpoint,
        customApolloHttpLinkOptions,
      }],
      '@nuxt/image',
    ],
    modules: [
      ['nuxt-i18n', {
        baseUrl: process.env.BASE_URL || 'http://localhost:3000',
      }],
      'cookie-universal-nuxt',
      'vue-scrollto/nuxt',
      '@vue-storefront/middleware/nuxt',
      '@nuxt/image',
      ['@vue-storefront/cache/nuxt', {
        enabled: !!process.env.REDIS__ENABLED,
        invalidation: {
          endpoint: process.env.REDIS__CACHE_INVALIDATE_URL,
          key: process.env.REDIS__CACHE_INVALIDATE_KEY,
          handlers: [
            '@vue-storefront/cache/defaultHandler',
          ],
        },
        driver: [
          '@vue-storefront/redis-cache',
          {
            // docs: https://github.com/luin/ioredis/blob/master/API.md#new-redisport-host-options
            redis: {
              keyPrefix: process.env.REDIS__KEY_PREFIX,
              host: process.env.REDIS__HOST,
              port: process.env.REDIS__PORT,
            },
          },
        ],
      }],
    ],
    i18n: {
      country: 'US',
      strategy: 'prefix',
      locales: [
        {
          code: 'default',
          file: 'en.js',
          iso: 'en_US',
          defaultCurrency: 'USD',
        },
        {
          code: 'german',
          file: 'de.js',
          iso: 'de_DE',
          defaultCurrency: 'EUR',
        },
      ],
      defaultLocale: 'default',
      autoChangeCookie: {
        currency: false,
        locale: false,
        country: false,
      },
      lazy: true,
      seo: true,
      langDir: 'lang/',
      vueI18n: {
        fallbackLocale: 'default',
        numberFormats: {
          default: {
            currency: {
              style: 'currency',
              currency: 'USD',
              currencyDisplay: 'symbol',
            },
          },
          german: {
            currency: {
              style: 'currency',
              currency: 'EUR',
              currencyDisplay: 'symbol',
            },
          },
        },
      },
      detectBrowserLanguage: false,
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
      extractCSS: true,
      optimization: {
        splitChunks: {
          cacheGroups: {
            styles: {
              name: 'styles',
              test: /\.(css|vue)$/,
              chunks: 'all',
              enforce: true,
            },
          },
        },
      },
      optimizeCSS: true,
      parallel: true,
      splitChunks: {
        layouts: true,
        pages: true,
        commons: true,
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
    },
    plugins: [
      '~/plugins/token-expired',
      '~/plugins/i18n',
      '~/plugins/fcPlugin',
      '~/plugins/dompurify',
    ],
    serverMiddleware: [
      '~/serverMiddleware/body-parser.js',
    ],
    router: {
      prefetchLinks: false,
      extendRoutes(routes) {
        getRoutes()
          .forEach((route) => routes.unshift(route));
      },
    },
    image: {
      provider: config.get('imageProvider'),
    },
  };

  if (config.get('imageProvider') === 'cloudinary') {
    baseConfig.image.cloudinary = {
      baseURL: config.get('imageProviderBaseUrl'),
    };
  }

  if (config.get('recaptchaEnabled')) {
    baseConfig.modules.push('@nuxtjs/recaptcha');

    baseConfig.recaptcha = {
      hideBadge: config.get('recaptchaHideBadge'), // Hide badge element (v3 & v2 via size=invisible)
      siteKey: config.get('recaptchaSiteKey'), // Site key for requests
      version: config.get('recaptchaVersion'), // Version 2 or 3
      size: config.get('recaptchaSize'), // Size: 'compact', 'normal', 'invisible' (v2)
    };

    baseConfig.publicRuntimeConfig = {
      ...baseConfig.publicRuntimeConfig,
      isRecaptcha: config.get('recaptchaEnabled'),
    };
  }

  return baseConfig;
};
