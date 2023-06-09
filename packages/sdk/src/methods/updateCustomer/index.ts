import { CustomQuery, MethodOptions } from '../../types';
import { CustomerUpdateInput, Mutation } from '@vue-storefront/magento-types';
import { client } from '../../client';
import { DeepPartial } from 'ts-essentials';
import { FetchResult } from '@apollo/client';

/**
 * mutation type for the {@link updateCustomer} method.
 */
export type UpdateCustomerMutation = { updateCustomerV2: Mutation['updateCustomerV2'] };

/**
 * updateCustomer response type
 */
export type UpdateCustomerResponse<T extends DeepPartial<UpdateCustomerMutation> = UpdateCustomerMutation> = FetchResult<T>

/**
 * Method to update customer data.
 * Customer data is updated based on the current customer token.
 *
 * @remarks
 * This method communicates with the
 * {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#ApiMethods.updateCustomer | updateCustomer } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#updateCustomer | here}.
 *
 * @param params -
 * Parameter object which can be used with this method.
 * Refer to its type definition to learn about possible properties.
 *
 * @param options -
 * Options that can be passed to additionally configure the request
 * or customize the logic in a plugin.
 *
 * @typeParam Res - Customizable response interface to be used with custom queries.
 *
 * @returns
 * Returns a representation of the {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#UpdateCustomerResponse | UpdateCustomerResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // Updates customer first name
 * const result = await sdk.magento.updateCustomer({
 *   firstname: 'New John'
 * });
 *
 * // result contains updated customer data
 * console.log(result); // result.data.updateCustomerV2.customer.firstname === 'New John'
 * ```
 *
 * @example
 * Creating a custom GraphQL query
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'update-customer-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              mutation updateCustomer($input: CustomerUpdateInput!) {
 *                updateCustomerV2(input: $input) {
 *                  customer {
 *                    ${metadata.fields}
 *                  }
 *                }
 *              }
 *            `
 *         }),
 *       },
 *     }
 *   }
 * };
 * ```
 *
 * @example
 * Using a custom GraphQL query to reduce the amount of data returned by the query
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   updateCustomer: 'update-customer-custom-query',
 *   metadata: {
 *     fields: 'firstname lastname'
 *   }
 * };
 *
 * const result = await sdk.magento.updateCustomer({
 *   firstname: 'New John'
 *   lastname: 'New Doe'
 * }, { customQuery });
 *
 * // result contains only the fields specified in the custom query
 * // result.data.updateCustomerV2.customer.firstname === 'New John'
 * // result.data.updateCustomerV2.customer.lastname === 'New Doe'
 * console.log(result); // result.data.updateCustomerV2.customer.firstname === 'New John'
 * ```
 */
export async function updateCustomer<RES extends UpdateCustomerResponse>(params: CustomerUpdateInput, options?: MethodOptions<CustomQuery<'updateCustomer'>>) {
  const { data } = await client.post<RES>(
    'updateCustomer',
    [params, options?.customQuery, options?.customHeaders],
    options?.clientConfig
  );

  return data;
}
