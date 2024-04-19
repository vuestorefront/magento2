import gql from "graphql-tag";
import { ApolloQueryResult, FetchPolicy } from "@apollo/client/core";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Send an arbitrary GraphQL query to the Magento GraphQL endpoint
 * For sending mutation, please see {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/customMutation | customMutation}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // Do not use gql-tag (gql``) here.
 * // For syntax highlighting (provided by respective IDE extensions), add the `#graphql` comment at the start of the template string
 *
 * const query = `#graphql
 *   query($search: String!) {
 *     products(search: $search) {
 *       items {
 *         name
 *       }
 *     }
 *  }
 * `;
 *
 * const queryVariables: GetProductSearchParams = { search: "t-shirt" };
 *
 * // fetch query response
 * const customQueryResult = await sdk.magento.customQuery({
 *   query: query,
 *   queryVariables
 * });
 * ```
 *
 * @example
 * If you want the method to send a GET instead of a POST request,
 * use the `options.clientConfig` parameter.
 *
 * ```ts
 * const customQueryResult = await sdk.magento.customQuery(
 *   {
 *     query,
 *     queryVariables
 *   },
 *   {
 *     clientConfig: {
 *       method: 'GET'
 *     }
 *   }
 * );
 * ```
 */
export async function customQuery<QUERY = any, QUERY_VARIABLES = any>(
  context: Context,
  {
    query,
    queryVariables,
    fetchPolicy,
    customHeaders,
  }: {
    query: string;
    queryVariables?: QUERY_VARIABLES;
    fetchPolicy?: FetchPolicy;
    customHeaders?: CustomHeaders;
  }
): Promise<ApolloQueryResult<QUERY>> {
  return context.client.query<QUERY, QUERY_VARIABLES>({
    query: gql`
      ${query}
    `,
    variables: { ...queryVariables },
    fetchPolicy: fetchPolicy || "no-cache",
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
