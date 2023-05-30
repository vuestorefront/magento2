import { MethodBaseOptions } from '../../types';
import { WishlistQuery } from '@vue-storefront/magento-types';
import { client } from '../../client';
import { DeepPartial } from 'ts-essentials';
import { ApolloQueryResult } from '@apollo/client';

/**
 * wishlistItemsCount response type
 */
export type WishlistItemsCountResponse<T extends DeepPartial<WishlistQuery> = WishlistQuery> = ApolloQueryResult<T>

/**
 * Method to count items in the wishlist
 *
 * @remarks
 * This method communicates with the
 * {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#ApiMethods.wishlistItemsCount | wishlistItemsCount } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#wishlist | here}.
 *
 * @param options -
 * Options that can be passed to additionally configure the request
 * or customize the logic in a plugin.
 *
 * @typeParam Res - Customizable response interface to be used with custom queries.
 *
 * @returns
 * Returns a representation of the {@link https://docs.vuestorefront.io/sdk-magento2/reference/api/magento-api#WishlistItemsCountResponse | WishlistItemsCountResponse}.
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
  const { data } = await client.post<RES>(
    'wishlistItemsCount',
    [options?.customHeaders],
    options?.clientConfig
  );

  return data;
}
