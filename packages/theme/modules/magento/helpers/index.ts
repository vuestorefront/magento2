import { NuxtAppOptions } from '@nuxt/types';
import { defaultConfig } from '~/modules/magento/defaultConfig';

export const getLocaleSettings = (app: NuxtAppOptions, moduleOptions: Record<string, unknown>, additionalProperties: any) => {
  const localeSettings = moduleOptions.cookies
    ? {
      currency: additionalProperties.state.getCurrency(),
      locale: additionalProperties.state.getLocale(),
      country: additionalProperties.state.getCountry(),
    }
    : {};

  return {
    currency: localeSettings.currency || moduleOptions.currency || defaultConfig.currency || undefined,
    locale: app.i18n.locale || localeSettings.locale || moduleOptions.locale || defaultConfig.locale || undefined,
    country: localeSettings.country || moduleOptions.country || defaultConfig.country || undefined,
  };
};

export const mapConfigToSetupObject = ({ app, moduleOptions, additionalProperties = {} } :
{ app: NuxtAppOptions, moduleOptions: Record<string, unknown>, additionalProperties: Record<string, unknown> }) => ({
  ...defaultConfig,
  ...moduleOptions,
  ...additionalProperties,
  ...getLocaleSettings(app, moduleOptions, additionalProperties),
});
