/* eslint-disable unicorn/prefer-module */
const path = require('path');

const mapI18nSettings = (i18n) => ({
  locales: i18n.locales.map(({ label, code }) => ({ name: code, label })),
});

const isNuxtI18nUsed = (moduleOptions) => moduleOptions.i18n && moduleOptions.i18n.useNuxtI18nConfig;

const getMissingFields = (options) => [
  'locales',
].filter((o) => options[o] === undefined);

export default function (moduleOptions) {
  const options = isNuxtI18nUsed(moduleOptions)
    ? {
      ...moduleOptions,
      ...mapI18nSettings(this.options.i18n),
    }
    : moduleOptions;

  const missingFields = getMissingFields(options);

  if (missingFields.length > 0) {
    throw new Error(`Please provide missing i18n fields: (${missingFields.join(', ')})`);
  }

  this.extendBuild((config) => {
    // eslint-disable-next-line no-param-reassign
    config.resolve.alias['@vue-storefront/magento-api$'] = require.resolve('@vue-storefront/magento-api');
  });

  this.addPlugin({
    src: path.resolve(__dirname, './plugin.js'),
    options,
  });
}
