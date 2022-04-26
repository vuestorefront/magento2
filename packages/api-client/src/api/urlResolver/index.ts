import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import { UrlResolverQuery, UrlResolverQueryVariables } from '../../types/GraphQL';
import urlResolver from './urlResolver';
import { Context } from '../../types/context';

/**
 * Fetches the resolver for received URL.
 *
 * @param context VSF Context
 * @param url the URL to be resolved
 * @param [customQuery] (optional) - custom GraphQL query that extends the default one
 */
export default async (
  context: Context,
  url: string,
  customQuery: CustomQuery = { urlResolver: 'urlResolver' },
): Promise<ApolloQueryResult<UrlResolverQuery>> => {
  const { urlResolver: urlResolverGQL } = context.extendQuery(
    customQuery,
    {
      urlResolver: {
        query: urlResolver,
        variables: { url },
      },
    },
  );

  return context.client.query<UrlResolverQuery, UrlResolverQueryVariables>({
    query: urlResolverGQL.query,
    variables: urlResolverGQL.variables,
  });
};
