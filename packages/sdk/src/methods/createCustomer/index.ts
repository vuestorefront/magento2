import { CustomerCreateInput, Mutation } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { FetchResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { client } from '../../client';
import { CustomQuery, MethodOptions } from '../../types';

/**
 * mutation type for the {@link createCustomer} method.
 */
export type CreateCustomerMutation = { createCustomerV2: Mutation['createCustomerV2'] };

/**
 * createCustomer response type
 */
export type CreateCustomerResponse<T extends DeepPartial<CreateCustomerMutation> = CreateCustomerMutation> =
  FetchResult<T>;

/**
 * Method to create a new customer.
 *
 * @remarks
 * This method sends a POST request to the
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/createCustomer | createCustomer } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/createCustomer | here}.
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
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/CreateCustomerResponse | CreateCustomerResponse}.
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
export async function createCustomer<RES extends CreateCustomerResponse>(
  params: CustomerCreateInput,
  options?: MethodOptions<CustomQuery<'createCustomer'>>,
) {
  return new AxiosRequestSender(client)
    .setUrl('createCustomer')
    .setMethod('POST')
    .setProps([params, options?.customQuery, options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
