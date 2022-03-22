import { defaultConfig } from '~/modules/magento/defaultConfig';

export const getLocaleSettings = (app, moduleOptions) => {
  let localeSettings : Record<string, string> = {};

  if (moduleOptions.cookies) {
    localeSettings = {
      locale: app.$cookies.get(moduleOptions.cookies.localeCookieName),
      country: app.$cookies.get(moduleOptions.cookies.countryCookieName),
      currency: app.$cookies.get(moduleOptions.cookies.currencyCookieName),
    };
  }

  return {
    locale: app.i18n.locale || (localeSettings.locale || moduleOptions.locale || defaultConfig.locale || undefined),
    country: localeSettings.country || moduleOptions.country || defaultConfig.country || undefined,
    currency: localeSettings.currency || moduleOptions.currency || defaultConfig.currency || undefined,
  };
};

export const mapConfigToSetupObject = ({ moduleOptions, app, additionalProperties = {} }) => ({
  ...defaultConfig,
  ...moduleOptions,
  ...additionalProperties,
  ...getLocaleSettings(app, moduleOptions),
});
