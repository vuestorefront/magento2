import { WishlistQuery } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { client } from '../../client';
import { MethodBaseOptions } from '../../types';

/**
 * wishlistItemsCount response type
 */
export type WishlistItemsCountResponse<T extends DeepPartial<WishlistQuery> = WishlistQuery> = ApolloQueryResult<T>;

/**
 * Method to count items in the wishlist
 *
 * @remarks
 * This method sends a POST request to the
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/wishlistItemsCount | wishlistItemsCount } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/wishlist | here}.
 *
 * @param options -
 * Options that can be passed to additionally configure the request
 * or customize the logic in a plugin.
 *
 * @typeParam Res - Customizable response interface to be used with custom queries.
 *
 * @returns
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/WishlistItemsCountResponse | WishlistItemsCountResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // returns items counter of each wishlist for currently logged in customer
 * const response = await sdk.magento.wishlistItemsCount();
 * // response.data?.customer!.wishlists - array with object containing items counter.
 * // response.data?.customer!.wishlists[X]!.items_count - items_counter for each selected wishlist.
 * // index of element in the array isn't equal wishlist's id in the magento.
 * ```
 */
export async function wishlistItemsCount<RES extends WishlistItemsCountResponse>(options?: MethodBaseOptions) {
  return new AxiosRequestSender(client)
    .setUrl('wishlistItemsCount')
    .setMethod('POST')
    .setProps([options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
