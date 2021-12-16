import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import { UrlResolverQuery, UrlResolverQueryVariables } from '../../types/GraphQL';
import urlResolver from './urlResolver';
import { Context } from '../../types/context';

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
    variables: { url },
  });
};
