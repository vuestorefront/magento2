import { FetchResult, gql } from "@apollo/client/core";
import { CustomQuery, AddProductsToWishlistMutation, AddProductsToWishlistMutationVariables } from "@vue-storefront/magento-types";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import addProductsToWishListQuery from "./addProductsToWishlist";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

export const addProductToWishList = async (
  context: Context,
  input: AddProductsToWishlistMutationVariables,
  customQuery: CustomQuery = { addProductsToWishlist: "addProductsToWishlist" },
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<AddProductsToWishlistMutation>> => {
  const { addProductsToWishlist: addProductsToWishlistGQL } = context.extendQuery(customQuery, {
    addProductsToWishlist: {
      query: addProductsToWishListQuery,
      variables: { ...input },
    },
  });
  return context.client.mutate<AddProductsToWishlistMutation, AddProductsToWishlistMutationVariables>({
    mutation: gql`
      ${addProductsToWishlistGQL.query}
    `,
    variables: addProductsToWishlistGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
};
