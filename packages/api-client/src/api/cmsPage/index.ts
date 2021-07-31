import { ApolloQueryResult } from 'apollo-client';
import { CmsPageQueryVariables, CmsPageQuery } from '../../types/GraphQL';
import cmsPage from './cmsPage';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  identifier: string,
): Promise<ApolloQueryResult<CmsPageQuery>> => client
  .query<CmsPageQuery, CmsPageQueryVariables>({
  query: cmsPage,
  variables: { identifier },
  fetchPolicy: 'no-cache',
});
