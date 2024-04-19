import type { ApolloQueryResult } from "@apollo/client/core";
import type { CustomHeaders, CustomQuery, UrlResolverQuery, UrlResolverQueryVariables } from "@vue-storefront/magento-types";
import urlResolverQuery from "./urlResolver";
import type { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Fetches the resolver for received URL.
 *
 * @deprecated - use {@link https://docs.alokai.com/integrations/magento/api/magento-api/route | route} instead.
 */
export async function urlResolver(
  context: Context,
  url: string,
  customQuery: CustomQuery = { urlResolver: "urlResolver" },
  customHeaders: CustomHeaders = {}
): Promise<ApolloQueryResult<UrlResolverQuery>> {
  const { urlResolver: urlResolverGQL } = context.extendQuery(customQuery, {
    urlResolver: {
      query: urlResolverQuery,
      variables: { url },
    },
  });

  return context.client.query<UrlResolverQuery, UrlResolverQueryVariables>({
    query: urlResolverGQL.query,
    variables: urlResolverGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
