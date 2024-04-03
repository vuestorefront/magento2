import { ApolloQueryResult, FetchPolicy } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { MethodBaseOptions } from '../../types';
import { client } from '../../client';

/**
 * customQuery response type
 */
export type CustomQueryResponse<T> = ApolloQueryResult<T>;

/**
 * Custom query input type
 */
export type CustomQueryInput<TQueryVariables> = {
  query: string;
  queryVariables?: TQueryVariables;
  fetchPolicy?: FetchPolicy;
};

/**
 * Method to send an arbitrary GraphQL query to the Magento GraphQL endpoint
 * For sending mutation, please see {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/customMutation | customMutation}.
 *
 * @remarks
 * This method sends a POST request to the
 * {@link @vue-storefront/magento-api#ApiMethods.customQuery | customQuery } endpoint
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
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/CustomQueryResponse | CustomQueryResponse}.
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
 * const customQueryResult = await sdk.magento.customQuery<CustomQueryResponse<ProductsListQuery>, CustomQueryInput<GetProductSearchParams>>({
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
export async function customQuery<RES extends CustomQueryResponse<any>, INPUT extends CustomQueryInput<any>>(
  params: INPUT,
  options?: MethodBaseOptions,
) {
  return new AxiosRequestSender(client)
    .setUrl('customQuery')
    .setMethod('POST')
    .setProps({ ...params, customHeaders: options?.customHeaders })
    .setConfig(options?.clientConfig)
    .send<RES>();
}
