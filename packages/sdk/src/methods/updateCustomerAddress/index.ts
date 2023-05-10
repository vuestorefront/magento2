import { CustomQuery, MethodOptions } from '../../types';
import { UpdateCustomerAddressMutation, UpdateCustomerAddressMutationVariables } from '@vsf-enterprise/magento-api-types';
import { client } from '../../client';
import { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';

/**
 * updateCustomerAddress response type
 */
export type UpdateCustomerAddressResponse<T extends DeepPartial<UpdateCustomerAddressMutation> = UpdateCustomerAddressMutation> = ApolloQueryResult<T>

/**
 * Method to update customer address
 * The user needs to be logged in in order to send this request
 *
 * @remarks
 * This method communicates with the
 * {@link @vsf-enterprise/magento-api#ApiMethods.updateCustomerAddress | updateCustomerAddress } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link @vsf-storefront/magento-api#updateCustomerAddress | here}.
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
 * Returns a representation of the {@link @vsf-enterprise/magento2-sdk#UpdateCustomerAddressResponse | UpdateCustomerAddressResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // fetch updated customer address
 * const result = await sdk.magento.updateCustomerAddress();
 * ```
 *
 * @example
 * Creating a custom GraphQL query for updating customer address
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'update-customer-address-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              mutation updateCustomerAddress($id: Int!, $input: CustomerAddressInput) {
 *                updateCustomerAddress(id: $id, input: $input) {
 *                  ${metadata.fields}
 *                }
 *              }
 *              `
 *            `
 *         }),
 *       },
 *     }
 *   }
 * };
 * ```
 *
 * @example
 * Using a custom GraphQL query to update customer address
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * const customQuery = {
 *   updateCustomerAddress: 'update-customer-address-custom-query',
 *   metadata: {
 *     fields: 'id city company'
 *   }
 * };
 *
 * const result = await sdk.magento.updateCustomerAddress({ id: 308, input: { city: "Warsaw" }  }, { customQuery });
 *
 * // result will contain only the fields specified in the custom query.
 * ```
 */
export async function updateCustomerAddress<RES extends UpdateCustomerAddressResponse>(params: UpdateCustomerAddressMutationVariables, options?: MethodOptions<CustomQuery<'updateCustomerAddress'>>) {
  const { data } = await client.post<RES>(
    'updateCustomerAddress',
    [params, options?.customQuery, options?.customHeaders],
    options?.clientConfig
  );

  return data;
}
