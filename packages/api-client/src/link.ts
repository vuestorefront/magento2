import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import fetch from 'isomorphic-fetch';
import { Logger } from '@vue-storefront/core';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { Config } from './types/setup';
import possibleTypes from './types/possibleTypes.json';

const createErrorHandler = () => onError(({
  graphQLErrors,
  networkError,
}) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({
      message,
      locations,
      path,
    }) => {
      if (!message.includes('Resource Owner Password Credentials Grant')) {
        if (!locations) {
          Logger.error(`[GraphQL error]: Message: ${message}, Path: ${path}`);
          return;
        }

        const parsedLocations = locations.map(({
          column,
          line,
        }) => `[column: ${column}, line: ${line}]`);

        Logger.error(`[GraphQL error]: Message: ${message}, Location: ${parsedLocations.join(', ')}, Path: ${path}`);
      }
    });
  }

  if (networkError) {
    Logger.error(`[Network error]: ${networkError}`);
  }
});

const createMagentoConnection = (settings: Config): ApolloClient<any> => {
  const apiState = settings.state;
  const storeCode = apiState.getStore();

  const httpLink = createHttpLink({
    uri: settings.api,
    fetch,
    headers: {
      ...(storeCode ? { Store: storeCode } : {}),
    },
  });

  const onErrorLink = createErrorHandler();

  const authLink = setContext((_, { headers }) => {
    const token = apiState.getCustomerToken();
    if (token) {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`,
        },
      };
    }
    return { headers };
  });

  const link: ApolloLink = ApolloLink.from([authLink, onErrorLink, httpLink]);

  const cache = new InMemoryCache({
    possibleTypes,
  });

  return new ApolloClient({
    cache,
    link,
  });
};

export default createMagentoConnection;
