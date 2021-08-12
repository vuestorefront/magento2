import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@absolute-web/vsf-core';
import { CmsBlockQuery, CmsBlockQueryVariables, CachedQuery } from '../../types/GraphQL';
import cmsBlocks from './cmsBlocks';
import { Context } from '../../types/context';

export default async (
  context: Context,
  identifiers: string,
  customQuery: CustomQuery = { cmsBlocks: 'cmsBlocks' },
): Promise<ApolloQueryResult<CachedQuery<CmsBlockQuery>>> => {
  const { cmsBlocks: cmsBlocksGQL } = context.extendQuery(
    customQuery,
    {
      cmsBlocks: {
        query: cmsBlocks,
        variables: { identifiers },
      },
    },
  );
  return context.client.query<CachedQuery<CmsBlockQuery>, CmsBlockQueryVariables>({
    query: cmsBlocksGQL.query,
    variables: cmsBlocksGQL.variables,
  });
};
