import { ApolloQueryResult, gql } from "@apollo/client/core";
import { WishlistQuery } from "@vue-storefront/magento-types";

import type { CustomHeaders } from "@vue-storefront/magento-types";
import wishlistItemsCountQuery from "./wishlistItemsCount";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Count items in the wishlist
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
export async function wishlistItemsCount(context: Context, customHeaders: CustomHeaders = {}): Promise<ApolloQueryResult<WishlistQuery>> {
  return context.client.query<WishlistQuery>({
    query: gql`
      ${wishlistItemsCountQuery}
    `,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
