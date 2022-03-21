import { useContext, ref } from '@nuxtjs/composition-api';
import { request as graphQLRequest, GraphQLClient } from 'graphql-request';
import { Logger } from '@vue-storefront/core';
import cookieNames from '~/enums/cookieNameEnum';

export type RequestParams<VARIABLES> = {
  document: string,
  variables?: VARIABLES | null,
  endpoint?: string,
  requestHeaders?: {
    authorization?: string,
    store?: string
  },
  debugInfo?: string
};

enum GraphQLOperation {
  query = 'query',
  mutation = 'mutation',
}

export const useApi = () => {
  const { app } = useContext();
  const customerToken = app.$cookies.get(cookieNames.customerCookieName);
  const storeCode = app.$cookies.get(cookieNames.storeCookieName);
  const magentoConfig = app.$vsf.$magento.config;
  // TODO remove once we remove apollo client
  const { useGETForQueries } = magentoConfig.customApolloHttpLinkOptions;
  const defaultEndpoint = magentoConfig.magentoApiEndpoint as string;
  const defaultHeaders: {
    authorization?: string,
    store?: string
  } = {};
  const error = ref(null);
  const loading = ref(false);

  if (customerToken) {
    defaultHeaders.authorization = `Bearer ${customerToken}`;
  }

  if (storeCode) {
    defaultHeaders.store = storeCode;
  }

  const request = <TYPE, VARIABLES>(requestParams: RequestParams<VARIABLES>, type: string): Promise<TYPE> => {
    const params: RequestParams<VARIABLES> = {
      variables: null,
      endpoint: defaultEndpoint,
      requestHeaders: defaultHeaders,
      debugInfo: '',
      ...requestParams,
    };
    let response = null;

    try {
      Logger.debug(`[Magento] ${params.debugInfo}`, { params });
      loading.value = true;

      switch (type) {
        case GraphQLOperation.query: {
          response = new GraphQLClient(params.endpoint, {
            method: useGETForQueries ? 'GET' : 'POST',
            headers: params.requestHeaders,
          }).request<TYPE, VARIABLES>(params.document, params.variables);

          break;
        }

        case GraphQLOperation.mutation: {
          response = graphQLRequest<TYPE, VARIABLES>(params.endpoint, params.document, params.variables, params.requestHeaders);

          break;
        }
        default: {
          break;
        }
      }

      Logger.debug(`[Magento] ${params.debugInfo} – results: `, { response });
    } catch (err) {
      error.value = err;
      Logger.error(`[Magento] ${params.debugInfo} – error: `, { response });
    } finally {
      loading.value = false;
    }

    return response;
  };

  const query = <TYPE, VARIABLES>(requestParams: RequestParams<VARIABLES>): Promise<TYPE> => request(requestParams, GraphQLOperation.query);

  const mutate = <TYPE, VARIABLES>(requestParams: RequestParams<VARIABLES>): Promise<TYPE> => request(requestParams, GraphQLOperation.mutation);

  return {
    query,
    mutate,
    error,
    loading,
  };
};

export default useApi;
