import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache } from "@apollo/client/core";
import fetch from "isomorphic-fetch";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";
import { setContext } from "@apollo/client/link/context";
import AgentKeepAlive from "agentkeepalive";
import { getLogger, type AlokaiContainer } from "@vue-storefront/middleware";
import { handleRetry } from "./linkHandlers";
import { Config } from "../../types/setup";
import possibleTypes from "../../types/possibleTypes.json";
import standardURL from "../url/standardURL";

const { HttpsAgent } = AgentKeepAlive;
const agent = new HttpsAgent({
  timeout: 30000,
});

const createErrorHandler = (alokai: AlokaiContainer) =>
  onError(({ graphQLErrors, networkError }) => {
    const logger = getLogger(alokai);

    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path, extensions }) => {
        // Mute all GraphQL authorization errors
        if (extensions?.category === "graphql-authorization") {
          return;
        }

        if (!message.includes("Resource Owner Password Credentials Grant")) {
          if (!locations) {
            logger.error(message, { path });
            return;
          }

          const parsedLocations = locations.map(({ column, line }) => `[column: ${column}, line: ${line}]`);

          logger.error(message, { path, location: parsedLocations.join(", ") });
        }
      });
    }

    if (networkError) {
      logger.error(networkError, { type: "Network Error" });
    }
  });

export const apolloLinkFactory = (
  settings: Config,
  handlers: {
    apolloLink?: ApolloLink;
  },
  alokai: AlokaiContainer
) => {
  const baseLink =
    handlers?.apolloLink ||
    setContext((_apolloReq, { headers }) => ({
      headers: {
        ...headers,
      },
    }));

  const httpLink = new HttpLink({
    uri: settings.api,
    // @ts-expect-error intentional
    fetch: (url, options) => fetch(standardURL(url), options),
    fetchOptions: {
      agent,
    },
    ...settings.customApolloHttpLinkOptions,
  });

  const onErrorLink = createErrorHandler(alokai);

  const errorRetry = new RetryLink({
    attempts: handleRetry({ alokai }),
    delay: () => 0,
  });

  return from([onErrorLink, errorRetry, baseLink.concat(httpLink)]);
};

export const apolloClientFactory = (customOptions: Record<string, any>) =>
  new ApolloClient({
    cache: new InMemoryCache({
      possibleTypes,
      resultCaching: true,
    }),
    queryDeduplication: false,
    ssrMode: true,
    ...customOptions,
  });
