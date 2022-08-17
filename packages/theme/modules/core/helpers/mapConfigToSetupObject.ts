import { NuxtAppOptions } from '@nuxt/types';
import { defaultConfig } from '~/modules/core/defaultConfig';
import { getLocaleSettings } from '~/modules/core/helpers/getLocaleSettings';

export const mapConfigToSetupObject = ({ app, moduleOptions, additionalProperties = {} } :
{ app: NuxtAppOptions, moduleOptions: Record<string, unknown>, additionalProperties: Record<string, unknown> }) => ({
  ...defaultConfig,
  ...moduleOptions,
  ...additionalProperties,
  ...getLocaleSettings(app, moduleOptions, additionalProperties),
});
