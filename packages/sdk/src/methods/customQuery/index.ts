import { MethodOptions } from '../../types';
import { client } from '../../client';
import { ApolloQueryResult, FetchPolicy } from '@apollo/client';

/**
 * customQuery response type
 */
export type CustomQueryResponse<T = any> = ApolloQueryResult<T>

export type CustomQueryInput<TQueryVariables = any> = {
  query: string,
  queryVariables?: TQueryVariables,
  fetchPolicy?: FetchPolicy,
}

/**
 * Method to send an arbitrary GraphQL query to the Magento GraphQL endpoint
 * For sending mutations, please see `customMutation`
 *
 * @remarks
 * This method communicates with the
 * {@link @vsf-enterprise/magento-api#ApiMethods.customQuery | customQuery } endpoint
 * of the Vue Storefront API Middleware.
 *
 * @param params -
 * Parameter object which can be used with this method.
 * Refer to its type definition to learn about possible properties.
 *
 * @param options -
 * Options that can be passed to additionally configure the request
 * or customize the logic in a plugin.
 *
 * @typeParam RES - Set response type of passed query
 * @typeParam INPUT - Customizable response interface to be used with custom queries.
 *
 * @returns
 * Returns a representation of the {@link @vsf-enterprise/magento2-sdk#CustomQueryResponse | CustomQueryResponse}.
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
 * const queryVariables = { search: "t-shirt" };
 *
 * // fetch query response
 * const customQueryResult = await sdk.magento.customQuery({
 *   query: query,
 *   queryVariables: queryVariables
 * });
 * ```
 */
export async function customQuery<RES extends CustomQueryResponse<any> = CustomQueryResponse<any>, INPUT extends CustomQueryInput = CustomQueryInput<any>>(params: INPUT, options?: MethodOptions<never>) {
  const { data } = await client.post<RES>(
    'customQuery',
    [params, options?.customHeaders],
    options?.clientConfig
  );

  return data;
}
