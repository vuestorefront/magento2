# Configuring Vue Storefront for Magento 2

This guide explains the steps needed to install and set up Vue Storefront for Magento 2.

## Prerequisites

Before you can get started, you need the following:

- **Node.js 16** installed,
- Magento 2 server configured following the [Configuring Magento](/getting-started/configure-magento.html) guide.

To check the Node version you are using, run the following command:

```bash
node -v
```

## Creating the Vue Storefront for Magento 2

To install Vue Storefront, run the command below. It will ask you for the project name and the integration of your choice. Keep in mind that the project name will also be used as the folder name, and be sure to select the Magento 2 integration.

```sh
npx @vue-storefront/cli init
```

### 1. Configure environment variables

After installation, the first step is configuring the integration using the environment variables.

1. Go to the root folder of your project.
2. Make a copy of the `.env.example` file and rename it to `.env`. You can do it manually or use the following command:

    ```sh
    cp .env.example .env
    ```

3. Update values in the `.env` file.

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
