import { MethodBaseOptions } from '../../types';
import { DeleteCustomerAddressMutation, DeleteCustomerAddressMutationVariables } from '@vsf-enterprise/magento-api-types';
import { client } from '../../client';
import { DeepPartial } from 'ts-essentials';
import { FetchResult } from '@apollo/client';

/**
 * deleteCustomerAddress response type
 */
export type DeleteCustomerAddressResponse<T extends DeepPartial<DeleteCustomerAddressMutation> = DeleteCustomerAddressMutation> = FetchResult<T>

/**
 * Method to delete a customer address.
 *
 * @remarks
 * This method communicates with the
 * {@link @vsf-enterprise/magento-api#ApiMethods.deleteCustomerAddress | deleteCustomerAddress } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link @vsf-enterprise/magento-api#deleteCustomerAddress | here}.
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
 * Returns a representation of the {@link @vsf-enterprise/magento2-sdk#DeleteCustomerAddressResponse | DeleteCustomerAddressResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * const addressId = 12;
 * // customer address will be remove for the currently logged in customer
 * const response = await sdk.magento.deleteCustomerAddress({ id: addressId });
 * // response.data?.deleteCustomerAddress - result is stored here, it's boolean
 * ```
 */
export async function deleteCustomerAddress<RES extends DeleteCustomerAddressResponse>(params: DeleteCustomerAddressMutationVariables, options?: MethodBaseOptions) {
  const { data } = await client.post<RES>(
    'deleteCustomerAddress',
    [params.id, options?.customHeaders],
    options?.clientConfig
  );

  return data;
}
