import { FetchResult } from "@apollo/client/core";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import { CustomQuery, RemoveProductsFromWishlistMutation, RemoveProductsFromWishlistMutationVariables } from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import removeProductsFromWishlistQuery from "./removeProductsFromWishlist";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

export async function removeProductsFromWishlist(
  context: Context,
  input: RemoveProductsFromWishlistMutationVariables,
  customQuery: CustomQuery = { removeProductsFromWishlist: "removeProductsFromWishlist" },
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<RemoveProductsFromWishlistMutation>> {
  const { removeProductsFromWishlist: removeProductsFromWishlistGQL } = context.extendQuery(customQuery, {
    removeProductsFromWishlist: {
      query: removeProductsFromWishlistQuery,
      variables: { ...input },
    },
  });

  return context.client.mutate<RemoveProductsFromWishlistMutation, RemoveProductsFromWishlistMutationVariables>({
    mutation: gql`
      ${removeProductsFromWishlistGQL.query}
    `,
    variables: removeProductsFromWishlistGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
