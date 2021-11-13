/* eslint-disable @typescript-eslint/restrict-template-expressions */
import ApolloClient from 'apollo-client';
import fetch from 'isomorphic-fetch';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { Logger } from '@vue-storefront/core';
import { onError } from 'apollo-link-error';
import { RetryLink } from 'apollo-link-retry';
import { setContext } from 'apollo-link-context';
import { handleRetry } from './linkHandlers';
import { Config } from '../../types/setup';
import introspectionQueryResultData from '../../types/fragmentTypes.json';

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

export const apolloLinkFactory = (settings: Config, handlers?: {
  apolloLink?: ApolloLink;
}) => {
  const baseLink = handlers?.apolloLink || setContext((apolloReq, { headers }) => ({
    headers: {
      ...headers,
    },
  }));

  const httpLink = createHttpLink({
    uri: settings.api,
    fetch,
    ...settings.customApolloHttpLinkOptions,
  });

  const onErrorLink = createErrorHandler();

  const errorRetry = new RetryLink({
    attempts: handleRetry(),
    delay: () => 0,
  });

  // eslint-disable-next-line unicorn/prefer-spread
  return ApolloLink.from([
    onErrorLink,
    errorRetry,
    baseLink.concat(httpLink),
  ]);
};

export const apolloClientFactory = (customOptions: Record<string, any>) => {
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData,
  });

  return new ApolloClient({
    cache: new InMemoryCache({
      fragmentMatcher,
      resultCaching: true,
    }),
    queryDeduplication: true,
    ssrMode: true,
    ...customOptions,
  });
};
