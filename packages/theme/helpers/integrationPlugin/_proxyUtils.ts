import { IncomingMessage } from 'node:http';
import { Context as NuxtContext } from '@nuxt/types';
import merge from 'lodash.merge';

export type ApiClientMethod = (...args: any) => Promise<any>;

interface CreateProxiedApiParams {
  givenApi: Record<string, ApiClientMethod>;
  client: any;
  tag: string;
}

export const getBaseUrl = (req: IncomingMessage, basePath: string | undefined = '/'): string => {
  if (!req) return `${basePath}api/`;
  const { headers } = req;
  // eslint-disable-next-line global-require, unicorn/prefer-module
  const isHttps = require('is-https')(req);
  const scheme = isHttps ? 'https' : 'http';
  const host = headers['x-forwarded-host'] || headers.host;

  return `${scheme}://${host}${basePath}api/`;
};

export const createProxiedApi = ({ givenApi, client, tag }: CreateProxiedApiParams) => new Proxy(givenApi, {
  get: (target, prop, receiver) => {
    const functionName = String(prop);
    if (Reflect.has(target, functionName)) {
      return Reflect.get(target, prop, receiver);
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    return async (...args) => client
      .post(`/${tag}/${functionName}`, args)
      .then((r) => r.data);
  },
});

export const getCookies = (context: NuxtContext) => context?.req?.headers?.cookie ?? '';

export const getIntegrationConfig = (context: NuxtContext, configuration: any) => {
  const cookie = getCookies(context);
  const initialConfig = merge({
    axios: {
      baseURL: getBaseUrl(context?.req, context?.base),
      headers: {
        ...(cookie ? { cookie } : {}),
      },
    },
  }, configuration);

  return initialConfig;
};
