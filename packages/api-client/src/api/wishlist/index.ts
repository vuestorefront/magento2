import { ApolloQueryResult } from "@apollo/client/core";
import { CustomQuery, WishlistQuery, WishlistQueryVariables } from "@vue-storefront/magento-types";
import type { CustomHeaders } from "@vue-storefront/magento-types";
import wishlistQuery from "./wishlist";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

type Variables = {
  pageSize: number;
  currentPage: number;
};

export default async (
  context: Context,
  searchParams: WishlistQueryVariables,
  customQuery: CustomQuery = { wishlist: "wishlist" },
  customHeaders: CustomHeaders = {}
): Promise<ApolloQueryResult<WishlistQuery>> => {
  const defaultParams = {
    pageSize: 10,
    currentPage: 1,
    ...searchParams,
  };

  const variables: Variables = {
    pageSize: defaultParams.pageSize <= 0 ? 10 : defaultParams.pageSize,
    currentPage: defaultParams.currentPage <= 0 ? 1 : defaultParams.currentPage,
  };

  const { wishlist } = context.extendQuery(customQuery, {
    wishlist: {
      query: wishlistQuery,
      variables,
    },
  });
  try {
    return await context.client.query<WishlistQuery, WishlistQueryVariables>({
      query: wishlist.query,
      variables: wishlist.variables,
      context: {
        headers: getHeaders(context, customHeaders),
      },
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
};
