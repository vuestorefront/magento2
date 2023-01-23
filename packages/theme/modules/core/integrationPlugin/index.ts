import { Context as NuxtContext } from '@nuxt/types';
import { Inject } from '@nuxt/types/app';
import axios from 'axios';
import { createExtendIntegrationInCtx, createAddIntegrationToCtx } from './context';
import { getIntegrationConfig, createProxiedApi, ApiClientMethod } from './_proxyUtils';

interface IntegrationContext {
  integration: {
    configure: (tag: string, configuration: any) => void;
    extend: (tag: string, integrationProperties: any) => void;
  }
}

type NuxtPluginWithIntegration = (ctx: NuxtContext & IntegrationContext, inject: Inject) => void | Promise<void>;

const parseCookies = (cookieString: string): Record<string, string> => Object.fromEntries(cookieString
  .split(';')
  // eslint-disable-next-line unicorn/no-array-callback-reference
  .filter(String)
  .map((item) => item.split('=').map((part) => part.trim()))
  .map(([name, value]) => [name, value]));

const setCookieValues = (cookieValues: Record<string, string>, cookieString = '') => {
  const parsed = parseCookies(cookieString);

  // eslint-disable-next-line no-return-assign
  Object.entries(cookieValues).forEach(([name, value]) => parsed[name] = value);

  return Object.entries(parsed).map(([name, value]) => `${name}=${value}`).join('; ');
};

export const integrationPlugin = (pluginFn: NuxtPluginWithIntegration) => (nuxtCtx: NuxtContext, inject: Inject) => {
  const configure = (tag: string, configuration: { api: Record<string, ApiClientMethod> }) => {
    const injectInContext = createAddIntegrationToCtx({ tag, nuxtCtx, inject });
    const config = getIntegrationConfig(nuxtCtx, configuration);
    const { middlewareUrl, ssrMiddlewareUrl } = (nuxtCtx as any).$config;

    if (middlewareUrl || ssrMiddlewareUrl) {
      config.axios.baseURL = process.server ? ssrMiddlewareUrl || middlewareUrl : middlewareUrl;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const client = axios.create(config.axios);

    const api = createProxiedApi({
      givenApi: configuration.api || {}, client, tag, nuxtCtx,
    });

    if ((nuxtCtx.app.i18n as any).cookieValues) {
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      client.defaults.headers.cookie = setCookieValues((nuxtCtx.app.i18n as any).cookieValues, (client.defaults.headers as any).cookie);
    }
    injectInContext({ api, client, config });
  };

  const extend = (tag: string, integrationProperties: Record<string, unknown>) => {
    createExtendIntegrationInCtx({ tag, nuxtCtx, inject })(integrationProperties);
  };

  const integration = { configure, extend };

  pluginFn({ ...nuxtCtx, integration }, inject);
};
