/* eslint-disable @typescript-eslint/restrict-template-expressions */
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  from,
} from '@apollo/client/core';
import fetch from 'isomorphic-fetch';
import { Logger } from '@absolute-web/vsf-core';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import { setContext } from '@apollo/client/link/context';
import { handleRetry } from './linkHandlers';
import { Config } from '../../types/setup';
import possibleTypes from '../../types/possibleTypes.json';
import standardURL from '../url/standardURL';

const createErrorHandler = () => onError(({
  graphQLErrors,
  networkError,
  response
}) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({
      message,
      locations,
      path,
    }) => {
      if (!message.includes('Resource Owner Password Credentials Grant')) {
        if (!locations) {
          if (response?.data) {
            Logger.warn(`[GraphQL error]: Message: ${message}, Path: ${path}`);
          } else {
            Logger.error(`[GraphQL error]: Message: ${message}, Path: ${path}`);
          }
          return;
        }

        const parsedLocations = locations.map(({
          column,
          line,
        }) => `[column: ${column}, line: ${line}]`);

        if (response?.data) {
          Logger.warn(`[GraphQL error]: Message: ${message}, Location: ${parsedLocations.join(', ')}, Path: ${path}`);
        } else {
          Logger.error(`[GraphQL error]: Message: ${message}, Location: ${parsedLocations.join(', ')}, Path: ${path}`);
        }
      }
    });
  }

  if (networkError) {
    Logger.error(`[Network error]: ${networkError.message}`);
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

  const httpLink = new HttpLink({
    useGETForQueries: true,
    uri: settings.api,
    // @ts-ignore
    fetch: (url, options) => fetch(standardURL(url.toString()), options)
      .then(response => response.status >= 500 ? Promise.reject({ code: response.status, message: response.statusText }) : response),
    ...settings.customApolloHttpLinkOptions,
  });

  const onErrorLink = createErrorHandler();

  const errorRetry = new RetryLink({
    attempts: handleRetry(),
    delay: {
      initial: 10,
      max: 100,
    },
  });

  const afterwareLink = new ApolloLink((operation, forward) => forward(operation).map((response) => {
    const { response: { headers } } = operation.getContext();
    const cacheTags = headers.get('x-cache-tags') || headers.get('x-magento-tags');
    const cacheId = headers.get('x-magento-cache-id');

    if (cacheTags) {
      // eslint-disable-next-line no-param-reassign
      response.data = {
        ...response.data,
        cacheTags,
      };
    }

    if (cacheId) {
      // eslint-disable-next-line no-param-reassign
      response.data = {
        ...response.data,
        cacheId,
      };
    }

    return response;
  }));

  return from([
    afterwareLink,
    onErrorLink,
    errorRetry,
    baseLink,
    httpLink,
  ]);
};

export const apolloClientFactory = (customOptions: Record<string, any>) => new ApolloClient({
  cache: new InMemoryCache({
    possibleTypes,
    resultCaching: true,
  }),
  queryDeduplication: true,
  ssrMode: true,
  ...customOptions,
});
