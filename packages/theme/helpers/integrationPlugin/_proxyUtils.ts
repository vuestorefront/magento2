import { Context as NuxtContext } from '@nuxt/types';
import { merge } from 'lodash-es';

export type ApiClientMethod = (...args: any) => Promise<any>;

interface CreateProxiedApiParams {
  givenApi: Record<string, ApiClientMethod>;
  client: any;
  tag: string;
}

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
      headers: {
        ...(cookie ? { cookie } : {}),
      },
    },
  }, configuration);

  return initialConfig;
};
