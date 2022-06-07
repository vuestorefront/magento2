import type { ApolloQueryResult } from '@apollo/client/core';
import type { CustomQuery } from '@vue-storefront/core';
import type { UrlResolverQuery, UrlResolverQueryVariables } from '../../types/GraphQL';
import urlResolverQuery from './urlResolver';
import type { Context } from '../../types/context';
import getHeaders from '../getHeaders';

/**
 * Fetches the resolver for received URL.
 *
 * @param context VSF Context
 * @param url the URL to be resolved
 * @param [customQuery] (optional) - custom GraphQL query that extends the default one
 * @deprecated - use route instead
 */
export default async function urlResolver(
  context: Context,
  url: string,
  customQuery: CustomQuery = { urlResolver: 'urlResolver' },
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
      headers: getHeaders(context),
    },
  });
}
