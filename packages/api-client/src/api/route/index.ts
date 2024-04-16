import type { ApolloQueryResult } from "@apollo/client/core";
import type { CustomHeaders, CustomQuery, QueryRouteArgs, RoutableInterface, RouteQuery } from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import routeQuery from "./route";
import type { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Resolve a route object data
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch route object data
 * const result = await sdk.magento.route({
 *   url: 'aether-gym-pant.html'
 * });
 *
 * // Example result:
 * {
 *    data: {
 *      route: { type: 'PRODUCT', sku: 'MP11', __typename: 'ConfigurableProduct' }
 *    },
 *    loading: false,
 *    networkStatus: 7
 * }
 * ```
 *  * @example
 * Creating a custom GraphQL query to fetch additional data:
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'route-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query route($url: String!) {
 *                route(url: $url) {
 *                  ${metadata?.fields}
 *                }
 *              }
 *            }`
 *         }),
 *       },
 *     }
 *   }
 * };
 * ```
 *
 * @example
 * Using a custom GraphQL query created in the previous example.
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   route: 'route-custom-query',
 *   metadata: {
 *     fields: 'type ... on CategoryInterface { uid name image}' // fetch additional name and image fields
 *   }
 * };
 *
 * // data will contain only the fields specified in the custom query.
 * const { data } = await sdk.magento.route({ url: 'women.html' }, customQuery);
 * ```
 */
export async function route(
  context: Context,
  url: string,
  customQuery: CustomQuery = { route: "route" },
  customHeaders: CustomHeaders = {}
): Promise<ApolloQueryResult<RouteQuery<RoutableInterface>>> {
  const { route: routeGQL } = context.extendQuery(customQuery, {
    route: {
      query: routeQuery,
      variables: { url },
    },
  });

  return context.client.query<RouteQuery<RoutableInterface>, QueryRouteArgs>({
    query: gql`
      ${routeGQL.query}
    `,
    variables: routeGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
