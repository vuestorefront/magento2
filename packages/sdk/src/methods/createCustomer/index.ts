import { CustomQuery, MethodOptions } from '../../types';
import { CustomerCreateInput, Mutation } from '@vue-storefront/magento-types';
import { client } from '../../client';
import { DeepPartial } from 'ts-essentials';
import { FetchResult } from '@apollo/client';

/**
 * mutation type for the {@link createCustomer} method.
 */
export type CreateCustomerMutation = { createCustomerV2: Mutation['createCustomerV2'] };

/**
 * createCustomer response type
 */
export type CreateCustomerResponse<T extends DeepPartial<CreateCustomerMutation> = CreateCustomerMutation> = FetchResult<T>

/**
 * Method to create a new customer.
 *
 * @remarks
 * This method communicates with the
 * {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#ApiMethods.createCustomer | createCustomer } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#createCustomer | here}.
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
 * Returns a representation of the {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#CreateCustomerResponse | CreateCustomerResponse}.
 *
 * @example
 * Simple usage with basic customer data:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * const params = {
 *   email: 'john.doe@gmail.com'
 *   firstname: 'John',
 *   lastname: 'Doe',
 * }
 *
 * const result = await sdk.magento.createCustomer(params);
 * ```
 @example
 * Creating a custom GraphQL query for creating a customer
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'create-customer-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              query customer {
 *                customer {
 *                  ${metadata.fields}
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
 * Using a custom GraphQL query to fetch customer
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 *
 * const customQuery = {
 *   customer: 'create customer-custom-query',
 *   metadata: {
 *     fields: 'email firstname lastname'
 *   }
 * };
 *
 * const params = {
 *   email: 'john.doe@gmail.com'
 *   firstname: 'John',
 *   lastname: 'Doe',
 * }
 *
 * const result = await sdk.magento.createCustomer(params, { customQuery }
 *
 * // result will contain only the fields specified in the custom query.
 * ```
 */
export async function createCustomer<RES extends CreateCustomerResponse>(params: CustomerCreateInput, options?: MethodOptions<CustomQuery<'createCustomer'>>) {
  const { data } = await client.post<RES>(
    'createCustomer',
    [params, options?.customQuery, options?.customHeaders],
    options?.clientConfig
  );

  return data;
}
