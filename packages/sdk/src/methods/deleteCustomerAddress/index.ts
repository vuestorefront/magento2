import { DeleteCustomerAddressMutationVariables, Mutation } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { FetchResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { client } from '../../client';
import { MethodBaseOptions } from '../../types';

/**
 * mutation type for the {@link deleteCustomerAddress} method.
 */
export type DeleteCustomerAddressMutation = { deleteCustomerAddress: Mutation['deleteCustomerAddress'] };

/**
 * deleteCustomerAddress response type
 */
export type DeleteCustomerAddressResponse<
  T extends DeepPartial<DeleteCustomerAddressMutation> = DeleteCustomerAddressMutation,
> = FetchResult<T>;

/**
 * Method to delete a customer address.
 *
 * @remarks
 * This method sends a POST request to the
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/deleteCustomerAddress | deleteCustomerAddress } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/deleteCustomerAddress | here}.
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
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/DeleteCustomerAddressResponse | DeleteCustomerAddressResponse}.
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
export async function deleteCustomerAddress<RES extends DeleteCustomerAddressResponse>(
  params: DeleteCustomerAddressMutationVariables,
  options?: MethodBaseOptions,
) {
  return new AxiosRequestSender(client)
    .setUrl('deleteCustomerAddress')
    .setMethod('POST')
    .setProps([params.id, options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
