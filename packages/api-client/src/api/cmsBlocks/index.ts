import { ApolloQueryResult } from '@apollo/client';
import { CustomQuery } from '@vue-storefront/core';
import { CmsBlockQuery, CmsBlockQueryVariables } from '../../types/GraphQL';
import cmsBlocks from './cmsBlocks';
import { Context } from '../../types/context';

export default async (
  context: Context,
  identifiers: string,
  customQuery: CustomQuery = { cmsBlocks: 'cmsBlocks' },
): Promise<ApolloQueryResult<CmsBlockQuery>> => {
  const { cmsBlocks: cmsBlocksGQL } = context.extendQuery(
    customQuery,
    {
      cmsBlocks: {
        query: cmsBlocks,
        variables: { identifiers },
      },
    },
  );
  return context.client.query<CmsBlockQuery, CmsBlockQueryVariables>({
    query: cmsBlocksGQL,
    variables: { identifiers },
  });
};
