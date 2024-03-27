import { ApolloQueryResult } from "@apollo/client/core";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import { AvailableStoresQuery, CustomQuery } from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import availableStoresQuery from "./availableStores";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Returns list of available stores
 */
export const availableStores = async (
  context: Context,
  customQuery: CustomQuery = { availableStores: "availableStores" },
  customHeaders: CustomHeaders = {}
): Promise<ApolloQueryResult<AvailableStoresQuery>> => {
  const { availableStores: availableStoresGQL } = context.extendQuery(customQuery, {
    availableStores: {
      query: availableStoresQuery,
    },
  });

  return context.client.query<AvailableStoresQuery>({
    query: gql`
      ${availableStoresGQL.query}
    `,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
};
