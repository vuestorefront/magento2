import defaultConfig from '@vue-storefront/magento/nuxt/defaultConfig';

export const getLocaleSettings = (app, moduleOptions) => {
  let localeSettings = {};

  if (moduleOptions.cookies) {
    localeSettings = {
      locale: app.$cookies.get(moduleOptions.cookies.localeCookieName),
      country: app.$cookies.get(moduleOptions.cookies.countryCookieName),
      currency: app.$cookies.get(moduleOptions.cookies.currencyCookieName),
    };
  }

  return {
    locale: app.i18n.locale || (localeSettings.locale || moduleOptions.locale || defaultConfig.locale),
    country: localeSettings.country || moduleOptions.country || defaultConfig.country,
    currency: localeSettings.currency || moduleOptions.currency || defaultConfig.currency,
  };
};

export const mapConfigToSetupObject = ({ moduleOptions, app, additionalProperties = {} }) => ({
  ...defaultConfig,
  ...moduleOptions,
  ...additionalProperties,
  ...getLocaleSettings(app, moduleOptions),
});
