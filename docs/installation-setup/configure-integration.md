# Configuring Vue Storefront for Magento 2

This guide explains the steps needed to set up Vue Storefront for Magento 2.

## Prerequisites

Before you can get started, you need:

- Vue Storefront project created following the [Installation](./installation.html) guide.
- Magento 2 server configured following the [Configuring Magento](./configure-magento.html) guide.

## Creating the Vue Storefront for Magento 2

### 1. Configure environment variables

After installation, the first step is configuring the integration using the environment variables.

1. Go to the root folder of your project.
2. Make a copy of the `.env.example` file and rename it to `.env`. You can do it manually or use the following command:

```sh
cp .env.example .env
```

3. Update values in the `.env` file.

4. Explanation of env variables

#### Nuxt application configuration options
```
VSF_NUXT_APP_ENV=development  # application mode [production|development]
VSF_NUXT_APP_PORT=3000        # nuxt server port property
VSF_NUXT_APP_HOST=0.0.0.0     # nuxt server host property
```

#### Storefront and middleware endpoints configuration
```
VSF_STORE_URL=https://localhost:3000                # external base url
VSF_MIDDLEWARE_URL=https://localhost:3000/api/      # external middleware base url
VSF_SSR_MIDDLEWARE_URL=http://localhost:3000/api/   # internal middleware base url
```

:::tip middleware_url and ssr_middleware_url

For many infrastructures `middleware_url` and `ssr_middleware_url` will be the same, but sometimes they might be different.

For example, when it comes to deployment using a rolling-update strategy on the Kubernetes cluster, the Kubernetes is probing SSR if it's already up. SSR is trying to call middleware using an external URL (market...storefrontcloud.io) rather than localhost:3000/API, while the middleware isn't available publicly yet, because the SSR didn't respond with 200 in the first place.
:::


#### Magento 2 endpoints configuration and others
```
VSF_MAGENTO_BASE_URL={YOUR_SITE_FRONT_URL}
VSF_MAGENTO_GRAPHQL_URL=https://{YOUR_SITE_FRONT_URL}/graphql

VSF_MAGENTO_EXTERNAL_CHECKOUT_ENABLED=false
VSF_MAGENTO_EXTERNAL_CHECKOUT_URL=https://{YOUR_SITE_FRONT_URL}
VSF_MAGENTO_EXTERNAL_CHECKOUT_SYNC_PATH=/vue/cart/sync
```

#### Image provider configuration
```
VSF_IMAGE_PROVIDER=cloudinary
VSF_IMAGE_PROVIDER_BASE_URL=https://res-4.cloudinary.com/{YOUR_ID}/image/upload/
VSF_IMAGE_PROVIDER_DOMAIN=https://res-4.cloudinary.com
```

#### Redis cache configuration
```
VSF_REDIS_ENABLED=false
VSF_REDIS_HOST=127.0.0.1
VSF_REDIS_PORT=6379
VSF_REDIS_KEY_PREFIX=
VSF_REDIS_CACHE_INVALIDATE_URL=/cache-invalidate
```
#### ReCaptcha configuration
```
VSF_RECAPTCHA_ENABLED=false
VSF_RECAPTCHA_SITE_KEY=
VSF_RECAPTCHA_SECRET_KEY=
VSF_RECAPTCHA_HIDE_BADGE=
VSF_RECAPTCHA_SIZE=invisible
VSF_RECAPTCHA_MIN_SCORE=0.5
VSF_RECAPTCHA_VERSION=3
```

#### Cookies configuration
```
VSF_COOKIE_HTTP_ONLY=
VSF_COOKIE_SECURE=
VSF_COOKIE_SAME_SITE=
VSF_COOKIE_PATH=
```

#### Other
```
NODE_TLS_REJECT_UNAUTHORIZED=0      # toggle TLS verification (eg. for a local development)
```

### 2. Setup store configuration

The `plugins/storeConfigPlugin.ts` plugin loads store configuration data from Magento and saves it into the Pinia store under the `$state.storeConfig` property. By default, the amount of data loaded from Magento is minimal to avoid over-fetching, but as your application grows, you might need to pull more data.

This plugin loads the store configuration data based on a query in the `plugins/query/StoreConfig.gql.ts` file. You can modify this file to change what data is loaded.

### 3. Configure multistore and localization

Each Magento store view needs a corresponding locale configuration object in the `i18n` object in the `nuxt.config.js` file.

#### 3.1 `i18n.locales`

The `i18n.locales` array contains all supported locales. Each item in this array is an object containing the following properties:

- `code` - unique identifier of the locale corresponding to Magento store view code.
- `file` - the name of the file containing translations for this locale in the `lang` folder.
- `iso` - corresponding ISO country code.

For other properties please follow official [nuxt-i18n documentation](https://i18n.nuxtjs.org/options-reference#locales).

In the example configuration below, you need to have two Magento store views with corresponding store codes: `default` and `german`.

```javascript
// nuxt.config.js

export default {
  locales: [
    {
      code: 'default',
      file: 'en.js',
      iso: 'en_US',
    },
    {
      code: 'german',
      file: 'de.js',
      iso: 'de_DE',
    }
  ]
};
```

#### 3.2 Translations

When working with translation in your application, you need to:

1. Add translations in Magento for products and categories.
2. Update the `i18n.locales` array in the `nuxt.config.js` file and add translations to the corresponding files in the `lang` directory.

### 4. Configure default cookies settings

Vue Storefront app uses different cookies but all share the same default config. To adjust the configuration you have to add `env` variable, which is the recommended way, or modify `middleware.config.js`.
Once done, rebuild your application.

```js
module.exports = {
  integrations: {
    magento: {
      configuration: {
        /*...*/
        // Here you can override default cookies options
        cookiesDefaultOpts: {
          httpOnly: VSF_COOKIE_HTTP_ONLY || false,
          secure: VSF_COOKIE_SECURE || true, // Make sure that you have ssl configured, otherwise disable this flag
        },
        /*...*/
      },
    },
  },
};
```

### 5. Using HTTPS configuration for a local development

### Install `mkcert`
Please, follow the steps in the [official instruction](https://github.com/FiloSottile/mkcert). Different OS might require different steps to accomplish the task.

#### Update nuxt.config.js
In the `nuxt.config.js` add the certificate configuration

```
baseConfig.server = {
  ...baseConfig.server,
  https: {
    key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
  },
};
```


#### Generate certificate for a local development
If you set up your project from CLI run the command in the APP root directory.
If you are a contributor and have cloned Vue Storefront repository, run the command in `packages/theme`.
```
mkcert localhost
```


### Start project
```bash
yarn dev
```
or
```bash
yarn start:local #this will run local production mode
```

You will see some NODE TLS warnings but this is just fine for a local development.
For more details, please check example of using HTTPS configuration in the official [Nuxt documentation](https://nuxtjs.org/docs/configuration-glossary/configuration-server/)
