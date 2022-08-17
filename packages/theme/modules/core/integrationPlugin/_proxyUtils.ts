import { Context as NuxtContext } from '@nuxt/types';
import { merge } from 'lodash-es';
import { Logger } from '~/helpers/logger';

export type ApiClientMethod = (...args: any) => Promise<any>;

interface CreateProxiedApiParams {
  nuxtCtx: NuxtContext;
  givenApi: Record<string, ApiClientMethod>;
  client: any;
  tag: string;
}

export const createProxiedApi = ({
  givenApi, client, tag, nuxtCtx,
}: CreateProxiedApiParams) => new Proxy(givenApi, {
  get: (target, prop, receiver) => {
    const functionName = String(prop);
    if (Reflect.has(target, functionName)) {
      return Reflect.get(target, prop, receiver);
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    return async (...args) => client
      .post(`/${tag}/${functionName}`, args)
      .then((r) => r.data)
      .catch((err) => {
        Logger.debug(err);
        nuxtCtx.error({ statusCode: err.statusCode, message: err });

        return {};
      });
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
