import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@absolute-web/vsf-core';
import { UrlResolverQuery, UrlResolverQueryVariables, CachedQuery } from '../../types/GraphQL';
import urlResolver from './urlResolver';
import { Context } from '../../types/context';

export default async (
  context: Context,
  url: string,
  customQuery: CustomQuery = { urlResolver: 'urlResolver' },
): Promise<ApolloQueryResult<CachedQuery<UrlResolverQuery>>> => {
  const { urlResolver: urlResolverGQL } = context.extendQuery(
    customQuery,
    {
      urlResolver: {
        query: urlResolver,
        variables: { url },
      },
    },
  );

  return context.client.query<CachedQuery<UrlResolverQuery>, UrlResolverQueryVariables>({
    query: urlResolverGQL.query,
    variables: urlResolverGQL.variables,
  });
};
