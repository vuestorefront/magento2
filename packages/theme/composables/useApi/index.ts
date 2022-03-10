import { useContext } from '@nuxtjs/composition-api';
import { request as graphQLRequest, GraphQLClient } from 'graphql-request';
import cookieNames from '~/enums/cookieNameEnum';

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

  if (customerToken) {
    defaultHeaders.authorization = `Bearer ${customerToken}`;
  }

  if (storeCode) {
    defaultHeaders.store = storeCode;
  }

  const query = (
    document: string,
    variables = null,
    endpoint = defaultEndpoint,
    requestHeaders = defaultHeaders,
  ) => new GraphQLClient(endpoint, {
    method: useGETForQueries ? 'GET' : 'POST',
    headers: requestHeaders,
  }).request(document, variables);

  const mutate = (
    document: string,
    variables = null,
    endpoint = defaultEndpoint,
    requestHeaders = defaultHeaders,
  ) => graphQLRequest(endpoint, document, variables, requestHeaders);

  return {
    query,
    mutate,
  };
};

export default useApi;
