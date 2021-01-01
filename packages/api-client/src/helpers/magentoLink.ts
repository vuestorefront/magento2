import { createHttpLink } from 'apollo-link-http';
import { Config } from '../types/setup';
import fetch from 'isomorphic-fetch';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { Logger } from '@vue-storefront/core';

const createErrorHandler = () => {
  return onError(({
    graphQLErrors,
    networkError
  }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({
        message,
        locations,
        path
      }) => {
        if (!message.includes('Resource Owner Password Credentials Grant')) {
          if (!locations) {
            Logger.error(`[GraphQL error]: Message: ${ message }, Path: ${ path }`);
            return;
          }

          const parsedLocations = locations.map(({
            column,
            line
          }) => `[column: ${ column }, line: ${ line }]`);

          Logger.error(`[GraphQL error]: Message: ${ message }, Location: ${ parsedLocations.join(', ') }, Path: ${ path }`);
        }
      });
    }

    if (networkError) {
      Logger.error(`[Network error]: ${ networkError }`);
    }
  });
};

const createMagentoConnection = (settings: Config): ApolloClient<any> => {
  const httpLink = createHttpLink({
    uri: settings.api,
    fetch
  });
  const onErrorLink = createErrorHandler();

  const link: ApolloLink = ApolloLink.from([httpLink, onErrorLink]);
  return new ApolloClient({
    cache: new InMemoryCache(),
    link
  });
};

export default createMagentoConnection;
