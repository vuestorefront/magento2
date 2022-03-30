import { useContext } from '@nuxtjs/composition-api';
import { request as graphQLRequest, GraphQLClient } from 'graphql-request';

export const useApi = () => {
  const { app } = useContext();
  const customerToken = app.$vsf.$magento.config.state.getCustomerToken();
  const storeCode = app.$vsf.$magento.config.state.getStore();
  const currency = app.$vsf.$magento.config.state.getCurrency();
  const magentoConfig = app.$vsf.$magento.config;
  // TODO remove once we remove apollo client
  const { useGETForQueries } = magentoConfig.customApolloHttpLinkOptions;
  const defaultEndpoint = magentoConfig.magentoApiEndpoint;
  const defaultHeaders: {
    authorization?: string,
    store?: string
    'Content-Currency'?: string
  } = {};

  if (customerToken) {
    defaultHeaders.authorization = `Bearer ${customerToken}`;
  }

  if (storeCode) {
    defaultHeaders.store = storeCode;
  }

  if (currency) {
    defaultHeaders['Content-Currency'] = currency;
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
