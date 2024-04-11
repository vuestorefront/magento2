import { FetchResult } from "@apollo/client/core";
import { CustomQuery } from "@vue-storefront/magento-types";
import type {
  AddBundleProductsToCartInput,
  AddBundleProductsToCartMutation,
  AddBundleProductsToCartMutationVariables,
  CustomHeaders,
} from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import addBundleProductsToCartQuery from "./addBundleProductsToCart";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

export async function addBundleProductsToCart(
  context: Context,
  input: AddBundleProductsToCartInput,
  customQuery: CustomQuery = { addBundleProductsToCart: "addBundleProductsToCart" },
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<AddBundleProductsToCartMutation>> {
  const { addBundleProductsToCart: addBundleProductsToCartGQL } = context.extendQuery(customQuery, {
    addBundleProductsToCart: {
      query: addBundleProductsToCartQuery,
      variables: { input },
    },
  });

  return context.client.mutate<any, AddBundleProductsToCartMutationVariables>({
    mutation: gql`
      ${addBundleProductsToCartGQL.query}
    `,
    variables: addBundleProductsToCartGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
