import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import { CmsBlockQuery, CmsBlockQueryVariables } from '../../types/GraphQL';
import cmsBlocks from './cmsBlocks';
import { Context } from '../../types/context';
import getHeaders from '../getHeaders';

/**
 * Fetch CMS Blocks from Magento Api.
 *
 * @param context - VSF Context
 * @param identifiers - identifiers of CMS blocks
 * @param [customQuery] - (optional) - custom GraphQL query that extends the default cmsBlocks query
 * @param customHeaders (optional) - custom headers that extends the default headers
 */
export default async function getCmsBlocks(
  context: Context,
  identifiers: string,
  customQuery: CustomQuery = { cmsBlocks: 'cmsBlocks' },
  customHeaders: Record<string, string> = {},
): Promise<ApolloQueryResult<CmsBlockQuery>> {
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
    query: cmsBlocksGQL.query,
    variables: cmsBlocksGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
