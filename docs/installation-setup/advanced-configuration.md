# Vue Storefront Advanced Configuration

This guide explains advanced configuration options for Vue Storefront.

## Prerequisites

Before you can get started, you need:

- Vue Storefront project and Magento 2 instance created following the [Installation](./installation.html) guide.

## Setup store configuration

The `plugins/storeConfigPlugin.ts` plugin loads store configuration data from Magento and saves it into the Pinia store under the `$state.storeConfig` property. By default, the amount of data loaded from Magento is minimal to avoid over-fetching, but as your application grows, you might need to pull more data.

This plugin loads the store configuration data based on a query in the `plugins/query/StoreConfig.gql.ts` file. You can modify this file to change what data is loaded.

## Configure multistore and localization

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

## Configure default cookies settings

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

## Using HTTPS configuration for a local development

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
