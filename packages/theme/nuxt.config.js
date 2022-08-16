// @core-development-only-start
/* eslint-disable unicorn/prefer-module */
// @core-development-only-end
import webpack from 'webpack';
import fs from 'fs';
import path from 'path';
import middleware from './middleware.config';
import { getRoutes } from './routes';

const GoogleFontsPlugin = require('@beyonk/google-fonts-webpack-plugin');

const {
  integrations: {
    magento: {
      configuration: {
        cookies,
        cookiesDefaultOpts,
        externalCheckout,
        defaultStore,
        magentoBaseUrl,
        imageProvider,
        magentoApiEndpoint,
        customApolloHttpLinkOptions,
        customer,
      },
    },
  },
} = middleware;

export default () => {
  const baseConfig = {
    ssr: true,
    dev: process.env.VSF_NUXT_APP_ENV !== 'production',
    server: {
      port: process.env.VSF_NUXT_APP_PORT,
      host: '0.0.0.0',
    },
    head: {
      title: process.env.npm_package_name || '',
      meta: [
        { charset: 'utf8' },
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
      '@nuxtjs/pwa',
      '@nuxtjs/style-resources',
      '@nuxtjs/device',
      ['@vue-storefront/nuxt', {
        // selectively disabling certain @vue-storefront/core plugins for migration
        context: false,
        logger: false,
        ssr: false,
        sfui: false,
        i18nExtension: false,
        e2e: true,
        performance: {
          httpPush: false,
          purgeCSS: {
            enabled: false,
          },
        },
      }],
      ['~/modules/core', {
        cookies,
        cookiesDefaultOpts,
        externalCheckout,
        defaultStore,
        magentoBaseUrl,
        imageProvider,
        magentoApiEndpoint,
        customApolloHttpLinkOptions,
        customer,
      }],
      '@nuxt/image',
      '@pinia/nuxt',
    ],
    modules: [
      '~/modules/catalog',
      '~/modules/customer',
      '~/modules/wishlist',
      '~/modules/checkout',
      '~/modules/review',
      ['nuxt-i18n', {
        baseUrl: process.env.VSF_STORE_URL || 'http://localhost:3000',
      }],
      'cookie-universal-nuxt',
      'vue-scrollto/nuxt',
      '@vue-storefront/middleware/nuxt',
      '@nuxt/image',
      ['@vue-storefront/cache/nuxt', {
        enabled: process.env.VSF_REDIS_ENABLED === 'true',
        invalidation: {
          endpoint: process.env.VSF_REDIS_CACHE_INVALIDATE_URL,
          key: process.env.VSF_REDIS_CACHE_INVALIDATE_KEY,
          handlers: [
            '@vue-storefront/cache/defaultHandler',
          ],
        },
        driver: [
          '@vue-storefront/redis-cache',
          {
            defaultTimeout: 86_400,
            // docs: https://github.com/luin/ioredis/blob/master/API.md#new-redisport-host-options
            redis: {
              keyPrefix: process.env.VSF_REDIS_KEY_PREFIX,
              host: process.env.VSF_REDIS_HOST,
              port: process.env.VSF_REDIS_PORT,
            },
          },
        ],
      }],
    ],
    i18n: {
      country: 'US',
      baseUrl: process.env.VSF_STORE_URL,
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
    styleResources: {
      scss: [require.resolve('@storefront-ui/shared/styles/_helpers.scss', { paths: [process.cwd()] })],
    },
    build: {
      extractCSS: true,
      optimizeCSS: true,
      parallel: true,
      extend(cfg) {
        // eslint-disable-next-line no-param-reassign
        cfg.devtool = 'source-map';
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.VERSION': JSON.stringify({
            // eslint-disable-next-line global-require
            version: require('./package.json').version,
            lastCommit: process.env.LAST_COMMIT || '',
          }),
        }),
        new GoogleFontsPlugin({
          fonts: [
            { family: 'Raleway', variants: ['300', '400', '500', '600', '700', '400italic'], display: 'swap' },
            { family: 'Roboto', variants: ['300', '400', '500', '700', '300italic', '400italic'], display: 'swap' },
          ],
          name: 'fonts',
          filename: 'fonts.css',
          path: 'assets/fonts/',
          local: true,
          formats: ['eot', 'woff', 'woff2', 'ttf', 'svg'],
          apiUrl: 'https://google-webfonts-helper.herokuapp.com/api/fonts',
        }),
      ],
      transpile: [
        'vee-validate',
        'lodash-es',
        /^@storefront-ui/,
      ],
    },
    plugins: [
      '~/plugins/token-expired',
      '~/plugins/i18n',
      '~/plugins/fcPlugin',
      '~/plugins/dompurify',
      '~/plugins/storeConfigPlugin',
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
      provider: process.env.VSF_IMAGE_PROVIDER,
    },
    env: {
      VSF_MAGENTO_GRAPHQL_URL: process.env.VSF_MAGENTO_GRAPHQL_URL,
    },

    publicRuntimeConfig: {
      middlewareUrl: process.env.VSF_MIDDLEWARE_URL || 'http://localhost:3000/api/',
    },
  };

  if (process.env.VSF_IMAGE_PROVIDER === 'cloudinary') {
    baseConfig.image.cloudinary = {
      baseURL: process.env.VSF_IMAGE_PROVIDER_BASE_URL,
    };

    if (process.env.VSF_IMAGE_PROVIDER_DOMAIN) {
      const preconnectConfig = [
        {
          rel: 'preconnect',
          href: process.env.VSF_IMAGE_PROVIDER_DOMAIN,
          crossorigin: true,
        },
        {
          rel: 'dns-prefetch',
          href: process.env.VSF_IMAGE_PROVIDER_DOMAIN,
        },
      ];

      baseConfig.head.link.push(...preconnectConfig);
    }
  }

  if (process.env.VSF_RECAPTCHA_ENABLED === 'true') {
    baseConfig.modules.push('@nuxtjs/recaptcha');

    baseConfig.recaptcha = {
      hideBadge: Boolean(process.env.VSF_RECAPTCHA_HIDE_BADGE), // Hide badge element (v3 & v2 via size=invisible)
      siteKey: process.env.VSF_RECAPTCHA_SITE_KEY, // Site key for requests
      version: Number(process.env.VSF_RECAPTCHA_VERSION), // Version 2 or 3
      size: process.env.VSF_RECAPTCHA_SIZE, // Size: 'compact', 'normal', 'invisible' (v2)
    };

    baseConfig.publicRuntimeConfig = {
      ...baseConfig.publicRuntimeConfig,
      isRecaptcha: process.env.VSF_RECAPTCHA_ENABLED === 'true',
    };
  }

  if (process.env.NODE_ENV === 'development' || process.env.VSF_NUXT_APP_ENV === 'development') {
    baseConfig.server = {
      https: {
        key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
        cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
      },
    };
  }

  return baseConfig;
};
