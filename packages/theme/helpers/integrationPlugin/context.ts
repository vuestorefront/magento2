/* eslint-disable no-param-reassign */

import { Context as NuxtContext } from '@nuxt/types';
import { Inject } from '@nuxt/types/app';

type Argument = { tag: string, nuxtCtx: NuxtContext, inject: Inject };

/**
 * It extends given integartion, defined by `tag` in the context.
 */
export const createExtendIntegrationInCtx = ({ tag, nuxtCtx, inject } : Argument) => (integrationProperties: Record<string, unknown>) => {
  const integrationKey = `$${tag}`;

  if (!nuxtCtx.$vsf || !(nuxtCtx.$vsf as Record<string, any>)[integrationKey]) {
    inject('vsf', { [integrationKey]: {} });
  }

  Object.keys(integrationProperties)
    .filter((k) => !['api', 'client', 'config'].includes(k))
    .forEach((key) => {
      (nuxtCtx.$vsf as Record<string, any>)[integrationKey][key] = integrationProperties[key];
    });
};

/**
 * It creates a function that adds an integration to the context under the given name, defined by `tag`.
 */
export const createAddIntegrationToCtx = ({ tag, nuxtCtx, inject } : Argument) => (integrationProperties: Record<string, unknown>) => {
  const integrationKey = `$${tag}`;

  if (nuxtCtx.$vsf && !(nuxtCtx.$vsf as Record<string, any>)[integrationKey]) {
    (nuxtCtx.$vsf as Record<string, any>)[integrationKey] = integrationProperties;
    return;
  }

  inject('vsf', { [integrationKey]: integrationProperties });
};
