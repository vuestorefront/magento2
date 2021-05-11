import { ApolloQueryResult } from 'apollo-client';
import { UrlResloverQuery, UrlResloverQueryVariables } from '../../types/GraphQL';
import query from './query.graphql';
import { Context } from '../../types/context';

export default async ({ client }: Context, url: string): Promise<ApolloQueryResult<UrlResloverQuery>> => client
  .query<UrlResloverQuery, UrlResloverQueryVariables>({
  query,
  variables: { url },
});
