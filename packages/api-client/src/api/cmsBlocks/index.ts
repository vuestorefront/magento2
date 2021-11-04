import { ApolloQueryResult } from 'apollo-client';
import { CmsBlockQuery, CmsBlockQueryVariables } from '../../types/GraphQL';
import cmsBlocks from './cmsBlocks';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  identifiers: string,
): Promise<ApolloQueryResult<CmsBlockQuery>> => client
  .query<CmsBlockQuery, CmsBlockQueryVariables>({
  query: cmsBlocks,
  variables: { identifiers },
});
