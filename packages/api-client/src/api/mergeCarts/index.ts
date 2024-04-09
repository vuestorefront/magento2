import { FetchResult, gql } from "@apollo/client/core";
import { CustomQuery, MergeCartsMutation, MergeCartsMutationVariables } from "@vue-storefront/magento-types";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import mergeCartsQuery from "./mergeCarts";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

export async function mergeCarts(
  context: Context,
  params: {
    sourceCartId: string;
    destinationCartId: string;
  },
  customQuery: CustomQuery = { mergeCarts: "mergeCarts" },
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<MergeCartsMutation>> {
  const { mergeCarts: mergeCartsGQL } = context.extendQuery(customQuery, {
    mergeCarts: {
      query: mergeCartsQuery,
      variables: {
        sourceCartId: params.sourceCartId,
        destinationCartId: params.destinationCartId,
      },
    },
  });

  return context.client.mutate<MergeCartsMutation, MergeCartsMutationVariables>({
    mutation: gql`
      ${mergeCartsGQL.query}
    `,
    variables: mergeCartsGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
